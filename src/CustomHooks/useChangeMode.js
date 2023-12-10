
import { useState } from 'react';

const useChangeMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return [isDarkMode, toggleMode];
};

export default useChangeMode;
