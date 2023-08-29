import { useState, useEffect } from 'react';

function getScreenResizing() {
  // const { clientWidth: width, clientHeight: height } = document.documentElement;
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useScreenResizing() {
  const [screenResizing, setScreenResizing] = useState(getScreenResizing());

  useEffect(() => {
    function handleResize() {
      setScreenResizing(getScreenResizing());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenResizing;
}
