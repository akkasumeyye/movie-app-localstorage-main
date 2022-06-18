import React from "react";
import { useGlobalContext } from '../../context';

import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import './Details.scss'

import Loading from '../Loading/Loading';


const Details = ({ details, loading }) => {
  const { poster_img, backdrop_img, posterNotFound, backdropNotFound } =
    useGlobalContext();

  const {
    backdrop_path,
    poster_path,
    title,
    genres,
    overview,
    release_date,
    runtime,
    budget,
    revenue,
    vote_average,
    production_countries,
    production_companies,
  } = details;

  let poster;
  poster_path ? (poster = poster_img + poster_path) : (poster = posterNotFound);

  let backdrop;
  backdrop_path
    ? (backdrop = backdrop_img + backdrop_path)
    : (backdrop = backdropNotFound);

  const formatter = (data) => {
    return data
      ?.map((el) => {
        return el.name;
      })
      .join(", ");
  };

  const dateFormat = new Date(release_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const moneyConverter = (money) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
    return formatter.format(money);
  };

  const timeConverter = (time) => {
    const hour = Math.floor(time / 60);
    const min = time % 60;
    return `${hour}h ${min}m`;
  };

  const productionFormat = production_companies
    ?.map((production) => {
      return production.name;
    })
    .join(", ");

  return (
    <Loading loading={loading}>
      <div className="Movie" id="fade_in">
        <div className="BackgroundImage">
          <img src={backdrop} alt={title} />
        </div>
        <div className="MoviePoster">
          <img src={poster} alt={title || "movie_title"} />
        </div>
        <div className="MovieInfo">
          <div className="MovieTitle">{title}</div>
          <div className="MovieGenres">{formatter(genres)}</div>
          <div>
            <Rate
              value={vote_average / 2}
              count={5}
              disabled={true}
              allowHalf={true}
            />
          </div>
          <div className="MovieOverview">{overview}</div>
          <div className="MovieMoreInfo">
            <div>
              <h4>Country:</h4>
              <p>{formatter(production_countries)}</p>
            </div>
            <div>
              <h4>Release:</h4>
              <p>{dateFormat}</p>
            </div>
            <div>
              <h4>Runtime:</h4>
              <p>{timeConverter(runtime)}</p>
            </div>
            <div>
              <h4>Budget:</h4>
              <p>{moneyConverter(budget)}</p>
            </div>
            <div>
              <h4>Revenue:</h4>
              <p>{moneyConverter(revenue)}</p>
            </div>
            <div>
              <h4>Production:</h4>
              <p>{productionFormat}</p>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default Details;