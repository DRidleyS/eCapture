const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} eCapture. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-6">
            <a href="/" className="hover:text-gray-300 transition">
              Home
            </a>
            <a href="/about" className="hover:text-gray-300 transition">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
