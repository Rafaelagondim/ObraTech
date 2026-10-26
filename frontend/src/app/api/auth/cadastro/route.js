import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const dados = await request.json();

    const { nome, email, senha } = dados;

    if (
      typeof nome !== "string" ||
      typeof email !== "string" ||
      typeof senha !== "string" ||
      !nome.trim() ||
      !email.trim() ||
      !senha
    ) {
      return NextResponse.json(
        { erro: "Nome, e-mail e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const emailNormalizado = email.trim().toLowerCase();

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado) ||
      senha.length < 8
    ) {
      return NextResponse.json(
        { erro: "Informe um e-mail válido e uma senha de pelo menos 8 caracteres." },
        { status: 400 }
      );
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    const resultado = await pool.query(
      `INSERT INTO usuarios (nome, email, senha, tipo_usuario)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nome, email, tipo_usuario`,
      [nome.trim(), emailNormalizado, senhaHash, "Usuário"]
    );

    return NextResponse.json(
      {
        mensagem: "Usuário cadastrado com sucesso.",
        usuario: resultado.rows[0],
      },
      { status: 201 }
    );
  } catch (erro) {
    if (erro.code === "23505") {
      return NextResponse.json(
        { erro: "Este e-mail já está cadastrado." },
        { status: 409 }
      );
    }

    console.error("Erro ao cadastrar usuário:", erro);

    return NextResponse.json(
      { erro: "Não foi possível cadastrar o usuário." },
      { status: 500 }
    );
  }
}