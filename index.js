var express=require('express');
var app=express();
var http =require('http');
const fs=require('fs');
const { json } = require('express');

app.get('/',(req,res)=>{

	var api_response='';
	var options={
		host:'localhost',
		port:8280,
		path:'/course/5f0458b7545012caccdd0874',
		method:'GET'
	}
	
	callback=function(response){
		response.on('data',function(chunk){
			console.log("val ofchunk"+chunk)
			api_response+=JSON.parse(chunk);
			
		});
	
	response.on('end',function(){
		//api_response.forEach(element=>{ console.log("valone test"+element)});
		//api_response.forEach(element => console.log("--*valueone*--"+element));
		console.log("value"+api_response);
		const res_val=api_response.replace('"','').split(',');
		console.log("val split"+res_val[1])
		fs.writeFileSync('result.html','<!doctype html>\n<html lang="en">\n' + 
		'\n<meta charset="utf-8">\n<title>welcome to course page</title>\n' + 
		'<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
		'\n\n<h1><center>');	
		 fs.appendFileSync('result.html',res_val[0]+'</h1></center>\n\n'+'<br/>\n\n<h4 margin-bottom: 30px><right>')
		 fs.appendFileSync('result.html',"Course Owner :"+res_val[1]+'<br/><u>'+"Contact"+res_val[2]+'</u>'+'</right></h4>\n\n<h3>\n\n')
		 fs.appendFileSync('result.html',"Pre requisites"+'<br/>'+res_val[3]+'</h3>\n\n')
		 fs.appendFileSync('result.html','</h3>\n\n')
		});	
		
	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	var req=http.request(options,callback);
	req.end();
	//res.send("call success");
	fs.readFile('./result.html', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('file not found');
        } else {
		  //  res.write(data);
		  res.end(data);
        }
      //  res.end(data);
    })
});

app.listen(3000,function(req,res){
	console.log('server listen port is 3000');
});
