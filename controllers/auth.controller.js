/**
 * i need to write the controller / login to register a user
 *
 */

const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");

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

    try{
        const userCreated = await user_model.create(userObj)

        /**
         * return this user
         */

        const res_obj ={
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt,

        }
        return res.status(201).send(res_obj)
    }catch(error){
        console.log("error while registering the user")
        return res.status(500).json({error: "user is not created "})
    }

    // 3.retunr the response back to the user
};
