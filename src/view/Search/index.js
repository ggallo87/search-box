import {useState, useEffect} from "react";
import SearchBox from "./components/SearchBox";
import "./style.css";
import SearchResults from "./components/SearchResults";

export default function Search(){
   
   const [isAtTop, setisAtTop] = useState(false); 
   const [results, setResults] = useState([]);
   const [data, setData] = useState([])

   useEffect(() => {
       const getUsers = async () => {
           const response = await fetch("https://jsonplaceholder.typicode.com/users");
           const data = await response.json();

           setData(data);
       };
       
        getUsers().catch(null);
    }, [])
   
   const handleCloseSearch = () => {
        setisAtTop(false);
        setResults([]);
   }
   const handleSearchClick = (searchText) => {
       setisAtTop(true)
       if(data?.length){
           
            const searchTextMinus = searchText.toLowerCase();
            const filterdData = data.filter((value) => (
                   value.name.toLowerCase().includes(searchTextMinus) ||
                   value.phone.toLowerCase().includes(searchTextMinus) ||
                   value.email.toLowerCase().includes(searchTextMinus) ||
                   value.username.toLowerCase().includes(searchTextMinus) 
                )
            );

           setResults(filterdData);
        }
   };
   
    return(
        <div className={`search ${isAtTop ? "search--top" : "search--center"}`}>
            <SearchBox onSearch = {handleSearchClick} onClose={handleCloseSearch} isSearching={isAtTop}/>
            <SearchResults results={results} isSearching={isAtTop}/>
        </div>
    );
}