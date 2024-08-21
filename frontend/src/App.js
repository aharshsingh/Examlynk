import './App.css';
import UserLogin from './pages/UserLogin';
import EnviromentPreview from './pages/EnviromentPreview';
import Finish from './pages/Finish';
import Test from './pages/Test';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/userContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={UserLogin} /> {/* Default route */}
              <Route path="/userlogin" Component={UserLogin} />
              <Route path="/enviromentpreview" Component={EnviromentPreview} />
              <Route path="/finish" Component={Finish} />
              <Route path="/test" Component={Test} />
            </Routes>
          </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
