import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home";
import { PageNotFoundException } from "./exceptions/PageNotFoundException";
import { StudentList } from "./components/StudentList";
import { CompanyList } from "./components/CompanyList";
import { RoomList } from "./components/RoomList";
import { PanelList } from "./components/PanelList";
import { InterviewList } from "./components/ScheduledList";
import { ShortlistedStudents } from "./components/ShortlistedStudents";


const router=createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <PageNotFoundException/>,
  },
  {
    path: "/students",
    element: <StudentList />,
  },
  {
    path: "/companies",
    element: <CompanyList />,
  },
  {
    path: "/rooms",
    element: <RoomList />,
  },
  {
    path: "/panels",
    element: <PanelList />,
  },
  {
    path: "/interviews",
    element: <InterviewList />,
  },
  {
    path: "/shortlists",
    element: <ShortlistedStudents />,
  }
]);


function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
