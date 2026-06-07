import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  inMemoryPersistence,
  setPersistence,
} from "firebase/auth";
import { auth } from "@lib/firebase/client";
import { actions } from "astro:actions";
import styles from "./RegisterForm.module.scss";

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
      await updateProfile(userCredential.user, { displayName: name });
      const idToken = await userCredential.user.getIdToken();
      const { data, error: actionError } = await actions.signIn({ idToken });

      if (actionError) throw new Error(actionError.message);
      if (data?.success) window.location.href = "/dashboard";
    } catch (err: any) {
      console.error(err);
      setError("Erro ao processar o cadastro. Verifique os dados inseridos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authCard}>
      <header>
        <h2>Criar Conta</h2>
        <p>Preencha os campos abaixo para registrar seu acesso</p>
      </header>

      <form className={styles.authForm} onSubmit={handleRegister}>
        <div className={styles.group}>
          <label htmlFor="name">Nome completo</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="name"
              placeholder="Ex: João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <i className="fa-solid fa-user"></i>
          </div>
        </div>

        <div className={styles.group}>
          <label htmlFor="email">E-mail</label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              id="email"
              placeholder="exemplo@dominio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="fa-solid fa-envelope"></i>
          </div>
        </div>

        <div className={styles.group}>
          <label htmlFor="password">Crie uma senha</label>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              id="password"
              placeholder="Mínimo 6 caracteres"
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
                : "fa-solid fa-user-plus"
            }
          ></i>
          <span>{isLoading ? "Processando..." : "Finalizar Cadastro"}</span>
        </button>
      </form>

      <footer className={styles.footer}>
        <p>
          Já possui cadastro? <a href="/signin">Fazer login</a>
        </p>
      </footer>
    </div>
  );
}
