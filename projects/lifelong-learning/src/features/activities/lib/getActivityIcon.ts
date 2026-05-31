export function getActivityIcon(type?: string): string {
  const typeLower = type ? type.toLowerCase() : "";
  const fallback = "fa-heart";

  if (
    typeLower.includes("muscul") ||
    typeLower.includes("força") ||
    typeLower.includes("forca")
  )
    return "fa-dumbbell";

  if (
    typeLower.includes("corrid") ||
    typeLower.includes("correr") ||
    typeLower.includes("run") ||
    typeLower.includes("running")
  )
    return "fa-person-running";

  if (
    typeLower.includes("cicli") ||
    typeLower.includes("biciclet") ||
    typeLower.includes("bike") ||
    typeLower.includes("biking")
  )
    return "fa-bicycle";

  if (typeLower.includes("caminh") || typeLower.includes("walk"))
    return "fa-person-walking";

  if (
    typeLower.includes("nat") ||
    typeLower.includes("natação") ||
    typeLower.includes("natacao") ||
    typeLower.includes("swim") ||
    typeLower.includes("nadar")
  )
    return "fa-swimmer";

  if (typeLower.includes("yoga") || typeLower.includes("pilates"))
    return "fa-spa";

  if (
    typeLower.includes("remo") ||
    typeLower.includes("remar") ||
    typeLower.includes("rowing")
  )
    return "fa-ship";

  if (
    typeLower.includes("escal") ||
    typeLower.includes("escalada") ||
    typeLower.includes("climb")
  )
    return "fa-mountain";

  if (
    typeLower.includes("patin") ||
    typeLower.includes("patinação") ||
    typeLower.includes("patinacao") ||
    typeLower.includes("skate")
  )
    return "fa-person-skating";

  if (
    typeLower.includes("dan") ||
    typeLower.includes("dança") ||
    typeLower.includes("danca") ||
    typeLower.includes("dance")
  )
    return "fa-music";

  if (typeLower.includes("boxe") || typeLower.includes("boxing"))
    return "fa-fist-raised";

  if (
    typeLower.includes("trilh") ||
    typeLower.includes("trilha") ||
    typeLower.includes("hike") ||
    typeLower.includes("hiking")
  )
    return "fa-hiking";

  return fallback;
}
