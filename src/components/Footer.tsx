const Footer = () => {
  return (
    <footer className="bg-primary py-12 font-quicksand">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/src/assets/thailand-flag.svg"
                alt="Thailand Flag"
                className="w-10 h-6 object-contain"
              />
              <span className="text-xl font-bold text-primary-foreground">Thailand TDAC</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              Your personal information is securely encrypted using SSL.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-6 bg-yellow-400 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-black">🔒</span>
              </div>
              <div className="w-8 h-6 bg-green-500 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-white">$</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80 text-sm mb-2">
            © 2024 thailandarrivalcardtourist. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-xs">
            Legal Disclaimer: thailandarrivalcardtourist.com is not affiliated with the Government or its sponsors.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;