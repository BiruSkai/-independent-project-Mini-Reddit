import "./main.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {CardList} from "./cardList/CardList";
import PageButton from "../pageButton/PageButton";
import { fetchBest} from "../../redux/ducks/BestSlice";
import {increment, setCount} from "../../redux/ducks/PageCountSlice";
import {setTheme} from "../../redux/ducks/ThemeSlice";
import {GiSpikedDragonHead} from 'react-icons/gi';
import {quantum} from "ldrs";
quantum.register();


//Number of items for init.
const init= 5
const source = "Best"

const Main = () => {
        const dispatch = useDispatch();

        //init useEffect
        useEffect(() => {
                //change Theme
                dispatch(setTheme(source));
                //set page count
                dispatch(setCount(init));
                //fetch data
                dispatch(fetchBest({page:init}));
                console.log("init useEffect Main ");
        },[dispatch])

        const page = parseInt(useSelector((state) => state.pageCountSliceReducer.count.count))
        console.log("page in main.js ", page)          

        //UseEffect for initialization, next-, prev-Page
        useEffect(() => {
                let i = 0;
                if(i === 0){
                        i++
                } 
                else {
                        console.log("dispatch page post init ", page)
                        dispatch(increment({page}));
                        dispatch(fetchBest({page}));
                } 
        },[page, dispatch]);

        //Get array of data that will be displayed
        const bestSliceReducerData = useSelector((state) => state.bestSliceReducer.data);
        console.log("bestSliceReducerData in main ", bestSliceReducerData);

        // Get data.name of first and last item on the screen
        const bestSliceReducerPage = useSelector((state) => state.bestSliceReducer.page);
        const {nextPage, prevPage} = bestSliceReducerPage;
        console.log("nextPage: ", nextPage, "prevPage: ", prevPage);

        const bestSliceReducerLoading = useSelector((state) => state.bestSliceReducer.isLoading);
        const bestSliceReducerError = useSelector(state => state.bestSliceReducer.isError);

        if(bestSliceReducerLoading === true){
                return(
                        <div className="mainContainer loading">
                                <l-quantum size="150" speed="2.4" color="black"></l-quantum>
                        </div>
                )
        }

        if(bestSliceReducerError === true){
                        return <div className="mainContainer error">Error...</div>
        }

        return ( 
                <div className="mainContainer">
                        <div className="subMainContainer">
                                <div id="sourceBest"><GiSpikedDragonHead/>{source}</div>
                                <div>
                                        <PageButton source={source} page={page} nextPage={nextPage} prevPage={prevPage}/>
                                </div>
                        </div>
                        <ul>
                        {bestSliceReducerData.map((data, index) => {
                                return (
                                        <li key={index}>
                                                <CardList data={data}/>
                                        </li>)})
                        } 
                        </ul>
                </div>
         );
}
 
export default Main;