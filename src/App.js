import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Welcome from './components/Welcome/Welcome';
import Login from './components/Login/Login';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import './components/init.css'
import Home from './components/Welcome/Home';
import List from './components/Welcome/List';
import { basename } from './components/Util/Constants';
import ErrorBoundary from './components/Util/ErrorBoundary';
import Terminals from './components/Terminals/Terminals';
import ListOfBackgrounds from './components/AtmBackground/ListOfBackgrounds';
import Responses from './components/Responses/Responses';
import Campaigns from './components/Campaigns/Campaigns';
import EditCampaign from './components/Campaigns/EditCampaign';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path={`${basename}/login`} element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path={`${basename}/`} element={<Welcome />} />
            
            <Route path={`${basename}/campaigns`}element={<Campaigns />} />
            <Route path={`${basename}/edit_campaign/`} exact element={<EditCampaign />} />
            <Route path={`${basename}/edit_campaign/:id`} element={<EditCampaign />} />
            
            <Route path={`${basename}/responses`} element={<Responses />} />
            <Route path={`${basename}/terminals`} element={<Terminals />} />
            <Route path={`${basename}/atmBackgrounds`} element={<ListOfBackgrounds />} />
            <Route path={`${basename}/home`} element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}


export default App;
