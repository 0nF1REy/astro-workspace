export interface Character {
  id: string;
  image: string;
}

const BASE_PATH = "/assets/images/character/list";

export const characters: Character[] = [
  { id: "jsn", image: `${BASE_PATH}/chara_01_jsn.png` },
  { id: "yurine", image: `${BASE_PATH}/chara_02_yurine.png` },
  { id: "medusa", image: `${BASE_PATH}/chara_03_medusa.png` },
  { id: "minos", image: `${BASE_PATH}/chara_04_minos.png` },
  { id: "pekora", image: `${BASE_PATH}/chara_05_pekora2.png` },
  { id: "poporon", image: `${BASE_PATH}/chara_06_poporon.png` },
  { id: "peru2", image: `${BASE_PATH}/chara_07_peru2.png` },
  { id: "mei", image: `${BASE_PATH}/chara_08_mei.png` },
  { id: "kori", image: `${BASE_PATH}/chara_09_kori.png` },
  { id: "yusa", image: `${BASE_PATH}/chara_10_yusa.png` },
  { id: "chara11", image: `${BASE_PATH}/chara_11.png` },
  { id: "pino", image: `${BASE_PATH}/chara_12_pino.png` },
  { id: "kyonkyon", image: `${BASE_PATH}/chara_13_kyonkyon.png` },
  { id: "ranran", image: `${BASE_PATH}/chara_14_ranran.png` },
  { id: "chara15", image: `${BASE_PATH}/chara_15.png` },
  { id: "lier", image: `${BASE_PATH}/chara_16_lier.png` },
  { id: "ecute", image: `${BASE_PATH}/chara_17_ecute.png` },
  { id: "atore", image: `${BASE_PATH}/chara_18_atore.png` },
  { id: "peru1", image: `${BASE_PATH}/chara_19_peru1.png` },
  { id: "patora", image: `${BASE_PATH}/chara_20_patora.png` },
];
