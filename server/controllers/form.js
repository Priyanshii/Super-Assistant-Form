import Form from "../models/Form.js";
import Submission from "../models/Submission.js";
import mongoose from "mongoose";

export const createForm = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    console.log(req.body);
    const response = await Form.create({ ...req.body });
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

export const submitForm = async (req, res) => {
  try {
    const formId = req.params.id; 
    const submission = req.body;
    const form = await Form.findById(formId);
    const response = new Submission({
      formId: form._id,
      responses: submission,
    });
    console.log(response);
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
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

export const getFormWithQuestions = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.status(200).json(form);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}