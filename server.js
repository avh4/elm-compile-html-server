var express = require('express');
var app = express();
var compile = require('elm-compile-html');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// From http://stackoverflow.com/a/12345876/308930
function rawBody(req, res, next) {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function(){
    next();
  });
}

app.use(rawBody);
app.post('/compile', function (req, res) {
  compile('MyModule', req.rawBody).then(function(result) {
    res.send(result);
  });
});

var server = app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
