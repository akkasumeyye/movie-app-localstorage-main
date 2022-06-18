import React from 'react';
import {Puff} from "react-loader-spinner";
import './LoadMoreLoading.scss'

const LoadMoreLoading = () => {
  return (
    <div className="LoadMoreWrapper">
      <Puff type="Puff" color="#1976D2" height={50} width={50}/>
    </div>
  );
};

export default LoadMoreLoading;