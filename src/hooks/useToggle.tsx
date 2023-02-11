import { useCallback, useState } from 'react';

const useToggle = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = useCallback((val: boolean) => setToggle(val), [toggle]);

  return {toggle, handleToggle};
};

export default useToggle;
