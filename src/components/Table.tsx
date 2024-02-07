import { useEffect } from "react"
import { Register, useAppContext } from "../context/AppContext"

export const Table = () => {
  const { filterRegistersBySearchAndSelect, searchQuery, filteredData, selectedGenre, selectedNat, loading, selectedItems, handleSelection } = useAppContext()


  useEffect(() => {
    filterRegistersBySearchAndSelect(selectedGenre, selectedNat)
  }, [searchQuery])

  const getCurrentPageData = () => {
    // const startIndex = (currentPage - 1) * itemsPerPage
    // const endIndex = startIndex + itemsPerPage
    return filteredData.slice(0, 10)
  }
  const currentPageData = getCurrentPageData()

  const tableHead = ["", "Nombre", "Genero", "Correo electrónico", "Celular", "Nacionalidad"]
  const tableBody = ['name', 'gender', 'email', 'cell', 'nat']

  return (
    <>
      {
        loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-light table-bordered">
              <thead>
                <tr className="table-secondary">
                  {
                    tableHead.map((headerName, index) => (
                      <th key={index} scope="col">
                        {index === 0 ? (
                          <i className="bi bi-check-lg"></i>
                        ) : (
                          headerName
                        )}
                      </th>
                    )
                    )
                  }
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((register: Register, index: number) => (
                  <tr key={index}>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedItems[index] || false}
                      onChange={() => handleSelection(index)}
                      />
                    </th>
                    {
                      tableBody.map((property, propertyIndex) => (
                        <td key={propertyIndex} className="fw-light">
                          {
                            property === 'name'
                              ? `${register.name.first} ${register.name.last}`
                              : String(register[property as keyof Register])
                          }
                        </td>
                      ))
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </>
  )
}
