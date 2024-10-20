import './index.css';
import '@xyflow/react/dist/style.css';
import 'reactflow/dist/style.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ReactFlowProvider } from '@xyflow/react';

import { store } from './redux/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ReactFlowProvider>
  </React.StrictMode>,
);
