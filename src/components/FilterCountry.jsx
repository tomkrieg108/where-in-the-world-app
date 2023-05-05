import {FaSearch} from 'react-icons/fa'
import {useState, useContext, useRef, useEffect} from 'react'
import AppContext from "../context/AppProvider"

function FilterCountry({dropdownActive, setDropdownStatus, countryFilterValue, setCountryFilterValue, regionFilterValue, setRegionFilterValue}) {

  const [dropdownItems, setDropdownItems] = useState([]);
  const {countryData, filterByCountryCode, resetFilters, darkMode} = useContext(AppContext);
  const inputRef = useRef(null);

  useEffect( () => {
    if(regionFilterValue.length > 0) {
      inputRef.current.value = '';
    }
  },[regionFilterValue]);

  useEffect( () => {
    const handleWindowClick = (e) => {
      if(dropdownActive) {
        // will only be active if clicked outside the component => close the component
        inputRef.current.value = '';
        setDropdownStatus(false); //dropdown won't open if this line is here
      }
    }
    dropdownActive ? window.addEventListener('click',handleWindowClick ) :
      window.removeEventListener('click', handleWindowClick);

    return () => {
      // console.log('removing event listener')
      window.removeEventListener('click', handleWindowClick);
    }

  }, [dropdownActive,setDropdownStatus]);

  const handleChange = function(e) {
  
    // setCountryFilterValue( e.target.value);
    const str = e.target.value.toLowerCase();
    if(str.length === 0) {
      setDropdownStatus(false);  //dropdown is inactive
       //if no region filter currently active => reset filter. otherwise leave regios filter unchanged
      regionFilterValue.length === 0 &&  resetFilters();
      return;
    }
    const list = countryData.filter((item) => {
      let result = false;
      result = (item.name.official.toLowerCase().startsWith(str) || 
               (item.name.common.toLowerCase().startsWith(str)));

      if(str.length >=2) {
        result ||= item.name.official.toLowerCase().includes(str);
        result ||= item.name.common.toLowerCase().includes(str);
      }
      return result;
    });
    setDropdownStatus(true);  //dropdown is active
    setDropdownItems(list);
  }

  const handleClick = function(e) {
    inputRef.current.value = e.target.getAttribute('value');
    setDropdownStatus(false);  //dropdown is inactive
    filterByCountryCode(e.target.getAttribute('cca3'));
    setCountryFilterValue(inputRef.current.value);
    setRegionFilterValue('');
  }

  return (
    <div className='relative w-96'>
      <div className={`px-2 py-3 flex justify-start items-center rounded-lg border-4 w-full ${darkMode ? 'bg-darkBlue border-gray-800' : 'bg-white text-gray-800'} `}>
        <FaSearch className={ `text-xl h-full w-10 px-3 ${darkMode ? 'text-white' :'text-gray-800'} `}/>
        <input ref={inputRef} onChange={handleChange} defaultValue={countryFilterValue}  type="text" className="bg-inherit outline-none h-full w-full pl-5" placeholder="Search for a country..." />
      </div>

      {dropdownActive && (
        <div className={`absolute left-0 right-0 top-14 z-50 max-h-72 overflow-y-auto rounded-lg border-4  ${darkMode ? 'bg-darkBlue border-gray-800' : 'bg-white text-gray-800'}`}>
            {dropdownItems.map((curItem) => {
              return (
                <button onClick = {handleClick} key={curItem.cca3} cca3={curItem.cca3} value={curItem.name.official} className={`pl-6 py-1 block w-full text-left ${ darkMode ? 'hover:bg-slate-700' : ' hover:bg-gray-200' }  `}>  
                  {curItem.name.official}
                </button>
              )
            })}
        </div>
      )}
    
    </div>
    
  )
}

export default FilterCountry
