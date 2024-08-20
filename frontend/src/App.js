import './App.css';
import UserLogin from './pages/UserLogin';
import EnviromentPreview from './pages/EnviromentPreview';
import Finish from './pages/Finish'
import Test from './pages/Test'
import { StreamProvider } from './context/StreamContext'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
       <StreamProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/userlogin" Component={UserLogin}></Route>
          <Route path="/enviromentpreview" Component={EnviromentPreview}></Route>
          <Route path="/finish" Component={Finish}></Route>
          <Route path="/test" Component={Test}></Route>
        </Routes>
      </BrowserRouter>
      </StreamProvider>
    </div>
  );
}

export default App;
