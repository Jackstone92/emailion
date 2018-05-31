// write a function to retrieve a blob of json //
// make ajax request using fetch function //
// https://rallycoding.herokuapp.com/api/music_albums //

// using promise //
function fetchAlbumsPromise() {
  fetch('https://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json));
}

// using es2017 async/await //
const fetchAlbumsAsyncAwait = async () => {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json();

  console.log(res);
  console.log(json);
};
fetchAlbumsAsyncAwait();
