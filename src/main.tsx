
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a performance monitoring function
const reportPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const performanceEntries = performance.getEntriesByType('navigation');
      
      if (performanceEntries.length > 0) {
        const navEntry = performanceEntries[0] as PerformanceNavigationTiming;
        
        // Log timing information
        console.log(`App loaded in ${navEntry.loadEventEnd - navEntry.startTime}ms`);
        console.log(`DOM Content Loaded: ${navEntry.domContentLoadedEventEnd - navEntry.startTime}ms`);
        console.log(`First Paint: ${performance.getEntriesByName('first-paint')[0]?.startTime || 'N/A'}ms`);
        console.log(`First Contentful Paint: ${performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 'N/A'}ms`);
      }
    });
  }
};

// In development mode, monitor performance
if (process.env.NODE_ENV !== 'production') {
  reportPerformance();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
