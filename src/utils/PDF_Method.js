import { getDeathCountsByAgeAndMethod } from "./Methods";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatallPDF = async ({
  ageGroup,
  value,
  year,
  methodAllDeathCount,
  user,
}) => {
  const pdf = new jsPDF();

  // Header and Footer to Each Page
  const headerBarColor = [45, 176, 188]; // RGB color for the background bar
  pdf.setFontSize(10); // Header and footer font size
  const headerText =
    "Suicide Statistics and Insights with a Comprehensive Analysis of Suicidal Methods\n                                      powered by www.safeguardAI.com";
  const footerText =
    "        Promoting Mental Health and Suicide Prevention | All Rights Reserved www.safeguardAI.com";

  const currentDate = new Date();
  const yearjs = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = String(hours % 12 || 12).padStart(2, "0");

  const formattedDate = `${yearjs}-${month}-${day}  ${formattedHours}:${minutes}`;

  const topSentence = `Method : For all methods (recent 5 years)\nPredicted Year : ${year}\nAge Group : ${ageGroup.replace(
    "-",
    " - "
  )}\nDate : ${formattedDate} ${amPm}\nGenerated by : ${user.firstName} ${
    user.lastName
  }`;
  const lines = topSentence.split("\n");
  const lineHeight = pdf.internal.getFontSize() * 0.7;

  const textSize =
    (pdf.getStringUnitWidth(topSentence) * pdf.internal.getFontSize()) /
    pdf.internal.scaleFactor;

  pdf.setFontSize(12);

  const centerX = pdf.internal.pageSize.width / 15;
  let centerY = 30;

  lines.forEach((line) => {
    const textSize =
      (pdf.getStringUnitWidth(line) * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const y = centerY;

    pdf.text(line, centerX, y);
    centerY += lineHeight;
  });

  // Header Background Bar
  pdf.setFillColor(...headerBarColor);
  pdf.rect(3, 3, pdf.internal.pageSize.width - 2 * 3, 20, "F");

  // Header Text
  pdf.setTextColor(255, 255, 255);
  const headerWidth =
    (pdf.getStringUnitWidth(headerText) * pdf.internal.getFontSize()) /
    pdf.internal.scaleFactor;
  const pageWidth = pdf.internal.pageSize.width;
  const headerX = (pageWidth - headerWidth) / 2;
  pdf.text(headerText, 28, 12);

  // Footer Text
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(footerText, 10, pdf.internal.pageSize.height - 10);

  //get the predcited value for each reason

  const getDeathCount = (value) => {
    let targetValue = null;
    for (const item of methodAllDeathCount) {
      if (value in item) {
        targetValue = item[value];
        break;
      }
    }
    return targetValue;
  };

  // Define table headers and rows
  const tableColums = [
    { title: "Age Group", field: "AgeGroup" },
    { title: "Method", field: "Method" },
    { title: "Year", field: "Year" },
    { title: "Death Count", field: "DeathCount" },
  ];

  const dataStrangling = getDeathCountsByAgeAndMethod(ageGroup, "Strangling");

  const dataDrinking = getDeathCountsByAgeAndMethod(
    ageGroup,
    "DrinkingInsecticidesAndPecticides"
  );

  const dataJumping = getDeathCountsByAgeAndMethod(
    ageGroup,
    "JumpingIntoTheWater"
  );

  const dataJumpingOnToTheMoving = getDeathCountsByAgeAndMethod(
    ageGroup,
    "JumpingOnToTheMovingTrainsOrVehicles"
  );

  const dataDrinkingTheAcides = getDeathCountsByAgeAndMethod(
    ageGroup,
    "DrinkingTheAcides"
  );

  const dataSettingFireToOneself = getDeathCountsByAgeAndMethod(
    ageGroup,
    "SettingFireToOneself"
  );

  const tableDataStrangling = dataStrangling.map((item) => ({
    AgeGroup: ageGroup,
    Method: "Strangling",
    ...item,
  }));

  const tableDataDrinking = dataDrinking.map((item) => ({
    AgeGroup: ageGroup,
    Method: "Drinking Insecticides And Pecticides",
    ...item,
  }));

  const tableJumpingIntoTheWater = dataJumping.map((item) => ({
    AgeGroup: ageGroup,
    Method: "Jumping Into TheWater",
    ...item,
  }));

  const tableJumpingVehicles = dataJumpingOnToTheMoving.map((item) => ({
    AgeGroup: ageGroup,
    Method: "Jumping OnTo The Moving Trains Or Vehicles",
    ...item,
  }));

  const tabledrinkingTheAcides = dataDrinkingTheAcides.map((item) => ({
    AgeGroup: ageGroup,
    Method: "Drinking The Acides",
    ...item,
  }));

  const tableSettingFireToOneself = dataSettingFireToOneself.map((item) => ({
    AgeGroup: ageGroup,
    Method: "Setting Fire To Oneself",
    ...item,
  }));

  pdf.setLineWidth(1);
  pdf.setDrawColor("#8b8c8b");

  const borderWidth = 2;
  const contentWidth = pdf.internal.pageSize.width - 2 * borderWidth;
  const contentHeight = pdf.internal.pageSize.height - 2 * borderWidth;
  pdf.rect(borderWidth, borderWidth, contentWidth, contentHeight, "D");

  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.text("Strangling", 14, 68);

  //Strangling Method
  pdf.autoTable({
    theme: "grid",
    columns: tableColums.map((col) => ({ ...col, dataKey: col.field })),
    headStyles: { fillColor: "#2cb1bc" },
    body: [
      ...tableDataStrangling,
      {
        AgeGroup: ageGroup,
        Method: "Strangling",
        Year: year,
        DeathCount: getDeathCount(2),
      },
    ],
    startY: 71, // Start table below the header
    didDrawCell: (data) => {
      const lastRowIndex = tableDataStrangling.length;

      if (data.row.index === lastRowIndex) {
        // Highlight the last row's cells with a border
        pdf.setDrawColor(255, 0, 0);
        pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
      }
    },
  });

  //Drinking Insecticides And Pecticides
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.text("Drinking Insecticides And Pecticides", 14, 138);
  pdf.autoTable({
    theme: "grid",
    columns: tableColums.map((col) => ({ ...col, dataKey: col.field })),
    headStyles: { fillColor: "#2cb1bc" },
    body: [
      ...tableDataDrinking,
      {
        AgeGroup: ageGroup,
        Method: "Drinking Insecticides And Pecticides",
        Year: year,
        DeathCount: getDeathCount(1),
      },
    ],

    startY: 141,
    didDrawCell: (data) => {
      const lastRowIndex = tableDataDrinking.length;

      if (data.row.index === lastRowIndex) {
        // Highlight the last row's cells with a border
        pdf.setDrawColor(255, 0, 0);
        pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
      }
    },
  });

  //Jumping Into TheWater
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.text("Jumping Into The Water", 14, 209);
  pdf.autoTable({
    theme: "grid",
    columns: tableColums.map((col) => ({ ...col, dataKey: col.field })),
    headStyles: { fillColor: "#2cb1bc" },
    body: [
      ...tableJumpingIntoTheWater,
      {
        AgeGroup: ageGroup,
        Method: "Jumping Into TheWater",
        Year: year,
        DeathCount: getDeathCount(3),
      },
    ],

    startY: 212,
    didDrawCell: (data) => {
      const lastRowIndex = tableJumpingIntoTheWater.length;

      if (data.row.index === lastRowIndex) {
        // Highlight the last row's cells with a border
        pdf.setDrawColor(255, 0, 0);
        pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
      }
    },
  });

  pdf.addPage();

  const headerBarColorr = [45, 176, 188]; // RGB color for the background bar
  pdf.setFontSize(10); // Header and footer font size

  // Header Background Bar to the Second Page
  pdf.setFillColor(...headerBarColorr);
  pdf.rect(3, 3, pdf.internal.pageSize.width - 2 * 3, 20, "F");

  const topSentencee = ``;
  const linese = topSentencee.split("\n");
  const lineHeighte = pdf.internal.getFontSize() * 13;

  const textSizee =
    (pdf.getStringUnitWidth(topSentencee) * pdf.internal.getFontSize()) /
    pdf.internal.scaleFactor;

  pdf.setFontSize(12);

  const centerXe = pdf.internal.pageSize.width / 15;
  let centerYe = 0;

  linese.forEach((line) => {
    const textSize =
      (pdf.getStringUnitWidth(line) * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const y = centerY;

    pdf.text(line, centerXe, y);
    centerYe += lineHeighte;
  });

  // Header Text to the Second Page
  pdf.setTextColor(255, 255, 255);
  pdf.text(headerText, 28, 12);

  // Footer Text to the Second Page
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(footerText, 10, pdf.internal.pageSize.height - 10);

  //Jumping OnTo The Moving Trains Or Vehicles
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.text("Jumping On To The Moving Trains Or Vehicles", 14, 42);
  pdf.autoTable({
    theme: "grid",
    columns: tableColums.map((col) => ({ ...col, dataKey: col.field })),
    headStyles: { fillColor: "#2cb1bc" },
    body: [
      ...tableJumpingVehicles,
      {
        AgeGroup: ageGroup,
        Method: "Jumping OnTo The Moving Trains Or Vehiclesr",
        Year: year,
        DeathCount: getDeathCount(8),
      },
    ],

    startY: 45,
    didDrawCell: (data) => {
      const lastRowIndex = tableJumpingVehicles.length;

      if (data.row.index === lastRowIndex) {
        // Highlight the last row's cells with a border
        pdf.setDrawColor(255, 0, 0);
        pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
      }
    },
  });

  pdf.setLineWidth(1);
  pdf.setDrawColor("#8b8c8b");
  pdf.rect(borderWidth, borderWidth, contentWidth, contentHeight, "D");

  //Setting Fire To Oneself
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.text("Setting Fire To Oneself", 14, 115);
  pdf.autoTable({
    theme: "grid",
    columns: tableColums.map((col) => ({ ...col, dataKey: col.field })),
    headStyles: { fillColor: "#2cb1bc" },
    body: [
      ...tableSettingFireToOneself,
      {
        AgeGroup: ageGroup,
        Method: "Setting Fire To Oneself",
        Year: year,
        DeathCount: getDeathCount(7),
      },
    ],

    startY: 118,
    didDrawCell: (data) => {
      const lastRowIndex = tableSettingFireToOneself.length;

      if (data.row.index === lastRowIndex) {
        // Highlight the last row's cells with a border
        pdf.setDrawColor(255, 0, 0);
        pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
      }
    },
  });

  //DrinkingTheAcides
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.text("Drinking The Acides", 14, 188);
  pdf.autoTable({
    theme: "grid",
    columns: tableColums.map((col) => ({ ...col, dataKey: col.field })),
    headStyles: { fillColor: "#2cb1bc" },
    body: [
      ...tabledrinkingTheAcides,
      {
        AgeGroup: ageGroup,
        Method: "Drinking The Acides",
        Year: year,
        DeathCount: getDeathCount(9),
      },
    ],

    startY: 191,
    didDrawCell: (data) => {
      const lastRowIndex = tabledrinkingTheAcides.length;

      if (data.row.index === lastRowIndex) {
        // Highlight the last row's cells with a border
        pdf.setDrawColor(255, 0, 0);
        pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
      }
    },
  });

  pdf.save("all_methods.pdf");
};
