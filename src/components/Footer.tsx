import adeccoLogo from "@/assets/adecco-logo-white.png";

const Footer = () => {
  return <footer className="bg-primary py-12 font-quicksand">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4 -ml-3">
              <img src={adeccoLogo} alt="Adecco Logo" className="w-32 h-12 object-contain" />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              Your personal information is securely encrypted using SSL.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-6 bg-white/20 rounded flex items-center justify-center p-1">
                <img src="https://www.svgrepo.com/show/510183/secure.svg" alt="Secure" className="w-full h-full filter brightness-0 invert" />
              </div>
              <div className="w-8 h-6 bg-white/20 rounded flex items-center justify-center p-1">
                <img src="https://www.svgrepo.com/show/383769/security-protection-ssl-certificate.svg" alt="SSL Certificate" className="w-full h-full filter brightness-0 invert" />
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
            © 2025 thaidigitalarrival.com All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-xs">thaidigitalarrival.com It is an International Migration Agency registered with <a target="_blank" href="https://portal.mara.gov.au/search-the-register-of-migration-agents/register-of-migration-agent-details/?ContactID=09441285-3f81-e411-9403-005056ab0eca" className="underline hover:text-primary-foreground/80">MARA</a> in Australia (Migration Agents Registration Authority). <a href="https://portal.mara.gov.au/search-the-register-of-migration-agents/register-of-migration-agent-details/?ContactID=09441285-3f81-e411-9403-005056ab0eca" target="_blank" className="underline hover:text-primary-foreground/80">MARA</a> registration number: 1568772.
        </p>
        </div>
      </div>
    </footer>;
};
export default Footer;