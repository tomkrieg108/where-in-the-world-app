import { useContext } from "react";
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import AppContext from "../context/AppProvider";

function CountryPage() {

  const {countryData, darkMode} = useContext(AppContext);
  const {id} = useParams();

  const [item] = countryData.filter( (curItem) => {
    return (curItem.cca3 === id );
  })

  const getCurrencies = function(item) {
    let currencyNames = '';
    const currencyIds = Object.getOwnPropertyNames(item.currencies);

    if(!currencyIds) {
      return currencyNames;
    }
    currencyIds.forEach( (id, index ) => {
      const obj = item.currencies[id];
      obj && (currencyNames += obj.name + (index !== currencyIds.length - 1 ? ', ':'') );
    });
    return currencyNames;
  }

  const getLanguages = function(item) {
    let languageNames = '';
    const languageIds = Object.getOwnPropertyNames(item.languages);
    if(!languageIds) return languageNames;

    languageIds.forEach( (id, index ) => {
      const langName = item.languages[id];
      langName && (languageNames += langName + (index !== languageIds.length - 1 ? ', ':'' ));
    });
    return languageNames;
  }

  const getNativeName = function(item) {
    let name = '';
    const languageIds = Object.getOwnPropertyNames(item.languages);
    if(!languageIds) return name;
    if(languageIds[0]) {
      const langId = languageIds[0];
      //use the name based on first language
      const obj = item.name.nativeName[langId];
      name = obj && obj.common;
    }
    return name;
  }

  const getBorderingCountries = function(item) {
    let borderingCountries = [];
    item.borders && (
      borderingCountries = countryData.filter( (curItem) => {
        let includes = false;
        for(let i=0; i<item.borders.length; i++) {
          const countryId = item.borders[i];
          if( curItem.cca3 === countryId) {
            includes = true;
            break;
          }
        }
        return includes;
      } )
    )
    return borderingCountries;
  }

  const detailedData = {
    // alpha: item.cca3,
    flag: item.flags.png,
    countryName: item.name.official,
    population: item.population,
    region: item.region,
    capital: item.capital, //this is an array according to the data!?
    subregion: item.subregion,
    topLevelDomain: item.tld,
    currencies: getCurrencies(item),
    languages: getLanguages(item),
    nativeName: getNativeName(item),
    borderCountries: getBorderingCountries(item),
  };

  const {flag,countryName,population,region,capital,nativeName,subregion,topLevelDomain,currencies,languages,borderCountries} = detailedData;

  return (
    <div className={`mx-auto px-10 lg:px-20 py-16 min-h-screen ${darkMode ? 'bg-veryDarkBlue1 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <Link to={'/'} className={`px-6 py-2  rounded-lg border-4 ${darkMode ? 'bg-darkBlue border-gray-800' : 'bg-white border-gray-200'} `}>
        &larr; back
      </Link>
      <div className="py-16 flex flex-col justify-center items-start space-y-10 lg:flex-row lg:justify-between lg:items-center lg:space-y-0 lg:space-x-32">
        <img className="w-full h-auto lg:w-1/2" src={flag} alt="" />
        <div className="w-full lg:w-1/2">
          <h3 className="text-3xl font-semibold text-left mb-8">{countryName}</h3>
          <div className="flex flex-col justify-left items-start space-y-14 md:flex-row md:space-y-0 md:space-x-16">
            <div className="w-full md:w-1/2">
              <p className="text-sm mb-3"><span className="text-lg font-semibold">Native Name:  </span>{nativeName}</p>
              <p className="text-sm mb-3"><span className="text-lg font-semibold">Population:  </span>{new Intl.NumberFormat('en-us').format(population)}</p>
              <p className="text-sm mb-3"><span className="text-lg font-semibold">Region:  </span>{region}</p>
              <p className="text-sm mb-3"><span className="text-lg font-semibold">Sub Region:  </span>{subregion}</p>
              <p className="text- mb-3"><span className="text-lg font-semibold">Capital:  </span>{capital}</p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-sm mb-3"><span className="text-lg font-semibold">Top Level Domain:  </span>{topLevelDomain}</p>
              <p className="text-sm mb-3"><span className="text-lg font-semibold">Currences:  </span>{currencies}</p>
              <p className="text-sm mb-3"><span className="text-lg font-semibold">Languages:  </span>{languages}</p>
            </div>
          </div>
          
          
          <div className="pt-10 flex flex-wrap justify-start items-center space-x-3">
            <p className="text-lg font-semibold">Border Countries:  </p>
            {borderCountries.length === 0 ? (
              <p className="text-sm font-md">None</p>
            ) : (
              borderCountries.map((item)=> {
                return (
                  <Link  to={`/country/${item.cca3}`} key={item.cca3} className="px-2 py-2 dark:bg-darkBlue dark:border-gray-800 rounded-lg border-4">
                    <p className="text-center text-sm">{item.name.common}</p>
                  </Link>
                )
              })
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default CountryPage

