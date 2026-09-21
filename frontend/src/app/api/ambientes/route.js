import pool from "@/lib/db";

export async function POST(request) {
  try {
    const dados = await request.json();

    const {
  obraId,
  nome,
  largura,
  comprimento,
  altura,
} = dados;

const resultado = await pool.query(
  `
    INSERT INTO ambientes (
      obra_id,
      nome,
      largura_m,
      comprimento_m,
      altura_m
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `,
  [
    obraId,
    nome,
    largura,
    comprimento,
    altura || null,
  ]
);

return Response.json(
  {
    mensagem: "Ambiente cadastrado com sucesso.",
    ambiente: resultado.rows[0],
  },
  { status: 201 }
);

  } catch (erro) {
    console.error("Erro ao cadastrar ambiente:", erro);

    return Response.json(
      {
        mensagem: "Erro ao cadastrar ambiente.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const resultado = await pool.query(`
      SELECT
        id,
        obra_id,
        nome,
        largura_m,
        comprimento_m,
        altura_m,
        criado_em
      FROM ambientes
      ORDER BY id;
    `);

    return Response.json(resultado.rows);
  } catch (erro) {
    console.error("Erro ao buscar ambientes:", erro);

    return Response.json(
      { mensagem: "Erro ao buscar ambientes." },
      { status: 500 }
    );
  }
}