import { DateTime, Interval } from "luxon";

export const datenow = () => DateTime.now().toString();
export const datenowShort = () =>
  DateTime.now().toLocaleString(DateTime.DATE_SHORT);

// transform sql timestamptz to datetime-local (short)
const transformDateTime = (dt) => {
  const datetimelocalString = new Date(dt).toISOString();
  return datetimelocalString.slice(0, 16);
};

// process results from sql
export const processDateTime = (obj) => {
  if ("created_at" in obj) {
    obj["created_at"] = transformDateTime(obj["created_at"]);
  }

  if ("updated_at" in obj) {
    obj["updated_at"] = transformDateTime(obj["updated_at"]);
  }

  if ("sleep_start" in obj) {
    obj["sleep_start"] = transformDateTime(obj["sleep_start"]);
  }

  if ("sleep_end" in obj) {
    obj["sleep_end"] = transformDateTime(obj["sleep_end"]);
  }

  return obj;
};

// find weeks between 2 dates
export const WeeksBetween = (d1, d2) => {
  const alterD1 = DateTime.fromISO(d1);
  const d3 = new Date(d2).toISOString();
  const alterD2 = DateTime.fromISO(d3);
  const ts1 = alterD1.ts;
  const ts2 = alterD2.ts;

  return Math.round((ts1 - ts2) / (7 * 24 * 60 * 60 * 1000));
};

export const DaysBetween = (d1, d2) => {
  const alterD1 = DateTime.fromISO(d1);
  const d3 = new Date(d2).toISOString();
  const alterD2 = DateTime.fromISO(d3);
  const ts1 = alterD1.ts;
  const ts2 = alterD2.ts;

  return Math.round((ts1 - ts2) / (24 * 60 * 60 * 1000));
};
