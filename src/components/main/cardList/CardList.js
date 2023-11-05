import "./cardList.css";

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

        const {subreddit} = best;
        // console.log("subreddit in CardList.js", subreddit);
        const {author} = best;

        return ( 
                <div className="cardListContainer">
                        <div className="cardListHeader">
                                <h6 className="sub_cardListHeader">{subreddit}</h6>  
                                <h6 className="sub_cardListHeader">{author}</h6>
                                <h6 className="sub_cardListHeader">{createdTime(best)}</h6>      
                        </div>   
                        <div className="cardListMain">
                                        
                        </div>                    
                </div>
         );
};
