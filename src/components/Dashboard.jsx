import { FiBox, FiUsers, FiTrendingUp } from "react-icons/fi";
import { MdEco } from "react-icons/md";

const Dashboard = ({ listings = [], loading = false }) => {

  const totalListings = listings.length;

  const verifiedSellers = new Set(
    listings.filter(l => l?.is_verified).map(l => l.seller_id)
  ).size;

  const totalCO2 = listings.reduce(
    (sum, l) => sum + (l.co2_saved || 0),
    0
  );

  const totalMoney = listings.reduce(
    (sum, l) => sum + (l.money_saved || 0),
    0
  );

  if (loading) {
    return <div className="p-10 text-gray-600">Loading dashboard...</div>;
  }

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Welcome to UpCycle Connect! Here's what's happening in your community.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        <StatCard
          title="Total Listings"
          value={totalListings}
          sub="Active in your area"
          icon={<FiBox className="text-blue-600" />}
        />

        <StatCard
          title="Verified Sellers"
          value={verifiedSellers}
          sub="Trusted sources"
          icon={<FiUsers className="text-green-600" />}
        />

        <StatCard
          title="CO₂ Saved"
          value={`${totalCO2} kg`}
          sub="Environmental impact"
          icon={<MdEco className="text-green-600" />}
        />

        <StatCard
          title="Money Saved"
          value={`₹${totalMoney}`}
          sub="Community savings"
          icon={<FiTrendingUp className="text-blue-600" />}
        />
      </div>

      <div>
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Listings</h2>
          <span className="text-gray-500">{totalListings} total</span>
        </div>

        {listings.length === 0 ? (
          <p className="text-gray-500">No listings yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listings.map(item => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

const StatCard = ({ title, value, sub, icon }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md">
    <div className="flex justify-between mb-4">
      <p className="text-gray-600">{title}</p>
      <div className="text-xl">{icon}</div>
    </div>
    <h2 className="text-3xl font-bold">{value}</h2>
    <p className="text-sm text-gray-500">{sub}</p>
  </div>
);

const ListingCard = ({ item }) => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden border">
    
    {/* <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
      No Image
    </div> */}

    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg capitalize">
          {item.category}
        </h3>

        {item.is_verified && (
          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
            Verified
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-2">
        {item.description || "No description provided"}
      </p>

      <p className="text-sm text-gray-500">
  📍 {item.location_name || "Location unavailable"}
</p>


      <div className="flex gap-2 mb-3">
        <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs">
          🌱 {item.co2_saved} kg CO₂
        </span>
        <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
          💰 ₹{item.money_saved}
        </span>
      </div>

      {item.distance_km && (
        <p className="text-xs text-gray-500">
          {item.distance_km} km away
        </p>
      )}
    </div>
  </div>
);
