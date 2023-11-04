import express from 'express';
import { createForm, getFormResponses, getFormsList, getFormWithQuestions, submitForm } from '../controllers/form';

const router = express.Router();

router.post('/', createForm);
router.get('/:id', getFormWithQuestions);
router.post('/:id', submitForm);
// router.patch('/:id', updateForm);
router.get('/getAllForms/:userId', getFormsList);
router.get('/response/:id', getFormResponses);

export default router;