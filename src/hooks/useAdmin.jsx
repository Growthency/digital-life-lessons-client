import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure"; // ১. হুক ইমপোর্ট

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure(); // ২. হুক কল
  const [isAdmin, setIsAdmin] = useState(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email && !loading) {
      // ৩. সাধারণ axios এর বদলে axiosSecure ব্যবহার করা হলো
      axiosSecure
        .get(`/users/admin/${user.email}`)
        .then((res) => {
          console.log("Is Admin Response:", res.data); // কনসোলে চেক করার জন্য
          setIsAdmin(res.data.admin);
          setIsAdminLoading(false);
        })
        .catch((err) => {
          console.error("Admin Check Error:", err);
          setIsAdminLoading(false);
        });
    } else {
      setIsAdminLoading(false); // ইউজার না থাকলে লোডিং বন্ধ
    }
  }, [user?.email, loading, axiosSecure]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
