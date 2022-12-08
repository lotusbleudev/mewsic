import { useState, useRef } from "react";
import { useTracksContext } from "../hooks/useTracksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "./TrackDetails.css";
function TrackDetails({ track }) {
  const { user } = useAuthContext();
  const { dispatch } = useTracksContext();
  const [duration, setDuration] = useState(0);
  const audio = useRef(null);

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("http://localhost:4001/tracks/" + track._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
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
    <article className="track">
      <img src={track.cover} style={{ width: "50px" }} />
      <div>
        <h4>{track.title}</h4>
        <div className="flex" style={{ justifyContent: "flex-start" }}>
          <p>{track.artist}</p>
          {track.album && (
            <div className="flex">
              <span>•</span>
              <p>{track.album}</p>
            </div>
          )}
        </div>
      </div>
      <audio
        controls
        ref={audio}
        onCanPlay={() => {
          const d = new Date(audio.current.duration * 1000)
            .toISOString()
            .substring(14, 19);

          setDuration(d);
        }}
      >
        <source src={track.audio} type="audio/mpeg" />
      </audio>
      <div>
        <p>{duration}</p>
        <span className="material-symbols-outlined"> play_circle </span>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </div>
    </article>
  );
}

export default TrackDetails;
