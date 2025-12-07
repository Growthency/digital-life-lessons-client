import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import usePageTitle from "../hooks/usePageTitle";

const Register = () => {
  usePageTitle("Register");
  const { createUser, updateUserProfile, googleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // Password Validation
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long!");
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error(
        "Password must contain at least one Uppercase letter!"
      );
    }
    if (!/[a-z]/.test(password)) {
      return toast.error(
        "Password must contain at least one Lowercase letter!"
      );
    }

    // 1. Firebase User Creation
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        // 2. Update Name & Photo (Firebase)
        updateUserProfile(name, photo)
          .then(() => {
            // 3. Save User to MongoDB (FIXED CODE)
            const userInfo = {
              name: name,
              email: email,
              photo: photo, // <--- এই লাইনটা মিসিং ছিল, এখন যোগ করা হলো
              role: "user",
            };

            axios.post("http://localhost:5000/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                toast.success("Registration Successful!");
                navigate("/");
              }
            });
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((error) => {
        toast.error(error.message.replace("Firebase: ", ""));
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        // Save Google User to DB (FIXED CODE)
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL, // <--- গুগল থেকেও ফটো নেওয়া হলো
          role: "user",
        };
        axios.post("http://localhost:5000/users", userInfo).then(() => {
          toast.success("Google Login Successful!");
          navigate("/");
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200 mt-16">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left ml-0 lg:ml-10">
          <h1 className="text-5xl font-bold text-primary">
            Join Digital Life!
          </h1>
          <p className="py-6 max-w-md">
            Create an account to start sharing your life lessons and organizing
            your personal growth journey.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-white">Register</button>
            </div>
            <div className="divider">OR</div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-secondary"
            >
              Continue with Google
            </button>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
