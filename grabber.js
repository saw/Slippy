//http://tweetsong.stephenwoods.net/crop?farm=7&path=/6016/5958389646_b75c6409a2_o.jpg&width=2048&crop=563x332%2B1085%2B463
var http = require('http'), fs = require('fs');

var fileToGet = "crop?farm=7&path=/6016/5958389646_b75c6409a2_o.jpg",
fileWidth = 2048,
fileHeight = 1010,
cellSize = 256,
numRows  = Math.ceil(fileHeight/cellSize),
numCols = Math.ceil(fileWidth/cellSize),
rowTop = 0,
url,
rowSide = 0;
files = {};
console.log('image has ' +numRows + ' rows');
console.log('image has ' +numCols + ' cols');
for (var i=0; i < numRows;  i++) {

	rowSide = 0;
	for (var j = 0; j < numCols; j++) {
		var myurl = '/'+ fileToGet + '&width=2048&crop=256x256%2B'+ rowSide + '%2B'+rowTop
		rowSide = rowSide + 256;
		var thisRow = rowTop;
		var thisCol = rowSide;

		var req = http.request({
			host:'tweetsong.stephenwoods.net',
			port: 80,
			path: myurl,
			method: 'GET',
			row: thisRow
		}, 	function(res){
				var path = this.path.match(/%2B([0-9]+%2B[0-9]+)/)[1].replace('%2B', 'x');
				var here = 'img_' + path + '.jpg';
				var body;

				var downloadfile = fs.createWriteStream(here, {'flags': 'a'});
				console.log('response recieved for '+ path);
				res.on('data', function (chunk) {
					downloadfile.write(chunk, 'binary');
				});
				
				res.on('end', function(){
					
					downloadfile.end();
					console.log('finished with file ' + here);
				});
			});
		
		req.end();
	}
	
	rowTop = rowTop + 256;
};
