import Categories from "../components/core/Categories";
import MainBanner from "../components/common/MainBanner";
import BestSeller from "../components/core/BestSeller";
import BottomBanner from "../components/core/BottomBanner";

const HomePage = () => {
 
  return (
    <main>
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
    </main>
  );
};

export default HomePage;
