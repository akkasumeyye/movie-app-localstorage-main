import React, { useEffect, useState } from "react";

import { TOP_RATED_URL } from "../../utils/Config";

import Slider from "../Slider/Slider";
import Loading from "../Loading/Loading";

const TopRated = () => {
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(TOP_RATED_URL)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setTopRated(data.results);
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
          <div className="Title">Top Rated Movies</div>
          <Slider data={topRated} />
        </div>
      </div>
    </Loading>
  );
};

export default TopRated;