document.addEventListener('DOMContentLoaded', function () {
  const warn = document.querySelectorAll('.modal');
  const instances = M.Modal.init(warn[0], {});
});

document.addEventListener('DOMContentLoaded', function() {
  const drop = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(drop, {
    alignment: 'left',
    constrainWidth: false,
  });
  const profilePic = document.querySelectorAll('.materialboxed');
  const instances = M.Materialbox.init(profilePic, {});
});
