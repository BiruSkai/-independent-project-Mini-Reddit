import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./pageButton.css";
import {GrFormNext} from 'react-icons/gr';
import {GrPowerReset} from 'react-icons/gr';
import {GrFormPrevious} from 'react-icons/gr';
import {increment, decrement, reset} from "../../redux/ducks/BestSlice";

const PageButton = ({page}) => {
	const dispatch = useDispatch();

	const pageState = useSelector((state) => state.bestSliceReducer.count.total);
	console.log("pageState in PageButton.js ", pageState);
	const lastCount = useSelector((state) => state.bestSliceReducer.count.count);
	console.log("lastCount ", lastCount);
	page = parseInt(page);
	console.log("page ", page);

	const previousButton = document.querySelector(".previous");

	function handleClickNext(){
		dispatch(increment(page))
		console.log("next Click ",page);

		if(page > 0){
			previousButton.style.display = "inline";	
		}
		return;
	};

	function handleClickPrevious(){
		dispatch(decrement(page))
		
		const diff = pageState - page;
		console.log("diff Click", diff);

		if(diff < 0){
			previousButton.style.display = "none";
			handleClickReset();
			return;
		} if (diff === 0){
				return previousButton.style.display = "none"
		}
	};

	function handleClickReset(){
		dispatch(reset())
		return;
	};

	return (
		<div className="pageButtonContainer">
			<div className="subPageButton">
				<small>{`Item ${(pageState - lastCount) < 0 ? 0 : (pageState - lastCount)} - ${pageState}`}</small>
			</div>
			<div className="subPageButton">
				<button className="button previous" onClick={handleClickPrevious} ><GrFormPrevious /></button>
				<button className="button" onClick={handleClickReset}><GrPowerReset /></button> 
				<button className="button" onClick={handleClickNext}><GrFormNext /></button>	
			</div>
		</div>
	);
};
 
export default PageButton;