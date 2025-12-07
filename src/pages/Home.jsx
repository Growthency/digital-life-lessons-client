import Hero from "../components/Hero";
import WhyLearn from "../components/WhyLearn";
import Stats from "../components/Stats";
import FeaturedLessons from "../components/FeaturedLessons"; // ইমপোর্ট করলাম
import TopContributors from "../components/TopContributors"; // নতুন
import MostPopular from "../components/MostPopular"; // নতুন
import usePageTitle from "../hooks/usePageTitle";

const Home = () => {
  usePageTitle("Home");
  return (
    <div>
      <Hero></Hero>

      {/* Featured Section */}
      <FeaturedLessons></FeaturedLessons>

      {/* Extra Section 1: Dynamic Top Contributors */}
      <TopContributors></TopContributors>

      {/* Static Section */}
      <WhyLearn></WhyLearn>

      {/* Extra Section 2: Dynamic Most Popular */}
      <MostPopular></MostPopular>

      {/* Static Stats */}
      <Stats></Stats>
    </div>
  );
};

export default Home;
