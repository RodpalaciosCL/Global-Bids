import { Link } from 'wouter';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800 w-full">
      <div className="container mx-auto px-3 sm:px-4 py-5 sm:py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <div className="flex items-center mb-3 md:mb-0">
            <img 
              src="https://images.proxibid.com/AuctionImages/11639/global%20bids.jpg" 
              alt="Global Bids Logo" 
              className="h-8 sm:h-10 w-auto bg-white rounded-md p-1"
            />
            <div className="ml-2 sm:ml-3">
              <div className="text-white font-bold text-sm sm:text-base">Global Bids</div>
              <div className="text-gray-400 text-xs">Subastas de Maquinaria</div>
            </div>
          </div>
          
          <div className="text-gray-400 text-xs sm:text-sm text-center md:text-right">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <span>&copy; {currentYear} Global Bids</span>
              <span className="hidden sm:inline">|</span>
              <span>
                Developed by <a href="https://www.airontechs.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white transition-colors">AIrontech</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
