const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database conected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "604a67b5aa8f23818cabb4f1",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "lorem inspum bla bla bla description",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      },
      images: [
        {
          url: "https://res.cloudinary.com/da1jek5ck/image/upload/v1615736285/YelpCamp/wdnpitznq9nd2beg1dgf.jpg",
          filename: "YelpCamp/wdnpitznq9nd2beg1dgf"
        },
        {
          url: "https://res.cloudinary.com/da1jek5ck/image/upload/v1615736284/YelpCamp/ugbgrmmwmn5zplpjf2mn.jpg",
          filename: "YelpCamp/ugbgrmmwmn5zplpjf2mn"
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  db.close();
});
