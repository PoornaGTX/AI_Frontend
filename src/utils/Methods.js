import { mydata } from "../components/data";

export function getDeathCountsByAgeAndMethod(ageGroup, method) {
  const filteredData = mydata.filter(
    (entry) =>
      entry["Age Group"] === ageGroup &&
      entry["Method"] === method.replace(/\s+/g, "")
  );

  const deathCounts = filteredData.map((entry) => ({
    Year: entry.Year,
    DeathCount: entry["Death Count"],
  }));

  return deathCounts;
}
