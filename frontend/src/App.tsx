import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import WorkOrderCmpt from './components/WorkOrders/WorkOrders';
import Detail from './components/Detail/Detail';

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
                <Route path="productivity" element={<h1>Productivity</h1>} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
        </Routes>
    );
}

export default App;
