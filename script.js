let left = document.getElementsByClassName('left')[0];
let right = document.getElementsByClassName('right')[0];
let middle = document.getElementsByClassName('middle')[0];
let albums = [left, middle, right];
let infos = [];  // store data from airtable

/* globals require */
console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
// console.log(Airtable);

// use the airtable librar to get a variable that represents one of our bases
var base = new Airtable({ apiKey: "keyxIm2nyltY1mcO7" }).base("appZjsdGeleGFWQfl");

//get the "books" table from the base, select ALL the records, and specify the functions that will receive the data
base("Table 1").select({}).eachPage(gotPageOfSongs, gotAllSongs);

// an empty array to hold our book data
const songs = [];

// callback function that receives our data
function gotPageOfSongs(records, fetchNextPage) {
  console.log("gotPageOfSongs()");
  // add the records from this page to our books array
  songs.push(...records);

  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllSongs(err) {
  console.log("gotAllSongs()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading songs");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogSongs();
  showSongs();
}

// just loop through the books and console.log them
function consoleLogSongs() {
  console.log("consoleLogSongs()");
  songs.forEach((song) => {
    console.log("song:", song);
  });
}


// {
//   name: "xxx",
//   artist: "yyy",
//   album: "zzz"
//   url: "aaa"
// }

// loop through the books, create an h2 for each one, and add it to the page
function showSongs() {
  console.log("showSongs()");
  // get data
  songs.forEach((song) => {
    infos.push({
      name: song.fields.name,
      artist: song.fields.artist,
      album: song.fields.album,
      url: song.fields.Attachments[0].url
    });
  });
  // then show them
  init();
}

function init() {
  for (let i = 0; i < albums.length; i++) {
    let album = document.createElement('div');
    album.classList.add('album-info');
    albums[i].appendChild(album);
    let img = makeImg(i);
    let titles = makeTitles(i);
    album.appendChild(img);
    album.appendChild(titles);
    album.classList.add('hidden');
  }
}

function makeImg(index) {
  let node = document.createElement('img');
  if (index === 0) {
    node.src = infos[0].url;
    return node;
  } else if (index === 1) {
    node.src = infos[7].url;
    return node;
  } else {
    node.src = infos[5].url;
    return node;
  }
}

function makeTitles(index) {
  let div = document.createElement('div');
  div.classList.add('titles');
  if (index === 0) {
    for (let i = 0; i < 3; i++) {
      let node = document.createElement('h3');
      if (i === 0) {
        node.innerHTML = `<a href='https://music.apple.com/cn/album/highest-in-the-room-single/1481874613'>${infos[0].name}</a>`;
      } else if (i === 1) {
        node.innerHTML = `<a href='https://music.apple.com/cn/album/highest-in-the-room-single/1481874613'>${infos[0].artist}</a>`;
      } else {
        node.innerHTML = `<a href='https://music.apple.com/cn/album/highest-in-the-room-single/1481874613'>${infos[0].album}</a>`;
      }
      div.appendChild(node);
    }
  } else if (index === 1) {
    for (let i = 0; i < 3; i++) {
      let node = document.createElement('h3');
      if (i === 0) {
        node.innerHTML = `<a href='https://music.apple.com/cn/album/711/1243454429?i=1243455235'>${infos[7].name}</a>`;
      } else if (i === 1) {
        node.innerHTML = `<a href='https://music.apple.com/cn/album/711/1243454429?i=1243455235'>${infos[7].artist}</a>`;
      } else {
        node.innerHTML = `<a href='https://music.apple.com/cn/album/711/1243454429?i=1243455235'>${infos[7].album}</a>`;
      }
      div.appendChild(node);
    }
  } else {
    for (let i = 0; i < 3; i++) {
      let node = document.createElement('h3');
      if (i === 0) {
        node.innerHTML = `<a href='https://music.apple.com/cn/album/tequila-sunrise-feat-august-08-goldlink/1478261748?i=1478262069'>${infos[5].name}</a>`;
      } else if (i === 1) {
        node.innerHTML = `<a href='https://music.apple.com/cn/album/tequila-sunrise-feat-august-08-goldlink/1478261748?i=1478262069'>${infos[5].artist}</a>`;
      } else {
        node.innerHTML = `<a href='https://music.apple.com/cn/album/tequila-sunrise-feat-august-08-goldlink/1478261748?i=1478262069'>${infos[5].album}</a>`;
      }
      div.appendChild(node);
    }
  }

  return div;
}

function hiddenInfo(index) {
  document.getElementsByClassName('album-info')[index].classList.add('hidden');
}

function displayInfo(index) {
  document.getElementsByClassName('album-info')[index].classList.remove('hidden');
}

for (let i = 0; i < albums.length; i++) {
  albums[i].addEventListener('mouseover', function () {
    (function () {
      displayInfo(i);
    })(i)
  });
  albums[i].addEventListener('mouseout', function () {
    (function () {
      hiddenInfo(i);
    })(i)
  });
}