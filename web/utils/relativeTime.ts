const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

const formatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

export function formatTimeAgo(date: Date) {
  const curr = new Date().getTime();
  const old = new Date(date).getTime();
  let duration = (old - curr) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      // eslint-disable-next-line $rulename
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}
