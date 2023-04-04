import Axios from "axios";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import useSWR from "swr";

function ProjectedWastes({ dropDownMenuValue }) {
    ChartJS.register(
        LinearScale,
        CategoryScale,
        PointElement,
        LineElement,
        Tooltip,
        Legend
    );

    const date = new Date();
    const [year, setYear] = useState(date.getFullYear());
    const [predictedWaste, setPredictedWaste] = useState(null);
    const [actualWastes, setActualWastes] = useState([]);
    const { data: user } = useSWR("http://localhost:3001/user/me");

    const displayActualWastes = async () => {
        const data = {
            barangayId: dropDownMenuValue,
        };
        await Axios.post(
            "http://localhost:3001/actualWastes/getActualWastes",
            data
        ).then((res) => {
            setActualWastes(res.data);
        });
    };

    const displayActualWastesUser = async () => {
        await Axios.get(
            "http://localhost:3001/actualWastes/getActualWastesUser"
        ).then((res) => {
            console.log("RES", res);
            setActualWastes(res.data);
        });
    };

    useEffect(() => {
        if (dropDownMenuValue != null && user?.isAdmin) {
            displayActualWastes();
            setPredictedWaste(null);
        }
    }, [dropDownMenuValue]);

    useEffect(() => {
        if (!user?.isAdmin) {
            displayActualWastesUser();
        }
    }, [user]);

    const actualWastesArray = actualWastes.map((actualWaste) => {
        return actualWaste.actualWastes;
    });

    const actualWastesArrayPopulation = actualWastes.map((actualWaste) => {
        return actualWaste.populationCount;
    });

    const actualWastesCurrent =
        actualWastes[actualWastes.length - 1]?.actualWastes;

    const actualWastesCurrentPopulation =
        actualWastes[actualWastes.length - 1]?.populationCount;

    const actualWastesArrayYearSubmitted = actualWastes.map((actualWaste) => {
        return actualWaste.yearSubmitted;
    });

    const yValue = actualWastesCurrentPopulation / actualWastesCurrent;

    const averagePopulation = (
        actualWastesArrayPopulation.reduce((a, b) => a + b, 0) /
        actualWastesArrayPopulation.length
    ).toFixed(0);

    const forecastedWaste = averagePopulation * 0.2 * yValue;

    // Create the regressor object to store the equation's data
    let regressor = {};

    // Set variables we'll need to get the slope and intercept; we need to find the equation in the format y = m*x+b where m is the slope and b is the intercept
    let x_mean =
        actualWastesArrayYearSubmitted.reduce((a, b) => a + b, 0) /
        actualWastesArrayYearSubmitted.length;
    let y_mean =
        actualWastesArray.reduce((a, b) => a + b, 0) / actualWastesArray.length;

    // Equations to solve for slope:
    let slope = 0,
        slope_numerator = 0,
        slope_denominator = 0;
    for (let i = 0; i < actualWastesArrayYearSubmitted.length; i++) {
        slope_numerator +=
            (actualWastesArrayYearSubmitted[i] - x_mean) *
            (actualWastesArray[i] - y_mean);
        slope_denominator += Math.pow(
            actualWastesArrayYearSubmitted[i] - x_mean,
            2
        );
    }

    slope = slope_numerator / slope_denominator;

    // Add the slope's value to the regressor object
    regressor["slope"] = slope;

    // Equation to solve for intercept
    var intercept = y_mean - x_mean * slope;

    // Store it's value in the regressor object
    regressor["intercept"] = intercept;

    // Get y_hat, or predicted values of y based on x_values
    // Loop through x_values, and run the elements through the lr equation to get predictions
    let y_hat = [];

    console.log("Y HAT", y_hat);

    let yearSubmitted = actualWastesArrayYearSubmitted[0];

    for (let i = 0; i < actualWastesArrayYearSubmitted.length + 3; i++) {
        const projectedWaste =
            yearSubmitted * regressor["slope"] + regressor["intercept"];
        y_hat.push(projectedWaste.toFixed(2));
        ++yearSubmitted;
    }

    for (let i = 0; i < 3; i++) {
        actualWastesArrayYearSubmitted.push(
            actualWastesArrayYearSubmitted[
                actualWastesArrayYearSubmitted.length - 1
            ] + 1
        );
    }

    // Add to regressor object
    regressor["y_hat"] = y_hat;

    // Finding the r2 score
    let residual_sum_of_squares = 0,
        total_sum_of_squares = 0,
        r2 = 0;

    for (let i = 0; i < actualWastesArray.length; i++) {
        residual_sum_of_squares += Math.pow(y_hat[i] - actualWastesArray[i], 2);
        total_sum_of_squares += Math.pow(y_hat[i] - y_mean, 2);
    }

    r2 = 1 - residual_sum_of_squares / total_sum_of_squares;

    // Add to regressor object
    regressor["r2"] = r2;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value, index, ticks) {
                        return numeral(value).format("0,0") + "kg";
                    },
                },
            },
            x: {
                ticks: {
                    precision: 0,
                    maxTicksLimit: 100,
                },
            },
        },
        plugins: {
            tooltip: {
                backgroundColor: "rgba(0, 0, 0)",
                titleFont: {
                    family: "Roboto Flex",
                    size: 16,
                },
                bodyFont: {
                    family: "Roboto Flex",
                    size: 14,
                },
                bodySpacing: 5,
                padding: 10,
                caretSize: 5,
                cornerRadius: 0,
                boxPadding: 3,

                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || "";

                        if (label) {
                            label += ": ";
                        }

                        label +=
                            numeral(context.parsed.y).format("0,0.00") + "kg";

                        return label;
                    },
                },
            },
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 14,
                        family: "Roboto Flex",
                    },
                },
            },
        },
        interaction: {
            intersect: false,
            mode: "index",
        },
    };

    const datasets = {
        datasets: [
            {
                type: "scatter",
                label: "Actual waste",
                data: actualWastesArray,
                borderColor: "rgb(0, 102, 255)",
                backgroundColor: "rgba(0, 102, 255,0.2)",
                pointRadius: 5,
                pointHoverRadius: 6,
            },
        ],
        labels: actualWastesArrayYearSubmitted,
    };

    const datasets2 = {
        datasets: [
            {
                type: "line",
                label: "Projected waste",
                data: y_hat,
                borderColor: "rgb(221, 40, 40)",
                backgroundColor: "rgba(221, 40, 40, 0.2)",
                pointRadius: 5,
                pointHoverRadius: 6,
            },
            {
                type: "scatter",
                label: "Actual waste",
                data: actualWastesArray,
                borderColor: "rgb(0, 102, 255)",
                backgroundColor: "rgba(0, 102, 255,0.2)",
                pointRadius: 5,
                pointHoverRadius: 6,
            },
        ],
        labels: actualWastesArrayYearSubmitted,
    };

    return (
        <>
            {user?.isAdmin && (
                <>
                    {actualWastesArrayYearSubmitted?.length > 5 ? (
                        <div className="">
                            <div className="mt-4 mb-3">
                                <div className="flex items-end">
                                    {predictedWaste && (
                                        <div className="p-4 border">
                                            <p className="mb-1 mr-4 text-sm text-gray-600">
                                                Projected waste
                                            </p>
                                            <p className="text-lg h-[36px] flex items-center font-medium">
                                                {numeral(predictedWaste).format(
                                                    "0,0.00"
                                                )}
                                                {" kg"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="relative w-full h-[450px] md:mb-8 max-w-sm sm:max-w-md xl:max-w-4xl">
                                {/* <Scatter options={options} data={datasets} /> */}
                                <Scatter options={options} data={datasets2} />
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            Not enough data to perform linear regression.
                        </p>
                    )}
                </>
            )}
            {!user?.isAdmin && (
                <>
                    {actualWastesArrayYearSubmitted?.length > 5 ? (
                        <div className="">
                            <div className="mt-4 mb-3">
                                <div className="flex items-end">
                                    {predictedWaste && (
                                        <div className="p-4 border">
                                            <p className="mb-1 mr-4 text-sm text-gray-600">
                                                Projected waste
                                            </p>
                                            <p className="text-lg h-[36px] flex items-center font-medium">
                                                {numeral(predictedWaste).format(
                                                    "0,0.00"
                                                )}
                                                {" kg"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="relative min-w-[400px] w-[60vw] h-[500px] mb-8 max-w-5xl">
                                <Scatter options={options} data={datasets2} />
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            Not enough data to perform linear regression.
                        </p>
                    )}
                </>
            )}
        </>
    );
}

export default ProjectedWastes;
