function fetchAlbums() {
  fetch('')
    .then (res => res.json())
    .then (json => console.log(json));
}

fetchAlbums();
