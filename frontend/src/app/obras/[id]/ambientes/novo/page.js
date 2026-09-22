"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function NovoAmbiente() {
  const params = useParams();
  const obraId = params.id;

  const [nome, setNome] = useState("");
  const [largura, setLargura] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [altura, setAltura] = useState("");
  const [mensagem, setMensagem] = useState("");

  return (
    <main className="min-h-screen bg-[#F5F7F8] p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-[#123F4A]">
          Novo ambiente
        </h1>

        <p className="mt-2 text-[#607D85]">
          Cadastre um novo ambiente para esta obra.
        </p>

        <p className="mt-4 text-sm text-[#607D85]">
          Obra ID: {obraId}
        </p>

        <form className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm">
  <div>
    <label className="mb-2 block font-semibold text-[#263238]">
      Nome do ambiente
    </label>

    <input
      type="text"
      value={nome}
      onChange={(event) => setNome(event.target.value)}
      placeholder="Ex.: Sala, Quarto, Cozinha"
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-[#263238] placeholder:text-gray-400 outline-none"
    />
  </div>

  <div>
    <label className="mb-2 block font-semibold text-[#263238]">
      Largura (m)
    </label>

    <input
      type="number"
      step="0.01"
      value={largura}
      onChange={(event) => setLargura(event.target.value)}
      placeholder="Ex.: 4.00"
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-[#263238] placeholder:text-gray-400 outline-none"
    />
  </div>

  <div>
    <label className="mb-2 block font-semibold text-[#263238]">
      Comprimento (m)
    </label>

    <input
      type="number"
      step="0.01"
      value={comprimento}
      onChange={(event) => setComprimento(event.target.value)}
      placeholder="Ex.: 5.00"
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-[#263238] placeholder:text-gray-400 outline-none"
    />
  </div>

  <div>
    <label className="mb-2 block font-semibold text-[#263238]">
      Altura (m)
    </label>

    <input
      type="number"
      step="0.01"
      value={altura}
      onChange={(event) => setAltura(event.target.value)}
      placeholder="Ex.: 2.80"
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-[#263238] placeholder:text-gray-400 outline-none"
    />
  </div>

  <div className="flex gap-3 pt-3">
  <button
    type="button"
    className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-[#263238] transition hover:bg-gray-100"
  >
    Cancelar
  </button>

  <button
    type="submit"
    className="rounded-xl bg-[#FFC400] px-6 py-3 font-semibold text-[#263238] transition hover:bg-[#E6B000]"
  >
    Salvar ambiente
  </button>
</div>

</form>

      </div>
    </main>
  );
}