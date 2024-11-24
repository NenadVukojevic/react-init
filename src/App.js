import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Welcome from './components/Welcome/Welcome';
import Login from './components/Login/Login';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import './components/init.css'
import Home from './components/Welcome/Home';
import List from './components/Welcome/List';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/list" element={<List />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;
