import { useState } from "react";
import { auth } from "../firebase";

const CreateListing = ({ setPage, refreshListings }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "plastic",
    weight_kg: "",
    location_name: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
    const payload = {
      seller_id: user.uid,
      category: form.category,
      description: form.description,
      weight_kg: Number(form.weight_kg),
      location_name: form.location_name,
    };

      const res = await fetch(`${API_BASE}/create-listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Failed to create listing");
      }

      await refreshListings();
      setShowPopup(true);

      setForm({
        title: "",
        description: "",
        category: "plastic",
        weight_kg: "",
        location_name: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error creating listing");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-1">Create New Listing</h1>
      <p className="text-gray-600 mb-6">
        Share your available materials with the community
      </p>

      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <Input label="Listing Title" name="title" value={form.title} onChange={handleChange} />

        <Textarea label="Description" name="description" value={form.description} onChange={handleChange} />

        <div className="grid grid-cols-2 gap-4">
          <Select label="Category" name="category" value={form.category} onChange={handleChange} />
          <Input label="Weight (kg)" name="weight_kg" type="number" value={form.weight_kg} onChange={handleChange} />
        </div>

        <Input
          label="Location (City / Area)"
          name="location_name"
          placeholder="e.g. Andheri East, Mumbai"
          value={form.location_name}
          onChange={handleChange}
        />

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-lg font-medium"
          >
            Publish Listing
          </button>

          <button onClick={() => setPage("dashboard")} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center shadow-lg">
            <h2 className="text-xl font-bold mb-2">Listing Created 🎉</h2>
            <p className="text-gray-600 mb-4">Your listing has been published successfully.</p>
            <button
              onClick={() => {
                setShowPopup(false);
                setPage("dashboard");
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateListing;

/* ---------- Small Components ---------- */

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input {...props} className="w-full border rounded-lg px-3 py-2 mt-1" />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <textarea {...props} rows="3" className="w-full border rounded-lg px-3 py-2 mt-1" />
  </div>
);

const Select = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select {...props} className="w-full border rounded-lg px-3 py-2 mt-1">
      <option value="plastic">Plastic</option>
      <option value="metal">Metal</option>
      <option value="glass">Glass</option>
      <option value="paper">Paper</option>
    </select>
  </div>
);
