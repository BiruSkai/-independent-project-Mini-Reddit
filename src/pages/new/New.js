import "../main/main.css";
import {init} from "../main/Main";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {CardList} from "../../components/cardList/CardList";
import {ScrollTop} from "../../components/subcomponents/ScrollTop";
import PageButton from "../../components/pageButton/PageButton";
import { fetchNew } from "../../redux/ducks/NewSlice";
import { increment, setCount } from "../../redux/ducks/PageCountSlice";
import { setTheme } from "../../redux/ducks/ThemeSlice";
import {quantum} from "ldrs";
quantum.register();

const source = "New";

const New = () => {
        const dispatch = useDispatch();
        const {subreddit} = useParams();

        //How many items will be displayed
        const page = parseInt(useSelector((state) => state.pageCountSliceReducer.count.count))
        console.log("page in New.js ", page)   

        //init useEffect
        useEffect(() => {
        
                //Reset pageCountSlice
                dispatch(setCount(init));
                //Set new Theme in ThemeSlice
                dispatch(setTheme(source));
                //Fetch data
                dispatch(fetchNew({page:init, subreddit}));
                console.log("init useEffect New ", init, subreddit);
        },[dispatch])

        //UseEffect for initialization, next-, prev-Page
        useEffect(() => {
                let i = 0;
                if(i === 0){
                        i++
                }else{
                        console.log("dispatch page, subreddit New.js ", page, subreddit)
                        dispatch(increment({page}));
                        dispatch(fetchNew({page, subreddit}));
                }
        },[dispatch,page,subreddit]);

        //Get array of data that will be displayed
        const newSliceReducerData = useSelector((state) => state.newSliceReducer.data);
        console.log("newSliceReducerData in New.js ", newSliceReducerData);

        // Get data.name of first and last item on the screen
        const newSliceReducerPage = useSelector((state) => state.newSliceReducer.page);
        const {nextPage, prevPage} = newSliceReducerPage;
        console.log("nextPage: ", nextPage, "prevPage: ", prevPage);

        const newSliceReducerLoading = useSelector((state) => state.newSliceReducer.isLoading);
        const newSliceReducerError = useSelector(state => state.newSliceReducer.isError);

        if(newSliceReducerLoading === true){
                return(
                        <div className="mainContainer loading">
                                <l-quantum size="150" speed="2.4" color="black"></l-quantum>
                        </div>
                )
        }

        if(newSliceReducerError === true){
                        return <div className="mainContainer error">Error...</div>
        }

        return ( 
                <div className="mainContainer">
                        <div>
                                <PageButton source={source} subreddit={subreddit} page={page} nextPage={nextPage} prevPage={prevPage}/>
                        </div>
                        <ul>
                        {newSliceReducerData.map((data, index) => {
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
 
export default New;