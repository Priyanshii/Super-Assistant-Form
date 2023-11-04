import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  title: String, 
  description: String, 
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], 
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
});

export default mongoose.model('Form', formSchema);