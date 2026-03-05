import { Wizard } from "@/components/quote/Wizard";

export default function CotizadorPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <header className="mb-8 space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Cotizador Inteligente</h1>
        <p className="max-w-3xl text-sm text-slate-600 sm:text-base">
          Completa el wizard para obtener un rango estimado en COP según empresa, sector, alcance, urgencia y extras.
        </p>
      </header>
      <Wizard />
    </main>
  );
}
