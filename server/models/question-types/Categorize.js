import mongoose from "mongoose";
import Question from "../Question";

const categorizeSchema = new mongoose.Schema({
  description: {
    type: String
  },
  categories: [{
    type: String,
  }],
  items: [{
    type: String,
  }],
  correctCategoryForItem: {
    type: Object,
  },
});

export default mongoose.model('CategorizeQuestion', categorizeSchema, 'Question');