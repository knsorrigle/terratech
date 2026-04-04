import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './store/auth.ts';
import { LoadingScreen } from './components/LoadingScreen.tsx';
import HomePage from './pages/HomePage.tsx';
import HackLoom from './pages/HackLoom.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <LoadingScreen />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prompthon" element={<App />} />
          <Route path="/hackloom" element={<HackLoom />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
