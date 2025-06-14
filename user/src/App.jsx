import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import EmployeesPage from './pages/EmployeesPage';
import DepartmentsPage from './pages/DepartmentsPage';
import { useSelector } from 'react-redux';
import './App.css';


function App() {
  const { isAuth } = useSelector(state => state.auth);

  return (
    <section className='app-wrapper'>
    <BrowserRouter>
      <Header />
      <Routes>
        {!isAuth && <Route path='*' element={<LoginPage />} />}
        {isAuth && (
          <>
            <Route path='/' element={<DepartmentsPage />} />
            <Route path='/employees' element={<EmployeesPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
    </section>
  );
}

export default App;