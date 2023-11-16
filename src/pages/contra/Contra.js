import "../main/main.css";
import {init} from "../main/Main";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {CardList} from "../../components/cardList/CardList";
import {ScrollTop} from "../../components/subcomponents/ScrollTop";
import PageButton from "../../components/pageButton/PageButton";
import { fetchContra } from "../../redux/ducks/ContraSlice";
import { increment, setCount } from "../../redux/ducks/PageCountSlice";
import { setTheme } from "../../redux/ducks/ThemeSlice";
import {quantum} from "ldrs";
quantum.register();

const source = "Contra";

const Contra = () => {
        const dispatch = useDispatch();
        const {subreddit} = useParams();

        //How many items will be displayed
        const page = parseInt(useSelector((state) => state.pageCountSliceReducer.count.count))
        console.log("page in Contra.js ", page)   

        //init useEffect
        useEffect(() => {
                //Reset pageCountSlice
                dispatch(setCount(init));
                //Set Contra Theme in ThemeSlice
                dispatch(setTheme(source));
                //Fetch data
                dispatch(fetchContra({page:init, subreddit}));
                console.log("init useEffect Contra ", init, subreddit);
        },[dispatch])

        //UseEffect for initialization, next-, prev-Page
        useEffect(() => {
                let i = 0;
                if(i === 0){
                        i++
                }else{
                        console.log("dispatch page, subreddit Contra.js ", page, subreddit)
                        dispatch(increment({page}));
                        dispatch(fetchContra({page, subreddit}));
                }
        },[dispatch,page,subreddit]);

        //Get array of data that will be displayed
        const contraSliceReducerData = useSelector((state) => state.contraSliceReducer.data);
        console.log("contraSliceReducerData in New.js ", contraSliceReducerData);

        // Get data.name of first and last item on the screen
        const contraSliceReducerPage = useSelector((state) => state.contraSliceReducer.page);
        const {nextPage, prevPage} = contraSliceReducerPage;
        console.log("nextPage: ", nextPage, "prevPage: ", prevPage);

        const contraSliceReducerLoading = useSelector((state) => state.contraSliceReducer.isLoading);
        const contraSliceReducerError = useSelector(state => state.contraSliceReducer.isError);

        if(contraSliceReducerLoading === true){
                return(
                        <div className="mainContainer loading">
                                <l-quantum size="150" speed="2.4" color="black"></l-quantum>
                        </div>
                )
        }

        if(contraSliceReducerError === true){
                        return <div className="mainContainer error">Error...</div>
        }

        return ( 
                <div className="mainContainer">
                        <div>
                                <PageButton source={source} subreddit={subreddit} page={page} nextPage={nextPage} prevPage={prevPage}/>
                        </div>
                        <ul>
                        {contraSliceReducerData.map((data, index) => {
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
 
export default Contra;