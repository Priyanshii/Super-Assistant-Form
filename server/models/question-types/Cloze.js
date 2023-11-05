import mongoose from "mongoose";
import Question from "../Question.js";

const clozeSchema = new mongoose.Schema({
  preview: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [String],    
    required: true,     
  },
  correctOptionsSequence: {
    type: Object,    
    required: true,     
  },
});

export default mongoose.model('ClozeQuestion', clozeSchema, 'Question');
