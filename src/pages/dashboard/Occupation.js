import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";

import {
  Loading,
  FormRow,
  FormRowSelect,
  Alert,
  OccupationChartContainer,
} from "../../components";

import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { occupationData } from "../../components/OccupationData";

import JsPDF from "jspdf";
import "jspdf-autotable";
import { AiFillPrinter } from "react-icons/ai";
import axios from "axios";

const Occupation = () => {
  const occupationMap = {
    "Professional Technical And Related Workers": 1,
    "Administrative Executive Managerial And Related Workers": 2,
    "Clerical And Related Workers": 3,
    "Sales Workers": 4,
    "Service Workers": 5,
    "Agricultural AnimalHusbandry Fisherman And related Forestry Workers": 6,
    "Production Process Workers Craftsman And RelatedWorkers Transport Equipment Operators And Labourers": 7,
    ArmedServices: 8,
    Police: 9,
    "Security Personnel": 10,
    Pensioners: 11,
    Students: 12,
    Politicians: 13,
    "Unemployed Persons": 14,
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

  const OccupationValues = [
    "Professional Technical And Related Workers",
    "Administrative Executive Managerial And Related Workers",
    "Clerical And Related Workers",
    "Sales Workers",
    "Service Workers",
    "Agricultural AnimalHusbandry Fisherman And related Forestry Workers",
    "Production Process Workers Craftsman And RelatedWorkers Transport Equipment Operators And Labourers",
    "ArmedServices",
    "Police",
    "Security Personnel",
    "Pensioners",
    "Students",
    "Politicians",
    "Unemployed Persons",
  ];

  const occupationAgeGroups = [
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
  const [occupation, setOccupation] = useState(
    "Professional Technical And Related Workers"
  );
  const [year, setYear] = useState("");
  const [deathCount, setDeathCount] = useState();
  const [statData, setStatData] = useState({});
  const [statVisible, setStatVisible] = useState(false);

  const {
    showAlert,
    displayAlert,
    isEditing,
    isLoading,
    predcitOccupation,
    predcitOccupationAll,
  } = useAppContext();

  useEffect(() => {}, []);
  if (isLoading) {
    return <Loading center />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ageGroup || !occupation || !year) {
      displayAlert();
      return;
    }

    if (isNaN(year)) {
      displayAlert();
      return;
    }

    function getDeathCountsByAgeAndOccupation(ageGroup, occupation) {
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

    const data = getDeathCountsByAgeAndOccupation(ageGroup, occupation);
    console.log(data);

    // createJob();

    // Use the method value to get its numerical equivalent
    const occupationvalue = occupationMap[occupation];
    const age = ageGroupValueMap[ageGroup];

    console.log("dataa", occupationvalue, age);

    // predcitSuicideMethod(year, age, methodvalue);
    predcitOccupation(year, age, occupationvalue);
    predcitOccupationAll(year, age);
    setStatData(data);
    setStatVisible(true);
  };

  const clearValue = () => {
    setAgeGroup("0-8");
    setOccupation("Professional Technical And Related Workers");
    setYear("");
    setStatData();
    setStatVisible(false);
  };

  return (
    <>
      {/* <RecStatsContainer /> */}
      <Wrapper>
        <form className="form">
          <h4>Predict Suicide Death Count by Individuals' Occupation Level</h4>
          {showAlert && <Alert />}
          <div className="form-center">
            {/*position*/}

            <FormRowSelect
              name="AgeGroup"
              labelText="Age Group"
              value={ageGroup}
              handleChange={(e) => setAgeGroup(e.target.value)}
              list={occupationAgeGroups}
            />
            {/* job type */}
            <FormRowSelect
              name="occupation"
              labelText="Occupation level"
              value={occupation}
              handleChange={(e) => setOccupation(e.target.value)}
              list={OccupationValues}
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
        <OccupationChartContainer
          inputData={statData}
          value={occupation}
          ageGroup={ageGroup}
          year={year}
        />
      )}
    </>
  );
};

export default Occupation;
