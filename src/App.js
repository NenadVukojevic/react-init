import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Welcome from './components/Welcome/Welcome';
import Login from './components/Login/Login';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import './components/init.css'
import { basename } from './components/Util/Constants';
import ErrorBoundary from './components/Util/ErrorBoundary';
import Terminals from './components/Terminals/Terminals';
import ListOfBackgrounds from './components/AtmBackground/ListOfBackgrounds';
import Responses from './components/Responses/Responses';
import Campaigns from './components/Campaigns/Campaigns';
import EditCampaign from './components/Campaigns/EditCampaign';
import BinRanges from './components/BinRanges/BinRanges';
import BinRangeGroups from './components/BinRanges/BinRangeGroups';
import TerminalGroups from './components/Terminals/TerminalGroups';
import CampaignConfig from './components/CampaignConfig/CampaignConfig';
import Offers from './components/Offers/Offers';
import City from './components/Cities/City';



function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path={`${basename}/login`} element={<Login />} />

          <Route element={<ProtectedRoute />}>

            <Route path={`${basename}/`} exact element={<Welcome />} />
            <Route path={`${basename}/version`} element={<Welcome />} />
            <Route path={`${basename}/campaigns`} element={<Campaigns />} />
            <Route path={`${basename}/edit_campaign/`} exact element={<EditCampaign />} />
            <Route path={`${basename}/edit_campaign/:id`} element={<EditCampaign />} />

            <Route path={`${basename}/responses`} element={<Responses />} />
            <Route path={`${basename}/binRanges`} element={<BinRanges />} />
            <Route path={`${basename}/binRangeGroups`} element={<BinRangeGroups />} />
            <Route path={`${basename}/terminals`} element={<Terminals />} />
            <Route path={`${basename}/terminalGroups`} element={<TerminalGroups />} />
            <Route path={`${basename}/atmBackgrounds`} element={<ListOfBackgrounds />} />
            <Route path={`${basename}/campaignConfig`} element={<CampaignConfig />} />

            <Route path={`${basename}/city`} element={<City />} />
            <Route path={`${basename}/offers`} element={<Offers />} />
          </Route>

          <Route path={`${basename}/*`} element={<Login />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}


export default App;
