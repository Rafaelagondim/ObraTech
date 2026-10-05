"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function AmbientesDaObra() {
  const params = useParams();
  const obraId = params.id;

  const [ambientes, setAmbientes] = useState([]);

  function calcularAreaPiso(largura, comprimento) {
  return Number(largura) * Number(comprimento);
}

function calcularPerimetro(largura, comprimento) {
  return 2 * (Number(largura) + Number(comprimento));
}

function calcularAreaParedes(largura, comprimento, altura) {
  const perimetro = calcularPerimetro(largura, comprimento);

  return perimetro * Number(altura);
}

function calcularAreaTeto(largura, comprimento) {
  return calcularAreaPiso(largura, comprimento);
}

  useEffect(() => {
  async function buscarAmbientes() {
    try {
      const resposta = await fetch(`/api/ambientes?obraId=${obraId}`);
      const dados = await resposta.json();

      setAmbientes(dados);
    } catch (erro) {
      console.error("Erro ao buscar ambientes:", erro);
    }
  }

  buscarAmbientes();
}, [obraId]);

  return (
    <main className="min-h-screen bg-[#F5F7F8] p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-[#123F4A]">
          Ambientes da obra
        </h1>

        <p className="mt-2 text-[#607D85]">
          Gerencie os ambientes cadastrados nesta obra.
        </p>

        <Link
        href={`/obras/${obraId}/ambientes/novo`}
        className="mt-6 inline-block rounded-xl bg-[#FFC400] px-5 
        py-3 font-semibold text-[#263238] transition 
        hover:bg-[#E6B000]"
        >
         + Novo ambiente
        </Link>

        <div className="mt-8 grid gap-4">
  {ambientes.map((ambiente) => (
    <div
      key={ambiente.id}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold text-[#123F4A]">
        {ambiente.nome}
      </h2>

      <p className="mt-3 text-[#607D85]">
        Largura: {ambiente.largura_m} m
      </p>

      <p className="text-[#607D85]">
        Comprimento: {ambiente.comprimento_m} m
      </p>

      <p className="text-[#607D85]">
        Altura: {ambiente.altura_m} m
      </p>

      <p className="mt-3 font-semibold text-[#123F4A]">
  Área do piso:{" "}
  {calcularAreaPiso(
    ambiente.largura_m,
    ambiente.comprimento_m
  ).toLocaleString("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}{" "}
  m²
</p>

<p className="mt-1 font-semibold text-[#123F4A]">
  Perímetro:{" "}
  {calcularPerimetro(
    ambiente.largura_m,
    ambiente.comprimento_m
  ).toLocaleString("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}{" "}
  m
</p>

<p className="mt-1 font-semibold text-[#123F4A]">
  Área das paredes:{" "}
  {calcularAreaParedes(
    ambiente.largura_m,
    ambiente.comprimento_m,
    ambiente.altura_m
  ).toLocaleString("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}{" "}
  m²
</p>

<p className="mt-1 font-semibold text-[#123F4A]">
  Área do teto:{" "}
  {calcularAreaTeto(
    ambiente.largura_m,
    ambiente.comprimento_m
  ).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}{" "}
  m²
</p>

    </div>
  ))}
</div>

      </div>
    </main>
  );
}