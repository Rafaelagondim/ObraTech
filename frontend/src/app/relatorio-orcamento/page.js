"use client";

// Importa recursos do React para armazenar dados
// e executar ações quando a página for carregada.
import { useEffect, useState } from "react";

// Permite ler informações presentes na URL.
import { useSearchParams } from "next/navigation";
// Formata valores numéricos como moeda brasileira.
 // Exemplo: 1200 vira R$ 1.200,00.
 function formatarMoeda(valor) {
   return new Intl.NumberFormat("pt-BR", {
     style: "currency",
     currency: "BRL",
   }).format(Number(valor) || 0);
 }
 // Formata uma data para o padrão brasileiro: dia/mês/ano.
// Exemplo: 17/10/2026.
function formatarData(data) {
  if (!data) return "Data não informada";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(data));
}
// Componente responsável pela página do relatório.
export default function RelatorioOrcamento() {
  // Obtém o ID da obra informado na URL.
  const searchParams = useSearchParams();
  const obraId = searchParams.get("obraId");

  // Armazena os dados retornados pela API.
  const [relatorio, setRelatorio] = useState(null);

  // Controla a mensagem de carregamento.
  const [carregando, setCarregando] = useState(true);

  // Armazena uma mensagem caso ocorra algum erro.
  const [erro, setErro] = useState("");

  // Consulta os dados do orçamento da obra.
  useEffect(() => {
    async function carregarRelatorio() {
      if (!obraId) {
        setErro("Nenhuma obra foi selecionada.");
        setCarregando(false);
        return;
      }

      try {
        const resposta = await fetch(
          `/api/relatorio-orcamento?obraId=${encodeURIComponent(obraId)}`
        );

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar o relatório.");
        }

        const dados = await resposta.json();

        setRelatorio(dados);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarRelatorio();
  }, [obraId]);

  // Exibe uma mensagem enquanto os dados são consultados.
  if (carregando) {
    return <main>Carregando relatório...</main>;
  }

  // Exibe uma mensagem se ocorrer algum problema.
  if (erro) {
    return <main>Erro: {erro}</main>;
  }

  // Por enquanto, apenas confirma que a API foi consultada.
 return (
  <main
    style={{
      padding: "32px",
      maxWidth: "1100px",
      margin: "0 auto",
      color: "#FFFFFF",
    }}
  >
    {/* Cabeçalho do relatório com o logotipo do ObraTech */}
{/* Cabeçalho profissional do relatório */}
<header
  style={{
    backgroundColor: "#FFFFFF",
    padding: "24px",
    borderRadius: "12px",
    borderBottom: "3px solid #FFC400",
    color: "#123F4A",
  }}
>
  {/* Logomarca e opção de impressão */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
      flexWrap: "wrap",
    }}
  >
    {/* Logomarca compacta do ObraTech */}
    <img
      src="/logo-obratech-relatorio.png"
      alt="Logomarca ObraTech"
      style={{
        width: "230px",
        height: "auto",
        objectFit: "contain",
      }}
    />

    {/* Link para imprimir ou salvar em PDF */}
    <button
      type="button"
      onClick={() => window.print()}
      style={{
        background: "transparent",
        border: "none",
        color: "#E87920",
        fontSize: "13px",
        textDecoration: "underline",
        cursor: "pointer",
      }}
    >
      🖨️ Imprimir / Salvar PDF
    </button>
  </div>

  {/* Linha divisória */}
  <div
    style={{
      height: "1px",
      backgroundColor: "#D8E0E2",
      margin: "20px 0",
    }}
  />

  {/* Título e descrição do relatório */}
  <div>
    <h1
      style={{
        fontSize: "26px",
        fontWeight: "bold",
        color: "#123F4A",
        marginBottom: "6px",
      }}
    >
      Relatório de Orçamento
    </h1>

    <p
      style={{
        fontSize: "14px",
        color: "#66757A",
      }}
    >
      Resumo financeiro da obra e seus ambientes.
    </p>
  </div>
</header>

    {/* Informações gerais da obra */}
   {/* Cartão com as informações gerais da obra */}
<section
  style={{
    marginTop: "24px",
    padding: "24px",
    backgroundColor: "#F3F6F6",
    borderRadius: "12px",
    border: "1px solid #D8E0E2",
    color: "#27383D",
  }}
>
  {/* Título do cartão */}
  <h2
    style={{
      fontSize: "20px",
      fontWeight: "bold",
      color: "#123F4A",
      marginBottom: "12px",
    }}
  >
    Dados da obra
  </h2>

  {/* Linha divisória */}
  <div
    style={{
      height: "1px",
      backgroundColor: "#D8E0E2",
      marginBottom: "16px",
    }}
  />

  {/* Informações recuperadas do banco de dados */}
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      fontSize: "14px",
    }}
  >
    <p>
      <strong>Nome:</strong>{" "}
      {relatorio?.obra?.nome || "Não informado"}
    </p>

    <p>
      <strong>Cidade:</strong>{" "}
      {relatorio?.obra?.cidade || "Não informada"}
    </p>

    <p>
      <strong>Estado:</strong>{" "}
      {relatorio?.obra?.estado || "Não informado"}
    </p>
  </div>
