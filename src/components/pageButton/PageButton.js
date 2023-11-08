import { useDispatch, useSelector } from "react-redux";
import "./pageButton.css";
import {GrFormNext} from 'react-icons/gr';
import {GrPowerReset} from 'react-icons/gr';
import {GrFormPrevious} from 'react-icons/gr';
import {increment, decrement, reset, fetchBest} from "../../redux/ducks/BestSlice";


const PageButton = ({page, nextPage, prevPage}) => {
	const dispatch = useDispatch();
	
	// Get the latest rank of downloaded items 
	let pageState = useSelector((state) => state.bestSliceReducer.count.total);
	// console.log("pageState in PageButton.js ", pageState);

	//Managing correct data type for item'calcualtion
	page = parseInt(page);
	pageState = parseInt(pageState);

	//The lowest rank item displayed
	const diff = pageState - page;
	// console.log("diff Click", typeof(diff), diff);
	
	function handleClickNext(){	
		dispatch(fetchBest({page, nextPage}))
		dispatch(increment({page}))
		// console.log("next Click ",page);
		return;
	};

	function handleClickPrevious(){
		dispatch(fetchBest({page, prevPage}))
		dispatch(decrement({page}))
		// console.log("prev Click ",page);
		return;
	};
	
	function handleClickReset(){
		dispatch(fetchBest({page}))
		dispatch(reset())
		return;
	};

	return (
		<div className="pageButtonContainer">
			<div className="subPageButton">
				<small>{`Item ${diff <= 0 || pageState === diff ? 0 : diff} - ${pageState}`}</small>
			</div>
			<div className="subPageButton">
				<button className="button previous" onClick={handleClickPrevious} style={{display:diff < 1 || diff === pageState ? "none":"inline"}}><GrFormPrevious /></button>
				<button className="button" onClick={handleClickReset}><GrPowerReset /></button> 
				<button className="button" onClick={handleClickNext}><GrFormNext /></button>	
			</div>
		</div>
	);
};
 
export default PageButton;