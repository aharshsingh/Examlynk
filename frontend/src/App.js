import './App.css';
import UserLogin from './pages/UserLogin';
import EnviromentPreview from './pages/EnviromentPreview';
import Finish from './pages/Finish';
import Test from './pages/Test';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import AdminPage from './pages/AdminPage';
import AdminUploadQue from './pages/AminUploadQue'
import AdminRepositingQue from './pages/AdminRepositingQue';

function App() {
  return (
    <div className="App">
      <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={UserLogin} />
              <Route path="/userlogin" Component={UserLogin} />
              <Route path="/enviromentpreview" Component={EnviromentPreview} />
              <Route path="/finish" Component={Finish} />
              <Route path="/test" Component={Test} />
              <Route path="/adminpanel" Component={AdminPage} />
              <Route path="/adminUploadQue" Component={AdminUploadQue} />
              <Route path="/adminReposQue" Component={AdminRepositingQue} />
            </Routes>
          </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
