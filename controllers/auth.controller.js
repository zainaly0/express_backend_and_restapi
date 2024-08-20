/**
 * i need to write the controller / login to register a user
 *
 */

const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../configs/auth.config");

exports.signup = async (req, res) => {
    /**
     * logic to create the user
     */

    // 1. read the request body

    const request_body = req.body;
    // const request_body = JSON.parse(req.body);

    // 2.insert the data   in the users Collection  in mongoDB
    const userObj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8),
    };

    try {
        const userCreated = await user_model.create(userObj);

        /**
         * return this user
         */

        const res_obj = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt,
        };
        return res.status(201).send(res_obj);
    } catch (error) {
        console.log("error while registering the user");
        return res.status(500).json({ error: "user is not created " });
    }

    // 3.retunr the response back to the user
};

// exports.singin = async (req, res) => {
//     const data = req.body;

//     try {
//         const checkUser = await user_model.findOne({ userId: data.userId });

//         if (checkUser) {
//             const pass = await bcrypt.compare(data.password, checkUser.password);
//             if (pass) {
//                 return res.status(200).send({
//                     name: checkUser.name,
//                     email: checkUser.email,
//                     userId: checkUser.userId,
//                 });
//             } else {
//                 return res.status(400).send({
//                     message: "Invalid password.",
//                 });
//             }
//         } else {
//             return res.status(400).send({
//                 message: "User not found.",
//             });
//         }
//     } catch (error) {
//         console.log("An error occurred during user sign in:", error);
//         res.status(500).send({
//             message: "Internal server error.",
//         });
//     }
// };

exports.singin = async (req, res) => {
    //check userId is presernt in the system
    const user = await user_model.findOne({ userId: req.body.userId })
    if (user == null) {
        return res.status(400).send({
            message: "userId passed is not a valid userId "
        })
    }

    // password is corrent
    const isPassword = bcrypt.compareSync(req.body.password, user.password)
    if (!isPassword) {
        return res.status(400).send({
            message: "wrong password passed"
        })
    }

    // using jwt we will create the access token with a given TTL and return
    const token = jwt.sign({ id: user.userId }, secret.secret, {
        expiresIn: 120
    })

    res.status(200).send({
        name: user.name,
        userId: user.userid,
        email: user.email,
        userType: user.userType,
        accessToken: token
    })
}
