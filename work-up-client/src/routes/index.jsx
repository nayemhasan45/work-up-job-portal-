import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import jobCategory from "../pages/job-category/jobCategory";
import Blogs from '../pages/blogs/Blogs';
import Contact from "../pages/contact/Contact";
import SignIn from "../pages/user-log/SignIn";
import SignUp from "../pages/user-log/SignUp";

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
        path:"/job-category",
        Component:jobCategory,
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


