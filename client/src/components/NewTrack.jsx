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
      setData({ title: "", cover: data.cover, audio: "" });
      setError(null);
      setEmptyFields([]);
      dispatch({
        type: "NEW_TRACK",
        payload: json,
      });
    }
  };

  return (
    <div>
      <h2>New Track</h2>
      <p>Title</p>
      <input
        type="text"
        placeholder="enter title"
        name="title"
        value={data.title}
        onChange={handleChange("title")}
        className={emptyFields?.includes("title") ? "error" : ""}
      />
      <p>Image</p>
      <input
        type="file"
        accept="image/*"
        name="cover"
        onChange={handleChange("cover")}
        className={emptyFields?.includes("cover") ? "error" : ""}
      />
      <p>Audio</p>
      <input
        type="file"
        accept="audio/*"
        name="audio"
        onChange={handleChange("audio")}
        className={emptyFields?.includes("audio") ? "error" : ""}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default NewTrack;
