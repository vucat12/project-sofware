import './App.css';
import './common/index.scss';
import {BrowserRouter as Router } from 'react-router-dom';
import Routing from './Routing/Routing';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

function App() {
  return (
    <div>
      <Router history={history}>
        <Routing/>
      </Router>
    </div>
  );
}

export default App;
