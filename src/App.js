import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CardList from './ui/cards/CardList'
import CardDetails from './ui/cards/CardDetails';
import CardForm from './ui/cards/CardForm';
import CardEdit from './ui/cards/CardEdit';
import ProducentList from './ui/producents/ProducentList';
import ProducentForm from './ui/producents/ProducentForm';
import ProducentDetails from './ui/producents/ProducentDetails';
import ProducentEdit from './ui/producents/ProducentEdit';

function App() {
  return (
    <Router>
      <div className='main-body'>
        <nav className="Navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cards">Karty</Link>
            </li>
            <li>
              <Link to="/producents">Producenci</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route exact path="/cards/:id/edit">
            <CardEdit />
          </Route>
          <Route exact path="/cards/add">
            <CardForm/>
          </Route>
          <Route exact path="/cards/:id">
            <CardDetails />
          </Route>
          <Route exact path="/cards">
            <CardList />
          </Route>
          <Route exact path="/producents">
            <ProducentList/>
          </Route>
          <Route exact path="/producents/add">
            <ProducentForm/>
          </Route>
          <Route exact path="/producents/details/:name">
            <ProducentDetails/>
          </Route>
          <Route exact path="/producents/:name/edit">
            <ProducentEdit/>
          </Route>
          <Route exact path="/">
            <CardList /> {/*Zmienic na Menu glowne?*/}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
