const express = require("express");
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());



const APIRouter = require('./APIRoutes.js');
app.use('/',APIRouter);

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
