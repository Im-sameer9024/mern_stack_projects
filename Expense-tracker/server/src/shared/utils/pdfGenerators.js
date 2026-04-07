import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import fontkit from '@pdf-lib/fontkit';

export const GenerateIncomePDF = async (
  res,
  { title, data = [], startDate, endDate, formatDate }
) => {
  try {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const font = await pdfDoc.embedFont(
      fs.readFileSync(path.resolve('fonts/NotoSans-Regular.ttf'))
    );
    const boldFont = await pdfDoc.embedFont(
      fs.readFileSync(path.resolve('fonts/NotoSans-Bold.ttf'))
    );

    let page = pdfDoc.addPage([842, 595]);
    let { width, height } = page.getSize();

    const formatCurrency = (amount) =>
      `₹${(amount || 0).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
      })}`;

    let y = height - 40;

    // ===== TITLE =====
    page.drawText(title || 'Income Report', {
      x: width / 2 - 100,
      y,
      size: 18,
      font: boldFont,
    });

    y -= 20;

    page.drawText(`From: ${formatDate(startDate)} | To: ${formatDate(endDate)}`, {
      x: width / 2 - 150,
      y,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });

    y -= 30;

    const rowHeight = 25;
    const colWidths = [60, 200, 250, 150];
    const headers = ['S.No', 'Date', 'Source', 'Amount'];

    const startX = 40;

    // ===== HEADER DRAW FUNCTION =====
    const drawHeader = () => {
      let x = startX;

      headers.forEach((h, i) => {
        page.drawRectangle({
          x,
          y,
          width: colWidths[i],
          height: rowHeight,
          color: rgb(0.2, 0.3, 0.4),
        });

        page.drawText(h, {
          x: x + 5,
          y: y + 8,
          size: 10,
          font: boldFont,
          color: rgb(1, 1, 1),
        });

        x += colWidths[i];
      });

      y -= rowHeight;
    };

    drawHeader();

    let total = 0;

    // ===== ROWS =====
    data.forEach((item, index) => {
      // 🔥 PAGE BREAK
      if (y < 60) {
        page = pdfDoc.addPage([842, 595]);
        ({ width, height } = page.getSize());
        y = height - 40;

        drawHeader(); // repeat header
      }

      const amount = Number(item.amount) || 0;
      total += amount;

      let x = startX;

      const row = [index + 1, formatDate(item.date), item.source || 'N/A', formatCurrency(amount)];

      row.forEach((cell, i) => {
        page.drawRectangle({
          x,
          y,
          width: colWidths[i],
          height: rowHeight,
          borderWidth: 0.5,
          borderColor: rgb(0.8, 0.8, 0.8),
        });

        page.drawText(String(cell), {
          x: x + 5,
          y: y + 8,
          size: 10,
          font,
          color: i === 3 ? rgb(0, 0.6, 0) : rgb(0, 0, 0), // 🟢 green
        });

        x += colWidths[i];
      });

      y -= rowHeight;
    });

    // ===== TOTAL =====
    if (y < 60) {
      page = pdfDoc.addPage([842, 595]);
      y = height - 40;
    }

    let xTotal = startX;

    const totalRow = ['', '', 'Total', formatCurrency(total)];

    totalRow.forEach((cell, i) => {
      page.drawRectangle({
        x: xTotal,
        y,
        width: colWidths[i],
        height: rowHeight,
        color: rgb(0.9, 0.9, 0.9),
      });

      page.drawText(String(cell), {
        x: xTotal + 5,
        y: y + 8,
        size: 10,
        font: boldFont,
      });

      xTotal += colWidths[i];
    });

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=income-report.pdf');

    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
export const GenerateExpensePDF = async (
  res,
  { title, data = [], startDate, endDate, formatDate }
) => {
  try {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const font = await pdfDoc.embedFont(
      fs.readFileSync(path.resolve('fonts/NotoSans-Regular.ttf'))
    );
    const boldFont = await pdfDoc.embedFont(
      fs.readFileSync(path.resolve('fonts/NotoSans-Bold.ttf'))
    );

    let page = pdfDoc.addPage([842, 595]);
    let { width, height } = page.getSize();

    const formatCurrency = (amt) =>
      `₹${(amt || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    let y = height - 40;

    // ===== TITLE =====
    page.drawText(title || 'Expense Report', {
      x: width / 2 - 100,
      y,
      size: 18,
      font: boldFont,
    });

    y -= 20;

    page.drawText(`From: ${formatDate(startDate)} | To: ${formatDate(endDate)}`, {
      x: width / 2 - 150,
      y,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });

    y -= 30;

    const rowHeight = 25;
    const colWidths = [60, 200, 250, 150];
    const headers = ['S.No', 'Date', 'Source', 'Amount'];

    const startX = 40;

    // ===== DRAW HEADER FUNCTION =====
    const drawHeader = () => {
      let x = startX;

      headers.forEach((h, i) => {
        page.drawRectangle({
          x,
          y,
          width: colWidths[i],
          height: rowHeight,
          color: rgb(0.2, 0.3, 0.4),
        });

        page.drawText(h, {
          x: x + 5,
          y: y + 8,
          size: 10,
          font: boldFont,
          color: rgb(1, 1, 1),
        });

        x += colWidths[i];
      });

      y -= rowHeight;
    };

    drawHeader();

    let total = 0;

    // ===== ROWS =====
    data.forEach((item, index) => {
      // 🔥 PAGE BREAK
      if (y < 60) {
        page = pdfDoc.addPage([842, 595]);
        ({ width, height } = page.getSize());
        y = height - 40;

        drawHeader(); // redraw header
      }

      const amt = Number(item.amount) || 0;
      total += amt;

      let x = startX;

      const row = [index + 1, formatDate(item.date), item.source || 'N/A', formatCurrency(amt)];

      row.forEach((cell, i) => {
        page.drawRectangle({
          x,
          y,
          width: colWidths[i],
          height: rowHeight,
          borderWidth: 0.5,
          borderColor: rgb(0.8, 0.8, 0.8),
        });

        page.drawText(String(cell), {
          x: x + 5,
          y: y + 8,
          size: 10,
          font,
          color: i === 3 ? rgb(0.8, 0, 0) : rgb(0, 0, 0), // 🔴 red
        });

        x += colWidths[i];
      });

      y -= rowHeight;
    });

    // ===== TOTAL =====
    if (y < 60) {
      page = pdfDoc.addPage([842, 595]);
      y = height - 40;
    }

    let xTotal = startX;

    const totalRow = ['', '', 'Total', formatCurrency(total)];

    totalRow.forEach((cell, i) => {
      page.drawRectangle({
        x: xTotal,
        y,
        width: colWidths[i],
        height: rowHeight,
        color: rgb(0.9, 0.9, 0.9),
      });

      page.drawText(String(cell), {
        x: xTotal + 5,
        y: y + 8,
        size: 10,
        font: boldFont,
      });

      xTotal += colWidths[i];
    });

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=expense-report.pdf');

    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const GenerateTransactionPDF = async (
  res,
  { title, data = [], startDate, endDate, formatDate }
) => {
  try {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const font = await pdfDoc.embedFont(
      fs.readFileSync(path.resolve('fonts/NotoSans-Regular.ttf'))
    );
    const boldFont = await pdfDoc.embedFont(
      fs.readFileSync(path.resolve('fonts/NotoSans-Bold.ttf'))
    );

    let page = pdfDoc.addPage([842, 595]);
    let { width, height } = page.getSize();

    const formatCurrency = (amt) =>
      `₹${(amt || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    let y = height - 40;

    // ===== TITLE =====
    page.drawText(title || 'Transaction Report', {
      x: width / 2 - 120,
      y,
      size: 18,
      font: boldFont,
    });

    y -= 20;

    page.drawText(`From: ${formatDate(startDate)} | To: ${formatDate(endDate)}`, {
      x: width / 2 - 150,
      y,
      size: 10,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });

    y -= 30;

    const rowHeight = 25;
    const colWidths = [50, 120, 180, 100, 100, 120];
    const headers = ['S.No', 'Date', 'Source', 'Income', 'Expense', 'Balance'];

    const startX = 40;

    // ===== DRAW HEADER FUNCTION =====
    const drawHeader = () => {
      let x = startX;

      headers.forEach((h, i) => {
        page.drawRectangle({
          x,
          y,
          width: colWidths[i],
          height: rowHeight,
          color: rgb(0.2, 0.3, 0.4),
        });

        page.drawText(h, {
          x: x + 5,
          y: y + 8,
          size: 10,
          font: boldFont,
          color: rgb(1, 1, 1),
        });

        x += colWidths[i];
      });

      y -= rowHeight;
    };

    drawHeader();

    let totalIncome = 0;
    let totalExpense = 0;
    let balance = 0;

    // ===== ROWS =====
    data.forEach((item, index) => {
      // 🔥 PAGE BREAK
      if (y < 60) {
        page = pdfDoc.addPage([842, 595]);
        ({ width, height } = page.getSize());
        y = height - 40;

        drawHeader(); // redraw header on new page
      }

      const amt = Number(item.transactionAmount) || 0;
      const isIncome = item.transactionType === 'income';

      if (isIncome) {
        totalIncome += amt;
        balance += amt;
      } else {
        totalExpense += amt;
        balance -= amt;
      }

      let x = startX;

      const row = [
        index + 1,
        formatDate(item.transactionDate),
        item.source || 'N/A',
        isIncome ? formatCurrency(amt) : '-',
        !isIncome ? formatCurrency(amt) : '-',
        formatCurrency(balance),
      ];

      row.forEach((cell, i) => {
        page.drawRectangle({
          x,
          y,
          width: colWidths[i],
          height: rowHeight,
          borderWidth: 0.5,
          borderColor: rgb(0.8, 0.8, 0.8),
        });

        let color = rgb(0, 0, 0);
        if (i === 3 && isIncome) color = rgb(0, 0.6, 0);
        if (i === 4 && !isIncome) color = rgb(0.8, 0, 0);

        page.drawText(String(cell), {
          x: x + 5,
          y: y + 8,
          size: 9,
          font,
          color,
        });

        x += colWidths[i];
      });

      y -= rowHeight;
    });

    // ===== TOTAL ROW =====
    if (y < 60) {
      page = pdfDoc.addPage([842, 595]);
      y = height - 40;
    }

    let xTotal = startX;

    const totalRow = [
      '',
      '',
      'Total',
      formatCurrency(totalIncome),
      formatCurrency(totalExpense),
      formatCurrency(totalIncome - totalExpense),
    ];

    totalRow.forEach((cell, i) => {
      page.drawRectangle({
        x: xTotal,
        y,
        width: colWidths[i],
        height: rowHeight,
        color: rgb(0.9, 0.9, 0.9),
      });

      page.drawText(String(cell), {
        x: xTotal + 5,
        y: y + 8,
        size: 10,
        font: boldFont,
      });

      xTotal += colWidths[i];
    });

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=transaction-report.pdf');

    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
