import React, { useContext } from "react"
import { AppContext } from "../context/AppContext"

const Pagination: React.FC = () => {
  const value = useContext(AppContext)

  console.log('value', value)

  return (
    <>
      <nav>
        <ul className="pagination">
          <li className="page-item"><a className="page-link text-secondary border-0 bg-transparent disabled" href="#">Anterior</a></li>
          <li className="page-item active"><a className="page-link rounded border-0" href="#">1</a></li>
          <li className="page-item"><a className="page-link rounded border-0 bg-transparent" href="#">2</a></li>
          <li className="page-item"><a className="page-link rounded border-0 bg-transparent" href="#">3</a></li>
          <li className="page-item"><a className="page-link rounded border-0 bg-transparent" href="#">Siguiente</a></li>
        </ul>
      </nav>
    </>
  )
}

export default Pagination