let left = document.getElementsByClassName('left')[0];
let right = document.getElementsByClassName('right')[0];
let middle = document.getElementsByClassName('middle')[0];
let albums = [left, middle, right];

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

function makeImg (index) {
  let node = document.createElement('img');
  if (index === 0) {
    node.src = "./assets/highest.png";
    return node;
  } else if (index === 1) {
    node.src = "./assets/711.png";
    return node;
  } else {
    node.src = "./assets/sunrise.png";
    return node;
  }
}

function makeTitles (index) {
  let div = document.createElement('div');
  div.classList.add('titles');
  if (index === 0) {
    for (let i = 0; i < 3; i++) {
      let node = document.createElement('h3');
      if (i === 0) {
        node.innerHTML = "<a href='https://music.apple.com/cn/album/highest-in-the-room-single/1481874613'>Highest In The Room</a>";
      } else if (i === 1) {
        node.innerHTML = "<a href='https://music.apple.com/cn/album/highest-in-the-room-single/1481874613'>Travis Scott</a>";
      } else {
        node.innerHTML = "<a href='https://music.apple.com/cn/album/highest-in-the-room-single/1481874613'>Highest In The Room</a>";
      }
      div.appendChild(node);
    }
  } else if (index === 1) {
    for (let i = 0; i < 3; i++) {
      let node = document.createElement('h3');
      if (i === 0) {
        node.innerHTML = "<a href='https://music.apple.com/cn/album/711/1243454429?i=1243455235'>711</a>";
      } else if (i === 1) {
        node.innerHTML = "<a href='https://music.apple.com/cn/album/711/1243454429?i=1243455235'>Higher Brother</a>";
      } else {
        node.innerHTML = "<a href='https://music.apple.com/cn/album/711/1243454429?i=1243455235'>Black Cab</a>";
      }
      div.appendChild(node);
    }
  } else {
    for (let i = 0; i < 3; i++) {
      let node = document.createElement('h3');
      if (i === 0) {
        node.innerHTML = "<a href='https://music.apple.com/cn/album/tequila-sunrise-feat-august-08-goldlink/1478261748?i=1478262069'>Tequila Sunrise</a>";
      } else if (i === 1) {
        node.innerHTML = "<a href='https://music.apple.com/cn/album/tequila-sunrise-feat-august-08-goldlink/1478261748?i=1478262069'>88Rising</a>";
      } else {
        node.innerHTML = "<a href='https://music.apple.com/cn/album/tequila-sunrise-feat-august-08-goldlink/1478261748?i=1478262069'>Head In The Clouds</a>";
      }
      div.appendChild(node);
    }
  }
  
  return div;
}

init();

function hiddenInfo (index) {
  document.getElementsByClassName('album-info')[index].classList.add('hidden');
}

function displayInfo (index) {
  document.getElementsByClassName('album-info')[index].classList.remove('hidden');
}

for (let i = 0; i < albums.length; i++) {
  albums[i].addEventListener('mouseover', function () {
    (function() {
      displayInfo(i);
    })(i)
  });
  albums[i].addEventListener('mouseout', function () {
    (function() {
      hiddenInfo(i);
    })(i)
  });
}