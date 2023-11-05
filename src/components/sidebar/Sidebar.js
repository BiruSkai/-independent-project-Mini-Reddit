import Setting from "../setting/Setting";
import "./sidebar.css";

const Sidebar = () => {
        
        return (
                <>
                        <div className="sidebarContainer"> 
                                <div><Setting /></div>
                                <ul>
                                        <li>About</li>
                                        <li>Setting</li>
                                        <li>Setting2</li>
                                </ul>
                                
                        </div>
                </>
         );
}
 
export default Sidebar;