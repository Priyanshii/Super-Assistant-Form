import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateForm from './CreateForm';
import FormLink from './FormLink';
import FormsList from './FormsList';

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<FormsList />} />
      <Route path="/create" element={<CreateForm />} />
      <Route path="/form-preview/:id" element={<FormLink />} />
    </Routes>
  )
}

export default Pages;