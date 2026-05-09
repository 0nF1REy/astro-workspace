import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter-shell">
      <p className="counter-shell__eyebrow">React component</p>
      <h2 className="counter-shell__title">Counter: {count}</h2>
      <p className="counter-shell__description">
        Um contador simples para testar React dentro do Astro.
      </p>

      <div className="counter-shell__actions">
        <button className="counter-shell__button" onClick={increment}>
          Incrementar
        </button>
        <button
          className="counter-shell__button counter-shell__button--ghost"
          onClick={decrement}
        >
          Decrementar
        </button>
      </div>
    </div>
  );
};

export default Counter;
