import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";
const Legal = () => {
  return <div className="min-h-screen bg-background">
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
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    1. Acceptance of Terms
                  </h3>
                  <p>
                    Welcome to <strong>thaidigitalarrival.com</strong> ("Site").
                    These Terms of Use (“Agreement”) explain the rules for
                    accessing and using our Site. By using the Site, you confirm
                    your acceptance of these terms. If you do not agree, please
                    stop using the Site.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    2. Usage Guidelines
                  </h3>
                  <p className="mb-2">
                    <strong>2.1.</strong> The content on this Site is provided
                    for general information only and should not be taken as
                    professional, legal, or financial advice.
                  </p>
                  <p>
                    <strong>2.2.</strong> You must meet the legal age
                    requirements of your country or region to access or use this
                    Site.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    3. Intellectual Property Rights
                  </h3>
                  <p className="mb-2">
                    <strong>3.1.</strong> All material on the Site, including
                    images, text, graphics, designs, videos, trademarks, and
                    logos, is legally protected by copyright and intellectual
                    property laws.
                  </p>
                  <p>
                    <strong>3.2.</strong> You may not copy, share, adapt, or
                    resell any material from this Site without prior written
                    permission from thaidigitalarrival.com.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    4. Privacy and Data Security
                  </h3>
                  <p>
                    We respect your privacy. Please read our Privacy Policy to
                    understand how we handle and protect your personal data.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    5. External Links
                  </h3>
                  <p>
                    Our Site may include links to third-party websites. We are
                    not responsible for their content, policies, or practices.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    6. Limitation of Liability
                  </h3>
                  <p className="mb-2">
                    <strong>6.1.</strong> You use this Site at your own risk. We
                    do not guarantee that the information provided is always
                    accurate, complete, or up to date.
                  </p>
                  <p>
                    <strong>6.2.</strong> We are not responsible for any damages
                    that result from your use of this Site, including direct,
                    indirect, or incidental losses.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    7. Modifications to Terms
                  </h3>
                  <p>
                    <strong>7.1.</strong> These Terms may be updated from time
                    to time. Any changes will be posted here and will take
                    effect immediately. We encourage you to review them
                    regularly.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    8. Contact Information
                  </h3>
                  <p>
                    <strong>8.1.</strong> For questions about these Terms,
                    please reach us through the contact form on
                    thaidigitalarrival.com.
                  </p>
                </div>

                {/* New Disclaimer */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    9. Disclaimer
                  </h3>
                  <p>Adecco New Petchburi Co.,Ltd. is a third-party service provider and are not affiliated with the Royal Thai Government or the Thai Immigration Bureau. Our role is to provide consultation, preparation, and application support services for Long-Term Resident (LTR) Visa applicants. We are a certified/authorized visa preparer, recognized to assist applicants with the visa process, but we do not represent the government.




                </p>
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
                  <p>This Privacy Policy explains how <strong>thaidigitalarrival.com</strong> ("we", "our", "us") collects, uses, and shares personal data from users ("you") of thaidigitalarrival.com (the "Service"). By using the Service, you agree to the practices described here.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">2. Information We Collect</h3>
                  <p className="mb-4">We may collect information you provide directly. This may include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Contact details: name, email address, phone number</li>
                    <li>Account details: username and password</li>
                    <li>Billing information: payment method and related data</li>
                    <li>Demographics: age, gender, location</li>
                    <li>Usage information: browsing activity on our Site</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">3. Use of Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To operate and maintain the Service</li>
                    <li>To personalize your experience on the Site</li>
                    <li>To process payments and send related updates</li>
                    <li>To send promotional or marketing messages</li>
                    <li>To analyze activity and improve services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">4. Sharing of Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>With trusted third-party service providers</li>
                    <li>As required by law or regulation</li>
                    <li>To process transactions</li>
                    <li>During business transfers such as mergers or sales</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">5. Cookies & Similar Technologies</h3>
                  <p>We use cookies to improve your browsing experience. You may disable them in your browser, though this may affect functionality.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">6. Security</h3>
                  <p>We take reasonable measures to protect your information, but no system is completely secure when transmitting data online.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">7. Your Rights</h3>
                  <p>You may request access, updates, or deletion of your personal data by contacting us via the web form.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">8. Policy Updates</h3>
                  <p>This Privacy Policy may change from time to time. Updates will be posted here. Please contact us if you have any questions.</p>
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
                  <p>At <strong>thaidigitalarrival.com</strong>, we use cookies to make your browsing experience smoother and more personalized. By using our Site, you agree to our use of cookies.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">2. What are Cookies?</h3>
                  <p>Cookies are small text files stored on your device. They help us recognize your browser and track how you interact with our Site.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">3. Types of Cookies We Use</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Essential:</strong> Required for the Site to function properly.</li>
                    <li><strong>Performance:</strong> Help us measure site usage and improve performance.</li>
                    <li><strong>Functionality:</strong> Store your preferences and settings.</li>
                    <li><strong>Advertising:</strong> Used by partners to provide relevant ads.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">4. Managing Cookies</h3>
                  <p>You can control or disable cookies in your browser settings. Some features may not work if cookies are disabled.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">5. Third-Party Links</h3>
                  <p>We are not responsible for how external websites use cookies. Please check their policies separately.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">6. Policy Updates</h3>
                  <p>We may update this Cookie Policy at any time. Changes become effective once published on this page.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">7. Contact</h3>
                  <p>If you have questions about our Cookie Policy, please reach out through our contact form.</p>
                </div>

                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium text-center">
                    Your personal data is encrypted and protected with SSL security.
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
    </div>;
};
export default Legal;