import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { auth } from "@lib/firebase/server";

export const server = {
  // Ação para realizar o login e criar o cookie de sessão
  signIn: defineAction({
    accept: "json",
    input: z.object({
      idToken: z.string(),
    }),
    handler: async ({ idToken }, { cookies }) => {
      try {
        // 1. Verificamos se o token enviado pelo navegador é válido
        const decodedToken = await auth.verifyIdToken(idToken);

        if (!decodedToken) {
          throw new Error("Token inválido");
        }

        // 2. Criamos um Cookie de Sessão do Firebase (Duração: 5 dias)
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookie = await auth.createSessionCookie(idToken, {
          expiresIn,
        });

        // 3. Setamos o cookie no navegador do usuário
        cookies.set("__session", sessionCookie, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: expiresIn / 1000,
        });

        return { success: true };
      } catch (error) {
        console.error("Erro no SignIn Action:", error);
        throw new Error("Falha na autenticação do servidor");
      }
    },
  }),

  // Ação para limpar o cookie e deslogar o usuário
  signOut: defineAction({
    handler: async (_, { cookies }) => {
      cookies.delete("__session", { path: "/" });
      return { success: true };
    },
  }),
};
