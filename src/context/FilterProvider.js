// This is not currently used!

import { createContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({children}) => {

  const [countryDropdownActive, setCountryDropdownActive] = useState(false);
  const [regionDropdownActive, setRegionDropdownActive] = useState(false);
  const [regionFilterValue, setRegionFilterValue] = useState('');
  const [countryFilterValue, setCountryFilterValue] = useState('');

  return (

    <FilterContext.Provider value={{
       
      }}>  
        
      {children}
    </FilterContext.Provider>
   )
}

export default FilterContext;