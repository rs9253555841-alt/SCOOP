import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Heart } from 'lucide-react';
import { WavyDivider } from './WavyDivider';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 w-full">
      {/* Brown wavy top edge transitioning into brown background */}
      <WavyDivider fillColor="#7A2500" height={45} />

      {/* Main Brown Footer */}
      <div className="bg-[#7A2500] text-[#FFF5E4] pt-10 pb-12 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand + Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-script text-white">Scoop</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6F86]"></span>
            </div>
            <p className="text-lg font-medium text-[#FFF5E4]">
              &ldquo;Every Scoop, a Little Joy.&rdquo;
            </p>
            <p className="text-sm text-[#F8D0C8] leading-relaxed">
              Artisanal small-batch ice creams crafted with farm-fresh double cream, sun-ripened fruits, and slow-roasted nuts. Pure happiness in every swirl.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-script text-white border-b border-[#98B032]/30 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link to="/" className="text-[#FFF5E4] hover:text-[#FFC93C] block py-0.5">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/flavors" className="text-[#FFF5E4] hover:text-[#FFC93C] block py-0.5">
                  All Flavors
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-[#FFF5E4] hover:text-[#FFC93C] block py-0.5">
                  Order & Cart
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#FFF5E4] hover:text-[#FFC93C] block py-0.5">
                  About Our Craft
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Parlor */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-script text-white border-b border-[#98B032]/30 pb-2 inline-block">
              Our Parlor
            </h3>
            <div className="space-y-3 text-sm text-[#FFF5E4]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FFC93C] shrink-0" />
                <a href="tel:8570917740" className="hover:text-[#FFC93C] transition-colors">
                  +91 8570917740
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FFC93C] shrink-0" />
                <span>hello@scoopicecream.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FFC93C] shrink-0 mt-0.5" />
                <span>Kaithal, Haryana</span>
              </div>
            </div>
          </div>

          {/* Column 4: Follow Us & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-script text-white border-b border-[#98B032]/30 pb-2 inline-block">
              Follow Us
            </h3>
            <p className="text-sm text-[#F8D0C8]">
              Join our sweet community for weekly secret flavor drops and seasonal specials!
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-[#7A2500] flex items-center justify-center hover:bg-[#FFF5E4]"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-[#7A2500] flex items-center justify-center hover:bg-[#FFF5E4]"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <Link
                to="/flavors"
                className="px-4 py-2 bg-[#FF6F86] text-white text-xs font-bold rounded-full flex items-center gap-1 hover:bg-[#F25A74]"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Taste Joy</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Copyright Line */}
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[#FFF5E4]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F8D0C8] gap-4">
          <p>© 2026 Scoop. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <p className="flex items-center gap-1">
              Handcrafted with love, fresh cream, and joy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
