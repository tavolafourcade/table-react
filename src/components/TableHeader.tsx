import { useAppContext } from "../context/AppContext"

const TableHeader = () => {
  const {toggleFilters} = useAppContext()

  const handleToggleFilters = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    toggleFilters()
  }

  return (
    <div  style={{ marginTop: '120px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Mi tabla</h2>
        <div>
          <button className="btn btn-sm btn-outline-primary px-4 me-2" onClick={(e) => handleToggleFilters(e)}>
              <i className="bi bi-sliders"></i> Filtros
          </button>
          <button className="btn btn-sm btn-outline-primary px-4 me-2" >
              <i className="bi bi-pencil"></i> Editar
          </button>
          <button className="btn btn-sm btn-outline-danger px-4 me-2" >
              <i className="bi bi-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default TableHeader