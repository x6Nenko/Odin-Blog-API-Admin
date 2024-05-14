import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './routes/Root';
import ErrorPage from './error-page';
import Registration from './routes/Registration';
import Login from './routes/Login';
import Post from './routes/Post';
import NewPost from './routes/NewPost';
import EditPost from './routes/EditPost';
import DeletePost from './routes/DeletePost';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "posts",
      //   element: <Posts />,
      // },
      {
        path: "deletepost/:postid",
        element: <DeletePost />,
      },
      {
        path: "editpost/:postid",
        element: <EditPost />,
      },
      {
        path: "newpost",
        element: <NewPost />,
      },
      {
        path: "posts/:postid",
        element: <Post />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
