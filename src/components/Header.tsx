import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full bg-primary/95 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-50">
      <div className="bg-primary/10 py-2 text-center">
        <p className="text-sm text-primary font-medium">
          Mandatory for all travellers wishing to enter Thailand
        </p>
      </div>
      
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-5 bg-gradient-to-b from-red-600 via-white to-red-600 rounded-sm border border-gray-300 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-red-600 via-blue-600 to-red-600 opacity-80 rounded-sm">
              <div className="absolute top-1 left-1 right-1 bottom-1 bg-white/90 rounded-sm"></div>
            </div>
          </div>
          <span className="text-xl font-bold text-primary-foreground">Thailand TDAC</span>
        </div>
        
        <Button 
          variant="secondary"
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
        >
          Apply For Thailand Digital Arrival Card
        </Button>
      </div>
    </header>
  );
};

export default Header;