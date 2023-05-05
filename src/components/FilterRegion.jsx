
import {FaAngleDown} from 'react-icons/fa'
import AppContext from "../context/AppProvider";
import { useContext, useRef, useEffect } from "react";

function FilterRegion({dropdownActive,setDropdownStatus, countryFilterValue, setCountryFilterValue, regionFilterValue, setRegionFilterValue}) {

  const {filterByRegion, resetFilters,  darkMode} = useContext(AppContext);
  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const dropdownRef = useRef(null);

  const regions = ['Americas','Africa','Asia','Europe','Oceania'];

  useEffect( () => {
    if(countryFilterValue.length > 0) {
      inputRef.current.value = '';
    }
  },[countryFilterValue]);


  useEffect( () => {
    const handleWindowClick = (e) => {
      if(dropdownActive) {
        // will only be active if clicked outside the component => close the component
        // console.log('closing dropdown');
        setDropdownStatus(false); //dropdown won't open if this line is here
      }
    }
    dropdownActive ? window.addEventListener('click',handleWindowClick ) :
      window.removeEventListener('click', handleWindowClick);

    return () => {
      // console.log('removing event listener')
      window.removeEventListener('click', handleWindowClick);
    }

  }, [dropdownActive,setDropdownStatus])

  const handleRegionSelected = (e) => {
    // console.log('region clicked');
    setDropdownStatus(false);
    const region = e.target.getAttribute('region');
    if(region === 'Reset') {
      inputRef.current.value = '';
      setRegionFilterValue('');
      resetFilters();
    } else {
      inputRef.current.value = region;
      setRegionFilterValue(region);
      setCountryFilterValue('');
      filterByRegion(region);
    }
  }

  const handleDropDownClick = function(e) {
    e.stopPropagation(); //Need this so that handleWindowClick want get called also and immediately close the dropndown 
    setDropdownStatus(!dropdownActive);
  }

  return (
   
    <div className='relative w-52'>
      <button ref={btnRef} onClick = {handleDropDownClick} className={`px-2 py-3 flex justify-between items-center rounded-lg border-4 w-full ${darkMode ? 'bg-darkBlue border-gray-800' : 'bg-white  text-gray-800' } `}>
        
        <input ref={inputRef} type="text" readOnly defaultValue={regionFilterValue} className="bg-inherit outline-none h-full w-full pl-5 hover:cursor-pointer" placeholder="Filter by Region" />

        <FaAngleDown className = {`text-2xl h-full w-12 px-3 ${ darkMode ? 'text-white' : 'text-gray-800'  } `}  />
      </button>

      {dropdownActive && (
        <div ref={dropdownRef} className={`absolute left-0 right-0 top-14 z-50 max-h-72 overflow-y-auto rounded-lg border-4  ${darkMode ? 'bg-darkBlue border-gray-800' : 'bg-white text-gray-800'}`}>
            {regions.map((curItem) => {
              return (
                <button onClick = {handleRegionSelected} key={curItem} region={curItem} className={`pl-6 py-1 block w-full text-left ${ darkMode ? 'hover:bg-slate-700' : ' hover:bg-gray-200' }  `}>  
                  {curItem}
                </button>
              )
            })}

            {regionFilterValue.length > 0 && (
              <button onClick = {handleRegionSelected} region={'Reset'} className={`pl-6 py-1 block w-full text-left ${ darkMode ? 'hover:bg-slate-700' : ' hover:bg-gray-200' }  `} >Reset</button>
            )}
        </div>
      )}
    </div>
  )
}

export default FilterRegion
