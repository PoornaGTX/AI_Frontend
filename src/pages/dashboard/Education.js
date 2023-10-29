import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";

import {
  Loading,
  FormRow,
  FormRowSelect,
  Alert,
  EducationChartsContainer,
} from "../../components";

import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { educationData } from "../../components/EducationData";

import JsPDF from "jspdf";
import "jspdf-autotable";
import { AiFillPrinter } from "react-icons/ai";
import axios from "axios";

const Education = () => {
  const educationMap = {
    "School Not Attended": 1,
    "From Grade 1 To 7": 2,
    "Passed Grade 8": 3,
    "Passed OL": 4,
    "Passed AL": 5,
    "University Degree": 6,
    Other: 7,
  };

  const ageGroupValueMap = {
    "0-8": 1,
    "8-16": 2,
    "17-20": 3,
    "21-25": 4,
    "26-30": 5,
    "31-35": 6,
    "36-40": 7,
    "41-45": 8,
    "46-50": 9,
    "51-55": 10,
    "56-60": 11,
    "61-65": 12,
    "66-70": 13,
    "71-100": 14,
  };

  const EducationValues = [
    "School Not Attended",
    "From Grade 1 To 7",
    "Passed Grade 8",
    "Passed OL",
    "Passed AL",
    "University Degree",
    "Other",
  ];

  const educationAgeGroups = [
    "0-8",
    "8-16",
    "17-20",
    "21-25",
    "26-30",
    "31-35",
    "36-40",
    "41-45",
    "46-50",
    "51-55",
    "56-60",
    "61-65",
    "66-70",
    "71-100",
  ];

  const [ageGroup, setAgeGroup] = useState("0-8");
  const [education, setEducation] = useState("School Not Attended");
  const [year, setYear] = useState("");
  const [deathCount, setDeathCount] = useState();
  const [statData, setStatData] = useState({});
  const [statVisible, setStatVisible] = useState(false);

  const {
    showAlert,
    displayAlert,
    isEditing,
    isLoading,
    predcitEducation,
    predcitEducationaAll,
  } = useAppContext();

  useEffect(() => {}, []);
  if (isLoading) {
    return <Loading center />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ageGroup || !education || !year) {
      displayAlert();
      return;
    }

    if (isNaN(year)) {
      displayAlert();
      return;
    }

    function getDeathCountsByAgeAndEducation(ageGroup, education) {
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

    const data = getDeathCountsByAgeAndEducation(ageGroup, education);

    // Use the method value to get its numerical equivalent
    const educationvalue = educationMap[education];
    const age = ageGroupValueMap[ageGroup];

    console.log("dataa", educationvalue, age);

    predcitEducation(year, age, educationvalue);
    predcitEducationaAll(year, age, education);
    setStatData(data);
    setStatVisible(true);
  };

  const clearValue = () => {
    setAgeGroup("0-8");
    setEducation("School Not Attended");
    setYear("");
    setStatData();
    setStatVisible(false);
  };

  return (
    <>
      <Wrapper>
        <form className="form">
          <h4>Predict Suicide Death Count by Individuals' Education Level</h4>
          {showAlert && <Alert />}
          <div className="form-center">
            {/*position*/}

            <FormRowSelect
              name="AgeGroup"
              labelText="Age Group"
              value={ageGroup}
              handleChange={(e) => setAgeGroup(e.target.value)}
              list={educationAgeGroups}
            />
            {/* job type */}
            <FormRowSelect
              name="education"
              labelText="Education Level"
              value={education}
              handleChange={(e) => setEducation(e.target.value)}
              list={EducationValues}
            />

            <FormRow
              type="text"
              name="Year"
              value={year}
              handleChange={(e) => setYear(e.target.value)}
              pattern={true}
              placeholder="Year"
            />

            <div className="btn-container">
              <button
                type="submit"
                className="btn btn-block submit-btn"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                predict
              </button>
              <button
                className="btn btn-block clear-btn"
                onClick={(e) => {
                  e.preventDefault();
                  clearValue();
                }}
              >
                clear
              </button>
            </div>
          </div>
        </form>
      </Wrapper>
      {statVisible && (
        <EducationChartsContainer
          inputData={statData}
          value={education}
          ageGroup={ageGroup}
          year={year}
        />
      )}
    </>
  );
};

export default Education;
