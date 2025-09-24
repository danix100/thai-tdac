import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-50 font-quicksand">
      {/* Top dark bar */}
      <div className="bg-gray-800 py-3 text-center">
        <p className="text-sm text-white font-medium">
          Mandatory for all travellers wishing to enter Thailand
        </p>
      </div>
      
      {/* Main header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="w-12 h-2 bg-red-600 rounded-sm"></div>
              <div className="w-12 h-2 bg-white border border-gray-300 rounded-sm"></div>
              <div className="w-12 h-2 bg-blue-600 rounded-sm"></div>
            </div>
            <span className="text-2xl font-bold text-gray-800">Thailand TDAC</span>
          </div>
          
          <Button 
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
          >
            Apply For Thailand Digital Arrival Card
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;