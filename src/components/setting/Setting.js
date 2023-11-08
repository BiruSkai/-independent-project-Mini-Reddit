import "./setting.css";
import { useDispatch } from "react-redux";
import { setCount } from "../../redux/ducks/BestSlice";
import { fetchBest } from "../../redux/ducks/BestSlice";
import { useState } from "react";
import {init} from "../main/Main";

const Setting = () => {
        const dispatch = useDispatch();
        const [page, setPage] = useState(init);
        console.log("init page Setting.js", init);

        const handleClickSetting = (e) => {
                e.preventDefault();

                        const newPage = parseInt(document.querySelector("#pages").value);
                        // console.log("newPage in Setting ", newPage)
                        setPage(newPage);
                        dispatch(setCount(newPage));
                        dispatch(fetchBest({page: newPage}));
                        return;
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