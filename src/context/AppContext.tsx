import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"

export interface Register {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  email: string;
  cell: string;
  nat: string;
}

interface Info {
  results: number;
  page: number;
}

interface ApiResponse {
  results: Register[];
  info: Info;
}

interface AppContextType {
  filteredData: Register[];
  searchQuery: string;
  selectedGenre: string;
  selectedNat: string;
  loading: boolean;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
  setSelectedNat: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: (currentPage: number) => Promise<void>;
  filterRegistersBySearchAndSelect: (selectedGenre: string, selectedNat: string) => void;
  totalResults?: number;
  toggleFilters: () => void;
  showFilters: boolean;
  numOfPages: number;
  currentPage: number;
  changePage: (page: number) => void;
  itemsPerPage: number;
}
const state = {
  filteredData: [],
  searchQuery: "",
  selectedGenre: "all",
  selectedNat: "all",
  loading: true,
  setSelectedGenre: () => { },
  setSelectedNat: () => { },
  setSearchQuery: () => { },
  setLoading: () => { },
  fetchData: async () => { },
  filterRegistersBySearchAndSelect: () => { },
  totalResults: 0,
  toggleFilters: () => { },
  showFilters: false,
  numOfPages: 1,
  currentPage: 1,
  itemsPerPage: 10,
  changePage: () => { }
}
export const AppContext = createContext<AppContextType>(state);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Register[]>([])
  const [filteredData, setFilteredData] = useState<Register[]>([])
  const [totalResults, setTotalResults] = useState<number>(100)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedNat, setSelectedNat] = useState("all")
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 10
  const [numOfPages, _] = useState(Math.ceil(totalResults / itemsPerPage))

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage])
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const fetchData = async (currentPage: number) => {
    try {
      setLoading(true)
      const storageKey = `page_${currentPage}`
      const storedData = localStorage.getItem(storageKey)

      if (storedData) {
        const parsedData = JSON.parse(storedData)
        setData(parsedData)
        setFilteredData(parsedData)
        setTotalResults(parsedData.length)
      } else {
        const response: AxiosResponse<ApiResponse> = await axios.get(
          `https://randomuser.me/api?seed=cdb146945fafa3b2&page=${currentPage}&results=${itemsPerPage}`
        )
        
        const newResults = response.data.results
        setData(newResults)
        setFilteredData(newResults)
        setTotalResults(response.data.info.results)
        localStorage.setItem(storageKey, JSON.stringify(newResults))
      }
      setLoading(false)
    } catch (error: any) {
      console.error(`Error al obtener los datos: ${error.message}`)
      setLoading(false)
    }
  };


  const filterRegistersBySearchAndSelect = (selectedGenre: string, selectedNat: string) => {
    let filteredData = data
    filteredData = selectedGenre !== "all" ? filteredData.filter(register => register.gender.toLowerCase() === selectedGenre.toLowerCase()) : filteredData

    filteredData = selectedNat !== "all" ? filteredData.filter(register => register.nat.toLowerCase() === selectedNat.toLowerCase()) : filteredData

    const searchQueryLower = searchQuery.toLowerCase()
    filteredData = filteredData.filter(register => {
      const fullName = `${register.name.first} ${register.name.last}`.toLowerCase()
      return fullName.includes(searchQueryLower)
    })

    setFilteredData(filteredData)
    setTotalResults(filteredData.length)
  };

  const changePage = async (page: number) => {
    setCurrentPage(page)
    const storedData = localStorage.getItem(`page_${page}`)
    if (storedData) {
      setFilteredData(JSON.parse(storedData))
    } else {
      await fetchData(page)
    }
  }

  const contextValues = {
    ...state,
    filteredData,
    searchQuery,
    selectedGenre,
    selectedNat,
    setSearchQuery,
    fetchData,
    filterRegistersBySearchAndSelect,
    totalResults,
    toggleFilters,
    showFilters,
    numOfPages,
    changePage,
    currentPage,
    itemsPerPage,
    loading,
    setSelectedGenre,
    setSelectedNat,
    setLoading
  }

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
};

const useAppContext = () => useContext(AppContext)
export { AppProvider, useAppContext }