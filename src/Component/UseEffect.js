import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UseEffectDemo() {
  // useState to track the count for re-render
  const [count, setCount] = useState(0);

  // useEffect for initial render
  useEffect(() => {
    toast.info('Component is initially rendered!');

    // useEffect cleanup function (componentWillUnmount)
    return () => {
      toast.warn('Component is unmounted!');
    };
  }, []);

  // useEffect for re-render
  useEffect(() => {
    toast.success('Component has re-rendered!');
  }, [count]);

  return (
    <div>
      <h1>useEffect and useState Demo</h1>
      {/* Render ToastContainer to display toasts */}
      <ToastContainer />

      {/* Render content of the component */}
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
      </div>
    </div>
  );
}

export default UseEffectDemo;
