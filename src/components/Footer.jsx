import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link
              to="/"
              className="text-2xl font-bold text-primary gap-0 flex items-center"
            >
              Digital<span className="text-secondary">Life</span>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed">
              A community-driven platform to preserve life lessons, share
              wisdom, and inspire personal growth. Join us to learn from
              real-life experiences.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-white transition-all"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-white transition-all"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-white transition-all"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-white transition-all"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="link link-hover hover:text-secondary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/public-lessons"
                  className="link link-hover hover:text-secondary transition-colors"
                >
                  All Lessons
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="link link-hover hover:text-secondary transition-colors"
                >
                  Membership
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="link link-hover hover:text-secondary transition-colors"
                >
                  Login / Register
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="link link-hover hover:text-secondary transition-colors"
                >
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary uppercase tracking-wider">
              Explore Topics
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/public-lessons?category=Personal Growth"
                  className="link link-hover hover:text-secondary transition-colors"
                >
                  Personal Growth
                </Link>
              </li>
              <li>
                <Link
                  to="/public-lessons?category=Career"
                  className="link link-hover hover:text-secondary transition-colors"
                >
                  Career
                </Link>
              </li>
              <li>
                <Link
                  to="/public-lessons?category=Relationships"
                  className="link link-hover hover:text-secondary transition-colors"
                >
                  Relationships
                </Link>
              </li>
              <li>
                <Link
                  to="/public-lessons?category=Mindset"
                  className="link link-hover hover:text-secondary transition-colors"
                >
                  Mindset
                </Link>
              </li>
              <li>
                <Link
                  to="/public-lessons?category=Mistakes Learned"
                  className="link link-hover hover:text-secondary transition-colors"
                >
                  Mistakes Learned
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary uppercase tracking-wider">
              Weekly Wisdom
            </h3>
            <p className="text-sm opacity-80 mb-4">
              Subscribe to get the best life lessons delivered to your inbox
              weekly. No spam, we promise!
            </p>
            <div className="form-control w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="input input-bordered w-full pr-16"
                />
                <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="divider mt-10"></div>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-70">
          <p>© 2025 Digital Life Lessons. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="link link-hover">
              Privacy Policy
            </a>
            <a href="#" className="link link-hover">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
