import "./setting.css";
import { useDispatch, useSelector } from "react-redux";
import { setCount } from "../../redux/ducks/PageCountSlice";
import { fetchBest } from "../../redux/ducks/BestSlice";
import { fetchHot } from "../../redux/ducks/SubredditHotSlice";
import { fetchAuthorComment } from "../../redux/ducks/authorCommentSlice";
import { fetchNew } from "../../redux/ducks/NewSlice";
import { fetchTop } from "../../redux/ducks/TopSlice";
import { fetchRising } from "../../redux/ducks/RisingSlice";
import { fetchContra } from "../../redux/ducks/ContraSlice";
import { fetchSearch } from "../../redux/ducks/SearchSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Setting = () => {
        const dispatch = useDispatch();
        const [page, setPage] = useState();
        const {subreddit} = useParams();

        //Get the current theme
        const theme = useSelector(state => state.themeSliceReducer.theme);
        console.log("theme in Setting.js ", theme)

        const search = useSelector(state => state.searchSliceReducer.input);
        console.log("search in Setting.js ", search)

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
                                case "AuthorComment":
                                        dispatch(fetchAuthorComment({page: newPage, subreddit}));
                                        break;
                                case "Search":
                                        dispatch(fetchSearch({page: newPage, search}));
                                        break;
                                case "New":
                                        dispatch(fetchNew({page: newPage, search}));
                                        break;
                                case "Top":
                                        dispatch(fetchTop({page: newPage, search}));
                                        break;
                                case "Rising":
                                        dispatch(fetchRising({page: newPage, search}));
                                        break;
                                case "Contra":
                                        dispatch(fetchContra({page: newPage, search}));
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