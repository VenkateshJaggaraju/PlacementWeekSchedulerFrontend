import { useEffect, useState } from "react";
import "../styling/ShortlistedStudents.css";

interface Student {
    id: number;
    studentName: string;
    cgpa: number;
    branch: string;
    applicationStatus: string;
}

export const ShortlistedStudents = () => {

    const [students, setStudents] = useState<Student[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    
    const studentsPerPage = 9;

    useEffect(() => {

        fetch("http://localhost:8091/shortlistedCandidates")
            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        `HTTP Error: ${response.status}`
                    );
                }

                return response.json();
            })
            .then(data => {

                console.log(
                    "Shortlisted students:",
                    data
                );

                setStudents(data);
                setCurrentPage(1);
            })
            .catch(error => {

                console.error(
                    "Error fetching shortlisted students:",
                    error
                );

            });

    }, []);

    
    const totalPages = Math.ceil(
        students.length / studentsPerPage
    );

   
    const startIndex =
        (currentPage - 1) * studentsPerPage;

    
    const endIndex =
        startIndex + studentsPerPage;

   
    const currentStudents =
        students.slice(startIndex, endIndex);

    return (

        <div className="shortlisted-page">

            <h1>Shortlisted Students</h1>

            

            <div className="shortlisted-grid">

                {currentStudents.map(student => (

                    <div
                        className="shortlisted-card"
                        key={student.id}
                    >

                        <h2>
                            {student.studentName}
                        </h2>

                        <p>
                            <strong>CGPA:</strong>{" "}
                            {student.cgpa}
                        </p>

                        <p>
                            <strong>Branch:</strong>{" "}
                            {student.branch}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {student.applicationStatus}
                        </p>

                    </div>

                ))}

            </div>

            

            {students.length === 0 && (

                <p className="no-shortlisted">
                    No students have been shortlisted.
                </p>

            )}

           

            {totalPages > 1 && (

                <div className="pagination">

                    

                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage(
                                currentPage - 1
                            )
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
                        disabled={
                            currentPage === totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                currentPage + 1
                            )
                        }
                    >
                        Next
                    </button>

                </div>

            )}

        </div>
    );
};