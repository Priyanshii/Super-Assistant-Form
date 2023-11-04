import mongoose from "mongoose";

const clozeSchema = new mongoose.Schema({
  sentence: {
    type: String,
    required: true,
    trim: true,
  },
  blanks: {
    type: [String],    
    required: true,     
  },
  options: {
    type: [String],    
    required: true,     
  },
  correctSequence: {
    type: Object,    
    required: true,     
  },
});

export default mongoose.model('ClozeQuestion', clozeSchema);