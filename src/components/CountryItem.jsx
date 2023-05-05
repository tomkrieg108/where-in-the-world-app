
import { Link } from 'react-router-dom'
import {useContext} from 'react'
import AppContext from '../context/AppProvider';

function CountryItem({item}) {

  const { darkMode } = useContext(AppContext);

  const summaryData = {
    alpha: item.cca3,
    flag: item.flags.png,
    countryName: item.name.official,
    population: item.population,
    region: item.region,
    capital: item.capital, //this is an array according to the data!?
  };
  const {alpha,flag,countryName,population,region,capital} = summaryData;

  return (
    <Link className={` rounded-lg border-4 text-inherit mx-auto  hover:scale-105 transition-transform ease-linear duration-200 w-72 h-96 w-3/5 md:w-4/5 lg:w-full ${darkMode ? 'bg-darkBlue border-gray-800' : 'bg-gray-50 border-gray-200'}`}
    to={`/country/${alpha}`}>
      <img className="w-full h-40 object-cover object-center overflow-hidden p-1" src={flag} alt="" />
      <div className="px-6 py-6 text-left">
        <h4 className="text-md font-semibold mb-6">{countryName}</h4>
        <p className="text-sm mb-2"><span className="font-semibold">Population: </span>{new Intl.NumberFormat('en-us').format(population)}</p>
        <p className="text-sm mb-2"><span className="font-semibold">Region: </span>{region}</p>
        <p className="text-sm mb-2"><span className="font-semibold">Capital: </span>{capital}</p>
      </div>
    </Link>
  )
}

export default CountryItem



