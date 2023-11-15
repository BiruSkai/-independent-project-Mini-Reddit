import Setting from "../setting/Setting";
import ListLink from "../listLink/ListLink";
import "./sidebar.css";

const Sidebar = () => {
        
        return (
                <>
                        <div className="sidebarContainer"> 
                                <ul>
                                        <li><Setting /></li>
                                        <br></br>
                                        <ListLink /> 
                                </ul>          
                        </div>
                </>
         );
}
 
export default Sidebar;