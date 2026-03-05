import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
        Minifolio 2026
      </span>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Cotizador Inteligente para proyectos creativos
      </h1>
      <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
        Estima rangos en COP con criterios profesionales, captura leads y comparte resultados por WhatsApp.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/cotizador"
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Ir al cotizador
        </Link>
      </div>
    </main>
  );
}
