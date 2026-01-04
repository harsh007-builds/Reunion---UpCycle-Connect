import { useEffect, useRef, useState } from "react";

const BrowseListings = ({ listings = [] }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = listings.filter(
    (item) =>
      item?.title?.toLowerCase().includes(query.toLowerCase()) ||
      item?.category?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Search Listings</h1>
      <p className="text-gray-600 mb-6">
        Find materials and resources in your area
      </p>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search for plastic, metal, cardboard..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border rounded-xl px-4 py-3 mb-6"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500">No search results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseListings;


const ListingCard = ({ item }) => (
  <div className="bg-white rounded-xl shadow overflow-hidden">
    {item.image && (
      <img
        src={item.image}
        alt={item.title}
        className="h-40 w-full object-cover"
      />
    )}

    <div className="p-4">
      <h3 className="font-semibold">{item.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
      <p className="text-sm text-gray-500">
        📦 {item.category} • 🌱 {item.co2_saved || 0}kg CO₂ saved
      </p>
    </div>
  </div>
);
