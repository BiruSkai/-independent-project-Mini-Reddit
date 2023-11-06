import "./setting.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { pageDisplayed } from "../../redux/ducks/SettingSlice";

const Setting = () => {
        const [pages, setPages] = useState(5);
        const dispatch = useDispatch();

        const handleClickSetting = (e) => {
                e.preventDefault();
                
                const newPage = document.getElementById("pages").value;
                console.log("newPage in Setting ", newPage)
                setPages(newPage);
                return;
        };

        dispatch(pageDisplayed(pages))
        console.log("pages post save ", pages)   
        
        return ( 
                <>
                        <div className="setting">
                                <h6>Setting:</h6>
                                <form>
                                        <label className="setting_subForm">Pages displayed:</label>
                                        <input className="setting_subForm" type="text" id="pages" placeholder={pages}/>
                                        <input className="setting_save" type="submit" value="save" onClick={handleClickSetting}/>
                                </form>
                        </div>
                </>
         );
}
 
export default Setting;