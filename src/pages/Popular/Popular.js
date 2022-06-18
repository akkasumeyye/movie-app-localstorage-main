import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

import { POPULAR_URL } from "../../utils/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PageTitle from "../../components/PageTitle/PageTitle";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import LoadMoreLoading from "../../components/LoadMoreLoading/LoadMoreLoading";

import './Popular.scss'

const Popular = () => {
  const { poster_img, posterNotFound } = useGlobalContext();
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [isFetching, setFetching] = useState(true);

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (scrollHeight - (scrollTop + innerHeight) < 500) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (isFetching) {
      fetch(POPULAR_URL + page)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setPopular((prevState) => {
            return [...prevState, ...data.results];
          });
          setTotalPage(data.total_pages);
          setPage((page) => page + 1);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [isFetching , page]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <PageTitle title="Popular">
      <div className="CardsOuter" id="fade_in">
        <div className="CardsTitle">Popular Movies</div>
        <div className="CardsInner">
          {popular?.map((movie) => {
            const { id, title, poster_path } = movie;
            return (
              <div className="Card" key={id}>
                <Link to={`/movie/${id}`}>
                  <figure>
                    <picture>
                      <LazyLoadImage
                        effect="blur"
                        src={
                          poster_path
                            ? poster_img + poster_path
                            : posterNotFound
                        }
                        alt={title}
                      />
                    </picture>
                  </figure>
                </Link>
                <FavoriteButton id = "fav_btn" element={movie} />
              </div>
            );
          })}
        </div>
        {isFetching || page === totalPage ? <LoadMoreLoading /> : null}
      </div>
    </PageTitle>
  );
};

export default Popular;