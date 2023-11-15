import "./footer.css";
import {AiOutlineGithub} from "react-icons/ai";
import {MdEmail} from "react-icons/md";
import {AiFillInstagram} from "react-icons/ai";
import { MdOutlineVerticalAlignTop } from "react-icons/md";

const Footer = () => {
        return ( 
                <div className="containerFooter">
                        <div id="scrollTop" onClick={() => window.scrollTo(0,0)}><MdOutlineVerticalAlignTop /></div>
                        <div className="footerTitle">
                                <span>&copy; MiniReddit Project 2023</span>
                        </div>
                        <div className="footerSocialMedia">
                                <a href="https://github.com/BiruSkai"><AiOutlineGithub size={20}/></a>
                                <a href="mailto:1nikolaus.albert1@gmail.com"><MdEmail size={20}/></a>
                                <a href="https://www.instagram.com/biruskai/"><AiFillInstagram size={20}/></a>
                        </div>
                        <div className="footerAuthor">by BiruSkai</div>
                </div>
         );
};
 
export default Footer;