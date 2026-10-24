import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full py-16 px-4 sm:px-8 max-w-2xl mx-auto text-center">
      <div className="bg-[#FFF5E4] rounded-3xl p-10 sm:p-14 border-2 border-white shadow-lg space-y-6">
        
        {/* Melted scoop illustration/symbol */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#FF6F86] flex items-center justify-center text-white text-5xl shadow-md border-4 border-white">
            🫠
          </div>
          <span className="absolute -bottom-2 bg-white text-[#7A2500] text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-[#F8D0C8]">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-script text-[#7A2500]">
            Oops, this scoop melted!
          </h1>
          <p className="text-sm sm:text-base font-medium text-[#7A2500]/80 max-w-md mx-auto">
            The page you are looking for has slipped off its cone. Let&rsquo;s get you back to our fresh, frozen artisanal flavors.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="btn-pill-brown text-sm py-3 px-8 font-bold inline-flex items-center gap-2 shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/flavors"
            className="btn-pill-white text-sm py-3 px-8 font-bold border border-[#7A2500]/20"
          >
            <span>Browse Flavors</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
