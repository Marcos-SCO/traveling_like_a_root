export function displayFormatDate(date: string): string {
  const [year, month, day] = date.slice(0, 10).split("-");

  return `${day}/${month}/${year}`;
}