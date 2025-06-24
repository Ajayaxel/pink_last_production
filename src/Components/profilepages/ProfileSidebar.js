import { User, ShoppingBag, Settings, LogOut } from 'lucide-react';
const Sidebar = ({ currentPage, setCurrentPage }) => {
    const navItems = [
      { name: 'Profile', icon: <User size={20} />, page: 'profile' },
      { name: 'Orders', icon: <ShoppingBag size={20} />, page: 'orders' },
      { name: 'Settings', icon: <Settings size={20} />, page: 'settings' },
      { name: 'Logout', icon: <LogOut size={20} />, page: 'logout' },
    ];
  
    return (
      <div className="w-72 border rounded-lg h-full bg-white bg-opacity-60 backdrop-blur-md shadow-lg p-6 flex flex-col items-center">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#222222]">Profile</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your account</p>
        </div>
  
        <ul className="space-y-4 w-full">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setCurrentPage(item.page)}
                className={`w-full h-12 flex items-center px-5 rounded-xl transition-all duration-300 ${
                  currentPage === item.page 
                    ? 'bg-[#111827] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="mr-4">
                  {React.cloneElement(item.icon, { size: 20, color: currentPage === item.page ? "#fff" : "#555" })}
                </div>
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  export default Sidebar;
  