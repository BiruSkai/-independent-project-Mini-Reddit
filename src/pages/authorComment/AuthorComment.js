import "../main/main.css";
import "./authorComment.css";
import {init} from "../main/Main";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {CardListComment} from "./CardListComment";
import {ScrollTop} from "../../components/subcomponents/ScrollTop";
import PageButton from "../../components/pageButton/PageButton";
import  {fetchAuthorComment}  from "../../redux/ducks/authorCommentSlice";
import { increment, setCount } from "../../redux/ducks/PageCountSlice";
import { setTheme } from "../../redux/ducks/ThemeSlice";
import {FaComments} from 'react-icons/fa';
import {quantum} from "ldrs";
quantum.register();

const source = "AuthorComment";

const AuthorComment = () => {
        const dispatch = useDispatch();
        const {author} = useParams();
        console.log("author useParams: ", author);

        //How many items will be displayed
        const page = parseInt(useSelector((state) => state.pageCountSliceReducer.count.count))
        console.log("page in AuthorComment.js ", page)   

        //init useEffect
        useEffect(() => {
                //Reset pageCountSlice
                dispatch(setCount(init));
                //Set new Theme in ThemeSlice
                dispatch(setTheme(source));
                //Fetch data
                dispatch(fetchAuthorComment({page:init, subreddit:author}));
                console.log("init useEffect AuthorComment: ", init, author);
        },[dispatch])

        //UseEffect for initialization, next-, prev-Page
        useEffect(() => {
                let i = 0;
                if(i === 0){
                        i++
                }else{
                        console.log("dispatch page, authorComment in AuthorComment.js ", page, author)
                        dispatch(increment({page}));
                        dispatch(fetchAuthorComment({page, subreddit:author}));
                }
        },[dispatch,page,author]);

        //Get array of data that will be displayed
        const authorCommentSliceReducerData = useSelector((state) => state.authorCommentSliceReducer.data);
        console.log("authorCommentSliceReducerData in AuthorComment.js ", authorCommentSliceReducerData);

        // Get data.name of first and last item on the screen
        const authorCommentSliceReducerPage = useSelector((state) => state.authorCommentSliceReducer.page);
        const {nextPage, prevPage} = authorCommentSliceReducerPage;
        console.log("nextPage: ", nextPage, "prevPage: ", prevPage);

        const authorCommentSliceReducerLoading = useSelector((state) => state.authorCommentSliceReducer.isLoading);
        const authorCommentSliceReducerError = useSelector(state => state.authorCommentSliceReducer.isError);

        if(authorCommentSliceReducerLoading === true){
                return(
                        <div className="mainContainer loading">
                                <l-quantum size="150" speed="2.4" color="black"></l-quantum>
                        </div>
                )
        }

        if(authorCommentSliceReducerError === true){
                        return <div className="mainContainer error">Error...</div>
        }

        return ( 
                <div className="mainContainer">
                        <div id="sourceAuthorComment">&nbsp;<FaComments/>{source}</div>
                        <div>
                                <PageButton source={source} subreddit={author} page={page} nextPage={nextPage} prevPage={prevPage}/>
                        </div>
                        <ul>
                        {authorCommentSliceReducerData.map((data, index) => {
                                return (
                                        <li key={index}>
                                                <CardListComment data={data}/>
                                        </li>)})
                        } 
                        </ul>
                        <ScrollTop />
                        <br></br>
                </div>
         );
}
 
export default AuthorComment;