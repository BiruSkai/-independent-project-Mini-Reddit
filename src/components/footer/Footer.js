import "./footer.css";
import {AiOutlineGithub} from "react-icons/ai";
import {MdEmail} from "react-icons/md";
import {AiFillInstagram} from "react-icons/ai";

const Footer = () => {
        return ( 
                <div className="containerFooter">
                        
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