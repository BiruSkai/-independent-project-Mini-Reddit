import "./main.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBest } from "../../redux/ducks/BestSlice";
import {CardList} from "./cardList/CardList";

const Main = () => {
        const dispatch = useDispatch();
       
        const page = useSelector((state) => state.settingSliceReducer.data);
        console.log("page in main.js ", page)

        useEffect(() => {
                dispatch(fetchBest(page));
                return;
        },[dispatch,page]);

        const bestSliceReducerData = useSelector((state) => state.bestSliceReducer.data);
        console.log("bestSliceReducerData in main ", bestSliceReducerData);
        return ( 
                <div className="mainContainer">
                        <ul>
                        {bestSliceReducerData.map((data, index) => {
                                return (
                                        <li key={index}>
                                                <CardList best={data}/>
                                        </li>)})
                        } 
                        </ul>
                </div>
         );
}
 
export default Main;