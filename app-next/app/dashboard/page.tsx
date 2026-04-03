"use client";

import { useEffect, useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { FilterBar, type LeadFilter } from "@/components/dashboard/FilterBar";
import { LeadsTable, type DashboardLead } from "@/components/dashboard/LeadsTable";
import type { LeadStatus } from "@/components/dashboard/StatusBadge";

const LEADS_KEY = "minifolio:leads:v1";
const STATUS_KEY = "minifolio:lead-status:v1";

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

const normalizeLeads = (raw: unknown, statusById: Record<string, LeadStatus>) => {
  const payload = raw as { leads?: RawLead[] } | RawLead[] | null;
  const source = Array.isArray(payload) ? payload : Array.isArray(payload?.leads) ? payload.leads : [];

  return source
    .map((item, index) => {
      const id = item.id ?? `${item.createdAt ?? "lead"}-${index}`;
      const name = item.lead?.name ?? item.data?.leadName ?? "Lead";
      const phone = item.lead?.phone ?? item.data?.leadContact ?? "";
      const service = item.service ?? item.data?.service ?? "Servicio no especificado";
      const priceMin = item.budget?.range?.min ?? item.quoteMin ?? 0;
      const priceMax = item.budget?.range?.max ?? item.quoteMax ?? 0;
      const lead: DashboardLead = {
        id,
        createdAt: item.createdAt ?? new Date().toISOString(),
        name,
        phone,
        service,
        priceMin,
        priceMax,
        score: 0,
        status: statusById[id] ?? "new",
        whatsappUrl: `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${name}, te escribo sobre tu cotización de ${service}.`)}`,
      };

      return {
        ...lead,
        score: calculateScore(lead),
      };
    })
    .sort((a, b) => b.score - a.score);
};

export default function DashboardPage() {
  const [leads, setLeads] = useState<DashboardLead[]>([]);
  const [filter, setFilter] = useState<LeadFilter>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "recent" | "price">("score");

  useEffect(() => {
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

  return (
    <main>
      <Section className="pb-20 pt-16 md:pt-20">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--primary)]">Leads</h1>
            <p className="mt-1 text-sm text-[var(--neutral)]">
              {leads.length} leads totales • {highScoreLeads} con score alto
            </p>
          </div>
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
