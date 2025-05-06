import { Box } from "@mui/material";
import Editor from "@monaco-editor/react";

const MOCKUPcodeeditor = ({ code, setCode }) => {
    return (
        <Box sx={{ height: "100%" }}>
            <Editor
                height="100%"
                defaultLanguage="javascript"
                value={code}
                theme="vs-dark"
                onChange={(value) => setCode(value || "")}
                options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    tabSize: 2,
                }}
            />
        </Box>
    );
};

export default MOCKUPcodeeditor;
