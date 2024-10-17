import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AuthForm from './components/AuthForm';
import TodoList from './components/TodoList';
import RegisterPage from './components/RegisterPage';
import { AuthProvider } from './components/CreateContext';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <AuthProvider>
                        <Home />
                    </AuthProvider>
                } />
                <Route path="/login" element={
                    <AuthProvider>
                        <AuthForm />
                    </AuthProvider>
                } />
                <Route path="/todo" element={
                    <AuthProvider>
                        <TodoList />
                    </AuthProvider>
                } />
                <Route path="/register" element={
                    <AuthProvider>
                        <RegisterPage />
                    </AuthProvider>
                } />
            </Routes>
        </Router>
    );
};

export default App;
