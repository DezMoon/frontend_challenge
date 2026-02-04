type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handleClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };


  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
      className="w-10 bg-blue-100 rounded-3xl hover:bg-green-300"
        key={i}
        onClick={() => handleClick(i)}
        disabled={currentPage === i}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex space-x-2">
      <button
        className="bg-blue-100 rounded-3xl w-30 hover:bg-green-300"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button >

      {pageButtons}

      <button
        className="bg-blue-100 rounded-3xl w-30 hover:bg-green-300"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;