const me = document.getElementById('me');
const pic = document.getElementById('pic');
const name = document.getElementById('name');
const tab = document.getElementById('tabs');
const tabChildren = tab.children;
const deadTabButtons = document.getElementsByClassName('dead-tab-button');
const selectors = document.getElementsByClassName('PSelect');
const PSOnly = document.getElementsByClassName('PSOnly');

document.addEventListener('DOMContentLoaded', function () {
  const box = document.querySelectorAll('.modal');
  const textAreas = document.querySelectorAll('textarea');
  const instances = M.Modal.init(box, {
    onCloseStart: function() {
      console.log('Hello');
    }
  });

  M.CharacterCounter.init(textAreas);
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
if(deadTabButtons) {
  const brandColors = {
    Facebook: '#3C5A99',
    Google: '#DE5245',
    GitHub: '#000000',
    Twitter: '#3EC6EA',
    LinkedIn: '#0274B3',
    Pinterest: '#CC2127',
  };
  const deadTabLogos = document.getElementsByClassName('dead-logo');

  for(let i = 0; i< deadTabButtons.length; i++) {
    deadTabButtons[i].addEventListener("mouseenter", function() {
      deadTabLogos[i].style.color = brandColors[deadTabButtons[i].innerText];
      deadTabButtons[i].style.backgroundColor = brandColors[deadTabButtons[i].innerText];
      deadTabLogos[i].style.top = 'calc(50% - 205px)';
      deadTabLogos[i].className = 'dead-logo animated flip infinite slow';
    });

    deadTabButtons[i].addEventListener("mouseout", function() {
      deadTabLogos[i].style.color = '#dbdde2';
      deadTabButtons[i].style.backgroundColor ='#dbdde2';
      deadTabLogos[i].style.top = 'calc(50% - 170px)';
      deadTabLogos[i].className = 'dead-logo';
    });
  }
}

// tab disabler according to the switches
for (let index = 0; index < PSOnly.length; index++) {
  PSOnly[index].onchange = function() {
    const classes = PSOnly[index].checked ? 'tab col s2 disabled': 'tab col s2';
    for(let i = 0; i < tabChildren.length-1; i++) {
      if (tabChildren[i].className === PSOnly[index].name) tabChildren[i].className = 'tab col s2'
      else tabChildren[i].className = classes;
    }
    for(let i = 0; i < selectors.length; i++) {
      if (selectors[i].name === `${PSOnly[index].name}-too`) {
        selectors[i].checked = true;
        selectors[i].disabled = PSOnly[index].checked;
      }
      else {
        selectors[i].checked = false;
        selectors[i].disabled = PSOnly[index].checked;
      }
    }
  }
}
