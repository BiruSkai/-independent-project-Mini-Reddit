import "./main.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {CardList} from "./cardList/CardList";
import PageButton from "../pageButton/PageButton";
import { fetchBest, increment } from "../../redux/ducks/BestSlice";
import {quantum} from "ldrs";
quantum.register();

export const init= 5
const Main = () => {
        const dispatch = useDispatch();
        // const [initialized, setInitialized] = useState(false);

        useEffect(() => {
                // setInitialized(true);
                dispatch(increment({page:init}));
                dispatch(fetchBest({page:init}));
                // console.log("init Status post init ");
        },[dispatch])

        const page = parseInt(useSelector((state) => state.bestSliceReducer.count.count))
        // console.log("page in main.js ", page)          

        //UseEffect for initialization, next-, prev-Page
        useEffect(() => {
                let i = 0;
                if(i === 0){
                        i++
                } 
                else {
                        // console.log("dispatch page post init ", page)
                        dispatch(increment({page}));
                        dispatch(fetchBest({page}));
                } 
        },[page, dispatch]);

        //Get array of data that will be displayed
        const bestSliceReducerData = useSelector((state) => state.bestSliceReducer.data);
        // console.log("bestSliceReducerData in main ", bestSliceReducerData);

        // Get data.name of first and last item on the screen
        const bestSliceReducerPage = useSelector((state) => state.bestSliceReducer.page);
        const {nextPage, prevPage} = bestSliceReducerPage;
        // console.log("nextPage: ", nextPage, "prevPage: ", prevPage);
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
                        <div>
                                <PageButton page={page} nextPage={nextPage} prevPage={prevPage}/>
                        </div>
                        <ul>
                        {bestSliceReducerData.map((data, index) => {
                                return (
                                        <li key={index}>
                                                <CardList best={data}/>
                                        </li>)})
                        } 
                        </ul>
                        <div >
                                <PageButton page={page} nextPage={nextPage} prevPage={prevPage}/>
                        </div>
                </div>
         );
}
 
export default Main;