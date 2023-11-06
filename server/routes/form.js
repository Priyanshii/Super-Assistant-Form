import express from 'express';
import { createForm, getFormResponses, getFormsList, getFormWithQuestions, submitForm } from '../controllers/form.js';

const router = express.Router();

router.post('/', createForm);
router.get('/getAllForms', getFormsList);
router.get('/preview/:id', getFormWithQuestions);
router.post('/submit/:id', submitForm);
router.get('/response/:id', getFormResponses);

export default router;