import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { useParams } from "react-router-dom";

import { API_KEY, API_URL } from "../../utils/Config";
import Loading from "../../components/Loading/Loading";
import PersonMovie from "../../components/PersonMovie/PersonMovie";
import PageTitle from "../../components/PageTitle/PageTitle";

import './Person.scss'

function Person() {
  const { id } = useParams();
  const { poster_img } = useGlobalContext();
  const [person, setPerson] = useState({});
  const [readMore, setReadMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const { profile_path, name, birthday, deathday, place_of_birth, biography } =
    person;

  const dateFormat = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetch(`${API_URL}person/${id}?api_key=${API_KEY}&language=en-US`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setPerson(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <PageTitle title={name}>
      <Loading loading={loading}>
        <div className="PersonOuter">
          <div className="PersonInner">
            <div className="PersonImage">
              <img src={poster_img + profile_path} alt="#" />
            </div>
            <div className="PersonInfo">
              <h1>{name}</h1>
              <div>
                {dateFormat(birthday)} &#8212;
                {deathday === null ? "" : dateFormat(deathday)}
              </div>
              <div>{place_of_birth}</div>
              <div>
                {biography?.length <= 400 ? (
                  biography
                ) : (
                  <>
                    <div className="PersonBiography">
                      {readMore
                        ? biography
                        : `${biography?.substring(0, 400)}...`}
                    </div>
                    <div className="ReadMore" onClick={() => setReadMore(!readMore)}>
                      {readMore ? "Read Less" : "Read More"}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <PersonMovie />
        </div>
      </Loading>
    </PageTitle>
  );
}

export default Person;