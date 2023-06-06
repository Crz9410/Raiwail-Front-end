import NavBar from './components/NavBar/NavBar';
import Detail from './components/Detail/Detail';
import { Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Landing from './Pages/Landing/Landing';
import Form from './Pages/Form/Form';
function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar /> }   
      <Route exact path="/" component={Landing} />
      <Route exact path="/detail" component={Detail} />
      <Route exact path="/create" component={Form} />

      <Route path="/home" render={() => <Home/>} /> 

    </div>
  );
}

export default App;