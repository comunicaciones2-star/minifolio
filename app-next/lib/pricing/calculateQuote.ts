import {
  baseRanges,
  complexityTiers,
  deliverablesByService,
  globalExtras,
  sectorMultipliers,
  serviceCaps,
  type ServiceType,
  urgencyMultipliers,
} from "@/lib/pricing/pricingConfig";
import type { QuoteFormValues } from "@/lib/validation/quoteSchema";
import { roundToNearest } from "@/lib/utils/money";

export type QuoteBreakdown = {
  baseMin: number;
  baseMax: number;
  sectorMultiplier: number;
  urgencyMultiplier: number;
  deliverablesMinAdd: number;
  deliverablesMaxAdd: number;
  extrasMinAdd: number;
  extrasMaxAdd: number;
  complexityMultiplier: number;
};

export type QuoteResult = {
  min: number;
  max: number;
  breakdown: QuoteBreakdown;
};

const getComplexityMultiplier = (piecesCount: number) => {
  const tier = complexityTiers.find((item) => piecesCount >= item.min && piecesCount <= item.max);
  return tier?.multiplier ?? 1;
};

const sumSelectedItems = (
  selectedIds: string[],
  collection: Array<{ id: string; minAdd: number; maxAdd: number }>
) => {
  return selectedIds.reduce(
    (acc, selectedId) => {
      const found = collection.find((item) => item.id === selectedId);
      if (!found) {
        return acc;
      }
      return {
        min: acc.min + found.minAdd,
        max: acc.max + found.maxAdd,
      };
    },
    { min: 0, max: 0 }
  );
};

export const calculateQuote = (values: QuoteFormValues): QuoteResult => {
  const service: ServiceType = values.service;
  const baseRange = baseRanges[service][values.companyType];

  const sectorMultiplier = sectorMultipliers[values.sector];
  const urgencyMultiplier = urgencyMultipliers[values.urgency];
  const complexityMultiplier = getComplexityMultiplier(values.piecesCount);

  const multipliedBaseMin = baseRange.min * sectorMultiplier * urgencyMultiplier;
  const multipliedBaseMax = baseRange.max * sectorMultiplier * urgencyMultiplier;

  const deliverablesCollection = deliverablesByService[service];
  const deliverablesAdded = sumSelectedItems(values.deliverables, deliverablesCollection);
  const extrasAdded = sumSelectedItems(values.extras, globalExtras);

  const subtotalMin = multipliedBaseMin + deliverablesAdded.min + extrasAdded.min;
  const subtotalMax = multipliedBaseMax + deliverablesAdded.max + extrasAdded.max;

  let finalMin = roundToNearest(subtotalMin * complexityMultiplier, 10_000);
  let finalMax = roundToNearest(subtotalMax * complexityMultiplier, 10_000);

  const caps = serviceCaps[service];
  finalMin = Math.max(caps.min, finalMin);
  finalMax = Math.min(caps.max, finalMax);

  if (finalMin > finalMax) {
    finalMin = roundToNearest(finalMax * 0.9, 10_000);
  }

  return {
    min: finalMin,
    max: finalMax,
    breakdown: {
      baseMin: baseRange.min,
      baseMax: baseRange.max,
      sectorMultiplier,
      urgencyMultiplier,
      deliverablesMinAdd: deliverablesAdded.min,
      deliverablesMaxAdd: deliverablesAdded.max,
      extrasMinAdd: extrasAdded.min,
      extrasMaxAdd: extrasAdded.max,
      complexityMultiplier,
    },
  };
};
