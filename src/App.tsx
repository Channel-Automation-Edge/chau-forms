import { Routes, Route } from 'react-router-dom';
import NewsletterForm from './pages/NewsletterForm';
import WebinarForm from './pages/WebinarForm';

function App() {

  return (
    <>
      <Routes>
        <Route path="/newsletter" element={<NewsletterForm />} />
        <Route path='/webinar' element={<WebinarForm />} />
      </Routes>
    </>
  )
}

export default App
