var nameType = 'Manga';
const api = "https://api.jikan.moe/v4/";

window.onload = changeNameType();

function changeNameType() {
  nameType = nameType === 'Manga' ? 'Anime' : 'Manga';
  document.getElementById('output').innerHTML = nameType;
  document.getElementById('search-anime').innerHTML = nameType;
  document.getElementById('swap-anime').innerHTML = nameType === 'Manga' ? 'Anime' : 'Manga'
  
}

function createElement(direct_url, image_url, title) {
var card = document.createElement('div');
card.className = 'card';
var link = document.createElement('a');
link.href = direct_url;
link.target = "_blank";
var img = document.createElement('img');
img.src = image_url;
img.alt = title + 'Poster';
var h3 = document.createElement('h3');
h3.innerHTML = title;
link.appendChild(img);
link.appendChild(h3);
card.appendChild(link);
return card;
}


function removeElement(parent) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}


function searchWeeb() {
  const mainElement = document.getElementsByClassName('main')[0];
  removeElement(mainElement);
  fetch(api + nameType.toLowerCase() + "?q=" + document.getElementById('search').value)
  .then(response => response.json())
  .then(data => data.data)
  .then(data => {
    data.forEach(element => {
      var card = createElement(element.url, element.images.webp.image_url, element.title)
      mainElement.appendChild(card);
    })
  })
  .catch(error => console.log(error));

}