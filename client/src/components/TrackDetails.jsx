import React from "react";
import { useTracksContext } from "../hooks/useTracksContext";

function TrackDetails({ track }) {
  const { dispatch } = useTracksContext();
  const handleClick = async () => {
    const response = await fetch(`http://localhost:4001/tracks/${track._id}`, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: "DELETE_TRACK",
        payload: json,
      });
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <img src={track.cover} style={{ width: "100px" }} />
      <audio controls>
        <source src={track.audio} type="audio/mpeg" />
      </audio>
      <div>
        <h2>{track.title}</h2>
        <button onClick={handleClick}>delete</button>
      </div>
    </div>
  );
}

export default TrackDetails;
