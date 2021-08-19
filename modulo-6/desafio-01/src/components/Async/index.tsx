import { useEffect, useState } from 'react';

export function Async(): JSX.Element {
  const [isButtonInvisible, setIsButtonInvisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonInvisible(true);
    }, 1000);
  }, []);

  return (
    <div>
      <div>Hello World</div>
      {!isButtonInvisible && <button type="button">Button</button>}
    </div>
  );
}
