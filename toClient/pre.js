var fs = require('fs');
var basePath = 'creative/img/';
var saveFile = 'pre.txt';

fs.readdir(basePath, function(err, files){
	fs.unlink(saveFile, function(){});
	for(var i = 0; i < files.length; ++i){
		save(basePath + files[i])
	}
});

function save(content){
	
	fs.appendFile(saveFile, content + '\r\n', 'utf-8', function(){});
}