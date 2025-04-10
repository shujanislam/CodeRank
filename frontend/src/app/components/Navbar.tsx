const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg">
      <div className="text-2xl font-bold tracking-wide">CodeRank</div>
      <div className="space-x-6">
        <a href="#" className="hover:text-blue-400 transition-colors duration-200">Problems</a>
        <a href="#" className="hover:text-blue-400 transition-colors duration-200">Submit</a>
        <a href="#" className="hover:text-blue-400 transition-colors duration-200">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
