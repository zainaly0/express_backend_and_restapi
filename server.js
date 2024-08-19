/**
 * this will be the starting file of the project
 */

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const UserModel = require("./models/user.model");
const bcrypt = require("bcryptjs");

app.use(express.json())

// const port = process.env.PORT || 3000
// mongoose.connect(process.env.MONGO_URL)
mongoose
    .connect(db_config.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        console.log("databse is connected");
    })
    .catch((result) => {
        console.log("database is not connected", result);
    });
const db = mongoose.connection;
db.once("open", function () {
    console.log("database connected");
    // init();
});
db.on("error", function () {
    console.log("database error occur");
});


/***
async function init() {
    try {
        let user = await UserModel.findOne({ userId: "admin" });
        if (user) {
            console.log("admin is already present");
            return;
        }
    } catch (error) {
        console.log("error occur", error);
    }

    try {
        user = await UserModel.create({
            name: "zaid",
            userId: "admin",
            email: "szainaly02@gmail.com",
            password: bcrypt.hashSync("SZA725293", 8),
            userType: "ADMIN",
        });

        console.log("admin created: ", user);
    } catch (error) {
        console.log("error while creating admin", error);
    }
}
     */

/**
 * stich the route to the server
 */

require("./routes/auth.routes")(app)

/***
 * start the server
 */

app.listen(server_config.PORT, function () {
    console.log("server is running on port", server_config.PORT);
});
