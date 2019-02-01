const name = document.getElementById('username');
const changeName = document.getElementById('usernameChange');
const carouselItems = document.getElementsByClassName('carousel-item');
const ProfilePic = document.getElementById('profilePic');
const save = document.getElementById('save');
const playIntro = document.getElementById('play-intro');

changeName.value = name.innerText;

document.addEventListener('DOMContentLoaded', function() {
  const confirm = document.querySelectorAll('.modal');
  const pic = document.querySelectorAll('.materialboxed');
  const picOptions = document.querySelectorAll('.carousel');
  M.Modal.init(confirm, {});
  M.Materialbox.init(pic, {});
  M.Carousel.init(picOptions, {
    numVisible: 3,
    indicators: true,
  });
});

const typeHandler = function(e) {
  name.innerHTML = e.target.value;
}
changeName.addEventListener('input', typeHandler) // register for oninput
changeName.addEventListener('propertychange', typeHandler) // for IE8

for (let i = 0; i < carouselItems.length; i++) {
  carouselItems[i].addEventListener('click', () => {
    ProfilePic.src = carouselItems[i].children[0].src;
  });
}

//*****************************************************************
// fetch api
save.addEventListener('click', (e) => {
  e.preventDefault();
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const dataToSend = {
    username: name.innerHTML,
    profilePic: ProfilePic.src,
    firstTime: playIntro.checked,
  };
  fetch('/dashboard/profile', {
    method: 'POST',
    credentials: 'same-origin', // <-- includes cookies in the request
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-type': 'application/json',
      'CSRF-Token': token,
    },
    body: JSON.stringify(dataToSend),
  })
    .then(() => {
      window.location.href = window.location.href.replace('/profile','');
    });
});
