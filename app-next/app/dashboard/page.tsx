"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Section } from "@/components/ui/Section";
import { FilterBar, type LeadFilter } from "@/components/dashboard/FilterBar";
import { LeadsTable, type DashboardLead } from "@/components/dashboard/LeadsTable";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { LeadTimeline } from "@/components/dashboard/LeadTimeline";
import { PipelineBoard } from "@/components/dashboard/PipelineBoard";
import type { LeadPriority } from "@/components/dashboard/PriorityBadge";
import type { LeadStatus } from "@/components/dashboard/StatusBadge";
import { formatCOP } from "@/lib/utils/money";

const LEADS_KEY = "minifolio:leads:v1";
const STATUS_KEY = "minifolio:lead-status:v1";
const DASHBOARD_AUTH_KEY = "minifolio:dashboard:auth";
const DASHBOARD_PIN = process.env.NEXT_PUBLIC_DASHBOARD_PIN ?? "0426";

type RawLead = {
  id?: string;
  createdAt?: string;
  service?: string;
  budget?: {
    range?: { min?: number; max?: number };
  };
  quoteMin?: number;
  quoteMax?: number;
  lead?: {
    name?: string;
    phone?: string;
    email?: string;
    company?: string;
  };
  data?: {
    service?: string;
    leadName?: string;
    leadContact?: string;
  };
};

const safeRead = (key: string) => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
};

function calculateScore(lead: DashboardLead) {
  let score = 0;

  if (lead.priceMax >= 8_000_000) {
    score += 40;
  } else if (lead.priceMax >= 3_000_000) {
    score += 25;
  } else {
    score += 10;
  }

  if (lead.service.toLowerCase().includes("branding") || lead.service.toLowerCase().includes("estrateg")) {
    score += 20;
  } else {
    score += 10;
  }

  if (lead.phone) {
    score += 20;
  }

  const recentThreshold = Date.now() - 1000 * 60 * 60 * 48;
  const createdAt = Number(new Date(lead.createdAt || "").getTime());
  if (createdAt && createdAt >= recentThreshold) {
    score += 20;
  }

  return Math.min(100, score);
}

function calculatePriority(score: number): LeadPriority {
  if (score >= 70) {
    return "Alta";
  }

  if (score >= 45) {
    return "Media";
  }

  return "Baja";
}

function calculateNextFollowUp(createdAt: string, status: LeadStatus) {
  const date = new Date(createdAt);

  if (status === "new") {
    date.setDate(date.getDate() + 1);
  } else if (status === "contacted") {
    date.setDate(date.getDate() + 2);
  } else {
    date.setDate(date.getDate() + 7);
  }

  return date.toISOString();
}

