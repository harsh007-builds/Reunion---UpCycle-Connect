import { useState } from "react";

const SearchModal = ({ listings, onClose }) => {
  const [query, setQuery] = useState("");

  const filtered = listings.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-24 z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Search Listings</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">✕</button>
        </div>

        <input
          autoFocus
          type="text"
          placeholder="Search plastic, metal, boxes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-6"
        />

        {query && filtered.length === 0 && (
          <p className="text-gray-500 text-center">No search results found</p>
        )}

        <div className="space-y-4 max-h-[350px] overflow-y-auto">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Category: {item.category}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SearchModal;
