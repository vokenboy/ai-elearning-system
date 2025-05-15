import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { executeCode } from "../../api/task/taskAPI";

const CodeOutput = ({ compileTrigger, code, setIsLoading }) => {
    const [output, setOutput] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        runCode();
    }, [compileTrigger]);

    const runCode = async () => {
        const language = "javascript";
        const version = "18.15.0";

        if (!code) return;
        try {
            setIsLoading(true);
            const { run: result } = await executeCode(language, version, code);
            setOutput(result.output);
            result.stderr ? setIsError(true) : setIsError(false);
            console.log(output);
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message || "Unable to run code");
            setSnackbarOpen(true);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Box
            sx={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1e1e1e",
                color: "white",
                p: 2,
                boxShadow: 2,
                overflowY: "hidden",
            }}
        >
            <Typography
                fontSize="1.125rem"
                fontWeight="bold"
                color="white"
                mb={1}
                fontFamily="Lucida Console"
            >
                Output
            </Typography>
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    backgroundColor: "#121212",
                    p: 1,
                    fontSize: "0.875rem",

                    whiteSpace: "pre-wrap",
                    fontFamily: "Lucida Console",
                    maxHeight: "100%",
                    color: isError ? "red" : "gray",
                }}
            >
                {output
                    ? output
                    : 'Click "Test Solution" to see the output here'}
            </Box>
        </Box>
    );
};

export default CodeOutput;
