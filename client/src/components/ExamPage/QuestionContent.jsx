import {
    Box,
    Typography,
    TextField,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormGroup,
    Checkbox,
    Button,
} from "@mui/material";

const QuestionContent = ({
    question,
    answer = question.question_type === "multiple select" ? [] : "",
    onChange,
}) => {
    const renderInput = () => {
        switch (question.question_type) {
            case "open":
                return (
                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        placeholder="Type your answer here..."
                        value={answer}
                        onChange={(e) => onChange(question.id, e.target.value)}
                        sx={{ mt: 2 }}
                    />
                );
            case "single select":
                return (
                    <Box sx={{ mt: 2 }}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                value={answer}
                                onChange={(e) =>
                                    onChange(question.id, e.target.value)
                                }
                            >
                                {question.options.map((opt, idx) => (
                                    <FormControlLabel
                                        key={idx}
                                        value={opt}
                                        control={<Radio />}
                                        label={opt}
                                        sx={{ mb: 1 }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                );
            case "multiple select":
                return (
                    <Box sx={{ mt: 2 }}>
                        <FormGroup>
                            {question.options.map((opt, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    control={
                                        <Checkbox
                                            checked={answer.includes(opt)}
                                            onChange={(e) => {
                                                const newVals = e.target.checked
                                                    ? [...answer, opt]
                                                    : answer.filter(
                                                          (v) => v !== opt
                                                      );
                                                onChange(question.id, newVals);
                                            }}
                                        />
                                    }
                                    label={opt}
                                    sx={{ mb: 1 }}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Question {question.id}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    Points: {question.score}
                </Typography>
            </Box>
            <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
                {question.question}
            </Typography>

            {renderInput()}

            {question.question_type === "single select" && (
                <Box sx={{ mt: 1 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onChange(question.id, "")}
                    >
                        Clear Selection
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default QuestionContent;
