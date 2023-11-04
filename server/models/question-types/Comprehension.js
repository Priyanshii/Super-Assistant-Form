import mongoose from "mongoose";

const comprehensionSchema = new mongoose.Schema({
  referenceText: {
    type: String,       
    required: true,     
  },
  questions: [
    {
      text: {
        type: String,      
        required: true,     
      },
      options: {
        type: [String],     
        required: true,     
      },
      correctAnswer: {
        type: String,       
        required: true,    
      },
    },
  ],
});

export default mongoose.model('ComprehensionQuestion', comprehensionSchema);
