import { useEffect, useState } from "react";
import "../styling/StudentList.css";

interface Student {
    id: number;
    studentName: string;
    cgpa: number;
    branch: string;
    applicationStatus: string;
}

export const StudentList = () => {

    const [students, setStudents] = useState<Student[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    // 9 students per page
    const studentsPerPage = 9;

    useEffect(() => {

        fetch("http://localhost:8091/getStudentList")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                return response.json();
            })
            .then(data => {
                console.log(data);
                
                setStudents(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });

    }, []);

    // Total number of pages
    const totalPages = Math.ceil(
        students.length / studentsPerPage
    );

    // Starting index
    const startIndex =
        (currentPage - 1) * studentsPerPage;

    // Ending index
    const endIndex =
        startIndex + studentsPerPage;

    // Students for current page
    const currentStudents =
        students.slice(startIndex, endIndex);

    return (
        <div className="students-page">

            <h1>Students</h1>

            {/* 3 × 3 student grid */}
            <div className="student-grid">

                {currentStudents.map(student => (

                    <div
                        className="student-card"
                        key={student.id}
                    >

                        {/* 1. ID */}
                        {/* <p>
                            <strong>ID:</strong> {student.id}
                        </p> */}

                        {/* 2. Student Name */}
                        <h2>       
                            {student.studentName}
                        </h2>

                        {/* 3. CGPA */}
                        <p>
                            <strong>CGPA:</strong> {student.cgpa}
                        </p>

                        {/* 4. Branch */}
                        <p>
                            <strong>Branch:</strong> {student.branch}
                        </p>

                        {/* 5. Application Status */}
                        <p>
                            <strong>Status:</strong>{" "}
                            {student.applicationStatus || "ACTIVE"}
                        </p>

                    </div>

                ))}

            </div>

            {/* Pagination */}
            {totalPages > 1 && (

                <div className="pagination">

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