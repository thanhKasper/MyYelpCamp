const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("SUCCESSFULL CONNECTION");
  })
  .catch((err) => {
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; ++i) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "64899a9f4a44520308b04958",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dylmavysc/image/upload/v1686842558/YelpCamp/ba9amrvfjgzonpkwjjkt.jpg",
          filename: "YelpCamp/ba9amrvfjgzonpkwjjkt",
        },
        {
          url: "https://res.cloudinary.com/dylmavysc/image/upload/v1686842561/YelpCamp/lt2tt7ij1klaqvgptxqy.jpg",
          filename: "YelpCamp/lt2tt7ij1klaqvgptxqy",
        },
        {
          url: "https://res.cloudinary.com/dylmavysc/image/upload/v1686842564/YelpCamp/lc5ij9rmxvkw7cq3xqtx.jpg",
          filename: "YelpCamp/lc5ij9rmxvkw7cq3xqtx",
        },
      ],
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. In quibusdam, repudiandae quaerat aut distinctio beatae qui blanditiis consequatur explicabo ducimus dolores architecto quod et doloribus ab dolor asperiores alias? Facere!",
      price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
