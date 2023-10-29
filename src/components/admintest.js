const generatePDF = async () => {
  if (!chartRef.current) {
    return; // Return early if chartRef is not assigned
  }

  const pdf = new jsPDF();

  // Create Composite Canvas with Both Charts
  const compositeCanvas = document.createElement("canvas");
  const compositeContext = compositeCanvas.getContext("2d");

  // Draw BarChart onto the composite canvas
  const barChartCanvas = await html2canvas(chartRef.current);
  compositeCanvas.width = barChartCanvas.width;
  compositeCanvas.height = barChartCanvas.height * 2; // Adjust height for both charts
  compositeContext.drawImage(barChartCanvas, 0, 0);

  // Create a new canvas for the AreaChart
  const areaChartCanvas = await html2canvas(
    document.getElementById("areaChart")
  );

  // Draw the AreaChart below the BarChart on the composite canvas
  compositeContext.drawImage(areaChartCanvas, 0, barChartCanvas.height);

  // Add Header and Footer to Each Page
  const headerBarColor = [200, 200, 200]; // RGB color for the background bar
  pdf.setFontSize(10); // Header and footer font size
  const headerText = "PDF Header";
  const footerText = "PDF Footer";

  // Add Page for BarChart
  // pdf.addPage();

  // Add Header Background Bar
  pdf.setFillColor(...headerBarColor);
  pdf.rect(0, 0, pdf.internal.pageSize.width, 20, "F"); // Draw a filled rectangle

  // Add Header Text
  pdf.setTextColor(0, 0, 255);
  const headerWidth =
    (pdf.getStringUnitWidth(headerText) * pdf.internal.getFontSize()) /
    pdf.internal.scaleFactor;
  const pageWidth = pdf.internal.pageSize.width;
  const headerX = (pageWidth - headerWidth) / 2;
  pdf.text(headerText, headerX, 15); // Adjust vertical position to center

  // Add Footer Text
  pdf.setFontSize(10);
  pdf.text(footerText, 10, pdf.internal.pageSize.height - 10);

  // Add BarChart Composite Canvas Image
  pdf.addImage(
    compositeCanvas.toDataURL("image/png"),
    "PNG",
    10,
    50, //top
    190, //width
    130 //height
  ); // Adjust height

  // Add Data Table
  // pdf.addPage(); // Add a new page for the table
  pdf.setFillColor(...headerBarColor);
  pdf.rect(0, 0, pdf.internal.pageSize.width, 20, "F"); // Draw a filled rectangle
  pdf.setTextColor(0, 0, 255);
  pdf.text(headerText, headerX, 15); // Adjust vertical position to center
  pdf.setFontSize(10);

  // Define table headers and rows
  const headers = ["AgeGroup", "Method", "Year", "DeathCount"];
  const statsColums = [
    { title: "AgeGroup", field: "AgeGroup" },
    { title: "Method", field: "Method" },
    { title: "Year", field: "Year" },
    { title: "DeathCount", field: "DeathCount" },
  ];

  // const rows = [
  //   ["Row 1 Data 1", "Row 1 Data 2", "Row 1 Data 3"],
  //   ["Row 2 Data 1", "Row 2 Data 2", "Row 2 Data 3"],
  //   // ... Add more rows as needed
  // ];

  // Add the table using autoTable plugin
  pdf.autoTable({
    theme: "grid",
    columns: statsColums.map((col) => ({ ...col, dataKey: col.field })),
    // head: [headers],
    body: tableData,
    startY: 30, // Start table below the header
  });

  pdf.save("chart.pdf");
};
