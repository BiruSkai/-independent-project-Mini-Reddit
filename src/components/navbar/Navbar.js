import "./navbar.css";
import {FcReddit} from "react-icons/fc";
import {BiSearchAlt} from "react-icons/bi";
import { GiClick } from "react-icons/gi";
import {RxDropdownMenu} from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import Setting from "../setting/Setting";
import ListLink from "../listLink/ListLink";
import {inputSearch} from "../../redux/ducks/SearchSlice";
import { useDispatch } from "react-redux";

const Header = () => {
        //Date
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
        
        //When to remove Setting Component
        window.onload = e => {
          const screenWidth = window.innerWidth;
          // console.log("screen width ", screenWidth);
          const settingNavbarId = document.querySelector("#settingNavbar");
          // console.log(settingNavbarId)
          if(screenWidth >= 768) {
            return settingNavbarId.remove()
          }
        }

        const navigate = useNavigate();
        const dispatch = useDispatch();
        const handleClickSearch = (e) => {
          e.preventDefault();
          const searchValue = document.querySelector("#searchInput").value;
          console.log("searchInput postClick: ", searchValue)

          // fetchSearch({search:searchValue, page:init})
          //Send payload to inputSearch
          dispatch(inputSearch(searchValue));
        
          navigate(`search/${searchValue}`)
          return;
        };

        return (
          <>
            <div className="topnav">
              <Link to="/" className="redditIcon">
                <FcReddit className="redditIcon" size={30}/> 
                <span className="redditTitle" ><GiClick />&nbsp;Mini Reddit</span>
              </Link>
              <div className="date">{today}</div>
              <div className="search-container">
                <form >
                  <input type="text" placeholder="  Search..." name="search" id="searchInput"/>
                  <button onClick={handleClickSearch}><BiSearchAlt aria-hidden="true"/></button>
                </form>  
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