import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = (tableId, pdfTitle) => {
  // Get the table element by its ID
  const table = document.getElementById(tableId);

  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Define the PDF title
  pdf.text(pdfTitle, 105, 10);

  // Capture the table as an image using html2canvas
  html2canvas(table).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 190; // Set the width of the image on the PDF
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add the captured image to the PDF
    pdf.addImage(imgData, 'PNG', 10, 20, imgWidth, imgHeight);

    // Save or display the PDF
    pdf.save('purchase_order.pdf');
  });
};

export default generatePDF;