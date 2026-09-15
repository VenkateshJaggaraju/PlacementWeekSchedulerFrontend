import { useEffect, useState } from "react";
import "../styling/PanelList.css";

interface Panel {
    id: number;
    companyName: string;
    companyId: number;
    panelAvailable: boolean;
}

export const PanelList = () => {

    const [panels, setPanels] = useState<Panel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    // 9 panels per page
    const panelsPerPage = 9;

    useEffect(() => {

        fetch("http://localhost:8091/getPanelList")
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
                setPanels(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });

    }, []);

    // Total pages
    const totalPages = Math.ceil(
        panels.length / panelsPerPage
    );

    // Starting index
    const startIndex =
        (currentPage - 1) * panelsPerPage;

    // Ending index
    const endIndex =
        startIndex + panelsPerPage;

    // Panels for current page
    const currentPanels =
        panels.slice(startIndex, endIndex);

    return (
        <div className="panels-page">

            <h1>Panels</h1>

            <div className="panel-grid">

                {currentPanels.map(panel => (

                    <div
                        className="panel-card"
                        key={panel.id}
                    >

                        <h2>
                            {/* Panel {panel.id} */}
                        </h2>

                        <p>
                            <strong>Company:</strong>{" "}
                            {panel.companyName}
                        </p>

                        <p>
                            <strong>Company ID:</strong>{" "}
                            {panel.companyId}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {panel.panelAvailable
                                ? "Available"
                                : "Busy"}
                        </p>

                    </div>

                ))}

            </div>

            {totalPages > 1 && (

                <div className="panel-pagination">

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