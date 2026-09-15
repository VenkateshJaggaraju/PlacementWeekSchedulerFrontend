import { Link, useNavigate } from "react-router-dom";
import "../styling/Home.css";

const menuItems = [
    {
        title: "Students",
        path: "/students",
        description: "Manage placement students",
    },
    {
        title: "Companies",
        path: "/companies",
        description: "Manage recruiting companies",
    },
    {
        title: "Panels",
        path: "/panels",
        description: "Manage interview panels",
    },
    {
        title: "Rooms",
        path: "/rooms",
        description: "Manage interview rooms",
    },
    {
        title: "Shortlists",
        path: "/shortlists",
        description: "View company student shortlists",
    },
    {
        title: "Interviews",
        path: "/interviews",
        description: "View scheduled interviews",
    },
];

export default function Home() {
    // const navigate = useNavigate();

    return (
        <div className="home-container">

        <header className="home-header">
            <h1>Placement Scheduler</h1>
            <p>
            Manage students, companies, panels, rooms and interviews
            </p>
        </header>

        <main className="dashboard-grid">

            {menuItems.map((item) => (
            <button
                key={item.path}
                className="dashboard-card"
                // onClick={() => navigate(item.path)}
            >
                <h2>{item.title}</h2>
                <Link to={item.path}><p>{item.description}</p></Link>
            </button>
            ))}

        </main>

        </div>
    );
}