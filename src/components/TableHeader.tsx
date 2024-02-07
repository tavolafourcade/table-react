import { useAppContext } from "../context/AppContext"

const TableHeader = () => {
  const { toggleFilters, selectedItems, handleDeleteRegisters } = useAppContext()

  const handleToggleFilters = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    toggleFilters()
  }

  return (
    <div style={{ marginTop: '120px' }}>
      <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-4">
        <h2 className="fw-bold text-center text-md-start mb-md-0 mb-3">Mi tabla</h2>
        <div className="d-flex flex-column d-md-block">
          <button className="btn btn-sm btn-outline-primary px-4 me-2 mb-2 mb-md-0" onClick={(e) => handleToggleFilters(e)}>
            <i className="bi bi-sliders"></i> Filtros
          </button>
          <button className="btn btn-sm btn-outline-primary px-4 me-2 mb-2 mb-md-0" >
            <i className="bi bi-pencil"></i> Editar
          </button>
          <button
            className={`btn btn-sm btn-outline-danger px-4 me-2 mb-2 mb-md-0 ${Object.keys(selectedItems).length === 0 ? 'disabled' : ''}`}
            onClick={handleDeleteRegisters}>
            <i className="bi bi-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default TableHeader