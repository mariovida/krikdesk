import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from './context/UserContext';
import routes from './routes/routes';

import './i18n';

const AppRoutes = () => {
  return useRoutes(routes);
};

function App() {
  return (
    <HelmetProvider>
      <UserProvider>
        <Router>
          <AppRoutes />
        </Router>
      </UserProvider>
    </HelmetProvider>
  );
}

export default App;
