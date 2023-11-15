import "../main/main.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {CardListSearch} from "./CardListSearch";
// import PageButton from "../../components/pageButton/PageButton";
import { fetchSearch} from "../../redux/ducks/SearchSlice";
import {increment, setCount} from "../../redux/ducks/PageCountSlice";
import {setTheme} from "../../redux/ducks/ThemeSlice";
import { FaEye } from "react-icons/fa6";
import {quantum} from "ldrs";
quantum.register();

//Number of items for init.
export const init= 5
const source = "Search"

export const Search = () => {
        const dispatch = useDispatch();

        //Get inputSearch value
        const search = useSelector(state => state.searchSliceReducer.input);
        console.log("inputSearch in Search.js: ", search);

        //init useEffect
        useEffect(() => {
                //change Theme
                dispatch(setTheme(source));
                //set page count
                dispatch(setCount(init));
                //fetch data
                dispatch(fetchSearch({search, page:init}));
                console.log("init useEffect Main ");
        },[dispatch])

        const page = parseInt(useSelector((state) => state.pageCountSliceReducer.count.count))
        console.log("page in Search.js ", page)      

        //UseEffect for initialization, next-, prev-Page
        useEffect(() => {
                let i = 0;
                if(i === 0){
                        i++
                } 
                else {
                        console.log("dispatch page post init ", page)
                        dispatch(increment({page}));
                        dispatch(fetchSearch({page}));
                } 
        },[page, dispatch]);

        //Get array of data that will be displayed
        const searchSliceReducerData = useSelector((state) => state.searchSliceReducer.data);
        console.log("searchSliceReducerData in Search.js ", searchSliceReducerData);

        // Get data.name of first and last item on the screen
        const searchSliceReducerPage = useSelector((state) => state.searchSliceReducer.page);
        const {nextPage, prevPage} = searchSliceReducerPage;
        console.log("nextPage: ", nextPage, "prevPage: ", prevPage);

        const searchSliceReducerLoading = useSelector((state) => state.searchSliceReducer.isLoading);
        const searchSliceReducerError = useSelector(state => state.searchSliceReducer.isError);

        if(searchSliceReducerLoading === true){
                return(
                        <div className="mainContainer loading">
                                <l-quantum size="150" speed="2.4" color="black"></l-quantum>
                        </div>
                )
        }

        if(searchSliceReducerError === true){
                        return <div className="mainContainer error">Error...</div>
        }

        return ( 
                <div className="mainContainer">
                        <div className="subMainContainer">
                                <div id="sourceSearch">&nbsp;<FaEye />{source}</div>
                                {/* <div>
                                        <PageButton source={source} subreddit={search} page={page} nextPage={nextPage} prevPage={prevPage}/>
                                </div> */}
                        </div>
                        <ul>
                        {searchSliceReducerData.map((data, index) => {
                                return (
                                        <li key={index}>
                                                <CardListSearch data={data}/>
                                        </li>)})
                        } 
                        </ul>
                </div>
         );
}
 