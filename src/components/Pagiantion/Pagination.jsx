import React from 'react'
import "./Pagination.scss";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

function Pagination({ totalUsers, usersPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const goPrev = () => {
    const isFirstPage = currentPage === 1;
    const newIndex = isFirstPage ? pages.length : currentPage - 1;
    setCurrentPage(newIndex);
  }

  const goNext = () => {
    const isLastPage = currentPage === pages.length;
    const newIndex = isLastPage ? 1 : currentPage + 1;
    setCurrentPage(newIndex);
  }

  return (
    <div className='app__pagination'>
      <AiOutlineLeft onClick={goPrev} />
      <AiOutlineRight onClick={goNext} />
    </div>
  )
}

export default Pagination