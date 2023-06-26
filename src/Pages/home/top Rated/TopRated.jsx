import { useState } from "react";
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import SwitchTab from "../../../Components/switchTab/SwitchTab";
import UseFetch from "../../../hooks/useFetch";
import Carousel from "../../../Components/carousel/Carousel";

const TopRated = () => {
  const [endpoint, setEndPoint] = useState("movie");
  const { data, loading } = UseFetch(`/${endpoint}/top_rated`);

  const onTabChange = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTab data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default TopRated;
