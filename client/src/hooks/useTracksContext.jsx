import { TracksContext } from "../context/TracksContext";
import { useContext } from "react";

export const useTracksContext = () => {
  const context = useContext(TracksContext);

  if (!context) {
    throw Error(
      "useTracksContext must be used inside an TracksContextProvider"
    );
  }

  return context;
};
