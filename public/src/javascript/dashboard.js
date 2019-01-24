const me = document.getElementById('me');
const pic = document.getElementById('pic');
const name = document.getElementById('name');
const tab = document.getElementById('tabs');
const tabChildren = tab.children;
const deadTabButtons = document.getElementsByClassName('dead-tab-button');
const selectors = document.getElementsByClassName('PSelect');
const PSOnly = document.getElementsByClassName('PSOnly');

function confirmor(name, li) {
  const toggler = document.querySelector(`input[name='${name}-too']`).checked
  const msg = document.getElementById(`${name}Msg`);
  if(msg.value.length !== 0 && toggler) {
    li.style.display = 'list-item';
    li.children[1].innerText = msg.value;
  } else {
    li.style.display = 'none';
    li.children[1].innerText = '';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const box = document.querySelectorAll('.modal');
  const textAreas = document.querySelectorAll('textarea');
  const instances = M.Modal.init(box, {
    onCloseStart: function() {
      // console.log(this);
      if (this.id === 'generalMsg') {
        let content = document.getElementById('globalMsg').value;
        for (let i = 0; i < textAreas.length; i++) {
          if (textAreas[i].id === 'globalMsg');
          else {
            if (content.length !== 0) {
              textAreas[i].value = content;
            }
          }
        }
      }
    },

    onOpenStart: function() {
      if (this.id === 'sender-confirm') {
        const confirmUl = document.getElementById('confirm-content');
        confirmor('facebook', confirmUl.children[0]);
        confirmor('google', confirmUl.children[1]);
        confirmor('github', confirmUl.children[2]);
        confirmor('twitter', confirmUl.children[3]);
        confirmor('linkedin', confirmUl.children[4]);
        confirmor('pinterest', confirmUl.children[5]);
      }
    },
  });
  M.CharacterCounter.init(textAreas);
});

document.addEventListener('DOMContentLoaded', function() {
  const drop = document.querySelectorAll('.dropdown-trigger');
  const tabs = document.querySelectorAll('.tabs');
  const confirmCollapsible = document.querySelectorAll('.collapsible');
  M.Dropdown.init(drop, {
    alignment: 'left',
    constrainWidth: false,
  });
  M.Tabs.init(tabs, {
    swipeable: false,
  });
  M.Collapsible.init(confirmCollapsible, {});
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
