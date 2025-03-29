
import React from 'react';
import { PuffView } from './views/puff';
import { ContextProvider } from './contexts/ContextProvider';
import Notifications from './components/Notification';
import { Footer } from './components/Footer';
import './styles/globals.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ContextProvider>
        <Notifications />
        <PuffView />
        <Footer />
      </ContextProvider>
    </div>
  );
}

export default App;
