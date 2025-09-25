import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12 font-quicksand">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-soft p-6 md:p-12">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Legal Information</h1>
              <p className="text-lg text-slate-600">Terms of Use, Privacy Policy, and Cookie Policy</p>
            </div>

            {/* Terms of Use Section */}
            <section id="terms" className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 pb-4 border-b border-gray-200">
                Terms of Use
              </h2>
              
              <div className="space-y-6 text-slate-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">1. Acceptance of Terms</h3>
                  <p>Welcome to <strong>thaidigitalarrival.com</strong> ("Site"). These Terms and Conditions of Use ("T&C") outline the rules and regulations for using our Site. By accessing or using our Site, you agree to these T&C. If you do not agree, please refrain from using the Site.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">2. Usage Guidelines</h3>
                  <p className="mb-2"><strong>2.1.</strong> The information on the Site is for general informational purposes only and should not be considered as legal, financial, or professional advice.</p>
                  <p><strong>2.2.</strong> You must be of legal age in your jurisdiction to use the Site.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">3. Intellectual Property Rights</h3>
                  <p className="mb-2"><strong>3.1.</strong> All materials on the Site, including text, graphics, images, videos, logos, and trademarks, are protected by copyright and other intellectual property laws.</p>
                  <p><strong>3.2.</strong> You may not copy, modify, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from the Site without prior written consent from thaidigitalarrival.com.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">4. Privacy and Data Security</h3>
                  <p>We value your privacy. Please review our Privacy Policy to understand how we handle your personal information.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">5. External Links</h3>
                  <p>Our Site may contain links to external websites. We do not control the content or privacy practices of these sites and are not responsible for them.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">6. Limitation of Liability</h3>
                  <p className="mb-2"><strong>6.1.</strong> Your use of the Site is at your own risk. We do not guarantee the accuracy, completeness, or usefulness of the information provided on the Site.</p>
                  <p><strong>6.2.</strong> We are not liable for any damages resulting from your use of the Site, including direct, indirect, incidental, punitive, or consequential damages.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">7. Modifications to Terms</h3>
                  <p><strong>7.1.</strong> We may revise these T&C from time to time. Changes will be posted on this page and take effect immediately. We encourage you to review these T&C regularly.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">8. Contact Information</h3>
                  <p><strong>8.1.</strong> For questions or concerns about these T&C, please contact us via the web form on thaidigitalarrival.com.</p>
                </div>
              </div>
            </section>

            {/* Privacy Policy Section */}
            <section id="privacy" className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 pb-4 border-b border-gray-200">
                Privacy Policy
              </h2>
              
              <div className="space-y-6 text-slate-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">1. General Information</h3>
                  <p>This Privacy Policy describes how <strong>thaidigitalarrival.com</strong> ("we", "our", "us") collects, uses, and shares personal information from users ("you") of thaidigitalarrival.com (the "Service"). By using the Service, you agree to this Policy.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">2. Information We Collect</h3>
                  <p className="mb-4">We may collect personal information you provide voluntarily. This may include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Contact info: name, email, phone</li>
                    <li>Account details: username, password</li>
                    <li>Payment info: card or billing data</li>
                    <li>Demographics: age, gender, location</li>
                    <li>Usage data: browsing history and activity on the site</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">3. Use of Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide and maintain the Service</li>
                    <li>Personalize and enhance user experience</li>
                    <li>Process transactions and send related info</li>
                    <li>Send promotional communications</li>
                    <li>Analyze usage and improve products/services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">4. Sharing of Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>With third-party service providers supporting the Service</li>
                    <li>To comply with legal obligations</li>
                    <li>For transaction processing</li>
                    <li>During mergers, acquisitions, or sales of assets</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">5. Cookies & Similar Technologies</h3>
                  <p>We use cookies to improve your experience. You can disable them in your browser, but some features may not work.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">6. Security</h3>
                  <p>We use commercially reasonable measures to protect your personal info, but cannot guarantee absolute security over the internet.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">7. Your Rights</h3>
                  <p>You may access, correct, delete, or restrict processing of your personal information by contacting us through the web form.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">8. Policy Updates</h3>
                  <p>We may update this Policy occasionally. Updates will be posted here. Contact us via web form for questions.</p>
                </div>
              </div>
            </section>

            {/* Cookie Policy Section */}
            <section id="cookies" className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 pb-4 border-b border-gray-200">
                Cookie Policy
              </h2>
              
              <div className="space-y-6 text-slate-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">1. Use of Cookies</h3>
                  <p>At <strong>thaidigitalarrival.com</strong>, we use cookies to enhance your experience. By using our site, you consent to cookies.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">2. What are Cookies?</h3>
                  <p>Cookies are small files stored on your device to recognize it and collect information about interactions with our content.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">3. Types of Cookies We Use</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Essential:</strong> Required for basic functionality.</li>
                    <li><strong>Performance:</strong> Analyze site usage and performance.</li>
                    <li><strong>Functionality:</strong> Remember user preferences.</li>
                    <li><strong>Advertising:</strong> Third-party cookies for relevant ads.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">4. Managing Cookies</h3>
                  <p>Control cookie preferences via your browser. Disabling cookies may affect website functionality.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">5. Third-Party Links</h3>
                  <p>We are not responsible for external sites linked from our platform. Review their privacy policies separately.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">6. Policy Updates</h3>
                  <p>We may modify this Cookie Policy at any time. Updates take effect once posted.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">7. Contact</h3>
                  <p>For questions about our Cookie Policy, contact us via web form.</p>
                </div>

                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium text-center">
                    Your personal information is securely encrypted using SSL.
                  </p>
                  <div className="text-center mt-2">
                    <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-bold rounded">
                      SSL
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;
