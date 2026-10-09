"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrcamentoAmbiente() {
  const params = useParams();
  const obraId = params.id;

  const searchParams = useSearchParams();
  const ambienteId = searchParams.get("ambienteId");

  const [nome, setNome] = useState("");
  const [unidade, setUnidade] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoUnitario, setPrecoUnitario] = useState("");
  const [tipoCalculo, setTipoCalculo] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(event) {
  event.preventDefault();

  const resposta = await fetch("/api/materiais", {
  method: "POST",
  headers: {
  "Content-Type": "application/json",
},
body: JSON.stringify({
  ambiente_id: Number(ambienteId),
  nome: nome,
  unidade: unidade,
  quantidade: Number(quantidade),
  preco_unitario: Number(precoUnitario),
  tipo_calculo: tipoCalculo,
}),
});

if (resposta.ok) {
  setMensagem("Material cadastrado com sucesso!");
}

}

  return (
    <main className="min-h-screen bg-[#F5F7F8] p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-[#123F4A]">
          Orçamento do ambiente
        </h1>

        <p className="mt-2 text-[#607D85]">
          Cadastre os materiais necessários para este ambiente.
        </p>

        <form
  onSubmit={handleSubmit}
  className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
>
  <label className="block font-semibold text-[#263238]">
    Nome do material
  </label>

  <input
    type="text"
    value={nome}
    onChange={(event) => setNome(event.target.value)}
    placeholder="Ex.: Piso cerâmico"
    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-[#263238] placeholder:text-gray-400 outline-none"
  />

  <label className="mt-5 block font-semibold text-[#263238]">
  Unidade de medida
</label>

<input
  type="text"
  value={unidade}
  onChange={(event) => setUnidade(event.target.value)}
  placeholder="Ex.: m², unidade, kg, saco"
  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-[#263238] placeholder:text-gray-400 outline-none"
/>

<label className="mt-5 block font-semibold text-[#263238]">
  Quantidade
</label>

<input
  type="number"
  step="0.01"
  value={quantidade}
  onChange={(event) => setQuantidade(event.target.value)}
  placeholder="Ex.: 20"
  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-[#263238] placeholder:text-gray-400 outline-none"
/>

<label className="mt-5 block font-semibold text-[#263238]">
  Preço unitário (R$)
</label>

<input
  type="number"
  step="0.01"
  value={precoUnitario}
  onChange={(event) => setPrecoUnitario(event.target.value)}
  placeholder="Ex.: 45,00"
  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-[#263238] placeholder:text-gray-400 outline-none"
/>

<label className="mt-5 block font-semibold text-[#263238]">
  Tipo de cálculo
</label>

<select
  value={tipoCalculo}
  onChange={(event) => setTipoCalculo(event.target.value)}
  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-[#263238] outline-none"
>
  <option value="">Selecione</option>
  <option value="piso">Piso</option>
  <option value="parede">Parede</option>
  <option value="unidade">Por unidade</option>
  <option value="manual">Quantidade manual</option>
</select>

<button
  type="submit"
  className="mt-6 w-full rounded-xl bg-[#FFC400] px-6 py-3 font-semibold text-[#263238] transition hover:bg-[#E6B000]"
>
  Adicionar material
</button>

{mensagem && (
  <p className="mt-4 rounded-xl bg-green-100 p-4 text-center font-semibold text-green-800">
    {mensagem}
  </p>
)}

</form>

        <Link
          href={`/obras/${obraId}/ambientes`}
          className="mt-6 inline-block text-sm font-semibold text-[#123F4A]"
        >
          ← Voltar para ambientes
        </Link>
      </div>
    </main>
  );
}