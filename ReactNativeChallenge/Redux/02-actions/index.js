import axios from "axios";

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
//////////////////////////////////////////////////