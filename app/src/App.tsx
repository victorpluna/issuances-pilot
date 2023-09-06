import { Switch, Route } from 'react-router-dom';
import { routes } from './config/routes';

function App() {
  return (
    <Switch>
      {routes.map((routeProps) => (
        <Route exact key="issuances" {...routeProps} />
      ))}
    </Switch>
  );
}

export default App;
