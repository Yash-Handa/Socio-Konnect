const name = document.getElementById('username');
const changeName = document.getElementById('usernameChange');

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
