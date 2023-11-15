import "../main/main.css";
import "./subredditHot.css";
import {init} from "../main/Main";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {CardList} from "../../components/cardList/CardList";
import PageButton from "../../components/pageButton/PageButton";
import { fetchHot } from "../../redux/ducks/SubredditHotSlice";
import { increment, setCount } from "../../redux/ducks/PageCountSlice";
import { setTheme } from "../../redux/ducks/ThemeSlice";
import {GiFireDash} from 'react-icons/gi';
import {quantum} from "ldrs";
quantum.register();


const source = "SubredditHot";

const SubredditHot = () => {
        const dispatch = useDispatch();
        const {subreddit} = useParams();

        //How many items will be displayed
        const page = parseInt(useSelector((state) => state.pageCountSliceReducer.count.count))
        console.log("page in SubredditHot.js ", page)   

        //init useEffect
        useEffect(() => {
                //Reset pageCountSlice
                dispatch(setCount(init));
                //Set new Theme in ThemeSlice
                dispatch(setTheme(source));
                //Fetch data
                dispatch(fetchHot({page:init, subreddit}));
                console.log("init useEffect SubredditHot ", init, subreddit);
        },[dispatch])

        //UseEffect for initialization, next-, prev-Page
        useEffect(() => {
                let i = 0;
                if(i === 0){
                        i++
                }else{
                        console.log("dispatch page, subreddit SubredditHot.js ", page, subreddit)
                        dispatch(increment({page}));
                        dispatch(fetchHot({page, subreddit}));
                }
        },[dispatch,page,subreddit]);

        //Get array of data that will be displayed
        const hotSliceReducerData = useSelector((state) => state.hotSliceReducer.data);
        console.log("hotSliceReducerData in SubredditHot.js ", hotSliceReducerData);

        // Get data.name of first and last item on the screen
        const hotSliceReducerPage = useSelector((state) => state.hotSliceReducer.page);
        const {nextPage, prevPage} = hotSliceReducerPage;
        console.log("nextPage: ", nextPage, "prevPage: ", prevPage);

        const hotSliceReducerLoading = useSelector((state) => state.hotSliceReducer.isLoading);
        const hotSliceReducerError = useSelector(state => state.hotSliceReducer.isError);

        if(hotSliceReducerLoading === true){
                return(
                        <div className="mainContainer loading">
                                <l-quantum size="150" speed="2.4" color="black"></l-quantum>
                        </div>
                )
        }

        if(hotSliceReducerError === true){
                        return <div className="mainContainer error">Error...</div>
        }

        return ( 
                <div className="mainContainer">
                        <div id="sourceHot">&nbsp;<GiFireDash/>{source}</div>
                        <div>
                                <PageButton source={source} subreddit={subreddit} page={page} nextPage={nextPage} prevPage={prevPage}/>
                        </div>
                        <ul>
                        {hotSliceReducerData.map((data, index) => {
                                return (
                                        <li key={index}>
                                                <CardList data={data}/>
                                        </li>)})
                        } 
                        </ul>
                </div>
         );
}
 
export default SubredditHot;