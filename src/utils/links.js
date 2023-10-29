import { IoBarChartSharp } from "react-icons/io5";
import {
  MdQueryStats,
  MdSchool,
  MdPersonSearch,
  MdFindInPage,
} from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile, ImBriefcase, ImEye } from "react-icons/im";

const links = [
  { id: 10, text: "Reason", path: "/", icon: <MdPersonSearch /> },
  { id: 1, text: "Method", path: "method", icon: <ImEye /> },
  { id: 11, text: "Education", path: "education", icon: <MdSchool /> },
  { id: 9, text: "Occupation", path: "occupation", icon: <ImBriefcase /> },
  {
    id: 2,
    text: "Reason History",
    path: "reason-histroy",
    icon: <MdFindInPage />,
  },
  {
    id: 12,
    text: "Education History",
    path: "education-history",
    icon: <MdFindInPage />,
  },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
];

export default links;
