import { DateTime } from "luxon";

export const datenow = () => DateTime.now().toString();

// transform sql timestamptz to datetime-local (short)
const transformDateTime = (dt) => {
  const datetimelocalString = new Date(dt).toISOString();
  return datetimelocalString.slice(0, 16);
};

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
