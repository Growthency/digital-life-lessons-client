import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");

  useEffect(() => {
    if (email) {
      // সার্ভারকে বলছি ইউজারকে প্রিমিয়াম বানাতে
      axios
        .patch(`http://localhost:5000/users/make-premium/${email}`)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success("Congratulations! You are now a Premium Member.");
          }
          // ৫ সেকেন্ড পর ড্যাশবোর্ডে পাঠিয়ে দেব
          setTimeout(() => {
            navigate("/dashboard");
            window.location.reload(); // রিলোড দিচ্ছি যাতে স্ট্যাটাস আপডেট হয়
          }, 3000);
        })
        .catch((err) => console.error(err));
    }
  }, [email, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-4">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-4xl font-bold text-success mb-2">
        Payment Successful!
      </h1>
      <p className="text-xl">Welcome to the Premium Club.</p>
      <p className="text-gray-500 mt-4">Redirecting you to dashboard...</p>
      <span className="loading loading-bars loading-lg mt-6 text-primary"></span>
    </div>
  );
};

export default PaymentSuccess;
