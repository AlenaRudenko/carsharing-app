export const daysNaming = (tariffType: string, duration: number) => {
  if (tariffType === "DAY") {
    const time = Math.ceil(duration / (1000 * 3600 * 24));
    return time + " " + days[timeName(time)];
  } else {
    const time = duration / 60000;
    return time + " " + mins[timeName(time)];
  }
};
export const timeName = (count: number): "1" | "2" | "5" => {
  let key: "1" | "2" | "5" = "1";
  if (count === 0) {
    key = "5";
  } else if (count === 1 || (count > 20 && count % 10 === 1)) {
    key = "1";
  } else if (
    (count > 1 && count < 5) ||
    (count > 20 && count % 10 > 1 && count % 10 < 5)
  ) {
    key = "2";
  } else {
    key = "5";
  }

  return key;
};
const days = {
  1: "день",
  2: "дня",
  5: "дней",
};
const mins = {
  1: "минута",
  2: "минуты",
  5: "минут",
};
