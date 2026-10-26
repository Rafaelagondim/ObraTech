import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { criarTokenSessao } from "@/lib/auth/session";

export async function POST(request) {
  try {
    const { email, senha } = await request.json();

    if (
      typeof email !== "string" ||
      typeof senha !== "string" ||
      !email.trim() ||
      !senha
    ) {
      return NextResponse.json(
        { erro: "Informe o e-mail e a senha." },
        { status: 400 }
      );
    }

    const emailNormalizado = email.trim().toLowerCase();

    const resultado = await pool.query(
      `SELECT id, nome, email, senha, tipo_usuario
       FROM usuarios
       WHERE LOWER(email) = $1`,
      [emailNormalizado]
    );

    const usuario = resultado.rows[0];

    if (!usuario) {
      return NextResponse.json(
        { erro: "E-mail ou senha inválidos." },
        { status: 401 }
      );
    }

    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaValida) {
      return NextResponse.json(
        { erro: "E-mail ou senha inválidos." },
        { status: 401 }
      );
    }

    const token = await criarTokenSessao(usuario);

const resposta = NextResponse.json({
  mensagem: "Login realizado com sucesso.",
  usuario: {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo_usuario: usuario.tipo_usuario,
  },
});

resposta.cookies.set("obratech_session", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});

return resposta;

  } catch (erro) {
    console.error("Erro ao verificar login:", erro);

    return NextResponse.json(
      { erro: "Não foi possível verificar o login." },
      { status: 500 }
    );
  }
}