import puppeteer from 'puppeteer';

export const GenerateIncomePDF = async (res, { title, data, startDate, endDate, formatDate }) => {
  try {
    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);


    // ✅ HTML Template
    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }

            h1 {
              text-align: center;
              margin-bottom: 5px;
            }

            .date-range {
              text-align: center;
              font-size: 12px;
              margin-bottom: 20px;
              color: gray;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: center;
            }

            th {
              background-color: #2c3e50;
              color: white;
            }

            tr:nth-child(even) {
              background-color: #f2f2f2;
            }

            .total-row {
              font-weight: bold;
              background-color: #eee;
            }

            .amount {
              text-align: right;
            }
          </style>
        </head>

        <body>
          <h1>${title || 'Income Report'}</h1>
          <div class="date-range">
            From: ${formatDate(startDate)} | To: ${formatDate(endDate)}
          </div>

          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Source</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>

            <tbody>
              ${data
                .map(
                  (item, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${formatDate(item.date)}</td>
                    <td>${item.source || 'N/A'}</td>
                    <td class="amount">₹ ${item.amount.toFixed(2)}</td>
                  </tr>
                `
                )
                .join('')}

              <tr class="total-row">
                <td colspan="3">Total</td>
                <td class="amount">₹ ${totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;

    // ✅ Launch browser
    const browser = await puppeteer.launch({
      headless: 'new', // important for Node 20+
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // for production servers
    });

    const page = await browser.newPage();

    // ✅ Load HTML
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // ✅ Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    // ✅ Send response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=income-report.pdf');

    res.end(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
};

export const GenerateExpensePDF = async (res, { title, data, startDate, endDate, formatDate }) => {
  try {
const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
    // ✅ HTML Template
    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }

            h1 {
              text-align: center;
              margin-bottom: 5px;
            }

            .date-range {
              text-align: center;
              font-size: 12px;
              margin-bottom: 20px;
              color: gray;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: center;
            }

            th {
              background-color: #e74c3c; /* 🔴 red theme for expense */
              color: white;
            }

            tr:nth-child(even) {
              background-color: #f9f9f9;
            }

            .total-row {
              font-weight: bold;
              background-color: #f1f1f1;
            }

            .amount {
              text-align: right;
              color: #c0392b;
              font-weight: 600;
            }
          </style>
        </head>

        <body>
          <h1>${title || 'Expense Report'}</h1>

          <div class="date-range">
            From: ${formatDate(startDate)} | To: ${formatDate(endDate)}
          </div>

          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Source</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>

            <tbody>
              ${data
                .map(
                  (item, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${formatDate(item.date)}</td>
                    <td>${item.source || 'N/A'}</td>
                    <td class="amount">₹ ${item.amount.toFixed(2)}</td>
                  </tr>
                `
                )
                .join('')}

              <tr class="total-row">
                <td colspan="3">Total</td>
                <td class="amount">₹ ${totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;

    // ✅ Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // ✅ Set content
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // ✅ Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,

      displayHeaderFooter: true,
      footerTemplate: `
        <div style="font-size:10px; text-align:center; width:100%;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
      headerTemplate: `<div></div>`,
    });

    await browser.close();

    // ✅ Send response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=expense-report.pdf');

    res.end(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to generate Expense PDF' });
  }
};


export const GenerateTransactionPDF = async (
  res,
  { title, data = [], startDate, endDate, formatDate }
) => {
  try {
    const formatCurrency = (amount) =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(amount || 0);

    let totalIncome = 0;
    let totalExpense = 0;
    let runningBalance = 0;

    const tableRows =
      data.length === 0
        ? `<tr><td colspan="6">No Transactions Found</td></tr>`
        : data
            .map((item, index) => {
              const amount = Number(item.transactionAmount) || 0;
              const isIncome = item.transactionType === 'income';

              if (isIncome) {
                totalIncome += amount;
                runningBalance += amount;
              } else {
                totalExpense += amount;
                runningBalance -= amount;
              }

              return `
                <tr>
                  <td>${index + 1}</td>
                  <td>${formatDate(item.transactionDate)}</td>
                  <td>${item.source || 'N/A'}</td>
                  <td class="income">
                    ${isIncome ? formatCurrency(amount) : '-'}
                  </td>
                  <td class="expense">
                    ${!isIncome ? formatCurrency(amount) : '-'}
                  </td>
                  <td class="balance">
                    ${formatCurrency(runningBalance)}
                  </td>
                </tr>
              `;
            })
            .join('');

    const totalBalance = totalIncome - totalExpense;

    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }

            h1 {
              text-align: center;
              margin-bottom: 5px;
            }

            .date-range {
              text-align: center;
              font-size: 12px;
              margin-bottom: 20px;
              color: gray;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              font-size: 12px;
              text-align: center;
            }

            th {
              background-color: #2c3e50;
              color: white;
            }

            tr:nth-child(even) {
              background-color: #f9f9f9;
            }

            .income {
              color: #27ae60;
              font-weight: 600;
              text-align: right;
            }

            .expense {
              color: #c0392b;
              font-weight: 600;
              text-align: right;
            }

            .balance {
              font-weight: bold;
              text-align: right;
            }

            .total-row {
              font-weight: bold;
              background-color: #f1f1f1;
            }
          </style>
        </head>

        <body>
          <h1>${title || 'Transaction Report'}</h1>

          <div class="date-range">
            From: ${startDate ? formatDate(startDate) : 'N/A'} |
            To: ${endDate ? formatDate(endDate) : 'N/A'}
          </div>

          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Source</th>
                <th>Income</th>
                <th>Expense</th>
                <th>Balance</th>
              </tr>
            </thead>

            <tbody>
              ${tableRows}

              <tr class="total-row">
                <td colspan="3">Total</td>
                <td class="income">${formatCurrency(totalIncome)}</td>
                <td class="expense">${formatCurrency(totalExpense)}</td>
                <td class="balance">${formatCurrency(totalBalance)}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=transaction-report.pdf'
    );

    res.end(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to generate Transaction PDF' });
  }
};