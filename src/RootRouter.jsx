import React, { useState, useEffect } from 'react';
import App from './App.jsx';
import ProApp from './ProApp.jsx';

export default function RootRouter() {
  const checkIsProRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();

    return (
      path.startsWith('/pro') ||
      hash.startsWith('#/pro') ||
      hash.startsWith('#pro') ||
      search.includes('view=pro')
    );
  };

  const [isPro, setIsPro] = useState(checkIsProRoute());

  useEffect(() => {
    const handleLocationChange = () => {
      setIsPro(checkIsProRoute());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  if (isPro) {
    return <ProApp />;
  }

  return <App />;
}
