import React, { useState } from 'react';

const PaginationTable = ({ data }) => {
  // 1. State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 2. Calculations
  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // 3. Event Handlers
  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page to avoid "out of bounds" errors
  };

  return (
    <div>
      {/* Rows Per Page Selector */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="rows-select">Show: </label>
        <select 
          id="rows-select" 
          value={rowsPerPage} 
          onChange={handleRowsChange}
        >
          {[10, 20, 50, 100].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span> records per page</span>
      </div>

      {/* Table Display */}
      <table>
        {/* Render your currentRecords here */}
      </table>

      {/* Page Navigation */}
      <div style={{ marginTop: '1rem' }}>
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationTable;