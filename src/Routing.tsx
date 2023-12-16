import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Payouts from './pages/Payouts';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'}>
                    <Route index element={<Payouts />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
