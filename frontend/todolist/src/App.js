import { BrowserRouter,Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login'
import Folders from './components/Folders'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login}></Route>
        <Route path="/folders" component={Folders}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
