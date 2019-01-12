document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tabs');
  const tips = document.querySelectorAll('.tooltipped');
  const collapsible = document.querySelectorAll('.collapsible');

  M.Tabs.init(tabs, {
    swipeable: true,
    responsiveThreshold: '100px',
  });

  M.Tooltip.init(tips, {});

   M.Collapsible.init(collapsible, {});
});
