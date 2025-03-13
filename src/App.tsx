import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import NewsletterForm from './pages/NewsletterForm';

function App() {

  return (
    <>
      <Routes>
        <Route path="/newsletter" element={<NewsletterForm />} />
      </Routes>
    </>
  )
}

export default App
