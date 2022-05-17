const express = require("express");
const app = express();

app.get('/', (req, res) => {
	res.send("Good Morning, Shannon.");
});
app.listen(3000, () => {
	console.log("The App is listening on port 3000")
});