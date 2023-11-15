import "./cardList.css";
import { FaRegComments } from 'react-icons/fa';
import { FaRegThumbsUp } from 'react-icons/fa';
import { FaRegThumbsDown } from 'react-icons/fa';
import { GiClick } from "react-icons/gi";
import { Link } from "react-router-dom";
import { setTheme } from "../../redux/ducks/ThemeSlice";
import { useSelector } from "react-redux";

function createdTime (arg){
        const now = Date.now();
        const postedTime = arg.created_utc * 1000;
        const diffTime = now - postedTime;

        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diffTime / (1000 * 60 * 60));
        const minutes = Math.floor(diffTime / (1000 * 60));

        if(days){
                return `${days} ${days > 1? "days" : "day"} ago`;
        };
        if(hours){
                return `${hours} ${hours > 1? "hours" : "hour"} ago`;
        };
        if(minutes){
                return `${minutes} ${minutes > 1? "minutes" : "minute"} ago`;
        };
};

export const CardList = ({data}) => {

	const {subreddit, author, title, url, selftext, num_comments, ups, downs} = data;
	// console.log("subreddit in CardList.js", subreddit);

	const theme = useSelector(state => state.themeSliceReducer.theme);
	console.log("theme in CardList.js: ", theme)
		
	return ( 
		<div className="cardListContainer">
			<div className="col">
				<div className="card h-100">
					<div className="card-header">
						{theme === "SubredditHot" || theme === "New" || theme === "Top" || 
								theme === "Rising" || theme === "Contra"?
							<div>
								<small className="text-body-secondary">Subreddit:</small>
								<small className="text-body-secondary subheader">{subreddit}</small>
							</div> : 
							<Link to={`r/subreddit/${subreddit}/hot`} onClick={setTheme("SubredditHot")} >
								<small className="text-body-secondary">Subreddit:</small>
								<small className="text-body-secondary subheader"><GiClick />&nbsp;{subreddit}</small>
							</Link>
						}
						{theme === "SubredditHot" || theme === "New" || theme === "Top" ||
							theme === "Rising" || theme === "Contra" ?
							<div>
								<small className="text-body-secondary">Author:</small>
								<small className="text-body-secondary subheader">{author}</small>
							</div> : 
							<Link to={`user/${author}/comments`} onClick={setTheme("SubredditHot")}>
								<small className="text-body-secondary ">Author:</small>
								<small className="text-body-secondary subheader"><GiClick />&nbsp;{author}</small>
							</Link>
						}
						<div>
							<small className="text-body-secondary ">Posted:</small>
							<small className="text-body-secondary subheader">{createdTime(data)}</small>
						</div>
					</div>
					<img src={`${url}`} className="card-img-top" alt=""/>
					<div className="card-body">
						<h5 className="card-title">{title}</h5>
						<p className="card-text">{selftext}</p>
					</div>
					<div className="card-footer" id="footer">
						<div className="subfooterContainer">
							<small className="text-body-secondary subfooter">< FaRegComments /> :</small>
							<small className="text-body-secondary subfooter">{num_comments}</small>
						</div>
						<div className="subfooterContainer">
							<small className="text-body-secondary subfooter"><FaRegThumbsUp /> :</small>
							<small className="text-body-secondary subfooter">{ups}</small>
						</div>
						<div className="subfooterContainer">
							<small className="text-body-secondary subfooter"><FaRegThumbsDown /> :</small>
							<small className="text-body-secondary subfooter">{downs}</small>
						</div>
					</div>
				</div>
			</div>
		</div>
	)      
};
