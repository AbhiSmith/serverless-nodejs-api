const serverless = require("serverless-http");
const express = require("express");
const crud = require('./db/crud.js')
const validators = require('./db/validators.js')
const { getDbClient } = require('./db/clients.js')                                                       
const app = express();

const STAGE = process.env.STAGE || "prod";

app.use(express.json());


app.get("/", async  (req, res, next) => {
  const date1 = new Date()  
  const sql = await getDbClient()
  const results = await sql`select now()`
  const date2 = new Date()
  const latancy = date2 - date1
  return res.status(200).json({
    message: "Hello from root!",
    abhi: "hello how are you!", 
   results: results,
   latancy: `${latancy}=ms`,
    stage: STAGE,   
  })
});

app.get("/leads", async (req, res, next) => {
  const result  = await crud.getLeads(2)
  return res.status(200).json({    
    results: result,
  });
});


app.post("/leads", async (req, res, next) => {
  const postData = req.body;
  // validation
  const {data, hasError, message} = await validators.validateLead(postData) // validators.validateLead(postData)
  
  if(hasError === true){
    return res.status(400).json({message: message ? message : "Invalid request. please try again"})
  } else if (hasError === undefined) {
    return res.status(500).json({message: 'Server Error'})
  }
  const result = await crud.newLead(data)
  return res.status(201).json({
    
    results: result,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// server-full app
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");  
// })


//serverless app
module.exports.handler = serverless(app);
