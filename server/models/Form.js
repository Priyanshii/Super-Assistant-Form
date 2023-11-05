import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
  }, 
  description: String, 
  questions: [mongoose.Schema.Types.Mixed],
});

export default mongoose.model('Form', formSchema);