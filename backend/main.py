# main.py

import firebase_admin
import google.generativeai as genai
import json
from firebase_admin import credentials, firestore
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

# ---------------- INITIAL SETUP ----------------

# Gemini AI
genai.configure(api_key="YOUR_GEMINI_API_KEY")
model = genai.GenerativeModel("gemini-2.0-flash")

# Firebase
if not firebase_admin._apps:
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()

# Geocoder
geolocator = Nominatim(user_agent="upcycle_app")

# FastAPI
app = FastAPI(title="UpCycle Connect API")

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- CONSTANTS ----------------
IMPACT_RATES = {
    "plastic": {"co2": 1.5, "money": 10},
    "metal": {"co2": 5.0, "money": 30},
    "glass": {"co2": 0.5, "money": 5},
    "paper": {"co2": 0.8, "money": 8},
}

# ---------------- MODELS ----------------
class CreateListingRequest(BaseModel):
    seller_id: str
    category: str
    description: str
    weight_kg: float
    location_name: str

class SearchRequest(BaseModel):
    user_lat: float
    user_lng: float
    query_text: str

# ---------------- HELPERS ----------------
def calculate_impact(category: str, weight: float):
    rates = IMPACT_RATES.get(category.lower(), {"co2": 0, "money": 0})
    return {
        "co2_saved": round(rates["co2"] * weight, 2),
        "money_saved": round(rates["money"] * weight, 2),
    }

# ---------------- ROUTES ----------------

@app.get("/")
def root():
    return {"status": "UpCycle Connect API is running"}

# ---------- CREATE LISTING ----------
@app.post("/create-listing")
async def create_listing(listing: CreateListingRequest):
    location = geolocator.geocode(listing.location_name)
    if not location:
        raise HTTPException(status_code=400, detail="Location not found")

    impact = calculate_impact(listing.category, listing.weight_kg)

    data = {
        "seller_id": listing.seller_id,
        "category": listing.category,
        "description": listing.description,
        "weight_kg": listing.weight_kg,
        "location_name": listing.location_name,
        "lat": location.latitude,
        "lng": location.longitude,
        "co2_saved": impact["co2_saved"],
        "money_saved": impact["money_saved"],
        "status": "active",
        "created_at": datetime.utcnow(),
    }

    db.collection("listings").add(data)

    return {
        "message": "Listing created successfully",
        "impact": impact,
    }

# ---------- GET LISTINGS (DASHBOARD) ----------
@app.get("/listings/")
async def get_listings(category: Optional[str] = None):
    query = db.collection("listings").where("status", "==", "active")
    if category:
        query = query.where("category", "==", category)

    results = []
    for doc in query.stream():
        item = doc.to_dict()
        item["id"] = doc.id
        results.append(item)

    return results

# ---------- AI SEARCH ----------
@app.post("/chat-search")
async def ai_search(request: SearchRequest):
    prompt = f"""
    Extract search parameters from this user text:
    "{request.query_text}"

    Return ONLY JSON with keys:
    - category (string or null)
    - location_name (string or null)
    - radius_km (number, default 5)
    """

    ai_response = model.generate_content(prompt)

    try:
        clean = ai_response.text.replace("```json", "").replace("```", "").strip()
        params = json.loads(clean)
    except:
        params = {}

    search_lat, search_lng = request.user_lat, request.user_lng

    if params.get("location_name"):
        loc = geolocator.geocode(params["location_name"])
        if loc:
            search_lat, search_lng = loc.latitude, loc.longitude

    listings_ref = db.collection("listings").where("status", "==", "active")
    if params.get("category"):
        listings_ref = listings_ref.where("category", "==", params["category"])

    results = []
    radius = params.get("radius_km", 5)

    for doc in listings_ref.stream():
        data = doc.to_dict()
        dist = geodesic(
            (search_lat, search_lng),
            (data["lat"], data["lng"])
        ).km

        if dist <= radius:
            data["id"] = doc.id
            data["distance_km"] = round(dist, 2)
            results.append(data)

    results.sort(key=lambda x: x["distance_km"])

    return {
        "understood_as": params,
        "results": results,
    }
