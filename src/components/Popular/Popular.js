import React, { useEffect, useState } from "react";

import { POPULAR_URL } from "../../utils/Config";
import Slider from "../Slider/Slider";
import Loading from "../Loading/Loading";

import './Popular.scss'

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(POPULAR_URL)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setPopular(data.results);
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
      <div className="SliderOuter">
        <div id="fade_in">
          <div className="Title">Popular Movies</div>
          <Slider data={popular} />
        </div>
      </div>
    </Loading>
  );
};

export default Popular;