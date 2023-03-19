const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello Nodeapi");
})



const port=3000;

app.listen(port, () => {
    console.log(`OMDB app is listening on port ${port}`)
  })