import React, { useEffect, useState } from "react";

import { API_KEY, API_URL } from "../../utils/Config";
import { LazyLoadImage } from "react-lazy-load-image-component";

import './Videos.scss'

import Loading from "../../components/Loading/Loading";
import Modal from "../../components/Modals/Modals";

import { FaPlay } from "react-icons/fa";

const Videos = ({ id }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [video_path, setVideoPath] = useState("");

  const openModal = (video_path) => {
    setModalIsOpen(true);
    setVideoPath(video_path);
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "unset";
    }
  }, [modalIsOpen]);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setVideos(data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleClickAway = (e) => {
    if (e.target.id !== "video") {
      setModalIsOpen(false);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Loading loading={loading} style={{ height: "50vh" }}>
      <div className="MediaOuter">
        <div className="MediaInner">
          {videos?.map((video) => {
            const { id, key, name, type } = video;
            return (
              <div className="MediaItem" key={id}>
                <LazyLoadImage
                  src={`https://i3.ytimg.com/vi/${key}/maxresdefault.jpg`}
                  alt={name}
                  effect="blur"
                />
                <div className="InfoWrapper">
                  <FaPlay onClick={() => openModal(key)} />
                  <div className="Info">
                    <h4>{name}</h4>
                    <p>{type}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {modalIsOpen && (
            <Modal
              handleClickAway={handleClickAway}
              handleClick={handleCloseModal}
            >
              <iframe
                title="frame"
                src={`https://www.youtube.com/embed/${video_path}?autoplay=1&mute=1`}
                frameBorder="0"
                allowFullScreen
                id="video"
              />
            </Modal>
          )}
        </div>
      </div>
    </Loading>
  );
};

export default Videos;