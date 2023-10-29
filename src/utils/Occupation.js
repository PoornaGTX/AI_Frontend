import { occupationData } from "../components/OccupationData";

export function getDeathCountsByAgeAndOccupation(ageGroup, occupation) {
  const filteredData = occupationData.filter(
    (entry) =>
      entry["Age Group"] === ageGroup &&
      entry["Occupation Level"] === occupation.replace(/\s+/g, "")
  );

  const deathCounts = filteredData.map((entry) => ({
    Year: entry.Year,
    DeathCount: entry["Death Count"],
  }));

  return deathCounts;
}
