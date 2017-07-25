

var storage = {results: [{
  username: 'Jono',
  message: 'Do my bidding!'
}]};

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  var headers = defaultCorsHeaders;
  
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // const { headers, method, url } = request;
  let body = [];
  if (request.url === '/classes/messages') {
    if (request.method === 'GET') {
      request.on('data', (data) => {
        
        console.log('I NEVER GET HERE', data);
        
      }).on('end', () => {
        var statusCode = 200;
        headers = defaultCorsHeaders;
        headers['Content-Type'] = 'text/plain';
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(storage));
        console.log('TMONEY STOREAGE', storage);
      });
    } else if (request.method === 'POST') {
      request.on('data', (data) => {
        body.push(data);
      }).on('end', () => {
        response.statusCode = 201;
        // body = Buffer.concat(body).toString();
        // console.log(body);
        response.end();
      });
    } else if (request.method === 'PUT') {

    } else if (request.method === 'DELETE') {

    } else if (request.method === 'OPTIONS') {
      
    } else {
      response.statusCode = 404;
      response.end();
    }
  } else {
    response.statusCode = 404;
    response.end();
  }

  // var headers = defaultCorsHeaders;
  
  // response.statusCode = 200;
  // response.setHeader('Content-Type', 'application/json');
  // const responseBody = { headers, method, url, body };

  // response.write(JSON.stringify(responseBody));
  // response.end();

};

module.exports.requestHandler = requestHandler;