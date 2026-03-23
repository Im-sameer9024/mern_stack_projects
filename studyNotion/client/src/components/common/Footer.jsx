import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { footerLinks } from '@/data/constants';

const Footer = () => {
  return (
    <footer className="bg-richBlack-800 text-richBlack-200 py-12">
      <div className="w-11/12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Column 1 - Logo + Company */}
        <div className="space-y-4">
          <img src={Logo} alt="logo" className="w-40" />

          <div>
            <h2 className="text-white font-semibold mb-3">Company</h2>

            <ul className="space-y-2 text-sm text-white/50">
              {['About', 'Blog', 'Careers', 'Press', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-white transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Other Columns */}
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h2 className="text-white font-semibold mb-3">{section.title}</h2>

            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-white transition text-white/50"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-richBlack-700 text-white/50 mt-10 pt-6 text-center text-sm text-richBlack-300">
        © {new Date().getFullYear()} StudyNotion. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
