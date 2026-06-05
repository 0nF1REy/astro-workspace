import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  inMemoryPersistence,
  setPersistence,
} from "firebase/auth";
import { auth } from "@lib/firebase/client";
import { actions } from "astro:actions";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await setPersistence(auth, inMemoryPersistence);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      const idToken = await userCredential.user.getIdToken();

      const { data, error: actionError } = await actions.signIn({ idToken });

      if (actionError) {
        throw new Error(actionError.message);
      }

      if (data?.success) {
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      console.error(err);
      setError("Erro ao criar conta. Verifique os dados e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <header className="auth-card__header">
        <h2 className="auth-card__title">Criar Conta</h2>
        <p className="auth-card__subtitle">Junte-se à Shinsengumi</p>
      </header>

      <form className="auth-form" onSubmit={handleRegister}>
        <div className="auth-form__group">
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            id="name"
            placeholder="Sakata Gintoki"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="auth-form__group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="gin@yorozuya.com"
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
          {isLoading ? "Criando conta..." : "Registrar"}
        </button>
      </form>

      <footer className="auth-card__footer">
        <p>
          Já tem uma conta? <a href="/signin">Fazer login</a>
        </p>
      </footer>
    </div>
  );
}
