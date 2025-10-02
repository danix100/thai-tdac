import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 text-lg">Your Australia Visa application has been submitted successfully</p>
          </div>

          {/* Confirmation Details */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-green-800 mb-2">
                    Application Reference Number
                  </p>
                  <p className="text-2xl font-mono text-green-700">
                    TH-2024-{Math.random().toString(36).substr(2, 8).toUpperCase()}
                  </p>
                </div>
                
                <div className="text-left space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Application Type:</span>
                    <span className="font-medium">Tourist Visa</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Processing Time:</span>
                    <span className="font-medium">3-5 Business Days</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-medium">$55.00</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">Credit Card ****3456</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="bg-blue-50 p-6 rounded-lg mb-8 text-left">
            <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5" />
                <span>You'll receive a confirmation email with your application details</span>
              </li>
              <li className="flex items-start gap-2">
                <Download className="h-4 w-4 mt-0.5" />
                <span>Download and print your application receipt</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5" />
                <span>We'll notify you once your visa is processed</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>
            <Button onClick={() => navigate("/")} className="bg-red-600 hover:bg-red-700 text-white">
              Return to Home
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default PaymentSuccess;