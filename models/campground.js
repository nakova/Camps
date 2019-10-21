var mongoose = require("mongoose");
//SCHEMA SETUP 
var campgroundShema= new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	cost: Number,
	location: String,
	lat: Number,
	lng: Number,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectID,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectID,
			ref: "Comment"
		}
	],
	likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});
var Campground = mongoose.model("Campground", campgroundShema);

module.exports = mongoose.model("Campground", campgroundShema);