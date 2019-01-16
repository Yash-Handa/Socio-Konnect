const me = document.getElementById('me');
const pic = document.getElementById('pic');
const name = document.getElementById('name');
const tab = document.getElementById('tabs');
const deadTabButton = document.getElementById('dead-tab-button');

document.addEventListener('DOMContentLoaded', function () {
  const warn = document.querySelectorAll('.modal');
  const instances = M.Modal.init(warn[0], {});
});

document.addEventListener('DOMContentLoaded', function() {
  const drop = document.querySelectorAll('.dropdown-trigger');
  const tabs = document.querySelectorAll('.tabs');
  M.Dropdown.init(drop, {
    alignment: 'left',
    constrainWidth: false,
  });
  M.Tabs.init(tabs, {
    swipeable: false,
  });
});


// scroll animation/effect/positioning
document.addEventListener("scroll", function() {
  const scroller = window.scrollY;
  if (scroller < 75) {
    me.className = 'navigator me';
    pic.className = 'circle left pic z-depth-3 dropdown-trigger';
    name.className = 'name';
    tab.className = 'tabs'
  } else {
    me.className ='navigator me me-scroll';
    pic.className = 'circle left pic pic-scroll z-depth-3 dropdown-trigger';
    name.className = 'name name-scroll';
    tab.className = 'tabs tabs-scroll animated fadeInUp faster'
  }
});


// dead tab content hover effect
if(deadTabButton) {
  const deadTabLogo = document.getElementById('dead-tab-logo');

  deadTabButton.addEventListener("mouseenter", function() {
    deadTabLogo.style.color = '#472C66';
    deadTabLogo.style.top = 'calc(50% - 205px)';
    deadTabLogo.className = 'dead-logo animated flip infinite slow';
  });

  deadTabButton.addEventListener("mouseout", function() {
    deadTabLogo.style.color = '#dbdde2';
    deadTabLogo.style.top = 'calc(50% - 170px)';
    deadTabLogo.className = 'dead-logo';
  });
}
