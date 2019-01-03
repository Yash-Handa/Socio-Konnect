/* eslint-disable max-len */
const csurf = require('csurf');

module.exports = csurf({
  cookie: true,
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
});

/*
Inside the view (depending on your template language; handlebars-style is demonstrated here), set the csrfToken value as the value of a hidden input field named _csrf:

<form action="/process" method="POST">
  <input type="hidden" name="_csrf" value="{{csrfToken}}">

  Favorite color: <input type="text" name="favoriteColor">
  <button type="submit">Submit</button>
</form>


The following is an example of using the Fetch API to post to the /process route with the CSRF token from the <meta> tag on the page:

// Read the CSRF token from the <meta> tag
var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
// Make a request using the Fetch API
fetch('/process', {
  credentials: 'same-origin', // <-- includes cookies in the request
  headers: {
    'CSRF-Token': token // <-- is the csrf token as a header
  },
  method: 'POST',
  body: {
    favoriteColor: 'blue'
  }
})
*/
