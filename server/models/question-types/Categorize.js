import mongoose from "mongoose";

const categorizeSchema = new mongoose.Schema({
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

export default mongoose.model('CategorizeQuestion', categorizeSchema);