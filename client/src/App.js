import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Pages from './pages';

function App() {
  return (
    <div>
      <Router>
        <Pages />
      </Router>
    </div>
  )
}

export default App;
