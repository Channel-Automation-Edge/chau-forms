import { Routes, Route } from 'react-router-dom';
import NewsletterForm from './pages/NewsletterForm';
import WebinarForm from './pages/WebinarForm';
import KohlerDemo from './pages/KohlerDemo';

function App() {

  return (
    <>
      <Routes>
        <Route path="/newsletter" element={<NewsletterForm />} />
        <Route path='/webinar' element={<WebinarForm />} />
        <Route path="/kohler-demo" element={<KohlerDemo />} />
      </Routes>
    </>
  )
}

export default App
