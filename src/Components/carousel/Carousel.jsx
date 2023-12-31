import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useRef } from "react";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadingImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import Genres from '../genres/Genres'

import "./carousel.scss";
import CircleRating from "../circleRating/CircleRating";

const Carousel = ({ data, laoding }) => {

  const carouselContainer = useRef()
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

    const navigation = (dir) => {
      const container = carouselContainer.current;

      const scrollAmount =
        dir === "left"
          ? container.scrollLeft - (container.offsetWidth + 20)
          : container.scrollLeft + (container.offsetWidth + 20);

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    };


  const skItems = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          onClick={() => navigation("left")}
          className="carouselLeftNav arrow"
        />
        <BsFillArrowRightCircleFill
          onClick={() => navigation("right")}
          className="carouselRighttNav arrow"
        />
        {!laoding ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div key={item.id} className="carouselItem"
                onClick = {() => navigate(`{/${item.media_type}/${item.id}}`)} >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date).format("MMM D , YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItems()}
            {skItems()}
            {skItems()}
            {skItems()}
            {skItems()}
            {skItems()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
