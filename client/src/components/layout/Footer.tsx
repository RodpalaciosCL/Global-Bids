import { Link } from 'wouter';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logo */}
          <div className="flex items-center mb-4">
            <img 
              src="https://images.proxibid.com/AuctionImages/11639/global%20bids.jpg" 
              alt="Global Bids Logo" 
              className="h-10 mr-3 rounded-lg" 
            />
            <div>
              <div className="text-white font-heading font-bold text-xl">Global Bids</div>
              <div className="text-gray-400 text-xs">Subastas de Maquinaria</div>
            </div>
          </div>
          
          {/* Copyright y developed by */}
          <div className="text-gray-400 text-sm flex flex-col sm:flex-row items-center gap-2 mt-2">
            <span>&copy; {currentYear} Global Bids</span>
            <span className="hidden sm:inline">|</span>
            <span>
              Developed by 
              <a 
                href="#" 
                className="text-primary hover:text-white transition-colors ml-1"
              >
                AIrontech
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
