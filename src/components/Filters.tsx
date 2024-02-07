import { useAppContext } from "../context/AppContext"

const genreFilter = ['all', 'female', 'male']
const natFilter = ['all', 'US', 'AU', 'BR', 'CH']

const Filters = () => {
  const {showFilters, filterRegistersBySearchAndSelect, selectedGenre, selectedNat, setSelectedGenre, setSelectedNat} = useAppContext()

  const handleFilterSearch = () => {
    filterRegistersBySearchAndSelect(selectedGenre, selectedNat)

  }
  return (
    showFilters ? (
      <div className="col-sm-12 mb-4 mt-8">
        <div className="card border-0 shadow-sm">
          <div className="card-body ">
            <div className="row py-3">
              <div className="form-group  col-sm-12 col-lg-4 ">
                <div className="input-group ">
                  <select
                    className="form-select form-select-sm single-select select-bs"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                    <optgroup label="GENERO">
                      {
                        genreFilter.map((genre, index) => (
                          <option key={index} value={genre}>{genre.toUpperCase()}</option>
                        ))
                      }
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className="form-group  col-sm-12 col-lg-4 ">
                <div className="input-group ">
                  <select
                    className="form-select form-select-sm single-select select-bs"
                    value={selectedNat}
                    onChange={(e) => setSelectedNat(e.target.value)}
                    >
                    <optgroup label="NACIONALIDAD">
                      {
                        natFilter.map((nat, index) => (
                          <option key={index} value={nat}>{nat.toUpperCase()}</option>
                        ))
                      }
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className="col-sm-12 col-lg-4">
                <button
                  className="btn btn-sm btn-primary px-4 rounded-3 btn-search"
                  onClick={handleFilterSearch}>
                  <i className="bi bi-search me-2"></i> Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null
  )
}

export default Filters