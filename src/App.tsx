import { Routes, Route } from 'react-router-dom';
import NewsletterForm from './pages/NewsletterForm';
import WebinarForm from './pages/WebinarForm';
import KohlerDemo from './pages/KohlerDemo';
import JacuzziDemo from './pages/JacuzziDemo';
import CremationDemo from './pages/CremationDemo';
import CallCenterDispo from './pages/CallCenterDispo';

function App() {

  return (
    <>
      <Routes>
        <Route path="/newsletter" element={<NewsletterForm />} />
        <Route path='/webinar' element={<WebinarForm />} />
        <Route path="/kohler-demo" element={<KohlerDemo />} />
        <Route path="/jacuzzi-demo" element={<JacuzziDemo />} />
        <Route path="/cremation-demo" element={<CremationDemo />} />
        <Route path="/callcenterdispo-demo" element={<CallCenterDispo />} />
      </Routes>
    </>
  )
}

export default App
