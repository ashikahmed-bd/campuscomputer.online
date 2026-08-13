export const $date = (date, options = {}) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("bn-BD", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...options,
  }).format(new Date(date));
};

// {{ $date(data?.date, { day: "2-digit", month: "short" }) }}
