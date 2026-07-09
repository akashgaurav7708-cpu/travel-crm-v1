import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const pdfGenerator = {
  async generateDocument(elementId: string, filename: string) {
    if (typeof window === 'undefined') return;
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${filename}.pdf`);
    } catch (error) {
      console.error('PDF Generation failed:', error);
    }
  },

  async generateQuotation(booking: any) {
    const pdf = new jsPDF();
    pdf.setFontSize(20);
    pdf.text('TOUR QUOTATION', 105, 20, { align: 'center' });

    pdf.setFontSize(12);
    pdf.text(`Booking Ref: #${booking.id.substring(0, 8).toUpperCase()}`, 20, 40);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);

    pdf.text('CUSTOMER DETAILS', 20, 70);
    pdf.text(`Name: ${booking.customers?.first_name} ${booking.customers?.last_name}`, 20, 80);
    pdf.text(`Email: ${booking.customers?.email || 'N/A'}`, 20, 90);

    pdf.text('TRIP DETAILS', 20, 110);
    pdf.text(`Package: ${booking.tour_packages?.name || 'Custom Trip'}`, 20, 120);
    pdf.text(`Travelers: ${booking.travelers_count}`, 20, 130);
    pdf.text(`Dates: ${booking.start_date} to ${booking.end_date}`, 20, 140);

    pdf.setFontSize(14);
    pdf.text(`TOTAL AMOUNT: INR ${booking.total_amount?.toLocaleString()}`, 20, 160);

    pdf.save(`Quotation_${booking.id.substring(0, 8)}.pdf`);
  },

  async generateInvoice(invoice: any) {
    const pdf = new jsPDF();
    pdf.setFontSize(20);
    pdf.text('TAX INVOICE', 105, 20, { align: 'center' });

    pdf.setFontSize(12);
    pdf.text(`Invoice #: ${invoice.invoice_number}`, 20, 40);
    pdf.text(`Issue Date: ${invoice.issue_date || new Date().toLocaleDateString()}`, 20, 50);
    pdf.text(`Due Date: ${invoice.due_date || 'N/A'}`, 20, 60);

    pdf.text('BILL TO', 20, 80);
    pdf.text(`Customer: ${invoice.bookings?.customers?.first_name} ${invoice.bookings?.customers?.last_name}`, 20, 90);

    pdf.line(20, 100, 190, 100);
    pdf.text('Description', 20, 110);
    pdf.text('Amount', 170, 110, { align: 'right' });
    pdf.line(20, 115, 190, 115);

    pdf.text(`Tour Package: ${invoice.bookings?.tour_packages?.name || 'Custom Trip'}`, 20, 125);
    pdf.text(`${invoice.subtotal?.toLocaleString()}`, 170, 125, { align: 'right' });

    pdf.text('GST (5%)', 20, 135);
    pdf.text(`${invoice.gst_amount?.toLocaleString()}`, 170, 135, { align: 'right' });

    pdf.line(120, 145, 190, 145);
    pdf.setFontSize(14);
    pdf.text('TOTAL PAYABLE', 120, 155);
    pdf.text(`INR ${invoice.total_amount?.toLocaleString()}`, 170, 155, { align: 'right' });

    pdf.save(`Invoice_${invoice.invoice_number}.pdf`);
  },

  async generateVoucher(booking: any) {
    const pdf = new jsPDF();
    pdf.setFillColor(0, 31, 63); // brand-navy
    pdf.rect(0, 0, 210, 40, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.text('TRAVEL VOUCHER', 105, 25, { align: 'center' });

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text(`Voucher Ref: VCH-${booking.id.substring(0, 8).toUpperCase()}`, 20, 55);
    pdf.text(`Booking Date: ${new Date().toLocaleDateString()}`, 20, 65);

    pdf.setFontSize(14);
    pdf.text('PASSENGER INFORMATION', 20, 85);
    pdf.line(20, 87, 190, 87);
    pdf.setFontSize(11);
    pdf.text(`Lead Passenger: ${booking.customers?.first_name} ${booking.customers?.last_name}`, 20, 95);
    pdf.text(`Total Travelers: ${booking.travelers_count}`, 20, 105);

    pdf.setFontSize(14);
    pdf.text('ITINERARY SUMMARY', 20, 125);
    pdf.line(20, 127, 190, 127);
    pdf.setFontSize(11);
    pdf.text(`Destination: ${booking.tour_packages?.name || 'Kashmir Tour'}`, 20, 135);
    pdf.text(`Start Date: ${booking.start_date}`, 20, 145);
    pdf.text(`End Date: ${booking.end_date}`, 20, 155);

    pdf.setFontSize(14);
    pdf.text('IMPORTANT INSTRUCTIONS', 20, 175);
    pdf.line(20, 177, 190, 177);
    pdf.setFontSize(9);
    pdf.text('1. Please carry a valid Photo ID proof during travel.', 20, 185);
    pdf.text('2. Hotel check-in time is usually 12:00 PM.', 20, 192);
    pdf.text('3. Driver details will be shared 4 hours before arrival.', 20, 199);

    pdf.setFontSize(12);
    pdf.text('HAVE A PLEASANT TRIP!', 105, 230, { align: 'center' });

    pdf.save(`Voucher_${booking.id.substring(0, 8)}.pdf`);
  }
};
