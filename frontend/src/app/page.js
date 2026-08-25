export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <section className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-slate-900">
          OBRATECH
        </h1>

        <p className="mt-4 text-2xl font-medium text-slate-700">
          Sistema de Orçamento e Planejamento de Obras
        </p>

        <p className="mt-6 text-lg text-slate-600">
          Organize sua obra, planeje os ambientes e tenha mais controle
          sobre os custos do seu projeto.
        </p>

        <button className="mt-8 rounded-lg bg-slate-900 px-8 py-3 text-lg font-semibold text-white hover:bg-slate-700">
          Entrar
        </button>
      </section>
    </main>
  );
}