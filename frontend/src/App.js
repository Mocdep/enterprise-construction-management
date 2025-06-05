import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import ExportBackup from './pages/ExportBackup';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/customers" component={Customers} />
        <Route path="/export-backup" component={ExportBackup} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}
export default App;