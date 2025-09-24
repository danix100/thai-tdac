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
                  <p>Welcome to the Thailand Travell Declaration website ("Site"). These Terms and Conditions of Use ("T&C") outline the rules and regulations for using our Site. By accessing or using our Site, you agree to these T&C. If you do not agree, please refrain from using the Site.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">2. Usage Guidelines</h3>
                  <p className="mb-2"><strong>2.1.</strong> The information presented on the Site is for general informational purposes only and should not be considered as legal, financial, or professional advice.</p>
                  <p><strong>2.2.</strong> You must be of legal age according to the laws of your jurisdiction to use our Site.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">3. Intellectual Property Rights</h3>
                  <p className="mb-2"><strong>3.1.</strong> All materials on the Site, including text, graphics, images, videos, logos, and trademarks, are protected by copyright and other intellectual property laws.</p>
                  <p><strong>3.2.</strong> You may not copy, modify, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from the Site without prior written consent from us.</p>
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
                  <p><strong>6.2.</strong> We are not liable for any damages resulting from your use of the Site, including but not limited to direct, indirect, incidental, punitive, and consequential damages.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">7. Modifications to Terms</h3>
                  <p><strong>7.1.</strong> We may revise these T&C from time to time. Changes will be posted on this page and will take effect immediately. We encourage you to review these T&C regularly.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">8. Contact Information</h3>
                  <p><strong>8.1.</strong> If you have any questions or concerns about these T&C, please reach out to us via the contact form on our website.</p>
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
                  <p>This Privacy Policy describes how Thailand Travell Declaration LLC ("we", "our" or "us") collects, uses, and shares the personal information we collect from users ("you" or "user") of Thailand Travell Declaration (the "Service"). By using the Service, you agree to the privacy practices described in this Policy.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">2. Information We Collect</h3>
                  <p className="mb-4">We may collect personal information that you voluntarily provide when interacting with the Service. This information may include, but is not limited to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Contact information, such as name, email address, and phone number.</li>
                    <li>Registration information, such as username and password.</li>
                    <li>Payment information, such as credit card details or billing information.</li>
                    <li>Demographic information, such as age, gender, and location.</li>
                    <li>Service usage information, such as browsing data and activity on the site.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">3. Use of Information</h3>
                  <p className="mb-4">We use the information collected for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide and maintain the Service.</li>
                    <li>Personalize and enhance your experience with the Service.</li>
                    <li>Process transactions and send information related to your transactions.</li>
                    <li>Send promotional emails and communications related to the Service.</li>
                    <li>Analyze the use of the Service and improve our products and services.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">4. Sharing of Information</h3>
                  <p className="mb-4">We may share your personal information in the following situations:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>With third-party service providers who help us operate the Service.</li>
                    <li>To comply with legal obligations and applicable regulations.</li>
                    <li>Process transactions and send information related to your transactions.</li>
                    <li>In the event of a merger, acquisition, or sale of assets, where user information may be transferred as part of such a transaction.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">5. Cookies and Similar Technologies</h3>
                  <p>We use cookies and similar technologies to collect information about your interaction with the Service. You can set your browser to reject all cookies or to indicate when a cookie is being sent. However, please note that some parts of the Service may not function properly if you disable cookies.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">6. Security</h3>
                  <p>We are committed to protecting the security of your personal information. Please note, however, that no method of transmission over the Internet or method of electronic storage is completely secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">7. Your Rights</h3>
                  <p>You can exercise your rights regarding your personal information, including access, rectification, deletion, and restriction of processing. To do so, please contact us through the web form.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">8. Changes to this Privacy Policy</h3>
                  <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                  <p className="mt-4">If you have any questions about this Privacy Policy, please contact us through the web form.</p>
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
                  <p>Welcome to Thailand Travell Declaration LLC. We use cookies and similar technologies to enhance your experience on our site. By accessing and using our site, you consent to the use of cookies as described in this Cookie Policy.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">2. What are Cookies?</h3>
                  <p>Cookies are small text files that are stored on your device (computer, smartphone, tablet, etc.) when you visit our website. These cookies enable our site to recognize your device and gather information about your interactions with our content.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">3. Types of Cookies We Use</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Essential Cookies:</strong> These cookies are crucial for the basic functioning of the website and allow you to navigate and use its features.</li>
                    <li><strong>Performance Cookies:</strong> We utilize performance cookies to analyze how visitors use our site and to monitor its performance. These cookies help us continually enhance the user experience.</li>
                    <li><strong>Functionality Cookies:</strong> These cookies enable the site to remember your choices (such as your username, language, or region) and offer enhanced and personalized features.</li>
                    <li><strong>Advertising and Third Party Cookies:</strong> We may use third-party cookies to provide you with personalized and relevant advertising. These cookies also track ad interactions and measure their effectiveness.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">4. Control of Cookies</h3>
                  <p>You can manage your cookie preferences through your browser settings. Most browsers allow you to decline or accept cookies. Please note that disabling cookies may impact some functionalities and features of our website.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">5. Links to Third Parties</h3>
                  <p>Our site may include links to third-party websites. We are not responsible for the privacy practices or the content of these sites. We recommend reviewing the privacy and cookie policies of any third-party sites you visit.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">6. Changes in the Cookie Policy</h3>
                  <p>We reserve the right to modify this Cookie Policy at any time. Any changes will become effective upon posting on our website.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">7. Contact</h3>
                  <p>If you have any questions or concerns about our Cookie Policy, please contact us through the web form.</p>
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