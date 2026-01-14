import { useState, useEffect } from "react";

const Sandbox = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 500);

    const errorTimer = setTimeout(() => {
      setShowError(true);
    }, 1000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(errorTimer);
    };
  }, []);

  return (
    <div>
      <h1>React Testing Library Examples</h1>
      <p>You can search me with regular expression: 123-456-7890</p>
      {showError && (
        <p data-testid="delayed-error" style={{ color: "red" }}>
          This is a delayed error message!
        </p>
      )}
      <ul>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
      </ul>
      {showMessage && <p data-testid="delayed-message">Async message</p>}
    </div>
  );
};
export default Sandbox;
