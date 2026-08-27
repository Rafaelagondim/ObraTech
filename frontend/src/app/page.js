import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F7F8] flex items-center justify-center px-6">
      <section className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">

          {/* Lado esquerdo */}
          <div className="bg-[#123F4A] text-white flex flex-col justify-center px-8 py-12 md:px-12">

            <div className="mb-8">
              <span className="inline-block bg-[#FFC400] text-[#123F4A] px-4 py-2 rounded-full text-sm font-semibold">
                Gestão de obras
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Organize sua obra.
              <br />
              Planeje seus custos.
            </h1>

            <p className="text-lg text-white/80 leading-relaxed max-w-md">
              O ObraTech ajuda você a organizar ambientes,
              calcular materiais e acompanhar os custos da
              sua construção de forma simples e eficiente.
            </p>

          </div>

          {/* Lado direito */}
          <div className="flex flex-col items-center justify-center px-8 py-12 md:px-12">

            <div className="w-full max-w-sm flex justify-center mb-6">
              <Image
                src="/logo-obratech.png"
                alt="Logo ObraTech"
                width={400}
                height={300}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            <p className="text-[#263238] text-center text-lg mb-8">
              Sistema de Orçamento e Planejamento de Obras
            </p>

            <Link
              href="/login"
              className="w-full max-w-xs bg-[#FFC400] hover:bg-[#E6B000] text-[#123F4A] text-center font-bold py-4 px-6 rounded-xl transition-colors shadow-md"
            >
              Entrar
            </Link>

          </div>

        </div>
      </section>
    </main>
  );
}