const Footer = () => {
  return (
    <footer className="bg-primary py-12 font-quicksand">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-5 bg-gradient-to-b from-red-600 via-white to-red-600 rounded-sm border border-gray-300 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-red-600 via-blue-600 to-red-600 opacity-80 rounded-sm">
                  <div className="absolute top-1 left-1 right-1 bottom-1 bg-white/90 rounded-sm"></div>
                </div>
              </div>
              <span className="text-xl font-bold text-primary-foreground">Thailand TDAC</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Official Thailand Digital Arrival Card processing service for all international travelers.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Apply Now</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Check Status</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li>24/7 Customer Support</li>
              <li>Email: support@thailandtdac.com</li>
              <li>Refund Guarantee</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Thailand TDAC. All rights reserved. | Processing service for Thailand Digital Arrival Card.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;