import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verificarTokenSessao } from "@/lib/auth/session";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("obratech_session")?.value;

    if (!token) {
      return NextResponse.json(
        { erro: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const sessao = await verificarTokenSessao(token);

    if (!sessao) {
      return NextResponse.json(
        { erro: "Sessão inválida ou expirada." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      autenticado: true,
      usuario: {
        id: sessao.sub,
        nome: sessao.nome,
        email: sessao.email,
        tipo_usuario: sessao.tipo_usuario,
      },
    });
  } catch (erro) {
    console.error("Erro ao verificar sessão:", erro);

    return NextResponse.json(
      { erro: "Não foi possível verificar a sessão." },
      { status: 500 }
    );
  }
}