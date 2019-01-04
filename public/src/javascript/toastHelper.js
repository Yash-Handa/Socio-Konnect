const messages = document.getElementsByClassName('toastMaker');

let color = 'red darken-4'

if (messages.length > 0) {
  for(var i=0; i< messages.length; i++){
      messages[i].hidden = true;
      if(messages[i].id === 'success') color = 'blue darken-4';
      M.toast({
        html: messages[i].innerText,
        displayLength: 6000,
        classes: color,
      });
  }
}
