import { useContext } from "react"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { SearchBar } from "./components/SearchBar"
import { Table } from "./components/Table"
import TableHeader from "./components/TableHeader"
import { AppContext } from "./context/AppContext"

const MainPage = () => {
  const value = useContext(AppContext)

  const handleSearch = (query:string)=>{
    value?.setSearchQuery(query)
  }
  
  return (
    <div className="container">
        <Navbar/>
        <TableHeader />
        <SearchBar onSearch={handleSearch}/>
        <Table />
        <Footer />
      </div>
  )
}

export default MainPage