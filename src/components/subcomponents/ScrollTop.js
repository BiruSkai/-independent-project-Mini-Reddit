import { MdOutlineVerticalAlignTop } from "react-icons/md";

export const ScrollTop = () => {
         //Scroll to top main.js
         function scrollTop (){
                const main = document.querySelector(".mainContainer");
                console.log("scrollTop main: ", main);
                
                main.scrollTo(0,0);
                window.scrollTo(0,0);
                return;
        }

        return ( 
                <div id="scrollTop" onClick={scrollTop}><MdOutlineVerticalAlignTop /></div>
         );
}