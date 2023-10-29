import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";

import {
  RecStatsContainer,
  Loading,
  RecChartsContainer,
  FormRow,
  FormRowSelect,
  Alert,
  MethodChartsContainer,
} from "../../components";

import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { mydata } from "../../components/data";

import JsPDF from "jspdf";
import "jspdf-autotable";
import { AiFillPrinter } from "react-icons/ai";
import axios from "axios";

const Method = () => {
  const methodValueMap = {
    "Drinking Insecticides And Pecticides": 1,
    Strangling: 2,
    "Jumping Into The Water": 3,
    "Using Firearms": 4,
    "Using HandBombs Or Any Other Explosives": 5,
    "Using Sharp Weapons": 6,
    "Setting Fire To Oneself": 7,
    "Jumping On To The Moving Trains Or Vehicles": 8,
    "Drinking The Acides": 9,
    "Drinking The Fuel": 10,
    "Drinking The Western Drugs": 11,
    "Eating The Natural Poisons": 12,
    "Jumping From The High Points": 13,
    "Drinking Or Injecting Oneself The Narcotic Drugs": 14,
    Other: 15,
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

  const methodsValues = [
    "Drinking Insecticides And Pecticides",
    "Strangling",
    "Jumping Into The Water",
    "Using Firearms",
    "Using HandBombs Or Any Other Explosives",
    "Using Sharp Weapons",
    "Setting Fire To Oneself",
    "Jumping On To The Moving Trains Or Vehicles",
    "Drinking The Acides",
    "Drinking The Fuel",
    "Drinking The Western Drugs",
    "Eating The Natural Poisons",
    "Jumping From The High Points",
    "Drinking Or Injecting Oneself The Narcotic Drugs",
    "Other",
  ];

  const methodsAgeGroups = [
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
  const [method, setMethod] = useState("Drinking Insecticides And Pecticides");
  const [year, setYear] = useState("");
  const [deathCount, setDeathCount] = useState();
  const [statData, setStatData] = useState({});
  const [statVisible, setStatVisible] = useState(false);

  const {
    showAlert,
    displayAlert,
    isEditing,
    showRecStats,
    isLoading,
    predcitSuicideMethod,
    predcitSuicideAllMethod,
    methodDeathCount,
  } = useAppContext();

  useEffect(() => {}, []);
  if (isLoading) {
    return <Loading center />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ageGroup || !method || !year) {
      displayAlert();
      return;
    }

    if (isNaN(year)) {
      displayAlert();
      return;
    }

    function getDeathCountsByAgeAndMethod(ageGroup, method) {
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

    const data = getDeathCountsByAgeAndMethod(ageGroup, method);

    // Use the method value to get its numerical equivalent
    const methodvalue = methodValueMap[method];
    const age = ageGroupValueMap[ageGroup];

    predcitSuicideMethod(year, age, methodvalue);
    predcitSuicideAllMethod(year, age);
    setStatData(data);
    setStatVisible(true);
  };

  const clearValue = () => {
    setAgeGroup("0-8");
    setMethod("Drinking Insecticides And Pecticides");
    setYear("");
    setStatData();
    setStatVisible(false);
  };

  return (
    <>
      {/* <RecStatsContainer /> */}
      <Wrapper>
        <form className="form">
          <h4>Predict Suicide Death Count by Suicidal Method</h4>
          {showAlert && <Alert />}
          <div className="form-center">
            {/*position*/}

            <FormRowSelect
              name="AgeGroup"
              labelText="Age Group"
              value={ageGroup}
              handleChange={(e) => setAgeGroup(e.target.value)}
              list={methodsAgeGroups}
            />
            {/* job type */}
            <FormRowSelect
              name="method"
              labelText="Method"
              value={method}
              handleChange={(e) => setMethod(e.target.value)}
              list={methodsValues}
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
        <MethodChartsContainer
          inputData={statData}
          value={method}
          ageGroup={ageGroup}
          year={year}
        />
      )}
    </>
  );
};

export default Method;
