const user_Model = require('../models/user.model')

/***
 * createa a MW will check if the request body is proper and correct
 */

const verifySignUpBody = async (req, res, next) => {
    try {
        // check for the name
        if (req.body.name) {
            return res.status(400).send({
                message: "Failed! name was not provide in request",
            });
        }

        // check for the email

        if (req.body.email) {
            return res.status(400).send({
                message: "Failed! email was not provide in request",
            });
        }

        // check for the userId

        if (req.body.userId) {
            return res.status(400).send({
                message: "Failed! userId was not provide in request",
            });
        }
        // check if the user with the same userId is already present

        const data = await user_Model.findOne({userId: req.body.userId})
        if(data){
            return res.status(400).send({
                message: "Failed! user with same userID is already present"
            })
        }

        next()

    } catch (err) {
        console.log("error while validating the request objects", err);
        res.status(500).send({
            message: "error while validating the request body",
        });
    }
};


module.exports ={
    verifySignUpBody: verifySignUpBody
}
