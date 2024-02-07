import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { SearchBar } from "./components/SearchBar"
import { Table } from "./components/Table"
import TableHeader from "./components/TableHeader"
import { useAppContext } from "./context/AppContext"
import Filters from "./components/Filters"

const MainPage = () => {
  const { setSearchQuery } = useAppContext()

  const handleSearch = (query:string)=>{
    setSearchQuery(query)
  }
  
  return (
    <div className="container-lg">
        <Navbar/>
        <TableHeader />
        <Filters />
        <SearchBar onSearch={handleSearch}/>
        <Table />
        <Footer />
      </div>
  )
}

export default MainPage