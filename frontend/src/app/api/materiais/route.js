import pool from "@/lib/db";

export async function POST(request) {
 try {
  const dados = await request.json();

  const {
    ambiente_id,
    nome,
    unidade,
    quantidade,
    preco_unitario,
    tipo_calculo,
  } = dados;

  const resultado = await pool.query(
   `INSERT INTO materiais (
      ambiente_id,
      nome,
      unidade,
      quantidade,
      preco_unitario,
      tipo_calculo
    )
    VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`,
[
  ambiente_id,
  nome,
  unidade,
  quantidade,
  preco_unitario,
  tipo_calculo
]
);

return Response.json(resultado.rows[0], { status: 201 });
 } catch (erro) {
    console.error("Erro ao cadastrar material:", erro);
    return Response.json(
  { erro: "Erro ao cadastrar material" },
  { status: 500 }
);
}
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ambienteId = searchParams.get("ambienteId");

  const resultado = await pool.query(
  `SELECT *
   FROM materiais
   WHERE ambiente_id = $1
   ORDER BY id DESC`,
  [ambienteId]
);

  return Response.json(resultado.rows);
}