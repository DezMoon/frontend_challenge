type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  function handleClick(page: number) {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  }

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
      </button>,
    );
  }

  return (
    <div className="flex items-center justify-center mt-3 space-x-4">
      {/* Previous Button */}
      <button
        className="px-5 py-2 text-sm font-semibold text-gray-700 transition bg-white border border-gray-300 rounded-full shadow-sm hover:bg-purple-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Current Page Number */}
      <span className="px-5 py-2 text-sm font-bold text-white bg-purple-400 rounded-full shadow-md">
        {currentPage}/{totalPages}
      </span>

      {/* Next Button */}
      <button
        className="px-5 py-2 text-sm font-semibold text-gray-700 transition bg-white border border-gray-300 rounded-full shadow-sm hover:bg-purple-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
