import "../main/main.css";
import {init} from "../main/Main";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {CardList} from "../../components/cardList/CardList";
import {ScrollTop} from "../../components/subcomponents/ScrollTop";
import PageButton from "../../components/pageButton/PageButton";
import { fetchTop } from "../../redux/ducks/TopSlice";
import { increment, setCount } from "../../redux/ducks/PageCountSlice";
import { setTheme } from "../../redux/ducks/ThemeSlice";
import {quantum} from "ldrs";
quantum.register();

const source = "Top";

const Top = () => {
        const dispatch = useDispatch();
        const {subreddit} = useParams();

        //How many items will be displayed
        const page = parseInt(useSelector((state) => state.pageCountSliceReducer.count.count))
        console.log("page in Top.js ", page)   

        //init useEffect
        useEffect(() => {
                //Reset pageCountSlice
                dispatch(setCount(init));
                //Set Top Theme in ThemeSlice
                dispatch(setTheme(source));
                //Fetch data
                dispatch(fetchTop({page:init, subreddit}));
                console.log("init useEffect Top ", init, subreddit);
        },[dispatch])

        //UseEffect for initialization, next-, prev-Page
        useEffect(() => {
                let i = 0;
                if(i === 0){
                        i++
                }else{
                        console.log("dispatch page, subreddit Top.js ", page, subreddit)
                        dispatch(increment({page}));
                        dispatch(fetchTop({page, subreddit}));
                }
        },[dispatch,page,subreddit]);

        //Get array of data that will be displayed
        const topSliceReducerData = useSelector((state) => state.topSliceReducer.data);
        console.log("topSliceReducerData in New.js ", topSliceReducerData);

        // Get data.name of first and last item on the screen
        const topSliceReducerPage = useSelector((state) => state.topSliceReducer.page);
        const {nextPage, prevPage} = topSliceReducerPage;
        console.log("nextPage: ", nextPage, "prevPage: ", prevPage);

        const topSliceReducerLoading = useSelector((state) => state.topSliceReducer.isLoading);
        const topSliceReducerError = useSelector(state => state.topSliceReducer.isError);

        if(topSliceReducerLoading === true){
                return(
                        <div className="mainContainer loading">
                                <l-quantum size="150" speed="2.4" color="black"></l-quantum>
                        </div>
                )
        }

        if(topSliceReducerError === true){
                        return <div className="mainContainer error">Error...</div>
        }

        return ( 
                <div className="mainContainer">
                        <div>
                                <PageButton source={source} subreddit={subreddit} page={page} nextPage={nextPage} prevPage={prevPage}/>
                        </div>
                        <ul>
                        {topSliceReducerData.map((data, index) => {
                                return (
                                        <li key={index}>
                                                <CardList data={data}/>
                                        </li>)})
                        } 
                        </ul>
                        <ScrollTop />
                        <br></br>
                </div>
         );
}
 
export default Top;