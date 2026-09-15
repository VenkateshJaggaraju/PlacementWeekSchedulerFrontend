import { useEffect, useState } from "react";
import "../styling/CompanyList.css";

interface Company {
    id: number;
    companyName: string;
    cgpaCutoff: number;
    allocatedPanels: number;
    interviewDurationMinutes: number;
    priorityTier: string;
    shortListedCount: number;
    delayMinutes: number;
    companyActivelyHiring: boolean;
}

export const CompanyList = () => {

    const [companies, setCompanies] = useState<Company[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    // 9 companies per page
    const companiesPerPage = 9;

    useEffect(() => {

        fetch("http://localhost:8091/getCompanyList")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                return response.json();
            })
            .then(data => {
                console.log(data);
                setCompanies(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });

    }, []);

    // Total pages
    const totalPages = Math.ceil(
        companies.length / companiesPerPage
    );

    // Starting index
    const startIndex =
        (currentPage - 1) * companiesPerPage;

    // Ending index
    const endIndex =
        startIndex + companiesPerPage;

    // Companies for current page
    const currentCompanies =
        companies.slice(startIndex, endIndex);

    return (
        <div className="companies-page">

            <h1>Companies</h1>

            <div className="company-grid">

                {currentCompanies.map(company => (

                    <div
                        className="company-card"
                        // key={company.id}
                    >

                        <h2>
                            {company.companyName}
                        </h2>

                        <p>
                            <strong>CGPA Cutoff:</strong>{" "}
                            {company.cgpaCutoff}
                        </p>

                        <p>
                            <strong>Allocated Panels:</strong>{" "}
                            {company.allocatedPanels}
                        </p>

                        <p>
                            <strong>Interview Duration:</strong>{" "}
                            {company.interviewDurationMinutes} mins
                        </p>

                        <p>
                            <strong>Priority:</strong>{" "}
                            {company.priorityTier}
                        </p>

                        <p>
                            <strong>Shortlisted:</strong>{" "}
                            {company.shortListedCount}
                        </p>

                        <p>
                            <strong>Delay:</strong>{" "}
                            {company.delayMinutes} mins
                        </p>

                        <p>
                            <strong>Hiring:</strong>{" "}
                            {company.companyActivelyHiring
                                ? "Yes"
                                : "No"}
                        </p>

                    </div>

                ))}

            </div>

            {totalPages > 1 && (

                <div className="company-pagination">

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