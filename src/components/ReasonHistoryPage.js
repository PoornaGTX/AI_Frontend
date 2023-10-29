import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import AdminUserInfo from "./AdminUserInfo";
import { MdEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { AiTwotoneEnvironment } from "react-icons/ai";
import { generatallPDF } from "../utils/PDF_Reason";
import { ImClock, ImUser, ImStatsDots, ImEye } from "react-icons/im";

const ReasonHistoryPage = ({
  _id,
  year,
  age,
  reasonAllDeathCount,
  type,
  reasonvalue,
  GenratedDate,
}) => {
  const { setDeleteUser, setUpdateUser, user } = useAppContext();

  const ageGroupValueMap = {
    1: "0-8",
    2: "8-16",
    3: "17-20",
    4: "21-25",
    5: "26-30",
    6: "31-35",
    7: "36-40",
    8: "41-45",
    9: "46-50",
    10: "51-55",
    11: "56-60",
    12: "61-65",
    13: "66-70",
    14: "71-100",
  };
  const agevalue = ageGroupValueMap[age];

  const reasonMap = {
    1: "Economic Problems",
    2: "Employment Problems",
    3: "Problems Caused With The Elders",
    4: "Harrasment",
    5: "Love Affairs",
    6: "Sexual Harrassment",
    7: "Drugs",
    8: "Aggrieved Over The Death Parents",
    9: "Loss Of Property",
    10: "Failure At The Examination",
    11: "Mental disorders",
    12: "Chronic Diseases Physical Disabilities",
    13: "Other Reasons",
  };

  const reasonValueString = reasonMap[reasonvalue];

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{reasonValueString.charAt(0)}</div>
        <div className="info">
          <h5>{reasonValueString}</h5>
          <h5>{type}</h5>
          <p>{agevalue}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <AdminUserInfo icon={<ImClock />} text={`Date : ${GenratedDate}`} />
          <AdminUserInfo
            icon={<ImStatsDots />}
            text={`Prediction Year : ${year}`}
          />
          <AdminUserInfo icon={<ImUser />} text={`Age Group : ${agevalue}`} />
          <AdminUserInfo
            icon={<ImEye />}
            text={
              type === "Reason"
                ? `Reason : ${reasonValueString}`
                : `Method : ${reasonValueString}`
            }
          />
        </div>

        <footer>
          <div className="actions">
            <button
              className="btn edit-btn"
              onClick={() =>
                generatallPDF({
                  ageGroup: agevalue,
                  year,
                  reasonAllDeathCount,
                  user,
                })
              }
            >
              Download PDF
            </button>
            <button
              className="btn delete-btn"
              onClick={() => setDeleteUser(_id)}
            >
              Delete From History
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default ReasonHistoryPage;
