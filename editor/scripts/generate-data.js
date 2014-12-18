var fs = require('fs');
var path = require('path');


var input = path.join(__dirname, '../../img');
var output = path.join(__dirname, '../data/images.js');

var images = fs.readdirSync(input);
var content = 'var data = { images : ' + JSON.stringify(images) + ' };';

fs.writeFileSync(output, content);
