import CountryItem from "../components/CountryItem";
import Spinner from "../components/Spinner";
import AppContext from "../context/AppProvider";
import { useContext } from "react";

function CountryList() {

  const {isLoading, filteredData} = useContext(AppContext);

  if(isLoading) {
    return (
      <Spinner />
    )
  }

  const content = filteredData.map( (curItem) => {
      return <CountryItem key={curItem.cca3} item={curItem}  />
  } );

  return (
    <div className="py-16">
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {content}
      </div>
    </div>
  )
}

export default CountryList
