var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seeds = [
	{name: "Cloud Connected",
	 image: "https://i.pinimg.com/originals/2e/b7/e2/2eb7e206036f11c94ed0cac8fb1fc05e.jpg",
	 description: "My dream is to fly over the rainbow so HIGH"
	},
	{name: "Canion",
	 image: "https://cdn.recreation.gov/public/images/63144.jpg",
	 description: "My dream is to fly over the rainbow so HIGH"
	},
	{name: "Mystic",
	 image: "https://www.elacampground.com/wp-content/uploads/2019/06/Ela-Campground-87.jpg",
	 description: "My dream is to fly over the rainbow so HIGH"
	}
];

async function seedDB(){
    try {
        await Campground.remove({});
        console.log('Campgrounds removed');
        await Comment.remove({});
        console.log('Comments removed');

        for(const seed of seeds) {
            let campground = await Campground.create(seed);
            console.log('Campground created');
            let comment = await Comment.create(
                {
                    text: 'This place is great, but I wish there was internet',
                    author: 'Homer'
                }
            )
            console.log('Comment created');
            campground.comments.push(comment);
            campground.save();
            console.log('Comment added to campground');
        }
    } catch(err) {
        console.log(err);
    }
}

	

module.exports = seedDB;
