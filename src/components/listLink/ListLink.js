import "./listLink.css";
import { MdOutlineNewReleases } from "react-icons/md";
import { GiMountaintop } from "react-icons/gi";
import { FiSunrise } from "react-icons/fi";
import { GiWaveCrest } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const ListLink = () => {
        return ( 
            <>
                  <div id="topic">Topic:</div>
                  <div className="listLink">
                        <NavLink to="new"><MdOutlineNewReleases />&nbsp;New</NavLink>
                        <NavLink to="top"><GiMountaintop />&nbsp;Top</NavLink>
                        <NavLink to="rising"><FiSunrise />&nbsp;Rising</NavLink>
                        <NavLink to="contra"><GiWaveCrest />&nbsp;Controversial</NavLink>
                  </div>
            </>
         );
}
 
export default ListLink;