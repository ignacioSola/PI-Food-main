import './App.css';
import {Routes , BrowserRouter as Router, Route} from 'react-router-dom';
import LandingPage from './components/landing/landing.jsx';
import Home from './components/home/home';
import { Detail } from './components/detail/detail';
import Post from './components/createRecipe/createRecipe';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/detail/:id' element={<Detail/>}/>
          <Route exact path='/created' element={<Post/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
