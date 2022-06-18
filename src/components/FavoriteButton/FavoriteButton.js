import React from "react";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useGlobalContext } from "../../context";

import './FavoriteButton.scss'

export default function FavoriteButton({ element }) {
  const { handleToggleFavorite, favoriteArr } = useGlobalContext();
  return (
    <div className="FavButton" 
    onClick={() => handleToggleFavorite(element)}
    id="fav_btn"
    >
      {favoriteArr.find((item) => item.id === element) ? (
        <AiFillHeart />
        ) : (
          <AiOutlineHeart />
          )}
    </div>
  );
}