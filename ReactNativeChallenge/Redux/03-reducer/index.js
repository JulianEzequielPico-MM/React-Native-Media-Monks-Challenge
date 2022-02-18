

const initialState = {
  albumsData: [],
  photosData: {},


};


function albumsReducer(state = initialState, action) {
  switch (action.type) {
    case "ALBUMS_DATA":
      return {
        ...state,
        albumsData: action.payload,
      };
    case "PHOTOS_DATA":
      return {
        ...state,
        photosData: {
          ...state.photosData, [action.payload[1]]: action.payload[0]
        }
      };
    case "RENAME_ALBUM":
      const updateState = state.albumsData.map(el => {
        if (el.id === action.payload.id) {
          return {
            ...el,
            title: action.payload.title
          }
         
        }
        return el

      });
      return {
        ...state,
        albumsData: updateState

      }



    default:
      return state;
  }



}

export default albumsReducer;
