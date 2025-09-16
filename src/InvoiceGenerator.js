import React, { useState, useEffect } from 'react';
import './Invoice.css';
import logoOriginal from './logo_original.png';

// Helper function to convert number to words
const toWords = (num) => {
    const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';
    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    str = str.trim().charAt(0).toUpperCase() + str.slice(1);
    return str.trim() ? str + ' Rupees Only' : 'Zero Rupees Only';
};

const InvoiceGenerator = () => {
  const [invoiceData, setInvoiceData] = useState({
    companyAddress: "Second Floor, HIG-405, Central Nagar, Bhilai\nDistt. Durg (C.G.) Pin - 490020",
    companyGSTIN: "GSTIN : 22DRPFS517H3ZQ",
    companyEmail: "E-MAIL : designersquarebhilai@gmail.com",
    companyMob: "Mo. No.: 777228 28880, 86029 48880",
    invoiceNo: 'DS/2023-26/0018',
    dated: '02.08.2025',
    buyerName: "Sparsh Multispeciality Hospital Pvt. Ltd.",
    buyerAddress: "Shriram Market, Sirsa Road, Nam Nagar, Bhilai (C.G.)",
    buyerGSTIN: "GST No. : 22AADCP8009N2Z9",
    bankName: "DESIGNER SQUARE",
    accountNo: "3451933031",
    ifscCode: "CBIN0283481",
    branchName: "CENTRAL BANK OF INDIA",
    items: [
      { sno: 1, particulars: 'TPR GRAPHIC CHART', qty: 30, price: 85.00, amount: 2550.00 },
      { sno: 2, particulars: 'HEMATOLOGY PAD PINK', qty: 30, price: 85.00, amount: 2550.00 },
      { sno: 3, particulars: 'VITAL CHART', qty: 60, price: 85.00, amount: 5100.00 },
      { sno: 4, particulars: 'INTAKE OUTPUT CHART', qty: 60, price: 85.00, amount: 5100.00 },
    ],
    gstRate: 18,
    hsnSac: '9989',
    termsAndConditions: "1. Certified that the particulars given above are correct in all respects. Also The charged & collected are in accordance with the provisions of the Act.\n2. Any dispute arising out of this invoice is subject to Bhilai Jurisdiction.\n3. Interests to Durg Jurisdiction.\n4. If any bill exceeds 24% P.A. shall be charged in case of Delayed payments beyond approved terms & GST Extra.\n5. E & O.E.",
  });

  const [totals, setTotals] = useState({
    subTotal: 0,
    gstAmount: 0,
    totalAmount: 0,
  });

  // Recalculate totals whenever items change
  useEffect(() => {
    const subTotal = invoiceData.items.reduce((acc, item) => acc + item.amount, 0);
    const gstAmount = (subTotal * invoiceData.gstRate) / 100;
    const totalAmount = subTotal + gstAmount;
    setTotals({ subTotal, gstAmount, totalAmount });
  }, [invoiceData.items, invoiceData.gstRate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...invoiceData.items];
    const item = items[index];
    
    // Convert value to number for qty and price
    const numericValue = (name === 'qty' || name === 'price') ? parseFloat(value) || 0 : value;
    item[name] = numericValue;
    
    // Recalculate amount for the current item
    if (name === 'qty' || name === 'price') {
      item.amount = (item.qty || 0) * (item.price || 0);
    }

    setInvoiceData(prevData => ({ ...prevData, items }));
  };

  const addItem = () => {
    const newSno = invoiceData.items.length + 1;
    const items = [...invoiceData.items, { sno: newSno, particulars: '', qty: 1, price: 0.00, amount: 0.00 }];
    setInvoiceData(prevData => ({ ...prevData, items }));
  };

  const removeItem = (indexToRemove) => {
    const items = invoiceData.items
      .filter((_, index) => index !== indexToRemove)
      .map((item, index) => ({ ...item, sno: index + 1 })); // Re-number S.NO.
    setInvoiceData(prevData => ({ ...prevData, items }));
  };

  return (
    <div className="invoice-container">
      <div className="invoice-header-top">
        <div className="header-contact-info">
          <p><strong>Add.</strong> : Awanti Bai Chowk, Junwani Road, Bhilai (C.G.)</p>
          <p><strong>Contact</strong> : 7722828880</p>
          <p><strong>E-mail</strong> : infodesignersquare@gmail.ocom</p>
        </div>
        <div className="header-logo-container"><img src={logoOriginal} alt="Logo" className="header-logo" /></div>
      </div>
      <div className="invoice-title">TAX INVOICE</div>

      <div className="invoice-details-grid">
        <div className="details-box company-details">
          <textarea name="companyAddress" value={invoiceData.companyAddress} onChange={handleInputChange} style={{ fontWeight: 'bold' }} />
          <input type="text" name="companyGSTIN" value={invoiceData.companyGSTIN} onChange={handleInputChange} style={{ fontWeight: 'bold' }} />
          <input type="text" name="companyEmail" value={invoiceData.companyEmail} onChange={handleInputChange} />
          <input type="text" name="companyMob" value={invoiceData.companyMob} onChange={handleInputChange} />
        </div>
        <div className="details-box invoice-meta">
            <div className="meta-row">
                <div className="meta-label">Invoice No.</div>
                <div className="meta-value"><input type="text" name="invoiceNo" value={invoiceData.invoiceNo} onChange={handleInputChange}/></div>
            </div>
            <div className="meta-row">
                <div className="meta-label">Dated</div>
                <div className="meta-value"><input type="text" name="dated" value={invoiceData.dated} onChange={handleInputChange}/></div>
            </div>
            {/* Other meta rows can be made editable similarly */}
        </div>
      </div>

      <div className="buyer-bank-grid">
        <div className="details-box buyer-details">
          <p><strong>BUYER</strong></p>
          <input type="text" name="buyerName" value={invoiceData.buyerName} onChange={handleInputChange} />
          <textarea name="buyerAddress" value={invoiceData.buyerAddress} onChange={handleInputChange} />
          <input type="text" name="buyerGSTIN" value={invoiceData.buyerGSTIN} onChange={handleInputChange} />
        </div>
        <div className="details-box bank-details">
          <p><strong>BANK DETAILS</strong></p>
          <p>A/c Name : <input type="text" name="bankName" value={invoiceData.bankName} onChange={handleInputChange} style={{width: '60%'}}/></p>
          <p>A/c No. : <input type="text" name="accountNo" value={invoiceData.accountNo} onChange={handleInputChange} style={{width: '60%'}}/></p>
          <p>IFSC Code : <input type="text" name="ifscCode" value={invoiceData.ifscCode} onChange={handleInputChange} style={{width: '60%'}}/></p>
          <p>Branch : <input type="text" name="branchName" value={invoiceData.branchName} onChange={handleInputChange} style={{width: '60%'}}/></p>
        </div>
      </div>
      
      <div className="items-table-container">
        <table className="items-table">
          <thead>
            <tr>
              <th className="sno">S.NO.</th>
              <th className="particulars">PARTICULARS</th>
              <th className="qty">QTY.</th>
              <th className="price">PRICE</th>
              <th className="amount">AMOUNT</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td className="sno">{item.sno}</td>
                <td className="particulars"><input type="text" name="particulars" value={item.particulars} onChange={(e) => handleItemChange(index, e)}/></td>
                <td className="qty"><input type="number" name="qty" value={item.qty} onChange={(e) => handleItemChange(index, e)}/></td>
                <td className="price"><input type="number" name="price" value={item.price} onChange={(e) => handleItemChange(index, e)}/></td>
                <td className="amount">{item.amount.toFixed(2)}</td>
                <td><button className="delete-item-btn" onClick={() => removeItem(index)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-item-btn" onClick={addItem}>Add Item</button>
      </div>
      
      <div className="subtotal-row">
        <div className="subtotal-label">SUB TOTAL</div>
        <div className="subtotal-value">{totals.subTotal.toFixed(2)}</div>
      </div>

      <div className="gst-total-row">
        <div className="gst-total-label">GST {invoiceData.gstRate}%</div>
        <div className="gst-total-value">{totals.gstAmount.toFixed(2)}</div>
      </div>
      <div className="gst-total-row grand-total">
        <div className="gst-total-label">TOTAL</div>
        <div className="gst-total-value">{totals.totalAmount.toFixed(2)}</div>
      </div>

      <div className="amount-in-words">
        <p>Amount in words: <strong>{toWords(totals.totalAmount)}</strong></p>
      </div>

      <div className="tax-terms-grid">
        <div className="tax-breakdown">
            <table className="tax-table">
                <tbody>
                    <tr>
                        <td colSpan="2">HSN/SAC</td>
                        <td colSpan="2" style={{textAlign: 'right'}}><input type="text" name="hsnSac" value={invoiceData.hsnSac} onChange={handleInputChange} style={{border:'none', textAlign:'right'}} /></td>
                    </tr>
                    <tr><td colSpan="2">TAXABLE VALUE</td><td colSpan="2" style={{textAlign: 'right'}}>{totals.subTotal.toFixed(2)}</td></tr>
                    <tr style={{fontWeight: 'bold'}}><td></td><td>Rate</td><td style={{textAlign: 'right'}}>Amount</td></tr>
                    <tr><td>CENTRAL TAX</td><td>{invoiceData.gstRate/2}%</td><td style={{textAlign: 'right'}}>{(totals.gstAmount / 2).toFixed(2)}</td></tr>
                    <tr><td>STATE TAX</td><td>{invoiceData.gstRate/2}%</td><td style={{textAlign: 'right'}}>{(totals.gstAmount / 2).toFixed(2)}</td></tr>
                    <tr style={{fontWeight: 'bold'}}><td colSpan="2">Total Tax Amount</td><td colSpan="2" style={{textAlign: 'right'}}>{totals.gstAmount.toFixed(2)}</td></tr>
                </tbody>
            </table>
        </div>
        <div className="terms-conditions">
          <textarea name="termsAndConditions" value={invoiceData.termsAndConditions} onChange={handleInputChange}></textarea>
        </div>
      </div>

      <div className="signature-section">
        <div className="signature-box">
          for, <strong>DESIGNER SQUARE</strong>
          <div style={{height: '40px'}}></div>
          Authorised Signatory
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;