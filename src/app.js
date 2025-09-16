import React from 'react';
import InvoiceGenerator from './InvoiceGenerator';
import './App.css'; 

function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="App">
      <div className="app-container">
        <h1>React Invoice Generator</h1>
        <p>Fill in the details below. To print, click the button.</p>
        <button onClick={handlePrint} className="print-btn">Print Invoice</button>
      </div>
      <InvoiceGenerator />
    </div>
  );
}

export default App;