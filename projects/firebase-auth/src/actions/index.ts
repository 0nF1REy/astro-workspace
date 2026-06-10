import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { auth } from "@lib/firebase/server";

export const server = {
  signIn: defineAction({
    accept: "json",
    input: z.object({
      idToken: z.string(),
    }),
    handler: async ({ idToken }, { cookies }) => {
      try {
        const decodedToken = await auth.verifyIdToken(idToken);

        if (!decodedToken) {
          throw new Error("Token inválido");
        }

        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookie = await auth.createSessionCookie(idToken, {
          expiresIn,
        });

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
        throw new Error("Falha na autenticação do servidor", { cause: error });
      }
    },
  }),

  signOut: defineAction({
    handler: async (_, { cookies }) => {
      cookies.delete("__session", { path: "/" });
      return { success: true };
    },
  }),
};
