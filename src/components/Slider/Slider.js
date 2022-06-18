import React from "react";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";

import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { LazyLoadImage } from "react-lazy-load-image-component";

import './Slider.scss'

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);

const breakpoints = {
  640: {
    slidesPerView: 3,
  },
  768: {
    slidesPerView: 4,
  },
  1024: {
    slidesPerView: 5,
  },
  1440: {
    slidesPerView: 6,
  },
  1700: {
    slidesPerView: 7,
  },
};


function Slider({ data }) {
  const { poster_img, posterNotFound } = useGlobalContext();

  return (
    <Swiper
      className="mySwiper"
      navigation={true}
      freeMode={true}
      slidesPerView={3}
      spaceBetween={10}
      breakpoints={breakpoints}
    >
      {data?.map((movie) => {
        const { id, title, poster_path } = movie;
        return (
          <SwiperSlide key={id}>
            <div className='SliderCard'>
              <Link to={`/movie/${id}`}>
                <figure>
                  <picture>
                    <LazyLoadImage
                      effect="blur"
                      src={
                        poster_path ? poster_img + poster_path : posterNotFound
                      }
                      alt={title}
                    />
                  </picture>
                </figure>
              </Link>
              <FavoriteButton element={movie} />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Slider;