const normalizeLeads = (raw: unknown, statusById: Record<string, LeadStatus>) => {
  const payload = raw as { leads?: RawLead[] } | RawLead[] | null;
  const source = Array.isArray(payload) ? payload : Array.isArray(payload?.leads) ? payload.leads : [];

  return source
    .map((item, index) => {
      const id = item.id ?? `${item.createdAt ?? "lead"}-${index}`;
      const name = item.lead?.name ?? item.data?.leadName ?? "Lead";
      const company = item.lead?.company ?? "Empresa no especificada";
      const phone = item.lead?.phone ?? item.data?.leadContact ?? "";
      const service = item.service ?? item.data?.service ?? "Servicio no especificado";
      const priceMin = item.budget?.range?.min ?? item.quoteMin ?? 0;
      const priceMax = item.budget?.range?.max ?? item.quoteMax ?? 0;
      const status = statusById[id] ?? "new";
      const lead: DashboardLead = {
        id,
        createdAt: item.createdAt ?? new Date().toISOString(),
        name,
        company,
        phone,
        service,
        priceMin,
        priceMax,
        score: 0,
        priority: "Baja",
        status,
        nextFollowUpAt: calculateNextFollowUp(item.createdAt ?? new Date().toISOString(), status),
        whatsappUrl: `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${name}, te escribo sobre tu cotización de ${service}.`)}`,
      };

      const score = calculateScore(lead);

      return {
        ...lead,
        score,
        priority: calculatePriority(score),
      };
    })
    .sort((a, b) => b.score - a.score);
};

export default function DashboardPage() {
  const [leads, setLeads] = useState<DashboardLead[]>([]);
  const [filter, setFilter] = useState<LeadFilter>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "recent" | "price">("score");
  const [boardView, setBoardView] = useState<"pipeline" | "timeline">("pipeline");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = window.sessionStorage.getItem(DASHBOARD_AUTH_KEY) === "1";
      setIsAuthorized(auth);
    }

    const statusById = (safeRead(STATUS_KEY) as Record<string, LeadStatus> | null) ?? {};
    const rawLeads = safeRead(LEADS_KEY);
    setLeads(normalizeLeads(rawLeads, statusById));
  }, []);

  const byStatus = useMemo(
    () => ({
      new: leads.filter((lead) => lead.status === "new").length,
      contacted: leads.filter((lead) => lead.status === "contacted").length,
      closed: leads.filter((lead) => lead.status === "closed").length,
    }),
    [leads],
  );

  const visibleLeads = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = leads.filter((lead) => {
      const passStatus = filter === "all" || lead.status === filter;
      const passSearch =
        !normalizedSearch ||
        lead.name.toLowerCase().includes(normalizedSearch) ||
        lead.service.toLowerCase().includes(normalizedSearch) ||
        lead.phone.toLowerCase().includes(normalizedSearch);

      return passStatus && passSearch;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      if (sortBy === "price") {
        return b.priceMax - a.priceMax;
      }

      return b.score - a.score;
    });
  }, [filter, leads, search, sortBy]);

  const highScoreLeads = useMemo(() => leads.filter((lead) => lead.score >= 70).length, [leads]);
  const pipelineValue = useMemo(() => leads.reduce((acc, lead) => acc + lead.priceMax, 0), [leads]);
  const closeRate = useMemo(() => {
    if (!leads.length) {
      return 0;
    }
    return Math.round((byStatus.closed / leads.length) * 100);
  }, [byStatus.closed, leads.length]);
  const todayFocus = useMemo(
    () => leads.filter((lead) => lead.status !== "closed").sort((a, b) => b.score - a.score).slice(0, 3),
    [leads],
  );

  const handleStatusChange = (leadId: string, status: LeadStatus) => {
    setLeads((prev) => {
      const next = prev.map((lead) => (lead.id === leadId ? { ...lead, status } : lead));
      if (typeof window !== "undefined") {
        const statusMap = next.reduce<Record<string, LeadStatus>>((acc, lead) => {
          acc[lead.id] = lead.status;
          return acc;
        }, {});
        window.localStorage.setItem(STATUS_KEY, JSON.stringify(statusMap));
      }
      return next;
    });
  };

  const handlePinSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pinInput.trim() !== DASHBOARD_PIN) {
      setPinError("PIN incorrecto");
      return;
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(DASHBOARD_AUTH_KEY, "1");
    }
    setPinError("");
    setIsAuthorized(true);
  };

  if (!isAuthorized) {
    return (
      <main>
        <Section className="pb-20 pt-20 md:pt-24">
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h1 className="text-lg font-semibold text-[var(--primary)]">Acceso privado</h1>
            <p className="mt-2 text-sm text-[var(--neutral)]">Ingresa el PIN para abrir el dashboard.</p>

            <form className="mt-4 space-y-3" onSubmit={handlePinSubmit}>
              <input
                type="password"
                value={pinInput}
                onChange={(event) => setPinInput(event.target.value)}
                placeholder="PIN"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              />
              {pinError ? <p className="text-xs text-red-600">{pinError}</p> : null}
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Entrar
              </button>
            </form>
          </div>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <Section className="pb-20 pt-16 md:pt-20">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--primary)]">Dashboard de Agencia</h1>
            <p className="mt-1 text-sm text-[var(--neutral)]">
              {leads.length} leads totales • {highScoreLeads} priorizados
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard title="Leads activos" value={String(byStatus.new + byStatus.contacted)} hint="Prospectos en gestión" />
          <KpiCard title="Valor pipeline" value={formatCOP(pipelineValue)} hint="Suma de máximos estimados" />
          <KpiCard title="Tasa de cierre" value={`${closeRate}%`} hint="Leads cerrados sobre total" />
          <KpiCard title="Alta prioridad" value={String(highScoreLeads)} hint="Score igual o superior a 70" />
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.7fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBoardView("pipeline")}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  boardView === "pipeline"
                    ? "border-[var(--secondary)] bg-blue-50 text-[var(--secondary)] dark:bg-blue-950/40"
                    : "border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                Vista Pipeline
              </button>
              <button
                type="button"
                onClick={() => setBoardView("timeline")}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  boardView === "timeline"
                    ? "border-[var(--secondary)] bg-blue-50 text-[var(--secondary)] dark:bg-blue-950/40"
                    : "border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                Vista Timeline
              </button>
            </div>

            {boardView === "pipeline" ? <PipelineBoard leads={leads} /> : <LeadTimeline leads={leads} />}
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-base font-semibold text-[var(--primary)]">Foco del día</h2>
            <p className="mt-1 text-xs text-[var(--neutral)]">Leads con mejor potencial para contactar primero.</p>

            <div className="mt-3 space-y-2">
              {todayFocus.length === 0 ? (
                <p className="text-sm text-[var(--neutral)]">Aún no hay leads en seguimiento.</p>
              ) : (
                todayFocus.map((lead) => (
                  <article key={lead.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
                    <p className="text-sm font-semibold text-[var(--primary)]">{lead.name}</p>
                    <p className="mt-0.5 text-xs text-[var(--neutral)]">{lead.company}</p>
                    <p className="mt-1 text-xs text-[var(--neutral)]">{lead.service}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-[var(--primary)]">Score {lead.score}</span>
                      <a
                        href={lead.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Contactar
                      </a>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>

        <FilterBar activeFilter={filter} total={leads.length} byStatus={byStatus} onChange={setFilter} />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nombre, servicio o teléfono"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 md:max-w-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          />
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as "score" | "recent" | "price")}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="score">Ordenar por score</option>
            <option value="recent">Ordenar por más recientes</option>
            <option value="price">Ordenar por precio alto</option>
          </select>
        </div>

        <div className="mt-4">
          <LeadsTable leads={visibleLeads} onStatusChange={handleStatusChange} />
        </div>
      </Section>
    </main>
  );
}
