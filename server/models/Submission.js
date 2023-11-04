import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form'
  },
  responses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserResponse'
  }],
});

export default mongoose.model('Submission', submissionSchema);