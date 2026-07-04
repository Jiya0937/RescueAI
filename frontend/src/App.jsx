import React, { useState } from 'react';
import Splash from './pages/Splash/Splash.jsx';
import LanguageSelection from './pages/Language/LanguageSelection.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import SOSPanel from './components/emergency/SOSPanel.jsx';

// Simple ErrorBoundary to catch and display rendering errors in UI
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 text-red-900 border border-red-200 rounded-3xl m-8 text-left font-sans">
          <h2 className="text-xl font-bold mb-2">Rendering Error Caught:</h2>
          <p className="font-mono text-sm mb-4 font-bold">{this.state.error ? this.state.error.toString() : 'Unknown Error'}</p>
          <pre className="text-xs bg-slate-900 text-slate-100 p-4 rounded-xl overflow-auto leading-relaxed max-h-96">
            {this.state.error && this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [language, setLanguage] = useState(null); // 'en' or 'hi'
  const [showSOS, setShowSOS] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
  };

  const handleResetLanguage = () => {
    setLanguage(null);
  };

  return (
    <div className="relative min-h-screen">
      {showSplash ? (
        <Splash onFinish={handleSplashFinish} />
      ) : (
        <>
          {language ? (
            <ErrorBoundary>
              <Dashboard 
                language={language} 
                onResetLanguage={handleResetLanguage} 
                onOpenSOS={() => setShowSOS(true)} 
              />
            </ErrorBoundary>
          ) : (
            <LanguageSelection 
              onSelectLanguage={handleSelectLanguage} 
              onOpenSOS={() => setShowSOS(true)} 
            />
          )}

          {showSOS && (
            <SOSPanel onClose={() => setShowSOS(false)} />
          )}
        </>
      )}
    </div>
  );
}

