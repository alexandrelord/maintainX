import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/workorders" element={<h1>Work Orders</h1>} />
                <Route path="/new" element={<h1>New Work Order</h1>} />
                <Route path="/productivity" element={<h1>Productivity</h1>} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
        </Routes>
    );
}

export default App;
