import { Schema, model, connect } from "mongoose";

let db=null;

// const CategorySchema = new Schema(
//   { categoryName: String },
//   { timestamps: true }
// );
// const CategoryModel = model("Category", CategorySchema, "Bookstore");

const CategorySchema = new Schema(
  {
    Operations: [
      {
        Operation: String,
        Product: String,
        ProductID: String,
        ShipmentID: String,
        Date: String,
        Count: String
      }
    ]
  }
);
const CategoryModel = model("Category", CategorySchema, "Operations");

export const init = async () => {
  if(!db) {
      // let envString = process.env["CosmosDbConnectionString"];
    db = await connect("mongodb://cs519assignment4database:dk0Nx90ktAqSvtMpm5OJMQgfqtucDW9S9cNiso0Lpfi6TNzn7Yh7LCSU7yU4k4ghdcHXnltGFWt2Ylp4eWydwg%3D%3D@cs519assignment4database.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cs519assignment4database@");
  }
};
export const addItem = async (doc) => {
  const modelToInsert = new CategoryModel();
  modelToInsert["Operations"] = doc.Operations
  return await modelToInsert.save();
};
export const findItemById = async (id) => {
  return await CategoryModel.findById(id);
};
export const findItems = async (query = {}) => {
  return await CategoryModel.find({});
};
export const deleteItemById = async (id) => {
  return await CategoryModel.findByIdAndDelete(id);
};