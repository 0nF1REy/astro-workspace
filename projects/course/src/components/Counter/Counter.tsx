import { useState } from "react";
import styles from "./Counter.module.scss";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className={styles.counterShell}>
      <p className={styles.eyebrow}>React component</p>
      <h2 className={styles.title}>Counter: {count}</h2>
      <p className={styles.description}>
        Um contador simples para testar React dentro do Astro.
      </p>

      <div className={styles.actions}>
        <button className={styles.button} onClick={increment}>
          Incrementar
        </button>
        <button
          className={`${styles.button} ${styles.buttonGhost}`}
          onClick={decrement}
        >
          Decrementar
        </button>
      </div>
    </div>
  );
};

export default Counter;
