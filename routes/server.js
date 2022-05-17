const express = require("express");
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')

//Middleware
app.use(express.json())
app.use(morgan('dev'))

//Connect to DB
mongoose.connect('mongodb://localhost:27017/moviesdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the DB")
)
//Routes
app.use("/movies", require("./routes/moviesRouter.js"))
app.use("/tvshows", require("./routes/tvshowsRouter.js"))
app.get('/', (req, res) => {
	res.send("Good Morning, Shannon.");
});
//Error handler
app.use((err, req, res, next) =>{
	console.log(err)
	return res.send({errMsg: err.message})
})

//Server Listen

app.listen(3000, () => {
	console.log("The App is listening on port 9000")
});

