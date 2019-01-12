document.addEventListener('DOMContentLoaded', function () {
  const warn = document.querySelectorAll('.modal');
  const instances = M.Modal.init(warn[0], {});
});

document.addEventListener('DOMContentLoaded', function() {
  const profilePic = document.querySelectorAll('.materialboxed');
  const instances = M.Materialbox.init(profilePic, {});
});
