import { useEffect, useState } from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';

const Portal: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? ReactDOM.createPortal(children, document.body) : null;
};

export default Portal;
