import foodModel from "../models/foodModel.js";
import fs from "fs";

// add foodItem

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })

    try{
        await food.save();
        res.status(200).json({
            message: "Food added successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }   
}

// all food items
const listFood = async(req,res) => {
    try{
        const foods = await foodModel.find({});
        res.status(200).json(foods);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }   
}

// remove food items
const removeFood = async(req,res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});
        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({
            message: "Food removed successfully"
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })

    }
}

export { addFood, listFood , removeFood};