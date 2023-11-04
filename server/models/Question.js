import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Categorize', 'Cloze', 'Comprehension'],
  },

}, { discriminatorKey: 'type' });

export default mongoose.model('Question', questionSchema);