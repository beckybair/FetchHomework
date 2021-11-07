import fetch from '../util/fetch-fill';
import URI from 'urijs';

// /records endpoint
window.path = 'http://localhost:3000/records';

// Your retrieve function plus any additional functions go here ...
const PRIMARY = [
  'red',
  'blue',
  'yellow'
];
const DISPOSITIONS = {
  open: 'open',
  closed: 'closed'
}
let limit = 10;

function retrieve({ page = 1, colors} = {}) {
  console.log('path: ', window.path);
  let pageOffset = (page - 1) * limit;
  let uri = URI(window.path).search({
    "offset": (page - 1) * limit,
    "color[]": colors
  })

  console.log(uri);
  console.log(uri.toString());

  // fetch data
  fetch(uri)
    .then (res => {
      console.log(res);
      
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject();
      }
    })
    .then (data => {
      console.log(data, page);
    })
    .catch (reason => {
      console.log('There is an error retrieving the data', reason);
    });
}

retrieve({ page: 2, colors: ["red", "brown"] });

export default retrieve;