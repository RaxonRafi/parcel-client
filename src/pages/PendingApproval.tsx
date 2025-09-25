import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Clock } from "lucide-react";

export default function PendingApproval() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-orange-100">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-orange-800">
              Account Pending Approval
            </CardTitle>
            <CardDescription className="text-orange-700 text-lg">
              Your delivery personnel account is currently under review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-orange-200">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-orange-800 mb-2">
                  What happens next?
                </h3>
                <p className="text-orange-700 text-sm leading-relaxed">
                  Our admin team is reviewing your application to become a
                  delivery personnel. This process typically takes 1-2 business
                  days. You will receive an email notification once your account
                  has been approved.
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-orange-600 text-sm">
                Thank you for your patience. We'll notify you as soon as your
                account is ready!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
