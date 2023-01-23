import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import WorkOrderCmpt from './components/WorkOrders/WorkOrders';
import Detail from './components/WorkOrders/Detail/Detail';
import Productivity from './components/Productivity/Productivity';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<h1>Home</h1>} />
                <Route path="workorders">
                    <Route index element={<WorkOrderCmpt />} />
                    <Route path=":id" element={<Detail />} />
                </Route>
                <Route path="new" element={<h1>New Work Order</h1>} />
                <Route path="productivity" element={<Productivity />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
        </Routes>
    );
}

export default App;
