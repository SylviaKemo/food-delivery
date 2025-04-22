import mongoose from "mongoose";    

export const connectDB = async () => {
   
        await mongoose.connect(
          "mongodb+srv://sylviakemo1:Uo82Oa4d2vPhHG1p@cluster0.dsqbyq5.mongodb.net/food-del"
        ).then(() => {
            console.log("DB Connection Successfull");
        });

};
        
