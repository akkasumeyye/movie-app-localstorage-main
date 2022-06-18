import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";

import { API_KEY, API_URL } from "../../utils/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../Loading/Loading";

import './Cast.scss'

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);


const Cast = ({ id }) => {
  const { poster_img, posterNotFound } = useGlobalContext();
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setCredits(data.cast);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Loading loading={loading} style={{ height: "50vh" }}>
      <div className="CastWrapper">
        <Swiper
          className="mySwiper"
          navigation={true}
          freeMode={true}
          slidesPerView={3}
          spaceBetween={10}
          breakpoints={{
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
          }}
        >
          {credits?.map((cast) => {
            const { id, profile_path, name, character } = cast;
            return (
              <SwiperSlide key={id}>
                <div className="CardOuter">
                  <div className="Card">
                    <figure>
                      <picture>
                        <Link to={`/person/${id}`}>
                          <LazyLoadImage
                            src={
                              profile_path
                                ? poster_img + profile_path
                                : posterNotFound
                            }
                            alt={name}
                            effect="blur"
                          />
                        </Link>
                      </picture>
                    </figure>
                  </div>
                  <div className="CardDesc">
                    <h3>{name}</h3>
                    <p>{character}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Loading>
  );
};

export default Cast;