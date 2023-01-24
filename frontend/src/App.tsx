import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import WorkOrders from './components/WorkOrders/WorkOrders';
import Detail from './components/WorkOrders/Detail/Detail';
import Productivity from './components/Productivity/Productivity';
import Create from './components/WorkOrders/Create/Create';
import Home from './components/Home';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="workorders">
                    <Route index element={<WorkOrders />} />
                    <Route path=":id" element={<Detail />} />
                </Route>
                <Route path="new" element={<Create />} />
                <Route path="productivity" element={<Productivity />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
        </Routes>
    );
}

export default App;
