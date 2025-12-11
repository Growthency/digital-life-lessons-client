import axios from "axios";
import useAuth from "../hooks/useAuth";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import usePageTitle from "../hooks/usePageTitle";

const Pricing = () => {
  usePageTitle("Pricing");
  const { user } = useAuth();

  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        "https://digital-life-lessons-server.vercel.app/create-checkout-session",
        {
          email: user.email,
        }
      );
      // স্ট্রাইপ পেমেন্ট পেজে নিয়ে যাবে
      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-20 bg-base-200">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-primary">Upgrade to Premium</h2>
        <p className="text-gray-600 mt-2">Get lifetime access to all wisdom.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
        {/* Free Plan */}
        <div className="card w-full md:w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">Free Plan</h2>
            <p className="text-4xl font-bold">$0</p>
            <div className="divider"></div>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <FaCheckCircle className="text-green-500 mt-1" /> Browse Public
                Lessons
              </li>
              <li className="flex gap-2">
                <FaCheckCircle className="text-green-500 mt-1" /> Create Free
                Lessons
              </li>
              <li className="flex gap-2">
                <FaTimesCircle className="text-red-500 mt-1" /> Access Premium
                Lessons
              </li>
              <li className="flex gap-2">
                <FaTimesCircle className="text-red-500 mt-1" /> Create Premium
                Content
              </li>
            </ul>
            <div className="card-actions justify-center mt-8">
              <button className="btn btn-outline w-full" disabled>
                Current Plan
              </button>
            </div>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="card w-full md:w-96 bg-primary text-primary-content shadow-2xl border-4 border-secondary transform hover:scale-105 transition-transform duration-300">
          <div className="card-body">
            <div className="badge badge-secondary mb-2">MOST POPULAR</div>
            <h2 className="card-title text-2xl">Lifetime Premium</h2>
            <p className="text-4xl font-bold">
              $150 <span className="text-sm font-normal opacity-70">/once</span>
            </p>
            <div className="divider divider-neutral"></div>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <FaCheckCircle className="text-white mt-1" /> Browse All Lessons
              </li>
              <li className="flex gap-2">
                <FaCheckCircle className="text-white mt-1" /> Unlock Premium
                Content
              </li>
              <li className="flex gap-2">
                <FaCheckCircle className="text-white mt-1" /> Create Paid
                Lessons
              </li>
              <li className="flex gap-2">
                <FaCheckCircle className="text-white mt-1" /> Priority Support
              </li>
            </ul>
            <div className="card-actions justify-center mt-8">
              <button
                onClick={handleCheckout}
                className="btn btn-secondary w-full text-lg font-bold"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
