import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";

import {NOW_PLAYING_URL} from "../../utils/Config"
import { LazyLoadImage } from "react-lazy-load-image-component";

import './NowPlaying.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";

import Loading from '../Loading/Loading';

SwiperCore.use([Autoplay, Pagination]);


const NowPlaying = () => {

const { backdrop_img, backdropNotFound } = useGlobalContext();

  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(NOW_PLAYING_URL)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setNowPlaying(data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Loading loading={loading} style={{ height: "50vh" }}>
      <div className='movieWrapper' id="fade_in">
        <Swiper
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
          }}
        >
          {nowPlaying?.map((movie) => {
            const { id, title, overview, backdrop_path } = movie;
            return (
              <SwiperSlide>
                <div className="movieItem" key={id}>
                  <LazyLoadImage
                    effect="blur"
                    src={
                      backdrop_path
                        ? backdrop_img + backdrop_path
                        : backdropNotFound
                    }
                    alt={title || "movie"}
                  />
                </div>
                <div clasName='MovieInfoOuter'>
                  <div className='MovieInfoInner'>
                    <div className='MovieTitle'>
                      <Link to={`/movie/${id}`}>{title}</Link>
                    </div>
                    {overview ? (
                      <div className='MovieOverview'>
                        {`${overview.substring(0, 200)}...`}
                      </div>
                    ) : null}
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

export default NowPlaying;