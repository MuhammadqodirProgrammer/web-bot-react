import ReactPaginate from "react-paginate";

export const Pagination = ({ totalPage ,setActivePage, activePage}) => {
  return (
    <>
      <ReactPaginate
        pageCount={totalPage}
        previousLabel="Prev"
        nextLabel="Next"
        forcePage={activePage === 1? 0 : activePage - 1}
        className="pagination justify-content-center my-5 gap-3"
        pageLinkClassName=" page-link  "
        pageClassName="page-item w-[50px] h-[50px] rounded-full bg-blue-700   flex items-center justify-center "
        previousLinkClassName="btn btn-primary text-white"
        nextLinkClassName="btn btn-primary text-white"
        activeClassName="active  text-red-500  bg-[teal] "
        onPageChange={ (data) =>{
            setActivePage(data.selected + 1)

        }}
      />
    </>
  );
};
