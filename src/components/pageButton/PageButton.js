import { useDispatch, useSelector } from "react-redux";
import "./pageButton.css";
import {GrFormNext} from 'react-icons/gr';
import {GrPowerReset} from 'react-icons/gr';
import {GrFormPrevious} from 'react-icons/gr';
import {increment, decrement, reset} from "../../redux/ducks/PageCountSlice";
import {fetchBest} from "../../redux/ducks/BestSlice";
import {fetchHot} from "../../redux/ducks/SubredditHotSlice";
import {fetchAuthorComment} from "../../redux/ducks/authorCommentSlice";
import {fetchNew} from "../../redux/ducks/NewSlice";
import {fetchTop} from "../../redux/ducks/TopSlice";
import {fetchRising} from "../../redux/ducks/RisingSlice";
import {fetchContra} from "../../redux/ducks/ContraSlice";
import {fetchSearch} from "../../redux/ducks/SearchSlice";

const PageButton = ({source, subreddit, page, nextPage, prevPage}) => {
	const dispatch = useDispatch();

	//Subreddit here is search value in navbar.js
	console.log("PageButton.js source, subreddit, page, nextPage, prevPage: ", source, subreddit, page, nextPage, prevPage);

	// Get the latest rank of downloaded items 
	let pageState = parseInt(useSelector((state) => state.pageCountSliceReducer.count.total));
	console.log("pageState in PageButton.js ", pageState);


	//The lowest rank item displayed
	const diff = pageState - page;
	// console.log("diff Click", typeof(diff), diff);
	
	function handleClickNext() {
		console.log("inside Click: source, page, nextPage: ", source, page, nextPage)
		switch(source){
			case "Best":
				dispatch(fetchBest({page, nextPage}));	
				break;
			case "SubredditHot":
				dispatch(fetchHot({subreddit, page, nextPage}));
				break;
			case "AuthorComment":
				dispatch(fetchAuthorComment({subreddit, page, nextPage}));
				break;
			case "Search":
				dispatch(fetchSearch({search:subreddit, page, nextPage}));
				break;
			case "New":
				dispatch(fetchNew({subreddit, page, nextPage}));
				break;
			case "Top":
				dispatch(fetchTop({subreddit, page, nextPage}));
				break;
			case "Rising":
				dispatch(fetchRising({subreddit, page, nextPage}));
				break;
			case "Contra":
				dispatch(fetchContra({subreddit, page, nextPage}));
				break;
			default:	
				return console.log("PageButton.js Switch Click next has no match");
		}	
		dispatch(increment({page}))
		// return console.log("next Click ",page);
	};

	function handleClickPrevious(){
		switch(source){
			case "Best":
				dispatch(fetchBest({page, prevPage}));
				break;
			case "SubredditHot":
				dispatch(fetchHot({subreddit, page, prevPage}));
				break;
			case "AuthorComment":
				dispatch(fetchAuthorComment({subreddit, page, prevPage}));
				break;
			case "Search":
				dispatch(fetchSearch({search:subreddit, page, prevPage}));
				break;
			case "New":
				dispatch(fetchNew({subreddit, page, prevPage}));
				break;
			case "Top":
				dispatch(fetchTop({subreddit, page, prevPage}));
				break;
			case "Rising":
				dispatch(fetchRising({subreddit, page, prevPage}));
				break;
			case "Contra":
				dispatch(fetchContra({subreddit, page, prevPage}));
				break;
			default:	
				return console.log("PageButton.js Switch Click prev has no match");
		}
		dispatch(decrement({page}))
		// return console.log("prev Click ",page);
	};
	
	function handleClickReset(){
		switch(source){
			case "Best":
				dispatch(fetchBest({page}));
				break;
			case "SubredditHot":
				dispatch(fetchHot({page}));
				break;
			case "AuthorComment":
				dispatch(fetchAuthorComment({page}));
				break;
			case "Search":
				dispatch(fetchSearch({page}));
				break;
			case "New":
				dispatch(fetchNew({page}));
				break;
			case "Top":
				dispatch(fetchTop({page}));
				break;
			case "Rising":
				dispatch(fetchRising({page}));
				break;
			case "Contra":
				dispatch(fetchContra({page}));
				break;
			default:
				return console.log("PageButton.js Switch Click reset has no match");
		}
		return dispatch(reset())
	};

	return (
		<div className="pageButtonContainer">
			<div className="subPageButton">
				<small>{`Item ${diff <= 0 || pageState === diff ? 0 : diff} - ${pageState}`}</small>
			</div>
			<div className="subPageButton">
				<button className="button previous" onClick={() => { handleClickPrevious()}} style={{display:diff < 1 || diff === pageState ? "none":"inline"}}><GrFormPrevious /></button>
				<button className="button" onClick={() => { handleClickReset()}}><GrPowerReset /></button> 
				<button className="button" onClick={() => { handleClickNext()}}><GrFormNext /></button>	
			</div>
		</div>
	);
};
 
export default PageButton;