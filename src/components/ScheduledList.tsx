import { useEffect, useState } from "react";
import "../styling/ScheduledList.css";

interface Company {
    id: number;
    companyName: string;
}

interface Student {
    id: number;
    studentName: string;
    cgpa: number;
    branch: string;
}

interface Panel {
    id: number;
    panelName?: string;
}

interface Room {
    id: number;
    roomName?: string;
}

interface Interview {
    id: number;
    company?: Company;
    student?: Student;
    panel?: Panel;
    room?: Room;
    interviewStartTime?: string;
    interviewEndTime?: string;
    interviewStatus: string;
    interviewFailureReason?: string;
}

export const InterviewList = () => {

    const [interviews, setInterviews] = useState<Interview[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

   
    const interviewsPerPage = 9;

   
    const pagesPerGroup = 3;

    useEffect(() => {

        fetch("http://localhost:8091/interviews")
            .then(response => {

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                return response.json();
            })
            .then(data => {

                console.log("Interview data:", data);

                setInterviews(data);

            })
            .catch(error => {

                console.error("Error fetching interviews:", error);

            });

    }, []);

   
    const totalPages = Math.ceil(
        interviews.length / interviewsPerPage
    );

   
    const startIndex =
        (currentPage - 1) * interviewsPerPage;

    
    const endIndex =
        startIndex + interviewsPerPage;

    
    const currentInterviews =
        interviews.slice(startIndex, endIndex);

   
    const formatDateTime = (dateTime?: string) => {

        if (!dateTime) {
            return "Not scheduled";
        }

        return new Date(dateTime).toLocaleString();
    };

    

    const currentGroup =
        Math.ceil(currentPage / pagesPerGroup);

    const startPage =
        (currentGroup - 1) * pagesPerGroup + 1;

    const endPage =
        Math.min(
            startPage + pagesPerGroup - 1,
            totalPages
        );

    const pageNumbers = [];

    for (
        let page = startPage;
        page <= endPage;
        page++
    ) {
        pageNumbers.push(page);
    }

    return (

        <div className="interviews-page">

            <h1>Interviews</h1>

           
            <div className="interview-grid">

                {currentInterviews.map(interview => (

                    <div
                        className="interview-card"
                        key={interview.id}
                    >

                    

                        <h2>
                            {interview.company?.companyName ||
                                "Unknown Company"}
                        </h2>

                       

                        <p>
                            <strong>Student:</strong>{" "}
                            {interview.student?.studentName ||
                                "Unknown Student"}
                        </p>

                        

                        <p>
                            <strong>CGPA:</strong>{" "}
                            {interview.student?.cgpa ?? "-"}
                        </p>

                        

                        <p>
                            <strong>Branch:</strong>{" "}
                            {interview.student?.branch || "-"}
                        </p>

                        

                        <p>
                            <strong>Panel:</strong>{" "}
                            {interview.panel?.panelName ||
                                interview.panel?.id ||
                                "Not assigned"}
                        </p>

                        

                        <p>
                            <strong>Room:</strong>{" "}
                            {interview.room?.roomName ||
                                interview.room?.id ||
                                "Not assigned"}
                        </p>

                        

                        <p>
                            <strong>Start:</strong>{" "}
                            {formatDateTime(
                                interview.interviewStartTime
                            )}
                        </p>

                       

                        <p>
                            <strong>End:</strong>{" "}
                            {formatDateTime(
                                interview.interviewEndTime
                            )}
                        </p>

                        

                        <p>
                            <strong>Status:</strong>{" "}
                            {interview.interviewStatus}
                        </p>

                       

                        {interview.interviewFailureReason && (

                            <p>
                                <strong>Reason:</strong>{" "}
                                {interview.interviewFailureReason}
                            </p>

                        )}

                    </div>

                ))}

            </div>


           

            {totalPages > 1 && (

                <div className="pagination">

                   

                    <button
                        disabled={currentPage === 1}
                        onClick={() => {

                            if (currentPage > 1) {
                                setCurrentPage(
                                    currentPage - 1
                                );
                            }

                        }}
                    >
                        Previous
                    </button>


                   

                    {pageNumbers.map(page => (

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
                        disabled={
                            currentPage === totalPages
                        }
                        onClick={() => {

                            if (
                                currentPage < totalPages
                            ) {
                                setCurrentPage(
                                    currentPage + 1
                                );
                            }

                        }}
                    >
                        Next
                    </button>

                </div>

            )}

        </div>
    );
};