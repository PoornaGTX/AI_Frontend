import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import AdminUserInfo from "./AdminUserInfo";
import { MdEmail, MdSchool } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { AiTwotoneEnvironment } from "react-icons/ai";
import { generatallPDF } from "../utils/PDF_Education";
import { ImClock, ImUser, ImStatsDots } from "react-icons/im";

const EducationHistroyPage = ({
  _id,
  year,
  age,
  educationAllDeathCount,
  type,
  education,
  createdAt,
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

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{education.charAt(0)}</div>
        <div className="info">
          <h5>{education}</h5>
          <h5>{type}</h5>
          <p>{agevalue}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <AdminUserInfo icon={<ImClock />} text={`Date : ${GenratedDate}`} />
          <AdminUserInfo
            icon={<ImStatsDots />}
            text={`Predicted Year ${year}`}
          />
          <AdminUserInfo icon={<ImUser />} text={`Age Group : ${agevalue}`} />
          <AdminUserInfo
            icon={<MdSchool />}
            text={
              type === "Education"
                ? `Education : ${education}`
                : `Occupation : ${education}`
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
                  educationAllDeathCount,
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

export default EducationHistroyPage;
