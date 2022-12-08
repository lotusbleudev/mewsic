import { useEffect } from "react";
import NewTrack from "../components/NewTrack";
import TrackDetails from "../components/TrackDetails";
import { useTracksContext } from "../hooks/useTracksContext";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  const { tracks, dispatch } = useTracksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTracks = async () => {
      const res = await fetch("http://localhost:4001/tracks", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();

      if (res.ok) {
        dispatch({
          type: "SET_TRACKS",
          payload: data,
        });
      }
    };
    if (user) {
      fetchTracks();
    }
  }, [dispatch, user]);
  return (
    <div>
      {tracks &&
        tracks.map((track) => <TrackDetails key={track._id} track={track} />)}
      <NewTrack />
    </div>
  );
}

export default Home;
