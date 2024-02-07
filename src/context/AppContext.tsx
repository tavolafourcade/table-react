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
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  fetchData: () => Promise<void>;
  filterRegisters: () => void;
  totalResults?: number;
  toggleFilters: () => void;
  showFilters: boolean;
  numOfPages: number;
  currentPage: number;
  changePage: (page: number) => void;
  itemsPerPage: number;
  // currentPage: number;
  // pageSize: number;
  // totalPages: number;
  // changePageSize: (size: number) => void;
}
const state = {
  filteredData: [],
  searchQuery: "",
  setSearchQuery: () => {},
  fetchData: async () => {},
  filterRegisters: () => {},
  totalResults: 0,
  toggleFilters: () => {},
  showFilters: false,
  numOfPages: 1,
  currentPage: 1,
  itemsPerPage: 10,
  changePage: () => {}
}
export const AppContext = createContext<AppContextType>(state);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ data, setData ] = useState<Register[]>([])
  const [ filteredData, setFilteredData ] = useState<Register[]>([])
  const [ totalResults, setTotalResults ] = useState<number>(100)
  const [ searchQuery, setSearchQuery ] = useState<string>("")
  const [ showFilters, setShowFilters ] = useState<boolean>(false)
  const [ currentPage, setCurrentPage ] = useState<number>(1)
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [pageSize, setPageSize] = useState<number>(10);
  // const [totalPages, setTotalPages] = useState<number>(0);

  // const changePage = (page: number) => {
  //   setCurrentPage(page);
  // };

  // const changePageSize = (size: number) => {
  //   setPageSize(size);
  // };

  const itemsPerPage = 10
  const numOfPages = Math.ceil(totalResults / itemsPerPage)

  const toggleFilters = () => {
    console.log('showFilters context', showFilters)
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
      console.log('TOTAL PAGES', response.data.info.page)
      // setTotalPages(response.data.info.page);
    } catch (error: any) {
      console.error(`Error al obtener los datos: ${error.message}`)
    }
  }

  const filterRegisters = () => {
    const filteredData = data.filter((register) =>
      `${register.name.first} ${register.name.last}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData)
    setTotalResults(filteredData.length)
  }

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  const contextValues = {
    ...state,
    filteredData,
    searchQuery,
    setSearchQuery,
    fetchData,
    filterRegisters,
    totalResults,
    toggleFilters,
    showFilters,
    numOfPages,
    changePage,
    currentPage,
    itemsPerPage
  }

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
};

const useAppContext = () => useContext(AppContext)
export { AppProvider, useAppContext }