import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-bagh-50 border-t border-bagh-100">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-bagh-800 rounded-md flex items-center justify-center">
                <span className="text-white font-light text-sm">B</span>
              </div>
              <span className="text-lg font-light text-bagh-800">BaghLabs</span>
            </div>
            <p className="text-xs text-minimal leading-relaxed">
              From Concept to Product to Impact. A software studio dedicated to turning bold ideas into impactful digital products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-light text-bagh-800">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="text-xs text-minimal hover:text-bagh-800 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cases" className="text-xs text-minimal hover:text-bagh-800 transition-colors duration-200">
                  Our Cases
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-light text-bagh-800">Get in Touch</h3>
            <p className="text-xs text-minimal">
              Ready to bring your idea to life?
            </p>
            <Link to="/cases" className="btn-primary inline-block w-fit">
              Work With Us
            </Link>
          </div>
        </div>

        <div className="border-t border-bagh-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-xs text-bagh-400">
              © 2025 BaghLabs. All rights reserved.
            </p>
            <p className="text-xs text-bagh-400">
              From Concept to Product to Impact
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer



