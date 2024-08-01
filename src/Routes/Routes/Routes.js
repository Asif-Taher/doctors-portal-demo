import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Login/Signup";
import RequireAuth from "../../Pages/Login/RequireAuth";
import Dashbord from "../../Pages/Dashbord/Dashbord";
import MyAppoinment from "../../Pages/Dashbord/MyAppoinment";
import MyReview from "../../Pages/Dashbord/MyReview";
import MyHistry from "../../Pages/Dashbord/MyHistry";
import Users from "../../Pages/Dashbord/Users";
import RequeireAdmin from "../../Pages/Login/RequeireAdmin";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/appointment',
                element: <RequireAuth>
                    <Appointment></Appointment>
                </RequireAuth>
            },
            {
                path: '/dashbord',
                element: <RequireAuth>
                    <Dashbord></Dashbord>
                </RequireAuth>,
                children: [
                    {
                        index: true,
                        element: <MyAppoinment></MyAppoinment>
                    },
                    {
                        path:'review',
                        element: <MyReview></MyReview>
                    },
                    {
                        path:'histry',
                        element: <MyHistry></MyHistry>
                    },
                    {
                        path:'users',
                        element: <RequeireAdmin>  <Users></Users>  </RequeireAdmin>
                    },
                ]
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
        ]
    }
])

export default router;