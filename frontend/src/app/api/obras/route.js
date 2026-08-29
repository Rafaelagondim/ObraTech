import pool from "@/lib/db";

export async function POST(request) {
  try {
    const dados = await request.json();

    const {
      nome,
      descricao,
      cidade,
      estado,
      areaConstruida,
      dataInicio,
    } = dados;

    const usuarioId = 1;

    const resultado = await pool.query(
      `
        INSERT INTO obras (
          usuario_id,
          nome,
          descricao,
          cidade,
          estado,
          area_construida_m2,
          data_inicio
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `,
      [
        usuarioId,
        nome,
        descricao || null,
        cidade,
        estado,
        areaConstruida || null,
        dataInicio || null,
      ]
    );

    return Response.json(
      {
        mensagem: "Obra salva com sucesso.",
        obra: resultado.rows[0],
      },
      { status: 201 }
    );
  } catch (erro) {
    console.error("Erro ao salvar obra:", erro);

    return Response.json(
      {
        mensagem: "Erro ao salvar obra.",
      },
      { status: 500 }
    );
  }
}