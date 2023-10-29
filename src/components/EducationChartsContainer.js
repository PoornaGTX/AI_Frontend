import React, { useEffect, useState, useRef } from "react";
import BarChart from "./EducationBarChart";
import AreaChart from "./EducationAreaChart";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { generatallPDF } from "../utils/PDF_Education";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EducationChartsContainer = ({ inputData, value, ageGroup, year }) => {
  const [barChart, setBarChart] = useState(true);
  const {
    recMonthlyApplications: data,
    educationDeathCount,
    educationAllDeathCount,
    user,
  } = useAppContext();

  const newInputData = [
    ...inputData,
    {
      Year: year,
      DeathCount: educationDeathCount,
    },
  ];

  const tableData = newInputData.map((item) => ({
    AgeGroup: ageGroup,
    "Education Level": value,
    ...item,
  }));

  const chartRef = useRef();

  const generatePDF = async () => {
    if (!chartRef.current) {
      return;
    }

    const pdf = new jsPDF();

    // Create Composite Canvas with Both Charts
    const compositeCanvas = document.createElement("canvas");
    const compositeContext = compositeCanvas.getContext("2d");

    // Draw BarChart onto the composite canvas
    const barChartCanvas = await html2canvas(chartRef.current);
    compositeCanvas.width = barChartCanvas.width;
    compositeCanvas.height = barChartCanvas.height * 2;
    compositeContext.drawImage(barChartCanvas, 0, 0);

    // Create a new canvas for the AreaChart
    const areaChartCanvas = await html2canvas(
      document.getElementById("areaChart")
    );

    // Draw the AreaChart below the BarChart on the composite canvas
    compositeContext.drawImage(areaChartCanvas, 0, barChartCanvas.height);

    // Header and Footer to Each Page
    const headerBarColor = [45, 176, 188]; // RGB color for the background bar
    pdf.setFontSize(10); // Header and footer font size
    const headerText =
      "Suicide Statistics and Insights with a Comprehensive Analysis of Individuals' Educational Level.\n                                            powered by www.safeguardAI.com";
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

    const topSentence = `Education Level : ${value}\nPredcited Year : ${year}\nAge Group : ${ageGroup.replace(
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
    pdf.text(headerText, 18, 12);

    // Footer Text
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(footerText, 10, pdf.internal.pageSize.height - 10);

    // Add BarChart Composite Canvas Image
    pdf.addImage(
      compositeCanvas.toDataURL("image/png"),
      "PNG",
      10,
      130, //top
      190, //width
      130 //height
    ); // Adjust height

    // Define table headers and rows
    const tableColums = [
      { title: "Age Group", field: "AgeGroup" },
      { title: "Education Level", field: "Education Level" },
      { title: "Year", field: "Year" },
      { title: "Death Count", field: "DeathCount" },
    ];

    pdf.autoTable({
      theme: "grid",
      columns: tableColums.map((col) => ({ ...col, dataKey: col.field })),
      headStyles: { fillColor: "#2cb1bc" },
      body: tableData,
      startY: 68,
      didDrawCell: (data) => {
        const lastRowIndex = tableData.length - 1;

        if (data.row.index === lastRowIndex) {
          // Highlight the last row's cells with a border
          pdf.setDrawColor(255, 0, 0);
          pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
        }
      },
    });

    // Set the border width
    pdf.setLineWidth(1);

    const borderWidth = 2;
    const contentWidth = pdf.internal.pageSize.width - 2 * borderWidth;
    const contentHeight = pdf.internal.pageSize.height - 2 * borderWidth;
    pdf.rect(borderWidth, borderWidth, contentWidth, contentHeight);

    pdf.save(`${value}_prediction_report.pdf`);
  };

  return (
    <Wrapper>
      <h4>Prediction Statistics</h4>
      <h5>
        Education Level : {value} | Age Group : {ageGroup} | Year : {year}
      </h5>
      {/* <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button> */}
      {inputData && (
        <>
          <button onClick={generatePDF}>Generate PDF</button>
          <button
            onClick={() =>
              generatallPDF({
                ageGroup,
                value,
                year,
                educationAllDeathCount,
                user,
              })
            }
          >
            Generate all PDF
          </button>

          <div ref={chartRef}>
            <BarChart data={newInputData} />
          </div>

          <div id="areaChart">
            <AreaChart data={newInputData} />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default EducationChartsContainer;
