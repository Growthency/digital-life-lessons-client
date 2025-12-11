import Hero from "../components/Hero";
import WhyLearn from "../components/WhyLearn";
import Stats from "../components/Stats";
import FeaturedLessons from "../components/FeaturedLessons"; 
import TopContributors from "../components/TopContributors"; 
import MostPopular from "../components/MostPopular"; 
import usePageTitle from "../hooks/usePageTitle";

const Home = () => {
  usePageTitle("Home");
  return (
    <div>
      <Hero></Hero>

      <FeaturedLessons></FeaturedLessons>

      <TopContributors></TopContributors>

      <WhyLearn></WhyLearn>

      <MostPopular></MostPopular>
      <Stats></Stats>
    </div>
  );
};

export default Home;
