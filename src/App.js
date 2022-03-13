import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import HomeEditPage from './pages/HomeEditPage';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/home/edit" element={<HomeEditPage />} />
            </Routes>
        </div>
    );
};

export default App;
