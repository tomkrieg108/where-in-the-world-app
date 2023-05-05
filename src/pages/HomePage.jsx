

import FilterCountry from "../components/FilterCountry"
import FilterRegion from "../components/FilterRegion"
import CountryList from "../components/CountryList";
import {useState, useContext } from "react";
import AppContext from "../context/AppProvider";

function HomePage() {

  const { darkMode } = useContext(AppContext);

  const [countryDropdownActive, setCountryDropdownActive] = useState(false);
  const [regionDropdownActive, setRegionDropdownActive] = useState(false);
  const [regionFilterValue, setRegionFilterValue] = useState('');
  const [countryFilterValue, setCountryFilterValue] = useState('');

  const updateRegionDropdownStatus = function(newStatus) {
    setRegionDropdownActive(newStatus); //applied on the next render!
    (newStatus === true) && setCountryDropdownActive(false);
  }

  const updateCountryDropdownStatus = function(newStatus) {
    setCountryDropdownActive(newStatus); //applied on the next render!
    (newStatus === true) && setRegionDropdownActive(false);
  }

  return (
    <div className={`mx-auto px-10 lg:px-20 pt-8 min-h-screen  ${darkMode ? 'bg-veryDarkBlue1 text-white' : 'bg-gray-100 text-gray-800'} `}>
       <div className="flex flex-col justify-center items-center space-y-6 md:flex-row  md:justify-between md:items-center md:space-y-0">
          <FilterCountry 
            dropdownActive={countryDropdownActive} 
            setDropdownStatus={updateCountryDropdownStatus} 

            countryFilterValue={countryFilterValue}
            setCountryFilterValue={setCountryFilterValue}
            regionFilterValue={regionFilterValue}  
            setRegionFilterValue={setRegionFilterValue}
          />
          <FilterRegion 
            dropdownActive={regionDropdownActive} 
            setDropdownStatus={updateRegionDropdownStatus} 
            
            countryFilterValue={countryFilterValue}
            setCountryFilterValue={setCountryFilterValue}
            regionFilterValue={regionFilterValue}  
            setRegionFilterValue={setRegionFilterValue}
          />
       </div>
       <CountryList />
    </div>
  )
}

export default HomePage
