const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-10 px-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            SmartBin
          </h2>

          <p>
            Smart waste monitoring solution for modern smart cities.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <p>Email: support@smartbin.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Social Links
          </h3>

          <p>Instagram</p>
          <p>LinkedIn</p>
          <p>Twitter</p>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-8 pt-5 text-center">
        © 2026 SmartBin Monitoring System
      </div>
    </footer>
  );
};

export default Footer;