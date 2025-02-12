import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Createlisting from './pages/createlisting';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          {/* PrivateRoute wrapper to protect the Profile route */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/createlisting" element={<Createlisting/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
