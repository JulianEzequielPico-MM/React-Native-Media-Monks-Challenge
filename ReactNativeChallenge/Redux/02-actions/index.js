
export function albumsData(payload) {
  return {
    type: "ALBUMS_DATA",
    payload
  };
}

export function photosData(payload) {
  return {
    type: "PHOTOS_DATA",
    payload
  };
}

export function renameAlbum(payload){
  
  return{
    type:"RENAME_ALBUM",
    payload
  };
}


//////////////////////////////////////////////////