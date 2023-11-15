import "../main/main.css";
import {init} from "../main/Main";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {CardList} from "../../components/cardList/CardList";
import PageButton from "../../components/pageButton/PageButton";
import { fetchRising } from "../../redux/ducks/RisingSlice";
import { increment, setCount } from "../../redux/ducks/PageCountSlice";
import { setTheme } from "../../redux/ducks/ThemeSlice";
import {quantum} from "ldrs";
quantum.register();

const source = "Rising";

const Rising = () => {
        const dispatch = useDispatch();
        const {subreddit} = useParams();

        //How many items will be displayed
        const page = parseInt(useSelector((state) => state.pageCountSliceReducer.count.count))
        console.log("page in Rising.js ", page)   

        //init useEffect
        useEffect(() => {
                //Reset pageCountSlice
                dispatch(setCount(init));
                //Set Rising Theme in ThemeSlice
                dispatch(setTheme(source));
                //Fetch data
                dispatch(fetchRising({page:init, subreddit}));
                console.log("init useEffect Rising ", init, subreddit);
        },[dispatch])

        //UseEffect for initialization, next-, prev-Page
        useEffect(() => {
                let i = 0;
                if(i === 0){
                        i++
                }else{
                        console.log("dispatch page, subreddit Rising.js ", page, subreddit)
                        dispatch(increment({page}));
                        dispatch(fetchRising({page, subreddit}));
                }
        },[dispatch,page,subreddit]);

        //Get array of data that will be displayed
        const risingSliceReducerData = useSelector((state) => state.risingSliceReducer.data);
        console.log("risingSliceReducerData in New.js ", risingSliceReducerData);

        // Get data.name of first and last item on the screen
        const risingSliceReducerPage = useSelector((state) => state.risingSliceReducer.page);
        const {nextPage, prevPage} = risingSliceReducerPage;
        console.log("nextPage: ", nextPage, "prevPage: ", prevPage);

        const risingSliceReducerLoading = useSelector((state) => state.risingSliceReducer.isLoading);
        const risingSliceReducerError = useSelector(state => state.risingSliceReducer.isError);

        if(risingSliceReducerLoading === true){
                return(
                        <div className="mainContainer loading">
                                <l-quantum size="150" speed="2.4" color="black"></l-quantum>
                        </div>
                )
        }

        if(risingSliceReducerError === true){
                        return <div className="mainContainer error">Error...</div>
        }

        return ( 
                <div className="mainContainer">
                        <div>
                                <PageButton source={source} subreddit={subreddit} page={page} nextPage={nextPage} prevPage={prevPage}/>
                        </div>
                        <ul>
                        {risingSliceReducerData.map((data, index) => {
                                return (
                                        <li key={index}>
                                                <CardList data={data}/>
                                        </li>)})
                        } 
                        </ul>
                </div>
         );
}
 
export default Rising;