import React, { useEffect, useState } from "react";

import { API_KEY, API_URL } from "../../utils/Config";

import './Rec.scss'

import Slider from "../Slider/Slider";
import Loading from "../Loading/Loading";

const Rec = ({ id }) => {
  const [rec, setRec] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${API_URL}movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setRec(data.results);
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
      <div className="RecWrapper">
        <div id="fade_in">
          <div className="Title">Recommended Movies</div>
          {rec.length === 0 ? "" : <Slider data={rec} />}
        </div>
      </div>
    </Loading>
  );
};

export default Rec;