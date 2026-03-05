export const formatCOP = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
};

export const roundToNearest = (value: number, unit: number) => {
  return Math.round(value / unit) * unit;
};
