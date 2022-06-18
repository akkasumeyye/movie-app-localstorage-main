import React from "react";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import PageTitle from "../../components/PageTitle/PageTitle";

import Button from "../../components/Button/Button";
import FavoriteButton  from "../../components/FavoriteButton/FavoriteButton";
import { AiFillHeart } from "react-icons/ai";

import './Favorite.scss'

const Favorite = () => {
  let {
    favoriteArr,
    poster_img,
    posterNotFound,
    handleRemoveFavorite,
    handleClear,
  } = useGlobalContext();

  return (
    <PageTitle title={"Favorite"}>
      <div className="CardsOuter" id="fade_in">
        {favoriteArr?.length === 0 ? (
          <div className="CardsTitle" center>Favorite list is empty</div>
        ) : (
          <>
            <div className="CardsTitle">Favorite Movies</div>
            <div className="CardsInner">
              {favoriteArr?.map((movie) => {
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
                    <FavoriteButton
                      onClick={() => handleRemoveFavorite(movie)}
                      className="fav_btn"
                    >
                      <AiFillHeart />
                    </FavoriteButton>
                  </div>
                );
              })}
            </div>
            <Button handleClick={handleClear}>Clear</Button>
          </>
        )}
      </div>
    </PageTitle>
  );
};

export default Favorite;