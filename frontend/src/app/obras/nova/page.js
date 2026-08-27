export default function NovaObra() {
  return (
    <main className="min-h-screen bg-[#F5F7F8] px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#607D85]">
            Cadastro de obra
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#123F4A]">
            Nova Obra
          </h1>

          <p className="mt-2 text-[#607D85]">
            Preencha as informações principais da obra para começar o planejamento.
          </p>
        </div>

        <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
          <form className="space-y-6">

            <div>
              <label
                htmlFor="nome"
                className="mb-2 block text-sm font-semibold text-[#263238]"
              >
                Nome da obra
              </label>

              <input
                id="nome"
                type="text"
                placeholder="Ex.: Casa Modelo Recife"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/30"
              />
            </div>

            <div>
              <label
                htmlFor="descricao"
                className="mb-2 block text-sm font-semibold text-[#263238]"
              >
                Descrição
              </label>

              <textarea
                id="descricao"
                rows="4"
                placeholder="Descreva brevemente a obra"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/30"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="cidade"
                  className="mb-2 block text-sm font-semibold text-[#263238]"
                >
                  Cidade
                </label>

                <input
                  id="cidade"
                  type="text"
                  placeholder="Ex.: Recife"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="estado"
                  className="mb-2 block text-sm font-semibold text-[#263238]"
                >
                  Estado
                </label>

                <input
                  id="estado"
                  type="text"
                  maxLength="2"
                  placeholder="Ex.: PE"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 uppercase outline-none focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/30"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="area"
                  className="mb-2 block text-sm font-semibold text-[#263238]"
                >
                  Área construída (m²)
                </label>

                <input
                  id="area"
                  type="number"
                  step="0.01"
                  placeholder="Ex.: 120.50"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="dataInicio"
                  className="mb-2 block text-sm font-semibold text-[#263238]"
                >
                  Data de início
                </label>

                <input
                  id="dataInicio"
                  type="date"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/30"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-[#263238] hover:bg-gray-50"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="rounded-xl bg-[#FFC400] px-6 py-3 font-bold text-[#123F4A] shadow-md hover:bg-[#E6B000]"
              >
                Salvar obra
              </button>
            </div>

          </form>
        </section>
      </div>
    </main>
  );
}