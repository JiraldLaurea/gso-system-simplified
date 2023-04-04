import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthDispatch } from "../context/auth";
import useSWR from "swr";
import moment from "moment";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    TimeScale,
    TimeSeriesScale,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import numeral from "numeral";
import { enUS } from "date-fns/locale";
import "chartjs-adapter-date-fns";

function actualWastes() {
    ChartJS.register(
        LinearScale,
        CategoryScale,
        PointElement,
        LineElement,
        Tooltip,
        TimeScale,
        TimeSeriesScale,
        Legend
    );

    const [fromDatePicker, setFromDatePicker] = useState("");
    const [toDatePicker, setToDatePicker] = useState("");
    const [yearPicker, setYearPicker] = useState("");

    // moment().format("yyyy-MM-DD")

    const dispatch = useAuthDispatch();
    const [selectedDateRange, setSelectedDateRange] = useState("Year");
    const [actualWastesYear, setActualWastesYear] = useState([]);
    const [actualWastesYearAverage, setActualWastesYearAverage] = useState([]);
    const [actualWastesMonth, setActualWastesMonth] = useState([]);
    const [actualWastesMonthAverage, setActualWastesMonthAverage] = useState(
        []
    );
    const [actualWastesDay, setActualWastesDay] = useState([]);
    const [actualWastesDayFiltered, setActualWastesDayFiltered] = useState([]);
    const [actualWastesMonthFiltered, setActualWastesMonthFiltered] = useState(
        []
    );

    const displayActualWastes = async () => {
        await Axios.get(
            "http://localhost:3001/actualWastes/getActualWastesYear"
        ).then((res) => {
            setActualWastesYear(res.data);
        });
        await Axios.get(
            "http://localhost:3001/actualWastes/getActualWastesYearAverage"
        ).then((res) => {
            setActualWastesYearAverage(res.data);
        });
        await Axios.get(
            "http://localhost:3001/actualWastes/getActualWastesMonth"
        ).then((res) => {
            setActualWastesMonth(res.data);
        });
        await Axios.get(
            "http://localhost:3001/actualWastes/getActualWastesMonthAverage"
        ).then((res) => {
            setActualWastesMonthAverage(res.data);
        });
        await Axios.get(
            "http://localhost:3001/actualWastes/getActualWastes"
        ).then((res) => {
            setActualWastesDay(res.data);
        });
    };

    useEffect(() => {
        displayActualWastes();
    }, []);

    useEffect(() => {
        dispatch("CHANGE_TITLE", "Actual wastes");
        dispatch("HAS_BUTTON_FALSE");
    }, []);

    // Linear Regression Algorithm
    const actualWastesArrayYear = actualWastesYear?.map((actualWaste) => {
        return actualWaste.groupedActualWastes;
    });

    const actualWastesArrayDateSubmittedYear = actualWastesYear?.map(
        (actualWaste) => {
            return parseInt(actualWaste.dateOfSubmission.substring(0, 4));
        }
    );

    const actualWastesArrayYearAverage = actualWastesYearAverage?.map(
        (actualWaste) => {
            return actualWaste.groupedActualWastes;
        }
    );

    const actualWastesArrayMonth = actualWastesMonth?.map((actualWaste) => {
        if (actualWaste.dateOfSubmission == yearPicker || yearPicker == "") {
            return actualWaste.groupedActualWastes;
        }
    });

    const actualWastesArrayMonthAverage = actualWastesMonthAverage?.map(
        (actualWaste) => {
            return actualWaste.groupedActualWastes;
        }
    );

    const actualWastesArrayDateSubmittedMonth = actualWastesMonth?.map(
        (actualWaste) => {
            if (
                actualWaste.dateOfSubmission == yearPicker ||
                yearPicker == ""
            ) {
                return Date.parse(actualWaste.dateOfSubmission.substring(0, 7));
            }
        }
    );

    const actualWastesArrayMonthFiltered = actualWastesArrayMonth?.filter(
        function (el) {
            return el != null;
        }
    );

    const actualWastesArrayDateSubmittedMonthFiltered =
        actualWastesArrayDateSubmittedMonth?.filter(function (el) {
            return el != null;
        });

    const actualWastesArrayDay = actualWastesDay?.map((actualWaste) => {
        if (
            (actualWaste.dateOfSubmission >= fromDatePicker &&
                actualWaste.dateOfSubmission <= toDatePicker) ||
            (fromDatePicker == "" && toDatePicker == "")
        ) {
            return actualWaste.actualWastes;
        }
    });

    const actualWastesArrayDateSubmittedDay = actualWastesDay?.map(
        (actualWaste) => {
            if (
                (actualWaste.dateOfSubmission >= fromDatePicker &&
                    actualWaste.dateOfSubmission <= toDatePicker) ||
                (fromDatePicker == "" && toDatePicker == "")
            ) {
                return Date.parse(actualWaste.dateOfSubmission);
            }
        }
    );

    const actualWastesArrayDayFiltered = actualWastesArrayDay?.filter(function (
        el
    ) {
        return el != null;
    });

    const actualWastesArrayDateSubmittedDayFiltered =
        actualWastesArrayDateSubmittedDay.filter(function (el) {
            return el != null;
        });

    // Create the regressor object to store the equation's data
    let regressor = {};
    // let regressorMonth = {};

    // Set variables we'll need to get the slope and intercept; we need to find the equation in the format y = m*x+b where m is the slope and b is the intercept
    let x_mean =
        actualWastesArrayDateSubmittedYear?.reduce((a, b) => a + b, 0) /
        actualWastesArrayDateSubmittedYear?.length;
    let y_mean =
        actualWastesArrayYear?.reduce((a, b) => a + b, 0) /
        actualWastesArrayYear?.length;
    // let x_meanMonth =
    //     actualWastesArrayDateSubmittedMonth.reduce((a, b) => a + b, 0) /
    //     actualWastesArrayDateSubmittedMonth.length;
    // let y_meanMonth =
    //     actualWastesArrayMonth.reduce((a, b) => a + b, 0) /
    //     actualWastesArrayMonth.length;

    // Equations to solve for slope:
    let slope = 0,
        slope_numerator = 0,
        slope_denominator = 0;
    for (let i = 0; i < actualWastesArrayDateSubmittedYear?.length; i++) {
        slope_numerator +=
            (actualWastesArrayDateSubmittedYear[i] - x_mean) *
            (actualWastesArrayYear[i] - y_mean);
        slope_denominator += Math.pow(
            actualWastesArrayDateSubmittedYear[i] - x_mean,
            2
        );
    }

    slope = slope_numerator / slope_denominator;

    // Add the slope's value to the regressor object
    regressor["slope"] = slope;

    // Equation to solve for intercept
    let intercept = y_mean - x_mean * slope;

    // Store it's value in the regressor object
    regressor["intercept"] = intercept;

    // Get y_hat, or predicted values of y based on x_values
    // Loop through x_values, and run the elements through the lr equation to get predictions
    let y_hat = [];

    let yearSubmitted =
        actualWastesArrayDateSubmittedYear &&
        actualWastesArrayDateSubmittedYear[0];

    for (let i = 0; i < actualWastesArrayDateSubmittedYear?.length + 3; i++) {
        const projectedWaste =
            yearSubmitted * regressor["slope"] + regressor["intercept"];
        y_hat.push(projectedWaste.toFixed(2));
        ++yearSubmitted;
    }

    for (let i = 0; i < 3; i++) {
        actualWastesArrayDateSubmittedYear?.push(
            actualWastesArrayDateSubmittedYear[
                actualWastesArrayDateSubmittedYear?.length - 1
            ] + 1
        );
    }

    // Add to regressor object
    regressor["y_hat"] = y_hat;

    // Finding the r2 score
    let residual_sum_of_squares = 0,
        total_sum_of_squares = 0,
        r2 = 0;

    for (let i = 0; i < actualWastesArrayYear?.length; i++) {
        residual_sum_of_squares += Math.pow(
            y_hat[i] - actualWastesArrayYear[i],
            2
        );
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
            // x: {
            //     ticks: {
            //         precision: 0,
            //         maxTicksLimit: 100,
            //     },
            // },
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
                // borderColor: "rgba(0, 0, 0)",
                // borderWidth: 1,
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
                    filter: function (item, chart) {
                        // Logic to remove a particular legend item goes here
                        return !item.text.includes("Average waste");
                    },
                },
            },
        },
        interaction: {
            intersect: false,
            mode: "index",
        },
    };

    const optionsMonth = {
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
                distribution: "linear",
                type: "timeseries",
                adapters: {
                    date: {
                        locale: enUS,
                    },
                },
                ticks: {
                    source: "data",
                },
                time: {
                    unit: "month",
                    displayFormats: {
                        month: "MMM yyyy",
                    },
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
                // borderColor: "rgba(0, 0, 0)",
                // borderWidth: 1,
                callbacks: {
                    title: function (context, data) {
                        let title =
                            moment(context[0].label).format("MMMM yyyy") || "";

                        return title;
                    },
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
                    filter: function (item, chart) {
                        // Logic to remove a particular legend item goes here
                        return !item.text.includes("Average waste");
                    },
                },
            },
        },
        interaction: {
            intersect: false,
            mode: "index",
        },
    };

    const optionsDay = {
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
                distribution: "linear",
                type: "timeseries",
                adapters: {
                    date: {
                        locale: enUS,
                    },
                },
                ticks: {
                    source: "data",
                },
                time: {
                    unit: "day",
                    displayFormats: {
                        day: "MMM dd, yyyy",
                    },
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
                // borderColor: "rgba(0, 0, 0)",
                // borderWidth: 1,
                callbacks: {
                    title: function (context, data) {
                        let title =
                            moment(context[0].label).format("MMMM DD, yyyy") ||
                            "";

                        return title;
                    },
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
                type: "line",
                label: "Projected waste",
                data: y_hat,
                borderColor: "rgb(221, 40, 40)",
                backgroundColor: "rgba(221, 40, 40, 0.2)",
                pointRadius: 5,
                pointHoverRadius: 6,
            },
            // actualWastesArrayYearAverage
            {
                type: "scatter",
                label: "Actual waste",
                data: actualWastesArrayYear,
                borderColor: "rgb(0, 102, 255)",
                backgroundColor: "rgba(0, 102, 255,0.2)",
                pointRadius: 5,
                pointHoverRadius: 6,
            },
            {
                type: "scatter",
                label: "Average waste",
                data: actualWastesArrayYearAverage,
                borderColor: "rgb(255, 255, 255)",
                backgroundColor: "rgb(255, 255, 255)",
                pointRadius: 0,
                pointHoverRadius: 0,
            },
        ],
        labels: actualWastesArrayDateSubmittedYear,
    };

    const formattedActualWasteDateMonth =
        actualWastesArrayDateSubmittedMonth?.map((data) => {
            return moment(data, "x").format("YYYY-MM");
        });

    const datasetsMonth = {
        datasets: [
            {
                type: "scatter",
                label: "Actual waste",
                data: actualWastesArrayMonthFiltered,
                borderColor: "rgb(0, 102, 255)",
                backgroundColor: "rgba(0, 102, 255,0.2)",
                pointRadius: 5,
                pointHoverRadius: 6,
            },
            {
                type: "scatter",
                label: "Average waste",
                data: actualWastesArrayMonthAverage,
                borderColor: "rgb(255, 255, 255)",
                backgroundColor: "rgb(255, 255, 255)",
                pointRadius: 0,
                pointHoverRadius: 0,
            },
        ],
        labels: actualWastesArrayDateSubmittedMonthFiltered,
    };

    const datasetsDay = {
        datasets: [
            {
                type: "scatter",
                label: "Actual waste",
                data: actualWastesArrayDayFiltered,
                borderColor: "rgb(0, 102, 255)",
                backgroundColor: "rgba(0, 102, 255,0.2)",
                pointRadius: 5,
                pointHoverRadius: 6,
            },
        ],
        labels: actualWastesArrayDateSubmittedDayFiltered,
    };

    return (
        <div className="flex flex-col w-full max-w-5xl">
            <div className="p-8">
                <div className="flex items-center mb-10 space-x-4 text-sm font-medium">
                    <button
                        onClick={() => setSelectedDateRange("Year")}
                        className={`py-2 text-gray-600 ${
                            selectedDateRange == "Year" &&
                            "text-blue-600 border-b-2 relative top-[1px] border-blue-500"
                        }`}
                    >
                        Year
                    </button>
                    <button
                        onClick={() => setSelectedDateRange("Month")}
                        className={`py-2  text-gray-600 ${
                            selectedDateRange == "Month" &&
                            "text-blue-600 border-b-2 relative top-[1px] border-blue-500"
                        }`}
                    >
                        Month
                    </button>
                    <button
                        onClick={() => setSelectedDateRange("Day")}
                        className={`py-2 text-gray-600 ${
                            selectedDateRange == "Day" &&
                            "text-blue-600 border-b-2 relative top-[1px] border-blue-500"
                        }`}
                    >
                        Day
                    </button>
                </div>
                {selectedDateRange == "Day" && (
                    <div id="test" className="flex items-end mb-4 space-x-4">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">From:</p>
                            <input
                                className="px-2 py-1 border"
                                type="date"
                                // id="fromDatePicker"
                                value={fromDatePicker}
                                onChange={(e) =>
                                    setFromDatePicker(e.target.value)
                                }
                            ></input>
                        </div>
                        <div>
                            <p className="mb-1 text-sm text-gray-600">To:</p>
                            <input
                                className="px-2 py-1 border"
                                type="date"
                                // id="toDatePicker"
                                value={toDatePicker}
                                onChange={(e) =>
                                    setToDatePicker(e.target.value)
                                }
                            ></input>
                        </div>
                        {fromDatePicker && toDatePicker && (
                            <div
                                onClick={() => {
                                    setFromDatePicker("");
                                    setToDatePicker("");
                                }}
                                className="flex items-center text-gray-600 h-9 hover:cursor-pointer group"
                            >
                                <p className="group-hover:underline group-hover:text-black">
                                    Clear
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {selectedDateRange == "Month" && (
                    <div id="test" className="flex items-end mb-4 space-x-4">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Year:</p>
                            <input
                                className="px-2 py-1 border"
                                type="year"
                                // id="yearPicker"
                                value={yearPicker}
                                onChange={(e) => setYearPicker(e.target.value)}
                            ></input>
                        </div>

                        {yearPicker && (
                            <div
                                onClick={() => {
                                    setYearPicker("");
                                }}
                                className="flex items-center text-gray-600 h-9 hover:cursor-pointer group"
                            >
                                <p className="group-hover:underline group-hover:text-black">
                                    Clear
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <div className="relative min-w-[400px] w-[60vw] h-[500px] max-w-5xl">
                    {selectedDateRange == "Year" && (
                        <Scatter options={options} data={datasets} />
                    )}
                    {selectedDateRange == "Month" && (
                        <Scatter options={optionsMonth} data={datasetsMonth} />
                    )}
                    {selectedDateRange == "Day" && (
                        <Scatter options={optionsDay} data={datasetsDay} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default actualWastes;
