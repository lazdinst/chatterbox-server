
var storage = {results: []};

var requestHandler = function(request, response) {

  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-credentials': true,
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  var headers = defaultCorsHeaders;
  var index = request.url.indexOf('?');
  request.url = request.url.slice(0, index);
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  let body = [];
  if (request.url === '/classes/messages' || request.url === '/classes/room' || request.url === '/' || request.url === '/classes/message' || request.url === '') {
    if (request.method === 'GET') {
      var statusCode = 200;
      // headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(storage));
    } else if (request.method === 'POST') {
      headers['Content-Type'] = 'application/json';
      request.on('data', (chunk) => {

        body.push(chunk);
      }).on('end', () => {
        body = JSON.parse(body.join(''));
        console.log(body);

        storage.results.push(body);
        statusCode = 201;
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(storage));
      });
    } else if (request.method === 'OPTIONS') {
        response.writeHead(200, headers);
        response.end();
    } else {
        response.statusCode = 404;
        response.end();
    }
  } else {
    response.statusCode = 404;
    response.end();
  }
};

module.exports.requestHandler = requestHandler;
