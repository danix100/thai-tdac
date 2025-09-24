const Footer = () => {
  return (
    <footer className="bg-primary py-12 font-quicksand">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://www.svgrepo.com/show/405628/flag-for-flag-thailand.svg"
                alt="Thailand Flag"
                className="w-10 h-6 object-contain"
              />
              <span className="text-xl font-bold text-primary-foreground">Thailand TDAC</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              Your personal information is securely encrypted using SSL.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-6 bg-white/20 rounded flex items-center justify-center p-1">
                <img 
                  src="https://www.svgrepo.com/show/510183/secure.svg"
                  alt="Secure"
                  className="w-full h-full filter brightness-0 invert"
                />
              </div>
              <div className="w-8 h-6 bg-white/20 rounded flex items-center justify-center p-1">
                <img 
                  src="https://www.svgrepo.com/show/383769/security-protection-ssl-certificate.svg"
                  alt="SSL Certificate"
                  className="w-full h-full filter brightness-0 invert"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li><a href="/#faq" className="hover:text-primary-foreground transition-colors">FAQs</a></li>
              <li><a href="/contact" className="hover:text-primary-foreground transition-colors">Contact us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li><a href="/legal#terms" className="hover:text-primary-foreground transition-colors">Terms of Use</a></li>
              <li><a href="/legal#privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="/legal#cookies" className="hover:text-primary-foreground transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80 text-sm mb-2">
            © 2025 thailandarrivalcardtourist. All rights reserved.
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