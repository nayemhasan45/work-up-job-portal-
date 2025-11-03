import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import JobCategory from "../pages/job-category/JobCategory";
import Blogs from '../pages/blogs/Blogs';
import Contact from "../pages/contact/Contact";
import SignIn from "../pages/user-log/SignIn";
import SignUp from "../pages/user-log/SignUp";
import JobDetails from "../pages/job-category/JobDetails";
import PrivateRoute from "./PrivateRoute";
import ApplyJob from "../pages/job-category/ApplyJob";

const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
      {
        index:true,
        Component:Home,
      },
      {
        path:"/applyJob/:id",
        element:<PrivateRoute>
          <ApplyJob></ApplyJob>
        </PrivateRoute>
      },
      {
        path:"/job-category",
        Component:JobCategory,
      },
      {
        path:"/jobs/:id",
        Component:JobDetails,
      },
      {
        path:"/blog",
        Component:Blogs,
      },
      {
        path:"/contact",
        Component:Contact,
      },
      {
        path:"/signin",
        Component:SignIn,
      },
      {
        path:"/signup",
        Component:SignUp,
      }
    ]
  },
]);

export default router;


