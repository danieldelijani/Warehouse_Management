"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemById = exports.findItems = exports.findItemById = exports.addItem = exports.init = void 0;
const mongoose_1 = require("mongoose");
let db = null;
// const CategorySchema = new Schema(
//   { categoryName: String },
//   { timestamps: true }
// );
// const CategoryModel = model("Category", CategorySchema, "Bookstore");
const CategorySchema = new mongoose_1.Schema({
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
});
const CategoryModel = (0, mongoose_1.model)("Category", CategorySchema, "Operations");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!db) {
        // let envString = process.env["CosmosDbConnectionString"];
        db = yield (0, mongoose_1.connect)("mongodb://cs519assignment4database:dk0Nx90ktAqSvtMpm5OJMQgfqtucDW9S9cNiso0Lpfi6TNzn7Yh7LCSU7yU4k4ghdcHXnltGFWt2Ylp4eWydwg%3D%3D@cs519assignment4database.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cs519assignment4database@");
    }
});
exports.init = init;
const addItem = (doc) => __awaiter(void 0, void 0, void 0, function* () {
    const modelToInsert = new CategoryModel();
    modelToInsert["Operations"] = doc.Operations;
    return yield modelToInsert.save();
});
exports.addItem = addItem;
const findItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield CategoryModel.findById(id);
});
exports.findItemById = findItemById;
const findItems = (query = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield CategoryModel.find({});
});
exports.findItems = findItems;
const deleteItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield CategoryModel.findByIdAndDelete(id);
});
exports.deleteItemById = deleteItemById;
//# sourceMappingURL=azure-cosmosdb-mongodb.js.map