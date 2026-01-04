import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyChoose from "./components/WhyChoose";
import ReadyDiff from "./components/ReadyDiff";
import Dashboard from "./components/Dashboard";
import CreateListing from "./components/CreateListing";
import BrowseListings from "./components/BrowseListings";
import Chatbot from "./components/Chatbot";



function App() {
  const [page, setPage] = useState("home");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // ✅ AUTH STATE
  const [showChatbot, setShowChatbot] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // 🔐 Listen to auth state ONCE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  // 📦 Fetch listings
  const refreshListings = async () => {
    const res = await fetch(`${API_BASE}/listings`);
    const data = await res.json();
    setListings(data);
  };

  useEffect(() => {
    refreshListings().finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar
  page={page}
  setPage={setPage}
  setShowChatbot={setShowChatbot}
/>


      {page === "home" && (
        <>
          <Hero setPage={setPage} />
          <WhyChoose />
          <ReadyDiff setPage={setPage} />
        </>
      )}

      {page === "dashboard" && (
        <Dashboard listings={listings} loading={loading} />
      )}

      {page === "create" && (
        <CreateListing
          user={user}                 // ✅ PASS USER
          setPage={setPage}
          refreshListings={refreshListings}
        />
      )}
      {page === "browse" && (
  <BrowseListings listings={listings} />
)}

      {showChatbot && <Chatbot />}
    </>
  );
}

export default App;
