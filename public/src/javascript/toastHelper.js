const errors = document.getElementsByClassName('toastMaker');

if (errors.length > 0) {
  for(var i=0; i< errors.length; i++){
      errors[i].hidden = true;
      M.toast({
        html: errors[i].innerText,
        displayLength: 6000,
      });
  }
}
