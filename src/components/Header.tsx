import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import adeccoLogo from "@/assets/adecco-logo.png";
const Header = () => {
  return <header className="w-full sticky top-0 z-50 font-quicksand">
      {/* Top dark bar */}
      <div className="bg-gray-800 py-3 text-center">
        <p className="text-xs sm:text-sm text-white font-medium">Required for all travellers wishing to enter Thailand</p>
      </div>

      {/* Main header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo / Flag + Title */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <img src={adeccoLogo} alt="Adecco Logo" className="w-20 h-8 sm:w-24 sm:h-10 lg:w-28 lg:h-12 object-contain" />
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">thaidigitalarrival.com</span>
              </Link>
            </div>

            {/* Apply button */}
            <Link to="/apply" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg text-sm sm:text-base">
                <span className="hidden sm:inline">Apply For Thailand Digital Arrival Card</span>
                <span className="sm:hidden">Apply Now</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;