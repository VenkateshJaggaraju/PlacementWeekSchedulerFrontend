import { useEffect, useState } from "react";
import "../styling/RoomList.css";

interface Room {
    id: number;
    roomName: string;
    roomAvailable: boolean;
}

export const RoomList = () => {

    const [rooms, setRooms] = useState<Room[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    
    const roomsPerPage = 9;

    useEffect(() => {

        fetch("http://localhost:8091/getRoomList")
            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        `HTTP Error: ${response.status}`
                    );
                }

                return response.json();
            })
            .then(data => {
                console.log(data);
                setRooms(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });

    }, []);

   
    const totalPages = Math.ceil(
        rooms.length / roomsPerPage
    );

  
    const startIndex =
        (currentPage - 1) * roomsPerPage;

    
    const endIndex =
        startIndex + roomsPerPage;

    
    const currentRooms =
        rooms.slice(startIndex, endIndex);

    return (
        <div className="rooms-page">

            <h1>Rooms</h1>

            <div className="room-grid">

                {currentRooms.map(room => (

                    <div
                        className="room-card"
                        // key={room.id}
                    >

                        <h2>
                            {room.roomName}
                        </h2>

                        <p>
                            <strong>Room ID:</strong>{" "}
                            {room.id}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {room.roomAvailable
                                ? "Available"
                                : "Occupied"}
                        </p>

                    </div>

                ))}

            </div>

            {totalPages > 1 && (

                <div className="room-pagination">

                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage(currentPage - 1)
                        }
                    >
                        Previous
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map(page => (

                        <button
                            key={page}
                            className={
                                currentPage === page
                                    ? "active-page"
                                    : ""
                            }
                            onClick={() =>
                                setCurrentPage(page)
                            }
                        >
                            {page}
                        </button>

                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage(currentPage + 1)
                        }
                    >
                        Next
                    </button>

                </div>

            )}

        </div>
    );
};