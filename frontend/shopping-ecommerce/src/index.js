  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { Provider } from 'react-redux';
  import { PersistGate } from 'redux-persist/integration/react';
  import App from './App';
  import store, { persistor } from './Store'; // Use default import for store
  import { positions, Provider as AlertProvider, transitions } from 'react-alert';
  import AlertTemplate from 'react-alert-template-basic';

  const options = {
    timeout: 5000,
    position: positions.TOP_RIGHT,
    transitions: transitions.SCALE,
  };

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </PersistGate>
    </Provider>
  );
