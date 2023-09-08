import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/users/register' element={<RegisterPage />} />
        <Route path='/users/login' element={<LoginPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
