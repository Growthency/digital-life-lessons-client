import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure"; 

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure(); 
  const [isAdmin, setIsAdmin] = useState(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email && !loading) {
      
      axiosSecure
        .get(`/users/admin/${user.email}`)
        .then((res) => {
          console.log("Is Admin Response:", res.data); 
          setIsAdmin(res.data.admin);
          setIsAdminLoading(false);
        })
        .catch((err) => {
          console.error("Admin Check Error:", err);
          setIsAdminLoading(false);
        });
    } else {
      setIsAdminLoading(false); 
    }
  }, [user?.email, loading, axiosSecure]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
