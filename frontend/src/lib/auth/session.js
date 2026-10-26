import { SignJWT, jwtVerify } from "jose";

const segredo = process.env.SESSION_SECRET;

function obterChave() {
  if (!segredo || segredo.length < 32) {
    throw new Error("SESSION_SECRET não configurada corretamente.");
  }

  return new TextEncoder().encode(segredo);
}

export async function criarTokenSessao(usuario) {
  return new SignJWT({
    nome: usuario.nome,
    email: usuario.email,
    tipo_usuario: usuario.tipo_usuario,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(usuario.id))
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(obterChave());
}

export async function verificarTokenSessao(token) {
  try {
    const { payload } = await jwtVerify(token, obterChave(), {
      algorithms: ["HS256"],
    });

    return payload;
  } catch {
    return null;
  }
}