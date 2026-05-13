import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-950 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <div>
        <h1 className="text-2xl font-bold text-green-400">
          SmartBin
        </h1>
      </div>

      <ul className="hidden md:flex gap-8 font-medium">
        <li>
          <a href="#home" className="hover:text-green-400 transition">
            Home
          </a>
        </li>

        <li>
          <a href="#about" className="hover:text-green-400 transition">
            About
          </a>
        </li>

        <li>
          <a href="#working" className="hover:text-green-400 transition">
            Working
          </a>
        </li>

        <li>
          <a href="#contact" className="hover:text-green-400 transition">
            Contact
          </a>
        </li>

        <li>
          <a href="#blog" className="hover:text-green-400 transition">
            Blog
          </a>
        </li>
      </ul>

      <Link
        to="/login"
        className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg transition"
      >
        Login
      </Link>
    </nav>
  );
};

export default Navbar;