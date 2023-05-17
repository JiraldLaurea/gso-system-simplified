import { Icon } from "@iconify/react";
import Axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR, { mutate } from "swr";

function project() {
    const [text, setText] = useState("");
    const [text2, setText2] = useState("");
    const [text3, setText3] = useState("");
    const [text4, setText4] = useState("");
    const [text5, setText5] = useState("");
    const [text6, setText6] = useState("");
    const [num, setNum] = useState("");
    const [num2, setNum2] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [value, setValue] = useState("");

    const {
        data: project,
        error: errorProject,
        isValidating: isValidatingProject,
    } = useSWR("http://localhost:3001/project");

    console.log(project);

    const createProject = async (e) => {
        e.preventDefault();

        if (text != "") {
            setIsLoading(true);

            const data = {
                barangayName: text,
                actionPlan: text2,
                objectives: text3,
                activities: text4,
                performanceIndicatorAndTerminal: num,
                baseline: num2,
                assumption: text5,
                meansOfVerification: text6,
            };

            await Axios.post("http://localhost:3001/project/create", data).then(
                () => {
                    alert("Successfully created new project");
                    setText("");
                    setText2("");
                    setText3("");
                    setText4("");
                    setText5("");
                    setText6("");
                    setNum("");
                    setNum2("");
                    setIsLoading(false);
                    mutate("http://localhost:3001/project");
                }
            );
        } else {
            alert("Please fill in the text form");
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="p-4 md:p-8">
                <h2 className="mb-8 text-xl font-semibold">Project manager</h2>
                <div className="mb-4">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className={`px-6 py-1 text-white bg-blue-500 active:ring `}
                    >
                        Create New Project
                    </button>
                </div>

                {isMenuOpen && (
                    <>
                        <form
                            onSubmit={createProject}
                            className="fixed inset-x-0 z-30 w-full max-w-xl max-h-full h-screen md:h-auto p-4 md:p-6 mx-auto bg-white top-0 md:top-20 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-xl font-medium">
                                    Create New Project
                                </p>
                                <Icon
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-1 text-gray-600 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 w-9 h-9 "
                                    icon="clarity:close-line"
                                />
                            </div>

                            <div className="flex flex-col md:flex-row justify-between mt-4">
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">
                                        Barangay Name
                                    </p>

                                    <input
                                        value={text}
                                        onChange={(e) =>
                                            setText(e.target.value)
                                        }
                                        className="w-full md:w-64 px-2 py-1 mb-4 border focus:outline-none"
                                        type="text"
                                        placeholder="Barangay Name"
                                    />
                                </div>
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">
                                        Action Plan
                                    </p>
                                    <input
                                        value={text2}
                                        onChange={(e) =>
                                            setText2(e.target.value)
                                        }
                                        className="w-full md:w-64 px-2 py-1 mb-4 border focus:outline-none"
                                        type="text"
                                        placeholder="Action Plan"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between">
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">
                                        Objectives
                                    </p>
                                    <textarea
                                        value={text3}
                                        onChange={(e) =>
                                            setText3(e.target.value)
                                        }
                                        className="w-full md:w-64 px-2 py-1 mb-4 border focus:outline-none"
                                        type="text"
                                        placeholder="Objectives"
                                    />
                                </div>
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">
                                        Activites
                                    </p>
                                    <textarea
                                        value={text4}
                                        onChange={(e) =>
                                            setText4(e.target.value)
                                        }
                                        className="w-full md:w-64 px-2 py-1 mb-4 border focus:outline-none"
                                        type="text"
                                        placeholder="Activites"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between">
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">
                                        Performance Indicator and Terminal
                                    </p>

                                    <input
                                        value={num}
                                        onChange={(e) => setNum(e.target.value)}
                                        className="w-full md:w-64 px-2 py-1 mb-4 text-left border focus:outline-none"
                                        type="number"
                                        placeholder="Performance Indicator"
                                    />
                                </div>

                                <div>
                                    <p className="mb-1 text-sm text-gray-600">
                                        Baseline
                                    </p>
                                    <input
                                        value={num2}
                                        onChange={(e) =>
                                            setNum2(e.target.value)
                                        }
                                        className="w-full md:w-64 px-2 py-1 mb-4 text-left border focus:outline-none"
                                        type="number"
                                        placeholder="Baseline"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between mb-4">
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">
                                        Assumption
                                    </p>

                                    <textarea
                                        value={text5}
                                        onChange={(e) =>
                                            setText5(e.target.value)
                                        }
                                        className="w-full md:w-64 px-2 py-1 mb-4 border focus:outline-none"
                                        type="text"
                                        placeholder="Assumption"
                                    />
                                </div>
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">
                                        Means ofVerification
                                    </p>

                                    <textarea
                                        value={text6}
                                        onChange={(e) =>
                                            setText6(e.target.value)
                                        }
                                        className="w-full md:w-64 px-2 py-1 mb-4 border focus:outline-none"
                                        type="text"
                                        placeholder="Verification"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`px-6 py-1 w-full text-white bg-blue-500 active:ring ${
                                    isLoading &&
                                    "cursor-not-allowed active:ring-0"
                                }`}
                                disabled={isLoading}
                            >
                                {!isLoading ? "Post" : "Processing..."}
                            </button>
                        </form>
                        <div
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed top-0 left-0 z-20 w-screen h-screen bg-gray-700/30"
                        />
                    </>
                )}

                <div
                    className={`overflow-auto border max-h-[500px] ${
                        project && "border-x border-t border-b-0"
                    }`}
                >
                    <div className="w-0 md:w-full">
                        <table className="md:w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                                <tr className="select-none removeBorderStyle">
                                    <th className="px-6">
                                        <p>ID</p>
                                    </th>
                                    <th className="px-6">
                                        <p>Barangay Name</p>
                                    </th>
                                    <th className="px-6">
                                        <p>Action Plan</p>
                                    </th>
                                    <th className="px-6">
                                        <p>Objectives</p>
                                    </th>
                                    <th className="px-6">
                                        <p>Activities</p>
                                    </th>
                                    <th className="px-6">
                                        <p>Performance Indicator</p>
                                    </th>
                                    <th className="px-6">
                                        <p>Baseline</p>
                                    </th>
                                    <th className="px-6">
                                        <p>Assumption</p>
                                    </th>
                                    <th className="px-6">
                                        <p>Means of Verification</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {project?.map((project, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="border-b removeBorderStyle h-11"
                                        >
                                            <td className="px-6">
                                                {project.id}
                                            </td>
                                            <td className="px-6">
                                                {project.barangayName}
                                            </td>
                                            <td className="px-6">
                                                {project.actionPlan}
                                            </td>
                                            <td className="px-6">
                                                {project.objectives}
                                            </td>
                                            <td className="px-6">
                                                {project.activities}
                                            </td>
                                            <td className="px-6">
                                                {
                                                    project.performanceIndicatorAndTerminal
                                                }
                                            </td>
                                            <td className="px-6">
                                                {project.baseline}
                                            </td>
                                            <td className="px-6">
                                                {project.assumption}
                                            </td>
                                            <td className="px-6">
                                                {project.meansOfVerification}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default project;
