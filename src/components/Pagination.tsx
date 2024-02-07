import React from "react"
import { useAppContext } from "../context/AppContext"

const Pagination: React.FC = () => {
  const { numOfPages, currentPage, changePage } = useAppContext()

  console.log('numOfPages', numOfPages)
  console.log('currentPage', currentPage)

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

  const prevPage = () => {
    let newPage = currentPage - 1
    if (newPage < 1) {
      newPage = 1
    }
    changePage(newPage)
  }

  const nextPage = () => {
    let newPage = currentPage + 1
    if (newPage > numOfPages) {
      newPage = numOfPages
    }
    changePage(newPage)
  }

  return (
    <>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button
              className={`page-link border-0 bg-transparent ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={currentPage === 1 ? undefined : prevPage}>
                Anterior
            </button>
          </li>
          {/* <li className="page-item active"><a className="page-link rounded border-0" href="#">1</a></li> */}
          {pages.map((pageNumber) => (
            <button
              type="button"
              className={pageNumber === currentPage ? 'page-link rounded border-0 active' : 'page-link rounded border-0 bg-transparent'}
              key={pageNumber}
              onClick={() => changePage(pageNumber)}>
              {pageNumber}
            </button>
          ))}
          <li className="page-item">
            <button className={`page-link rounded border-0 bg-transparent ${currentPage === numOfPages ? 'disabled' : ''}`}
            onClick={currentPage === numOfPages ? undefined : nextPage}>
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Pagination