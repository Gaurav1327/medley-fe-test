import 'react-loading-skeleton/dist/skeleton.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import AppRouter from './Routing';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(<AppRouter />);
