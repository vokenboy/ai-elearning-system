const components = {
    h1: (props) => <h1 className="text-4xl font-bold" {...props} />,
    h2: (props) => <h2 className="text-2xl font-bold" {...props} />,
    h3: (props) => <h3 className="text-xl font-semibold" {...props} />,
    p: (props) => <p className="my-3 leading-relaxed" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 my-2" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 my-4" {...props} />,
    li: (props) => <li className="mb-1" {...props} />,
    a: (props) => <a className="underline" {...props} />,
    code: ({ inline, ...props }) =>
        inline ? (
            <code
                className="bg-base-300 px-1 py-0.5 rounded text-sm"
                {...props}
            />
        ) : (
            <pre className="bg-base-300 p-2 rounded-lg my-2 overflow-auto">
                <code className="" {...props} />
            </pre>
        ),
};

export default components;
