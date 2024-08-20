/**
 * controller for creating the category
 */

const category_model = require("../models/category.model");
const bcrypt = require('bcryptjs')

exports.createNewCategory = async (req, res) => {
    // read the req body

    const request_body = req.body; 
    // create the category object
    cat_data = {
        name: request_body.name,
        description: request_body.description,
    };

    try {
        // insert into mongodb
        const category = await category_model.create(cat_data);

        /**
         * return this category
         */

        // const res_obj = {
        //     name: category.name,
        //     description: category.description,
        // };
        // retunr the response of the create category
        return res.status(200).send(category);
    } catch (error) {
        console.log("error while creating the category", error);
        return res.status(500).send({
            message: "error while creating the category response",
        });
    }
};
