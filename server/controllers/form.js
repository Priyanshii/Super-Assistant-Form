import Form from "../models/Form";
import Submission from "../models/Submission";

export const createForm = async (req, res) => {
  try {
    const { title, description, questions, author } = req.body;
    const form = new Form({
      title,
      description,
      questions,
      author
    });
    await form.save();
    res.json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

export const submitForm = async (req, res) => {
  try {
    const { formId, responses } = req.body;
    const response = new Submission({
      formId,
      responses,
    });
    await response.save();
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

export const getFormResponses = async (req, res) => {
  try {
    const formId = req.params.formId;
    const responses = await Submission.find({ formId }).populate('responses');
    res.json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

export const getFormsList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const forms = await Form.find({ author: userId });
    res.json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

export const getFormWithQuestions = async (req, res) => {
  try {
    const formId = req.params.formId;
    const form = await Form.findById(formId).populate('questions');

    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(form);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}