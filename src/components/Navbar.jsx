import { FiHome, FiGrid, FiPlusCircle, FiSearch } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { loginWithGoogle, logout } from "../firebase";


const Navbar = ({ page, setPage, user, toggleChatbot, setShowChatbot }) => {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setPage("home")}
          >
            <span className="font-semibold text-lg text-gray-900">
              UpCycle Connect
            </span>
          </div>

          {/* NAV */}
          <div className="hidden md:flex items-center gap-4">
            <NavItem label="Home" icon={<FiHome />} active={page==="home"} onClick={()=>setPage("home")} />
            <NavItem label="Dashboard" icon={<FiGrid />} active={page==="dashboard"} onClick={()=>setPage("dashboard")} />
            <NavItem label="Create Listing" icon={<FiPlusCircle />} active={page==="create"} onClick={()=>setPage("create")} />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <button
  onClick={() => setPage("browse")}
  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600"
>
  <FiSearch />
  <span className="hidden sm:block">Search</span>
</button>


           <button
  onClick={() => setShowChatbot(prev => !prev)}
  className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-green-400 to-blue-500 text-white"
>
  <BsStars />
  AI Assistant
</button>



            {user ? (
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={logout}
                  className="px-3 py-1 rounded-full bg-gray-200 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="px-4 py-2 rounded-full bg-black text-white"
              >
                Login
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full ${
      active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon} {label}
  </button>
);

export default Navbar;
