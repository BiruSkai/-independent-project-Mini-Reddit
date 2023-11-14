import "./navbar.css";
import {FcReddit} from "react-icons/fc";
import {BiSearchAlt} from "react-icons/bi";
import {RxDropdownMenu} from "react-icons/rx";
import { Link } from "react-router-dom";
import Setting from "../setting/Setting";
import ListLink from "../listLink/ListLink";
import {fetchSearch} from "../../redux/ducks/SearchSlice";
import {setTheme} from "../../redux/ducks/ThemeSlice";

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

        const handleClickSearch = (e) => {
          const searchInput = document.querySelector(".searchInput");
          console.log("searchInput postClick: ", searchInput);

          const searchValue = e.target.searchInput.value;
          console.log("searchValue postClick: ", searchValue);

          fetchSearch(searchValue);
          setTheme("Search");
        }

        const closeDropdown = () => {
          let removeDropdown = document.querySelector(".offCanvas");
          removeDropdown.classList.remove("onCanvas");
        }

        window.onload = e => {
          const screenWidth = window.innerWidth;
          // console.log("screen width ", screenWidth);
          const settingNavbarId = document.querySelector("#settingNavbar");
          // console.log(settingNavbarId)
          if(screenWidth >= 768) {
            return settingNavbarId.remove()
          }
        }

        return ( 
          <>
            <div className="topnav">
              <Link to="/" className="redditIcon">
                <FcReddit className="redditIcon" size={30}/> 
                <span className="redditTitle" >Mini Reddit</span>
              </Link>
              <div className="date">{today}</div>
              <div className="search-container">
                <form > 
                    <input type="text" placeholder="  Search..." name="search" id="searchInput"/>
                    <button type="submit" onClick={handleClickSearch}><BiSearchAlt aria-hidden="true"/></button>
                </form>
            
              {/* <div class="input-group mb-3">
                <input type="text" className="form-control" id="inputSearch" placeholder="Search..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <div className="input-group-append" id="buttonSearch">
                  <button className="btn btn-outline-secondary" type="button"><BiSearchAlt /></button>
                </div>
              </div> */}
              
              </div>
              <div className="dropdownIcon" onClick={handleClickDropdown}><RxDropdownMenu size={25} /></div>
              <div className="offCanvas">
                <div id="sub-offCanvas">
                  
                    <span className="closeIcon" onClick={closeDropdown}>&#10006;</span> 
                    <ul className="navList">
                      <li>&nbsp;</li>
                      <li id="settingNavbar"><Setting /></li>
                      <ListLink />
                    </ul>
                  
                </div>
              </div>
            </div>
          </>        
         );
}
 
export default Header;