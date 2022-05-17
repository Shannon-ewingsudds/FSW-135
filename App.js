const express = require("express");
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')

app.get('/', (req, res) => {
	res.send("Good Morning, Shannon.");
});
app.listen(3000, () => {
	console.log("The App is listening on port 3000")
});