import React from "react";

function RecyclableWastesInput({ category, state, setState, firstChild }) {
    return (
        <div>
            <p
                className={`text-xs font-bold uppercase select-none text-center py-1 bg-gray-50 text-gray-700 border border-b-0 border-l-0 ${
                    firstChild && "border-l-[1px]"
                }`}
            >
                {category}
            </p>
            <div className="flex mb-3 removeInputNumberArrows">
                <input
                    value={state}
                    onChange={setState}
                    type="number"
                    className={`appearance-none px-2 py-1 w-24 border border-l-0 focus:outline-none ${
                        firstChild && "border-l-[1px]"
                    }`}
                />
            </div>
        </div>
    );
}

export default RecyclableWastesInput;
