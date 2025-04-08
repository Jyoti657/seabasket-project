const Footer: React.FC = () => {
  return (
    <footer className=" text-gray-300 py-10 bg-seabasket_green">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-6">
          <div>
            <h3 className="text-white font-semibold mb-3">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Seabasket Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Payments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cancellation & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Report Infringement
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Policy</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Social</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
