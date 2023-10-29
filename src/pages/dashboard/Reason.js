import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";

import {
  Loading,
  FormRow,
  FormRowSelect,
  Alert,
  ReasonChartContainer,
} from "../../components";

import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { reasonData } from "../../components/ReasonData";

import JsPDF from "jspdf";
import "jspdf-autotable";
import { AiFillPrinter } from "react-icons/ai";
import axios from "axios";

const Reason = () => {
  const reasonMap = {
    "Economic Problems": 1,
    "Employment Problems": 2,
    "Problems Caused With The Elders": 3,
    Harrasment: 4,
    "Love Affairs": 5,
    "Sexual Harrassment": 6,
    Drugs: 7,
    "Aggrieved Over The Death Parents": 8,
    "Loss Of Property": 9,
    "Failure At The Examination": 10,
    "Mental disorders": 11,
    "Chronic Diseases Physical Disabilities": 12,
    "Other Reasons": 13,
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

  const ReasonValues = [
    "Economic Problems",
    "Employment Problems",
    "Problems Caused With The Elders",
    "Harrasment",
    "Love Affairs",
    "Sexual Harrassment",
    "Drugs",
    "Aggrieved Over The Death Parents",
    "Loss Of Property",
    "Failure At The Examination",
    "Mental disorders",
    "Chronic Diseases Physical Disabilities",
    "Other Reasons",
  ];

  const reasonAgeGroups = [
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
  const [reason, setReason] = useState("Economic Problems");
  const [year, setYear] = useState("");
  const [deathCount, setDeathCount] = useState();
  const [statData, setStatData] = useState({});
  const [statVisible, setStatVisible] = useState(false);

  const {
    showAlert,
    displayAlert,
    isEditing,
    isLoading,
    predcitReason,
    predcitReasonAll,
  } = useAppContext();

  useEffect(() => {}, []);
  if (isLoading) {
    return <Loading center />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ageGroup || !reason || !year) {
      displayAlert();
      return;
    }

    if (isNaN(year)) {
      displayAlert();
      return;
    }

    function getDeathCountsByAgeAndReason(ageGroup, occupation) {
      const filteredData = reasonData.filter(
        (entry) =>
          entry["Age Group"] === ageGroup &&
          entry["Reason"] === occupation.replace(/\s+/g, "")
      );

      const deathCounts = filteredData.map((entry) => ({
        Year: entry.Year,
        DeathCount: entry["Death Count"],
      }));

      return deathCounts;
    }

    const data = getDeathCountsByAgeAndReason(ageGroup, reason);

    // Use the method value to get its numerical equivalent
    const reasonvalue = reasonMap[reason];
    const age = ageGroupValueMap[ageGroup];

    predcitReason(year, age, reasonvalue);
    predcitReasonAll(year, age, reasonvalue);
    // createPDFHistory(year, age, "Reason", reasonAllDeathCount);

    setStatData(data);
    setStatVisible(true);
  };

  const clearValue = () => {
    setAgeGroup("0-8");
    setReason("Economic Problems");
    setYear("");
    setStatData();
    setStatVisible(false);
  };

  return (
    <>
      {/* <RecStatsContainer /> */}
      <Wrapper>
        <form className="form">
          <h4>Predict Suicide Death Count by Suicidal Reason</h4>
          {showAlert && <Alert />}
          <div className="form-center">
            {/*position*/}

            <FormRowSelect
              name="AgeGroup"
              labelText="Age Group"
              value={ageGroup}
              handleChange={(e) => setAgeGroup(e.target.value)}
              list={reasonAgeGroups}
            />
            {/* job type */}
            <FormRowSelect
              name="reason"
              labelText="Reason"
              value={reason}
              handleChange={(e) => setReason(e.target.value)}
              list={ReasonValues}
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
        <ReasonChartContainer
          inputData={statData}
          value={reason}
          ageGroup={ageGroup}
          year={year}
        />
      )}
    </>
  );
};

export default Reason;
