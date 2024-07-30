
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HeroSection from './components/Home/HomePage';
import PublicNavbar from './components/NavitigationBar/PublicNavbar';
import LoginForm from './components/Users/Login';
import RegistrationForm from './components/Users/Register';

function App() {

  return (
    <BrowserRouter>
      <PublicNavbar />
      <Routes>
        <Route path="/" element= {<HeroSection />} />
        <Route path="/login" element= {<LoginForm />} />
        <Route path="/register" element= {<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
