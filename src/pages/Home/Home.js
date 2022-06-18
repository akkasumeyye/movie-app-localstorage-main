import React from "react";
import "./Home.scss";

import PageTitle from "../../components/PageTitle/PageTitle";
import Popular from "../../components/Popular/Popular";
import NowPlaying from "../../components/NowPlaying/NowPlaying";
import TopRated from "../../components/TopRated/TopRated";

import { AiFillGithub } from "react-icons/ai";

const Home = () => {
  return (
    <PageTitle title="Home">
      <div className="content">
        <NowPlaying />
        <Popular />
        <TopRated />
        <div className="footer">
          <p>Build on React • 2022</p>
          <a href="https://github.com/oluroyleseyler">
            <AiFillGithub />
          </a>
        </div>
      </div>
    </PageTitle>
  );
};

export default Home;
