import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div className="carousel w-full mt-16">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full h-[600px]">
        <div
          className="hero h-full"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay bg-opacity-70"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-2xl">
              <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white">
                <span className="text-primary">
                  <Typewriter
                    words={[
                      "Share Your Story",
                      "Inspire the World",
                      "Preserve Your Wisdom",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h1>
              <p className="mb-5 text-lg text-gray-200">
                Everyone has a lesson to teach. Record your life's most
                meaningful moments.
              </p>
              <Link
                to="/dashboard/add-lesson"
                className="btn btn-primary text-white border-none shadow-lg"
              >
                Start Writing Now
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button
            onClick={() => handleScroll("slide3")}
            className="btn btn-circle btn-ghost hover:bg-black/40 text-white"
          >
            ❮
          </button>
          <button
            onClick={() => handleScroll("slide2")}
            className="btn btn-circle btn-ghost hover:bg-black/40 text-white"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full h-[600px]">
        <div
          className="hero h-full"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay bg-opacity-70"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-2xl">
              <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white">
                <span className="text-secondary">
                  <Typewriter
                    words={[
                      "Learn from Others",
                      "Grow Together",
                      "Find Your Path",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h1>
              <p className="mb-5 text-lg text-gray-200">
                Discover profound insights from a global community.
              </p>
              <Link
                to="/public-lessons"
                className="btn btn-secondary text-white shadow-lg"
              >
                Explore Lessons
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button
            onClick={() => handleScroll("slide1")}
            className="btn btn-circle btn-ghost hover:bg-black/40 text-white"
          >
            ❮
          </button>
          <button
            onClick={() => handleScroll("slide3")}
            className="btn btn-circle btn-ghost hover:bg-black/40 text-white"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full h-[600px]">
        <div
          className="hero h-full"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1730382624709-81e52dd294d4?q=80&w=2070&auto=format&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay bg-opacity-70"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-2xl">
              <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white">
                <span className="text-accent">
                  <Typewriter
                    words={[
                      "Organize Your Thoughts",
                      "Track Your Growth",
                      "Build a Legacy",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h1>
              <p className="mb-5 text-lg text-gray-200">
                Mark favorites, track your reading, and grow every single day.
              </p>
              <Link
                to="/register"
                className="btn btn-accent text-white shadow-lg"
              >
                Join for Free
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button
            onClick={() => handleScroll("slide2")}
            className="btn btn-circle btn-ghost hover:bg-black/40 text-white"
          >
            ❮
          </button>
          <button
            onClick={() => handleScroll("slide1")}
            className="btn btn-circle btn-ghost hover:bg-black/40 text-white"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
