import { db } from "@lib/db";
import { Links } from "./config";

async function seed() {
  await db.insert(Links).values([
    {
      title: "Jashin-chan Dropkick — [LOCAL]",
      description:
        "Site oficial do anime Jashin-chan Dropkick, com notícias, personagens, episódios, vídeos promocionais, eventos e informações da franquia.",
      url: "https://jashinchan.com",
      isRead: true,
    },
    {
      title: "Kill la Kill — [LOCAL]",
      description:
        "Site oficial do anime Kill la Kill, produzido pelo Studio Trigger, contendo informações sobre a história, personagens, equipe, produtos e conteúdos promocionais.",
      url: "https://www.kill-la-kill.jp",
      isRead: false,
    },
    {
      title: "Fire Force — [LOCAL]",
      description:
        "Site oficial do anime Fire Force (Enen no Shouboutai), com detalhes sobre temporadas, personagens, notícias, trailers e materiais relacionados à série.",
      url: "https://fireforce-anime.jp",
      isRead: true,
    },
  ]);
}

seed()
  .then(() => {
    console.log("Seed finalizado com sucesso!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Erro no seed:", err);
    process.exit(1);
  });
