import Link from "next/link";
export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#F5F7F8]">
      <div className="flex min-h-screen">

        {/* Menu lateral */}
        <aside className="w-64 bg-[#123F4A] text-white p-6 hidden md:block">
          <h1 className="text-2xl font-bold mb-10">
            Obra<span className="text-[#FFC400]">Tech</span>
          </h1>

          <nav className="space-y-3">
            <button className="w-full text-left rounded-lg bg-[#FFC400] px-4 py-3 font-semibold text-[#123F4A]">
              Painel
            </button>

           <Link
  href="/obras"
  className="block w-full rounded-lg px-4 py-3 text-left hover:bg-white/10"
>
  Obras
</Link>

            <button className="w-full text-left rounded-lg px-4 py-3 hover:bg-white/10">
              Ambientes
            </button>

            <button className="w-full text-left rounded-lg px-4 py-3 hover:bg-white/10">
              Materiais
            </button>

            <button className="w-full text-left rounded-lg px-4 py-3 hover:bg-white/10">
              Orçamentos
            </button>
          </nav>
        </aside>

        {/* Conteúdo principal */}
        <section className="flex-1 p-6 md:p-10">

          {/* Cabeçalho */}
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-[#607D85]">
                Visão geral
              </p>

              <h2 className="text-3xl font-bold text-[#123F4A]">
                Painel de Controle
              </h2>
            </div>

            <Link
            href="/obras/nova"
            className="rounded-xl bg-[#FFC400] px-6 py-3 font-bold text-[#123F4A] shadow-md hover:bg-[#E6B000]"
            >
            + Nova obra
           </Link>
         </header>  

          {/* Indicadores */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-10">

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-[#607D85]">
                Obras cadastradas
              </p>

              <p className="mt-3 text-4xl font-bold text-[#123F4A]">
                0
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-[#607D85]">
                Ambientes
              </p>

              <p className="mt-3 text-4xl font-bold text-[#123F4A]">
                0
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-[#607D85]">
                Orçamentos
              </p>

              <p className="mt-3 text-4xl font-bold text-[#123F4A]">
                0
              </p>
            </div>

          </div>

          {/* Área de obras */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#123F4A]">
                  Suas obras
                </h3>

                <p className="text-sm text-[#607D85] mt-1">
                  Acompanhe os projetos cadastrados no ObraTech.
                </p>
              </div>
            </div>

            <div className="rounded-xl border-2 border-dashed border-gray-200 py-12 text-center">
              <p className="font-semibold text-[#123F4A]">
                Nenhuma obra cadastrada
              </p>

              <p className="mt-2 text-sm text-[#607D85]">
                Cadastre sua primeira obra para começar o planejamento.
              </p>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}