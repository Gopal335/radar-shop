const http=require('http');



const server=http.createServer((req, res)=>{

    console.log(req.url);

    if(req.url == '/about'){
        res.end("these is about page");
    }

    if(req.url == '/profile'){
        res.end("these is profile page");
    }
    

    if(req.url == '/'){ 
        res.end("Home Page");
    }
})

server.listen(3000);