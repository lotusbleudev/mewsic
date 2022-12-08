import { useState } from "react";
import { useTracksContext } from "../hooks/useTracksContext";
import { useAuthContext } from "../hooks/useAuthContext";

function NewTrack() {
  const { dispatch } = useTracksContext();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState();
  const [data, setData] = useState({
    title: "",
    artist: "",
    album: "",
    cover: "",
    audio: "",
  });

  const handleChange = (name) => (e) => {
    let value = "";
    if (name === "cover" || name === "audio") {
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("artist", data.artist);
    formData.append("album", data.album);
    formData.append("cover", data.cover);
    formData.append("audio", data.audio);

    const res = await fetch("http://localhost:4001/tracks", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (res.ok) {
      setData({
        title: "",
        artist: data.artist,
        album: data.album,
        cover: data.cover,
        audio: "",
      });
      setError(null);
      setEmptyFields([]);
      dispatch({
        type: "NEW_TRACK",
        payload: json,
      });
    }
  };

  return (
    <article
      className="container new"
      style={{
        backgroundColor: "#0d1117",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <h2>New Track</h2>
      <div
        className="flex"
        style={{ justifyContent: "flex-start", gap: "40px" }}
      >
        <div className="flex-column">
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="enter title"
              name="title"
              value={data.title}
              onChange={handleChange("title")}
              className={
                emptyFields?.includes("title") ? "input error" : "input"
              }
            />
          </div>
          <div>
            <label>Artist</label>
            <input
              type="text"
              placeholder="enter artist"
              name="artist"
              value={data.artist}
              onChange={handleChange("artist")}
              className={
                emptyFields?.includes("artist") ? "input error" : "input"
              }
            />
          </div>
          <div>
            <label>Album</label>
            <input
              type="text"
              placeholder="enter album"
              name="album"
              value={data.album}
              onChange={handleChange("album")}
              className={
                emptyFields?.includes("album") ? "input error" : "input"
              }
            />
          </div>
        </div>
        <div className="flex-column">
          <div>
            <label>Cover</label>
            <input
              type="file"
              accept="image/*"
              name="cover"
              onChange={handleChange("cover")}
              style={{ paddingTop: "9px" }}
              className={emptyFields?.includes("cover") ? "error" : "input"}
            />
          </div>
          <div>
            <label>Audio</label>
            <input
              type="file"
              accept="audio/*"
              name="audio"
              onChange={handleChange("audio")}
              className={emptyFields?.includes("audio") ? "error" : "input"}
              style={{ paddingTop: "9px" }}
            />
          </div>
          <div className="btn" onClick={handleSubmit}>
            Submit
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      </div>
    </article>
  );
}

export default NewTrack;
