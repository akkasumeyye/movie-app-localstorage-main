import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../../context";
import { Link } from "react-router-dom";

import { SEARCH_URL } from "../../utils/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PageTitle from "../../components/PageTitle/PageTitle";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

import './Search.scss'

import Loading from "../../components/Loading/Loading";


const Search = () => {
  const { poster_img, posterNotFound } = useGlobalContext();
  const value = useRef();
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (name) {
      fetch(`${SEARCH_URL}&query=${name}`)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setResults((prevState) => {
            return [...prevState, ...data.results];
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setName(value.current.value);
    value.current.value = "";
    setResults([]);
    console.log(results);
  };

  return (
    <PageTitle title="Search">
      <form className="Form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" ref={value} />
      </form>

      {name ? (
        <Loading loading={loading}>
          <div className="CardsOuter" id="fade_in">
            <div className="CardsTitle">Result: {name}</div>
            <div className="CardsInner">
              {results?.map((movie) => {
                const { id, title, poster_path } = movie;
                return (
                  <div className="Card" key={id}>
                    <Link to={`/movie/${id}`}>
                      <LazyLoadImage
                        effect="blur"
                        src={
                          poster_path
                            ? poster_img + poster_path
                            : posterNotFound
                        }
                        alt={title}
                      />
                    </Link>
                    <FavoriteButton id="fav_btn" element={movie} />
                  </div>
                );
              })}
            </div>
          </div>
        </Loading>
      ) : (
        <div className="EmptyMessage" id="fade_in">No search results</div>
      )}
    </PageTitle>
  );
};

export default Search;