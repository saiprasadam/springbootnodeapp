var express=require('express');
var app=express();
var http =require('http');
const fs=require('fs');
const { json } = require('express');

app.get('/',(req,res)=>{

	var api_response='';
	var options={
		host:'springbootwithnode-integ.mongodb.svc',
		port:8080,
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
		 fs.appendFileSync('result.html',"<table><tr><th>Pre requisties</th><th>Enroll courses</th></tr><tr><td>Course Modules</td><td>Assessment</td><td>Hands on Mini project</td><td>Course in progress</td></tr><tr><td>Mentor</td><td>Code Samples</td><td>Reference Materials</td></tr><tr><td>Download Course/Completation Certificate</td><td>Alumni</td><td>Comments</td><td>Post Comments</td></tr></table>")
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

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080 ;
app.listen(port,function(req,res){
	console.log('server listen port is '+port);
});
