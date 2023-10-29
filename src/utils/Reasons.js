import { reasonData } from "../components/ReasonData";

export function getDeathCountsByAgeAndReason(ageGroup, reason) {
  const filteredData = reasonData.filter(
    (entry) =>
      entry["Age Group"] === ageGroup &&
      entry["Reason"] === reason.replace(/\s+/g, "")
  );

  const deathCounts = filteredData.map((entry) => ({
    Year: entry.Year,
    DeathCount: entry["Death Count"],
  }));

  return deathCounts;
}
