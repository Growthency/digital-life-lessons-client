import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import usePageTitle from "../hooks/usePageTitle";

const PaymentFail = () => {
  usePageTitle("Payment Failed");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <FaTimesCircle className="text-6xl text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-error mb-2">Payment Canceled!</h1>
      <p className="text-xl text-gray-600 mb-8">
        Something went wrong or you canceled the process.
      </p>
      <div className="flex gap-4">
        <Link to="/pricing" className="btn btn-primary">
          Try Again
        </Link>
        <Link to="/dashboard" className="btn btn-outline">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentFail;
