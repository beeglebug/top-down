var fs = require('fs');
var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.resolve(__dirname);

app.use(express.static(staticPath));

generateImageData();

app.listen(3000, function() {
    console.log('listening');
});


function generateImageData() {

    console.log('image data generated');

    var input = path.join(__dirname, './img');
    var output = path.join(__dirname, './editor/data/images.js');

    var images = fs.readdirSync(input);
    var content = 'var data = { images : ' + JSON.stringify(images) + ' };';

    fs.writeFileSync(output, content);
}
