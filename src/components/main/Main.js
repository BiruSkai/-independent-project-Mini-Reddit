import "./main.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBest } from "../../redux/ducks/BestSlice";
import {CardList} from "./cardList/CardList";
import PageButton from "../pageButton/PageButton";

const Main = () => {
        const dispatch = useDispatch();
       
        const page = useSelector((state) => state.settingSliceReducer.data);
        // console.log("page in main.js ", page)

        useEffect(() => {
                dispatch(fetchBest(page));
                return;
        },[dispatch,page]);

        const bestSliceReducerData = useSelector((state) => state.bestSliceReducer.data);
        // console.log("bestSliceReducerData in main ", bestSliceReducerData);

// Next and Prev Button 
        const lengthBest = bestSliceReducerData.length;
        // console.log("lengthBest ", lengthBest);

        return ( 
                <div className="mainContainer">
                        <PageButton page={page}/>
                        <ul>
                        {bestSliceReducerData.map((data, index) => {
                                return (
                                        <li key={index}>
                                                <CardList best={data}/>
                                        </li>)})
                        } 
                        </ul>
                        <PageButton page={page}/>
                </div>
         );
}
 
export default Main;