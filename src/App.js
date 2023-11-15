import Main from "./pages/main/Main";
import { Root } from './pages/root/Root';
import { NoPage } from './pages/noPage/NoPage';
import { Route } from 'react-router-dom';
import { Search } from "./pages/search/Search";
import SubredditHot from "./pages/subredditHot/SubredditHot";
import AuthorComment from "./pages/authorComment/AuthorComment";
import New from "./pages/new/New";
import Top from "./pages/top/Top";
import Rising from "./pages/rising/Rising";
import Contra from "./pages/contra/Contra";
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Main />} />
        <Route path="r/subreddit/:subreddit/hot" element={<SubredditHot />} />
        <Route path="user/:author/comments" element={<AuthorComment />} />
        <Route path="new" element={<New />} />
        <Route path="top" element={<Top />} />
        <Route path="rising" element={<Rising />} />
        <Route path="contra" element={<Contra />} />
        <Route path="search/:searchValue" element={<Search />} />
        <Route path="*" element={<NoPage />} />
      </Route> 
    )
  );
  
  return (
    <RouterProvider router={router} />
  )
};

export default App;
