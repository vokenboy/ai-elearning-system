import React from "react";

const TableOfContents = ({ toc, onItemClick }) => {
    if (toc.length === 0) return null;

    return (
        <nav className="p-4">
            <ul className="space-y-1">
                {toc.map((item) => (
                    <li key={item.id}>
                        <button
                            className="btn btn-sm justify-start w-full text-left"
                            style={{
                                marginLeft: `${(item.level - 1) * 1.5}rem`,
                            }}
                            onClick={() => onItemClick(item.id)}
                        >
                            {item.text}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TableOfContents;
