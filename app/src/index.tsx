import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core';

import type { MetaMask } from '@web3-react/metamask'
import reportWebVitals from './reportWebVitals';
import { hooks as metaMaskHooks, metaMask } from './metamask-connector';
import App from './App';

import './index.scss';
import { Layout } from './components/Layout/Layout';

const connectors: [MetaMask, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
]

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ReactProvider connectors={connectors}>
        <Layout>
          <App />
        </Layout>
      </Web3ReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