</section>

    {/* Lista dos ambientes cadastrados */}
    {/* Lista de ambientes e materiais em tabelas */}
<section style={{ marginTop: "32px" }}>
  <h2
    style={{
      fontSize: "22px",
      fontWeight: "bold",
      color: "#FFFFFF",
      marginBottom: "16px",
    }}
  >
    Orçamento por ambiente
  </h2>

  {/* Percorre os ambientes cadastrados */}
  {(relatorio?.ambientes || []).map((ambiente, indice) => (
    <article
      key={ambiente.id}
      style={{
        backgroundColor: "#FFFFFF",
        color: "#27383D",
        border: "1px solid #D8E0E2",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "20px",
      }}
    >
      {/* Nome e numeração do ambiente */}
      <h3
        style={{
          color: "#123F4A",
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        {String(indice + 1).padStart(2, "0")} — {ambiente.nome}
      </h3>

      {/* Permite visualizar a tabela em telas menores */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#F3F6F6" }}>
              {["Material", "Quantidade", "Preço unitário", "Subtotal"].map(
                (titulo) => (
                  <th
                    key={titulo}
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#123F4A",
                      borderBottom: "1px solid #D8E0E2",
                    }}
                  >
                    {titulo}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {/* Percorre os materiais do ambiente */}
            {(ambiente.materiais || []).map((material) => (
              <tr key={material.id}>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E5EAEB",
                  }}
                >
                  {material.nome}
                </td>

                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E5EAEB",
                  }}
                >
                  {material.quantidade} {material.unidade}
                </td>

                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E5EAEB",
                  }}
                >
                  {formatarMoeda(material.preco_unitario)}
                </td>

                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E5EAEB",
                    fontWeight: "bold",
                  }}
                >
                  {formatarMoeda(material.subtotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mensagem para ambientes sem materiais */}
      {(ambiente.materiais || []).length === 0 && (
        <p style={{ marginTop: "12px", fontSize: "14px" }}>
          Nenhum material cadastrado neste ambiente.
        </p>
      )}

      {/* Subtotal do ambiente */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "18px",
          paddingTop: "14px",
          borderTop: "2px solid #D8E0E2",
          color: "#123F4A",
          fontWeight: "bold",
          flexWrap: "wrap",
        }}
      >
        <span>Subtotal do ambiente:</span>

        <strong>
          {formatarMoeda(
            (ambiente.materiais || []).reduce(
              (total, material) =>
                total + Number(material.subtotal || 0),
              0
            )
          )}
        </strong>
      </div>
    </article>
  ))}
</section>
    {/* Total consolidado de todos os ambientes */}
    <section
      style={{
        marginTop: "32px",
        padding: "24px",
        backgroundColor: "#123F4A",
        color: "#ffffff",
        borderRadius: "10px",
      }}
    >
      <h2>Valor total da obra</h2>
      <p style={{ fontSize: "28px", fontWeight: "bold" }}>
        {formatarMoeda(relatorio?.totalGeral)}
      </p>
    </section>
    {/* Rodapé do relatório com a data de emissão */}
<footer
  style={{
    marginTop: "32px",
    textAlign: "right",
    fontSize: "14px",
    color: "#FFFFFF",
  }}
>
  Data do orçamento: {formatarData(new Date())}
</footer>
  </main>
);
}