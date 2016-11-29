var request = new XMLHttpRequest();
request.open('GET', '/counties?state=06', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    var container = document.getElementById('content');
    var header = document.createElement('h2');
    header.innerText = 'Counties in California';
    container.append(header);
    for (var i = 0; i < data.length; i++) {
      var newDiv = document.createElement('div');
      newDiv.innerText = data[i].join(' | ');
      container.append(newDiv);
    }
  } else {
    console.log(request.statusText);
  }
};

request.onerror = function(error) {
  // There was a connection error of some sort
  console.error(error);
};

request.send();