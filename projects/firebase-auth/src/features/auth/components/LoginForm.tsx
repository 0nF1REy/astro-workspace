import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  inMemoryPersistence,
  setPersistence,
} from "firebase/auth";
import { auth } from "@lib/firebase/client";
import { actions } from "astro:actions";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
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

      if (actionError) {
        throw new Error(actionError.message);
      }

      if (data?.success) {
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      console.error("Erro ao logar:", err);
      setError("Email ou senha inválidos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <header className="auth-card__header">
        <h2 className="auth-card__title">Login</h2>
        <p className="auth-card__subtitle">Acesse a área restrita do sistema</p>
      </header>

      <form className="auth-form" onSubmit={handleLogin}>
        <div className="auth-form__group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="hijikata@shinsengumi.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-form__group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="auth-form__error">{error}</div>}

        <button
          type="submit"
          className="auth-form__submit"
          disabled={isLoading}
        >
          {isLoading ? "Validando credenciais..." : "Entrar no Sistema"}
        </button>
      </form>

      <footer className="auth-card__footer">
        <p>
          Ainda não tem acesso? <a href="/register">Solicitar registro</a>
        </p>
      </footer>
    </div>
  );
}
