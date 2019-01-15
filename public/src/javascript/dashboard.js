document.addEventListener('DOMContentLoaded', function () {
  const warn = document.querySelectorAll('.modal');
  const instances = M.Modal.init(warn[0], {});
});

document.addEventListener('DOMContentLoaded', function() {
  const drop = document.querySelectorAll('.dropdown-trigger');
  const tabs = document.querySelectorAll('.tabs');
  const profilePic = document.querySelectorAll('.materialboxed');
  M.Dropdown.init(drop, {
    alignment: 'left',
    constrainWidth: false,
  });
  M.Materialbox.init(profilePic, {});
  M.Tabs.init(tabs, {
    swipeable: false,
  });
});

const me = document.getElementById('me');
const pic = document.getElementById('pic');
const name = document.getElementById('name');
const tab = document.getElementById('tabs');

document.addEventListener("scroll", function() {
  const scroller = window.scrollY;
  console.log(scroller);
  if (scroller < 75) {
    me.className = 'navigator me';
    pic.className = 'circle left pic z-depth-3 materialboxed';
    name.className = 'name';
    tab.className = 'tabs'
  } else {
    me.className ='navigator me me-scroll';
    pic.className = 'circle left pic pic-scroll z-depth-3 materialboxed';
    name.className = 'name name-scroll';
    tab.className = 'tabs tabs-scroll animated fadeInUp faster'
  }
});
