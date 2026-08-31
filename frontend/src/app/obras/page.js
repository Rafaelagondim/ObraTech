"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MinhasObras() {
    const [obras, setObras] = useState([]);

    useEffect(() => {
    async function buscarObras() {
      const resposta = await fetch("/api/obras");
      const dados = await resposta.json();

      setObras(dados.obras);
    }

    buscarObras();
  }, []);

  return (
    <main className="min-h-screen bg-[#F5F7F8]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#123F4A]">
              Minhas Obras
            </h1>

            <p className="mt-2 text-[#607D85]">
              Acompanhe as obras cadastradas no ObraTech.
            </p>
          </div>

          <Link
            href="/obras/nova"
            className="rounded-xl bg-[#FFC400] px-5 py-3 font-semibold text-[#263238] transition hover:bg-[#E6B000]"
          >
            + Nova obra
          </Link>
        </div>

{obras.length === 0 ? (
  <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
    <h2 className="text-xl font-bold text-[#123F4A]">
      Nenhuma obra cadastrada ainda
    </h2>

    <p className="mt-2 text-[#607D85]">
      Cadastre sua primeira obra para começar a organizar seus projetos.
    </p>

    <Link
      href="/obras/nova"
      className="mt-5 inline-block rounded-xl bg-[#FFC400] px-5 py-3 font-semibold text-[#263238] transition hover:bg-[#E6B000]"
    >
      + Nova obra
    </Link>
  </div>
) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {obras.map((obra) => (
    <div
      key={obra.id}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold text-[#123F4A]">
        {obra.nome}
      </h2>

      <p className="mt-2 text-[#607D85]">
        {obra.cidade} - {obra.estado}
      </p>
      <p className="mt-3 text-sm text-[#607D85]">
  Área construída:{" "}
  {obra.area_construida_m2
    ? `${obra.area_construida_m2} m²`
    : "Não informada"}
</p>

<p className="mt-2 text-sm text-[#607D85]">
  Data de início:{" "}
  {obra.data_inicio
    ? new Date(obra.data_inicio).toLocaleDateString("pt-BR")
    : "Não informada"}
</p>

{obra.descricao && (
  <p className="mt-3 text-sm text-[#607D85]">
    {obra.descricao}
  </p>
)}
    </div>
  ))}
</div>
)}
      </div>
    </main>
  );
}