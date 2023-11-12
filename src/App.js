import Main from "./components/main/Main";
import { Root } from './pages/root/Root';
import { NoPage } from './pages/noPage/NoPage';
import { Route } from 'react-router-dom';
import { SearchPage } from "./pages/searchPage/SearchPage";
import SubredditHot from "./pages/subredditHot/SubredditHot";
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Main />} />
        <Route path="r/:subreddit/hot" element={<SubredditHot />} />
        <Route path='search' element={<SearchPage />} />
        <Route path="*" element={<NoPage />} />
      </Route> 
    )
  );
  
  return (
    <RouterProvider router={router} />
  )
};

export default App;
