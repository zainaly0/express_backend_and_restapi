const user_Model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../configs/auth.config");

/***
 * createa a MW will check if the request body is proper and correct
 */

const verifySignUpBody = async (req, res, next) => {
    try {
        // check for the name
        if (!req.body.name) {
            return res.status(400).send({
                message: "Failed! name was not provide in request",
            });
        }

        // check for the email

        if (!req.body.email) {
            return res.status(400).send({
                message: "Failed! email was not provide in request",
            });
        }

        // check for the userId

        if (!req.body.userId) {
            return res.status(400).send({
                message: "Failed! userId was not provide in request",
            });
        }
        // check if the user with the same userId is already present

        const data = await user_Model.findOne({ userId: req.body.userId });
        if (data) {
            return res.status(400).send({
                message: "Failed! user with same userID is already present",
            });
        }

        next();
    } catch (err) {
        console.log("error while validating the request objects", err);
        res.status(500).send({
            message: "error while validating the request body",
        });
    }
};

const verifySignInBody = async (req, res, next) => {
    // try {
    if (!req.body.userId) {
        return res.status(400).send({
            message: "userid is not provided in request ",
        });
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "password is not provided",
        });
    }

    next();

    // const checkdata = await user_Model.find({ userId: req.body.userId })
    // if (!checkdata) {
    //     return res.status(400).send({
    //         message: "user is not registed please register first"
    //     })
    // }

    // } catch (error) {
    //     console.log("error while validating the request object", error)
    //     res.status(500).send({
    //         message: "error while validating the request body"
    //     })
    // }
};

const verifyToken = (req, res, next) => {
    //check if the token is present in the header
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "no token found: unauthorized",
        });
    }

    // if its a valid token
    jwt.verify(token, secret.secret, async (error, decoded) => {
        if (error) {
            return res.status(401).send({
                message: "Unauthorized ",
            });
        }
        const user = await user_Model.findOne({ userId: decoded.id });
        if (!user) {
            return res.status(400).send({
                message: "unauthorized, this user for this token doesnt exist",
            });
        }
        req.user = user
        next();
    });

    // then move to the next step
};


const isAdmin = (req, res, next) =>{
    const user = req.user
    if(user && user.userType == "ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message: "only admin users are allowed to access this endpoing"
        })
    }
}

module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdmin: isAdmin
};
