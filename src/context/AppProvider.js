import { createContext, useState, useEffect } from "react";

const RESTCOUNTRIES_URL = process.env.REACT_APP_RESTCOUNTRIES_URL;

const AppContext = createContext();

export const AppProvider = ({children}) => {

  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect( () => {
    loadCountries();
  },[]);

  const loadCountries = async function() {
    try {
      const response = await fetch(`${RESTCOUNTRIES_URL}/all`);
      if(! response.ok) {
        throw new Error('Problem getting country data');
      }
      const data = await response.json();
      // console.log('here is the country data: ', data);
      // const filtered = [...data];
      // console.log('here is the filtered country data: ', filtered);
      setIsLoading(false);
      setCountryData(data);
      setFilteredData([...data]); //shallow copy
    } catch (err) {
      console.error(err);
    }
  }

  const filterByRegion = function(region) {
    if(!region) {
      setFilteredData(countryData);
      return;
    }
    const data = countryData.filter((item) => {
      return item.region.toLowerCase() === region.toLowerCase();
    })
    setFilteredData(data);
  }

  const filterByCountryCode = function(code) {
    const data = countryData.filter((item) => {
      return item.cca3.toLowerCase() === code.toLowerCase();
    })
    // const [country] = data;
    setFilteredData(data);
  }

  const resetFilters = function() {
    setFilteredData(countryData);
  }

  const toggleDarkMode = function() {
    setDarkMode(!darkMode);
  }
    
 return (

  <AppContext.Provider value={{
      darkMode,
      toggleDarkMode,
      isLoading, 
      countryData, 
      filteredData,  
      filterByRegion, 
      filterByCountryCode, 
      resetFilters,
      }}>  
      
    {children}
  </AppContext.Provider>
 )
}

export default AppContext;
