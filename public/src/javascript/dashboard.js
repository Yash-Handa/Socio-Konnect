const me = document.getElementById('me');
const pic = document.getElementById('pic');
const name = document.getElementById('name');
const tab = document.getElementById('tabs');
const tabChildren = tab.children;
const deadTabButtons = document.getElementsByClassName('dead-tab-button');
const selectors = document.getElementsByClassName('PSelect');
const PSOnly = document.getElementsByClassName('PSOnly');

function confirmor(name, li) {
  const toggler = document.querySelector(`input[name='${name}-too']`);
  const msg = document.getElementById(`${name}Msg`);
  if(msg && toggler) {
    if (msg.value.length !== 0 && toggler.checked) {
      li.style.display = 'list-item';
      li.children[1].innerText = msg.value;
    } else {
      li.style.display = 'none';
      li.children[1].innerText = '';
    }
  } else {
    li.style.display = 'none';
    li.children[1].innerText = '';
  }
}

const introControl = document.getElementById('into-controller');
if (introControl) {
  document.getElementById('message').classList.remove('animated');
  document.getElementById('sender').classList.remove('animated');
  const intro = introJs();
  intro.setOptions({
    showStepNumbers:false,
    showBullets: false,
    showProgress: true,
    hidePrev: true,
    hideNext: true,
    nextLabel: 'Next >',
    prevLabel: '< Back',
  });

  setTimeout(() => {
    intro.start();
  }, 250);
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

      if (this.id === 'send-summary') {
        const afterFetch = document.getElementById('loader-summery');
        afterFetch.className = 'valign-wrapper loader';
        afterFetch.innerHTML = `
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>

          <div class="spinner-layer spinner-red">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>

          <div class="spinner-layer spinner-yellow">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>

          <div class="spinner-layer spinner-green">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
        `;
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
    onShow : function () {
      const msgToFocus = document.getElementById(`${this.$content[0].id}Msg`);
      if (msgToFocus) {
        msgToFocus.focus();
        msgToFocus.nextElementSibling.className = 'active';
      }
    },
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

//*****************************************************************
// fetch api
const sendFetch = document.getElementById('send-fetch');
const afterFetch = document.getElementById('loader-summery');
if (sendFetch) {
  sendFetch.addEventListener('click', () => {
    const liFetch = document.getElementById('confirm-content').children
    const dataToSend = [];

    for (let i = 0; i < liFetch.length; i++) {
      if (liFetch[i].children[1].innerText !== '') {
        dataToSend.push({
          sendTo: liFetch[i].children[0].innerText.toLowerCase().trim(),
          data: liFetch[i].children[1].innerHTML.split('<br>'),
        });
      }
    }

    if (dataToSend.length === 0) {
      // give an error msg on the next modal of no data to send.
      afterFetch.className = '';
      afterFetch.innerHTML = `
      <div class="summary-msg error">
        <i class="fas fa-times fa-fw confirm-icons"></i>
        No Message to send.
      </div>
      `;
    } else {
      const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      fetch('/dashboard/send', {
        method: 'POST',
        credentials: 'same-origin', // <-- includes cookies in the request
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
          'CSRF-Token': token,
        },
        body: JSON.stringify(dataToSend),
      })
        .then(res => res.json())
        .then(data => {
          let summaryMsg = '';
          data.forEach((msg) => {
            if (msg.status === 'error') {
              summaryMsg += `
              <div class="summary-msg error animated bounceIn">
                <i class="fas fa-times fa-fw confirm-icons"></i>
                There was an error while Posting on ${msg.from}.
              </div>
              `;
            } else {
              summaryMsg += `
              <div class="summary-msg success animated bounceIn">
                <i class="fas fa-check fa-fw confirm-icons"></i>
                The Post is send to ${msg.from}.
              </div>
              `;
            }
          });
          afterFetch.className = '';
          afterFetch.innerHTML = summaryMsg;
        });
    }
  })
}
