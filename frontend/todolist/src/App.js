import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './components/Login'
function App() {
  return (
    <BrowserRouter>
      <Login/>
    </BrowserRouter>
  );
}

export default App;
