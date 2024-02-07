import { useAppContext } from "../context/AppContext"
import Pagination from "./Pagination"

const Footer = () => {
  const { numOfPages,totalResults } = useAppContext()

  return (
    <div className="d-flex justify-content-between">
      <p className="fw-lighter">#Registros: {totalResults}</p>
      {
        numOfPages > 1 && <Pagination />
      }
    </div>
  )
}

export default Footer