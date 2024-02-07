import React, { createContext, ReactNode, useContext, useState } from "react";
import axios, { AxiosResponse } from "axios";

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
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
  setSelectedNat: React.Dispatch<React.SetStateAction<string>>;
  fetchData: () => Promise<void>;
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
  setSelectedGenre: () => { },
  setSelectedNat: () => { },
  setSearchQuery: () => { },
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

  const itemsPerPage = 10
  const numOfPages = Math.ceil(totalResults / itemsPerPage)

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const fetchData = async () => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(
        `https://randomuser.me/api?results=${totalResults}`
      )

      setData(response.data.results)
      setFilteredData(response.data.results)
      setTotalResults(response.data.info.results)
    } catch (error: any) {
      console.error(`Error al obtener los datos: ${error.message}`)
    }
  }

  const filterRegistersBySearchAndSelect = (selectedGenre: string, selectedNat: string) => {
    let filteredData = selectedGenre !== "all" ? data.filter(register => register.gender.toLowerCase() === selectedGenre.toLowerCase()) : data;

    filteredData = selectedNat !== "all" ? filteredData.filter(register => register.nat.toLowerCase() === selectedNat.toLowerCase()) : filteredData;

    const searchQueryLower = searchQuery.toLowerCase();
    filteredData = filteredData.filter(register => {
      const fullName = `${register.name.first} ${register.name.last}`.toLowerCase();
      return fullName.includes(searchQueryLower);
    });

    setFilteredData(filteredData);
    setTotalResults(filteredData.length);
  };

  const changePage = (page: number) => {
    setCurrentPage(page)
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
    setSelectedGenre,
    setSelectedNat
  }

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
};

const useAppContext = () => useContext(AppContext)
export { AppProvider, useAppContext }