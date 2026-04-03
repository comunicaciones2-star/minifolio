import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos por WhatsApp o correo y cuéntanos tu proyecto de branding.",
  alternates: { canonical: "/contacto" },
  openGraph: { url: "/contacto", title: "Contacto | Jhon Fragozo" },
};
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SecondaryLink } from "@/components/ui/Buttons";

export default function ContactoPage() {
  return (
    <main>
      <Section className="pt-20 md:pt-24">
        <Card className="rounded-xl">
          <div className="space-y-5">
            <Badge>Contacto</Badge>
            <h1 className="text-h2 font-heading font-bold text-brand-primary">Conversemos sobre tu proximo proyecto</h1>
            <p className="text-body text-brand-neutral">
              Cuentame tu objetivo de negocio y te propongo una ruta de diseno clara, con alcance definido y orientacion a resultados.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-900/60">
                <p className="text-xs uppercase tracking-wide text-slate-500">WhatsApp</p>
                <p className="mt-1 text-body-lg font-semibold text-brand-primary">+57 304 319 5028</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-900/60">
                <p className="text-xs uppercase tracking-wide text-slate-500">Correo</p>
                <p className="mt-1 text-body-lg font-semibold text-brand-primary">hola@jhonfragozo.com</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <SecondaryLink className="px-4 py-2" href="https://wa.me/573043195028">
                Escribir por WhatsApp
              </SecondaryLink>
              <SecondaryLink className="px-4 py-2" href="mailto:hola@jhonfragozo.com">
                Enviar correo
              </SecondaryLink>
            </div>
          </div>
        </Card>
      </Section>
    </main>
  );
}