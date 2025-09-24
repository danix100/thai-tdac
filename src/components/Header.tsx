import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-50 font-quicksand">
      {/* Top dark bar */}
      <div className="bg-gray-800 py-3 text-center">
        <p className="text-xs sm:text-sm text-white font-medium">
          Mandatory for all travellers wishing to enter Thailand
        </p>
      </div>

      {/* Main header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo / Flag + Title */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://www.svgrepo.com/show/405628/flag-for-flag-thailand.svg"
                alt="Thailand Flag"
                className="w-10 h-6 sm:w-12 sm:h-8 object-contain"
              />
              <span className="text-lg sm:text-2xl font-bold text-gray-800">
                Thailand TDAC
              </span>
            </Link>
          </div>

          {/* Navigation and Apply button */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Home
              </Link>
              <Link to="/faq" className="text-gray-700 hover:text-primary font-medium transition-colors">
                FAQ
              </Link>
            </nav>
            
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg text-sm sm:text-base"
            >
              Apply For Thailand Digital Arrival Card
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
