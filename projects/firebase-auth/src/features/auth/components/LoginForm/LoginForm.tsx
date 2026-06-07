import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  inMemoryPersistence,
  setPersistence,
} from "firebase/auth";
import { auth } from "@lib/firebase/client";
import { actions } from "astro:actions";
import styles from "./LoginForm.module.scss";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await setPersistence(auth, inMemoryPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const idToken = await userCredential.user.getIdToken();
      const { data, error: actionError } = await actions.signIn({ idToken });

      if (actionError) throw new Error(actionError.message);
      if (data?.success) window.location.href = "/dashboard";
    } catch (err: any) {
      console.error(err);
      setError("Email ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authCard}>
      <header>
        <h2>Login</h2>
        <p>Acesse a área restrita do sistema</p>
      </header>

      <form className={styles.authForm} onSubmit={handleLogin}>
        <div className={styles.group}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              id="email"
              placeholder="exemplo@shinsengumi.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="fa-solid fa-envelope"></i>
          </div>
        </div>

        <div className={styles.group}>
          <label htmlFor="password">Senha</label>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="fa-solid fa-lock"></i>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.submit} disabled={isLoading}>
          <i
            className={
              isLoading
                ? "fa-solid fa-circle-notch fa-spin"
                : "fa-solid fa-right-to-bracket"
            }
          ></i>
          <span>{isLoading ? "Validando..." : "Entrar no Sistema"}</span>
        </button>
      </form>

      <footer className={styles.footer}>
        <p>
          Ainda não tem acesso? <a href="/register">Solicitar registro</a>
        </p>
      </footer>
    </div>
  );
}
