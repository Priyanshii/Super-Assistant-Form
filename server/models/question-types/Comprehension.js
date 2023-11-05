import mongoose from "mongoose";
import Question from "../Question";

const comprehensionSchema = new mongoose.Schema({
  referenceText: {
    type: String,
    required: true,
  },
  questions: {
    type: [
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
    validate: {
      validator: function (questions) {
        return questions.length > 0;
      },
      message: "At least one question is required.",
    },
  }
});

export default Question.discriminator('ComprehensionQuestion', comprehensionSchema);

