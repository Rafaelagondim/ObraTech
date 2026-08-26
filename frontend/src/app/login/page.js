import Image from "next/image";

export default function Login() {
  return (
    <main className="min-h-screen bg-[#F5F7F8] flex items-center justify-center px-6 py-12">
      <section className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10">

        <div className="flex justify-center mb-8">
          <Image
            src="/logo-obratech.png"
            alt="Logo ObraTech"
            width={320}
            height={240}
            className="w-64 h-auto object-contain"
            priority
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#123F4A]">
            Bem-vindo ao ObraTech
          </h1>

          <p className="mt-3 text-[#607D85]">
            Entre para acessar seus projetos e orçamentos.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-[#263238] mb-2"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/30"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-[#263238] mb-2"
            >
              Senha
            </label>

            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/30"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm font-medium text-[#123F4A] hover:text-[#FFC400]"
            >
              Esqueci minha senha
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#FFC400] py-3.5 text-[#123F4A] font-bold text-lg shadow-md transition-colors hover:bg-[#E6B000]"
          >
            Entrar
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-[#607D85]">
          Ainda não possui uma conta?
          <button
            type="button"
            className="ml-1 font-bold text-[#123F4A] hover:text-[#FFC400]"
          >
            Criar conta
          </button>
        </div>

      </section>
    </main>
  );
}