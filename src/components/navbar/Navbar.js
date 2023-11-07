import {FcReddit} from "react-icons/fc";
import {BiSearchAlt} from "react-icons/bi";
import {RxDropdownMenu} from "react-icons/rx";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import Setting from "../setting/Setting";

const Header = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        const handleClickDropdown = () => {
          let  dropDown= document.querySelector(".offCanvas");
        
          dropDown.classList.add("onCanvas");
        }

        const closeDropdown = () => {
          let removeDropdown = document.querySelector(".offCanvas");
          removeDropdown.classList.remove("onCanvas");
        }

        return ( 
          <>
            <div className="topnav">
              <NavLink to="/" className="redditIcon">
                <FcReddit className="redditIcon" size={30}/> 
                <span className="redditTitle" >Mini Reddit</span>
              </NavLink>
              <div className="date">{today}</div>
              <div className="search-container">
                <form > 
                    <input type="text" placeholder="  Search..." name="search" className="searchInput"/>
                    <button type="submit"><BiSearchAlt size={25} /></button>
                </form>
              </div>
              <div className="dropdownIcon" onClick={handleClickDropdown}><RxDropdownMenu size={25} /></div>
              <div className="offCanvas">
                <div id="sub-offCanvas">
                  <span className="closeIcon" onClick={closeDropdown}>&#10006;</span>
                  
                  <ul className="navList">
                    <li>&nbsp;</li>
                    <li ><Setting /></li>
                    <li >About</li>
                    <li >Setting</li>
                    <li >Setting2</li>
                  </ul>
                </div>
              </div>
            </div>
          </>        
         );
}
 
export default Header;