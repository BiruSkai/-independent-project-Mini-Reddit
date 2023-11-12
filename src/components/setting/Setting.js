import "./setting.css";
import { useDispatch, useSelector } from "react-redux";
import { setCount, reset } from "../../redux/ducks/PageCountSlice";
import { fetchBest } from "../../redux/ducks/BestSlice";
import { fetchHot } from "../../redux/ducks/SubredditHotSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Setting = () => {
        const dispatch = useDispatch();
        const [page, setPage] = useState();
        const {subreddit} = useParams();

        //Get the current theme
        const theme = useSelector(state => state.themeSliceReducer.theme);
        console.log("theme in Setting.js ", theme)

        const handleClickSetting = (e) => {
                e.preventDefault();

                        const newPage = parseInt(document.querySelector("#pages").value);
                        console.log("newPage in Setting ", newPage)
                        setPage(newPage);
                        dispatch(setCount(newPage));

                        //fetch data based on current theme
                        switch(theme){
                                case "SubredditHot":
                                        dispatch(fetchHot({page: newPage, subreddit}));
                                        break;
                                default:
                                        dispatch(fetchBest({page: newPage}));
                        }
        };
        
        return ( 
                <>
                        <div className="setting">
                                <h6>Setting:</h6>
                                <form>
                                        <label className="setting_subForm">Pages displayed:</label>
                                        <input className="setting_subForm" type="text" id="pages" placeholder={page} />
                                        <input className="setting_save" type="submit" value="save" onClick={handleClickSetting}/>
                                </form>
                        </div>
                </>
         );
}
 
export default Setting;