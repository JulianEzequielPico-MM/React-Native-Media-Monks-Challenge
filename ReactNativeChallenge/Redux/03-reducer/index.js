const initialState = {
  albumsData: [],
  photosData: {},

};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "ALBUMS_DATA":
      return {
        ...state,
        albumsData: action.payload
      };
    case "PHOTOS_DATA":
      return {
        ...state,
        photosData: {
          ...state.photosData, [action.payload[1]]: action.payload[0]
        }
      };


    default:
      return state;
  }



}
