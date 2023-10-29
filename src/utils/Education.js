import { educationData } from "../components/EducationData";

export function getDeathCountsByAgeAndEducation(ageGroup, education) {
  const filteredData = educationData.filter(
    (entry) =>
      entry["Age Group"] === ageGroup &&
      entry["Education Level"] === education.replace(/\s+/g, "")
  );

  const deathCounts = filteredData.map((entry) => ({
    Year: entry.Year,
    DeathCount: entry["Death Count"],
  }));

  return deathCounts;
}
