import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  formId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form'
  },
  responses: [mongoose.Schema.Types.Mixed], 
});

export default mongoose.model('Submission', submissionSchema);