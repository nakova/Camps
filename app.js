require('dotenv').config();

var express = require("express"),
app = express(),
bodyPasrer = require("body-parser"),
mongoose = require("mongoose"),
passport = require("passport"),
flash = require("connect-flash"),
LocalStrategy = require("passport-local"),
methodOverride = require("method-override"),
Campground = require("./models/campground"),
Comment = require("./models/comment"),
User = require("./models/user"),	
seedDB = require("./seeds")

//requiering routes
var commentRoutes		= require("./routes/comments"),
	campgroundsRoutes	= require("./routes/campgrounds"),
	indexRoutes			= require("./routes/index")	


mongoose.set('useCreateIndex', true);
//mongoose.connect("mongodb+srv://Violina:Gomes219.@cluster0-az38x.mongodb.net/yelp_camp?retryWrites=true&w=majority",  {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect("mongodb://127.0.0.1:27017/yelp_camp_v15", {useNewUrlParser: true, useUnifiedTopology: true});
var url = process.env.DATABASEURL || "mongodb://127.0.0.1:27017/yelp_camp_v15";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});


app.use(bodyPasrer.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.locals.moment = require('moment');
//seedDB();   //seed the DB

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Rusty wins the cuttest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res ,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT || 3000, function(){
	console.log("Server has started");
});