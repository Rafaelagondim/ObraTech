import pool from "@/lib/db";

// Esta API será responsável por consultar os dados
// necessários para gerar o orçamento completo de uma obra.
//
// Utilizaremos a conexão com o PostgreSQL que já existe
// no ObraTech, sem criar uma nova conexão.

export async function GET(request) {
  try {
    // Obtém os parâmetros enviados na URL.
    const { searchParams } = new URL(request.url);

    // Identifica a obra cujo orçamento será consultado.
    const obraId = searchParams.get("obraId");

    // Verifica se o ID da obra foi informado.
    if (!obraId || !/^[1-9]\d*$/.test(obraId)) {
      return Response.json(
        { erro: "Informe um ID de obra válido." },
        { status: 400 }
      );
    }

    // Consulta os dados da obra no PostgreSQL.
    // O parâmetro $1 recebe o ID informado na URL.
    const resultado = await pool.query(
      `
      SELECT
        id,
        nome,
        descricao,
        cidade,
        estado,
        area_construida_m2,
        data_inicio,
        criado_em
      FROM obras
      WHERE id = $1
      `,
      [obraId]
    );

    // Verifica se a obra foi encontrada.
    if (resultado.rows.length === 0) {
      return Response.json(
        { erro: "Obra não encontrada." },
        { status: 404 }
      );
    }

    // Busca todos os ambientes vinculados à obra.
    // O campo obra_id relaciona cada ambiente à sua obra.
    const resultadoAmbientes = await pool.query(
      `
      SELECT
        id,
        obra_id,
        nome,
        largura_m,
        comprimento_m,
        altura_m
      FROM ambientes
      WHERE obra_id = $1
      ORDER BY id
      `,
      [obraId]
    );

    // Busca os materiais de todos os ambientes da obra.
    // O JOIN relaciona cada material ao seu ambiente.
    // A condição WHERE limita a consulta à obra solicitada.
    const resultadoMateriais = await pool.query(
      `
      SELECT
        m.id,
        m.ambiente_id,
        m.nome,
        m.unidade,
        m.quantidade,
        m.preco_unitario,
        m.tipo_calculo,

        -- Calcula o subtotal de cada material.
        -- COALESCE considera zero quando algum valor é nulo.
        (COALESCE(m.quantidade, 0) *
         COALESCE(m.preco_unitario, 0)) AS subtotal

      FROM materiais AS m
      INNER JOIN ambientes AS a
        ON m.ambiente_id = a.id
      WHERE a.obra_id = $1
      ORDER BY a.id, m.id
      `,
      [obraId]
    );

    // Organiza os materiais dentro dos seus respectivos ambientes.
    const ambientesComMateriais = resultadoAmbientes.rows.map((ambiente) => {

      // Seleciona apenas os materiais pertencentes ao ambiente atual.
      const materiaisDoAmbiente = resultadoMateriais.rows.filter(
        (material) => Number(material.ambiente_id) === Number(ambiente.id)
      );

      // Soma os subtotais dos materiais deste ambiente.
      // A conversão para Number é necessária porque o PostgreSQL
      // pode retornar valores do tipo NUMERIC como texto.
      const subtotalAmbiente = materiaisDoAmbiente.reduce(
        (total, material) => total + Number(material.subtotal),
        0
      );

      // Retorna o ambiente com seus materiais e subtotal.
      return {
        ...ambiente,
        materiais: materiaisDoAmbiente,
        subtotal: Number(subtotalAmbiente.toFixed(2)),
      };
    });

    // Soma os subtotais de todos os ambientes da obra.
    const totalGeral = ambientesComMateriais.reduce(
      (total, ambiente) => total + ambiente.subtotal,
      0
    );

    // Retorna os dados organizados para o futuro relatório em PDF.
    return Response.json({
      obra: resultado.rows[0],
      ambientes: ambientesComMateriais,
      totalGeral: Number(totalGeral.toFixed(2)),
    });

  } catch (error) {
    // Registra possíveis erros no terminal do servidor.
    console.error("Erro ao consultar relatório:", error);

    return Response.json(
      { erro: "Erro ao consultar o orçamento da obra." },
      { status: 500 }
    );
  }
}