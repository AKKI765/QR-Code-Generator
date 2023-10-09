import express from 'express';
import qr from 'qr-image';
import bodyParser from 'body-parser';
import path from 'path';
import {dirname} from 'path';
import { fileURLToPath } from 'url';


const __dirname=dirname(fileURLToPath(import.meta.url));


const app=express();
const port= process.env.PORT || 4001;




app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/public/')));


app.get("/", (req,res) => {
  res.sendFile(__dirname + "/public/index.html");
 
  
});



app.get("/contact", (req,res) => {
  res.sendFile(__dirname + "/public/contact.html");
  
});

app.get("/about", (req,res) => {
  res.sendFile(__dirname + "/public/about.html");
  
});


app.post("/submit", (req,res) =>{

  const link = req.body.link;
  const qrCode = qr.imageSync(link, { type: 'png', size: 30 });
  res.type('png').send(qrCode);
  
});



app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})






