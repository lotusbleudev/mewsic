import { createContext, useReducer } from "react";

export const TracksContext = createContext();

export const tracksReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRACKS":
      return {
        tracks: action.payload,
      };
    case "NEW_TRACK":
      return {
        tracks: [action.payload, ...state.tracks],
      };
    case "DELETE_TRACK":
      return {
        tracks: state.tracks.filter((t) => t._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TracksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tracksReducer, {
    tracks: null,
  });

  return (
    <TracksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TracksContext.Provider>
  );
};
