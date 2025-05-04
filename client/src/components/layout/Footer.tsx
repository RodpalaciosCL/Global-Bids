import { Link } from 'wouter';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <img 
              src="https://images.proxibid.com/AuctionImages/11639/global%20bids.jpg" 
              alt="Global Bids Logo" 
              className="h-12 w-auto bg-white rounded-md p-1"
            />
            <div className="ml-4">
              <div className="text-white font-bold text-lg">Global Bids</div>
              <div className="text-gray-400 text-xs">Subastas de Maquinaria</div>
            </div>
          </div>
          
          <div className="text-gray-400 text-sm text-center md:text-right">
            <div className="md:flex items-center">
              <span>&copy; {currentYear} Global Bids</span>
              <span className="hidden md:inline mx-2">|</span>
              <span>
                Developed by <a href="#" className="text-blue-400 hover:text-white transition-colors">AIrontech</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
