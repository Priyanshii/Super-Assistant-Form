import mongoose from "mongoose";

const userResponseSchema = new mongoose.Schema({
  responses: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, 
      response: mongoose.Schema.Types.Mixed,
      responseType: String,
    },
  ],
});

export default mongoose.model('UserResponse', userResponseSchema);