import "./cardList.css";
import { FaRegComments } from 'react-icons/fa';
import { FaRegThumbsUp } from 'react-icons/fa';
import { FaRegThumbsDown } from 'react-icons/fa';

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



export const CardList = ({best}) => {

        const {subreddit, author, title, url, selftext, num_comments, ups, downs} = best;
        // console.log("subreddit in CardList.js", subreddit);
        
        return ( 
					<div className="cardListContainer">
						<div class="col">
							<div class="card h-100">
								<div class="card-header" id="header">
									<div>
										<small class="text-body-secondary ">Subreddit:</small>
										<small class="text-body-secondary subheader">{subreddit}</small>
									</div>
									<div>
										<small class="text-body-secondary ">Author:</small>
										<small class="text-body-secondary subheader">{author}</small>
									</div>
									<div>
										<small class="text-body-secondary ">Posted:</small>
										<small class="text-body-secondary subheader">{createdTime(best)}</small>
									</div>
								</div>
								<img src={`${url}`} class="card-img-top" alt=""/>
								<div class="card-body">
									<h5 class="card-title">{title}</h5>
									<p class="card-text">{selftext}</p>
								</div>
								<div class="card-footer" id="footer">
									<div className="subfooterContainer">
										<small class="text-body-secondary subfooter">< FaRegComments /> :</small>
										<small class="text-body-secondary subfooter">{num_comments}</small>
									</div>
									<div className="subfooterContainer">
										<small class="text-body-secondary subfooter"><FaRegThumbsUp /> :</small>
										<small class="text-body-secondary subfooter">{ups}</small>
									</div>
									<div className="subfooterContainer">
										<small class="text-body-secondary subfooter"><FaRegThumbsDown /> :</small>
										<small class="text-body-secondary subfooter">{downs}</small>
									</div>
								</div>
							</div>
						</div>
          </div>
        )
        
};
