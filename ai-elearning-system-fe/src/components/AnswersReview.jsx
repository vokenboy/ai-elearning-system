import {
    Box,
    TextField,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormGroup,
    Checkbox,
    Typography,
} from "@mui/material";

const AnswersReview = ({ question, answer, showCorrect = true }) => {
    const correctAnswers = question.answers ?? [];

    const renderInput = () => {
        switch (question.question_type) {
            case "open":
                return (
                    <Typography
                        sx={{
                            whiteSpace: 'pre-wrap', // preserves line breaks
                            bgcolor: '#f5f5f5',
                            p: 2,
                            minHeight: 100,
                            borderRadius: 1,
                            border: '1px solid #ccc',
                        }}
                    >
                        {answer}
                    </Typography>
                );
            case "single select":
                return (
                    <FormControl component="fieldset">
                        <RadioGroup value={answer}>
                            {question.options.map((opt, idx) => {
                                const isCorrect = correctAnswers.includes(opt);
                                const isSelected = opt === answer;

                                return (
                                    <FormControlLabel
                                        key={idx}
                                        value={opt}
                                        control={<Radio />}
                                        disabled
                                        label={
                                            <Typography
                                                sx={{
                                                    fontWeight: isCorrect && showCorrect ? "bold" : "normal",
                                                    color:
                                                        isSelected && isCorrect
                                                            ? "#1b5e20"
                                                            : isSelected && !isCorrect
                                                                ? "#b71c1c"
                                                                : "text.primary",
                                                }}
                                            >
                                                {opt}
                                            </Typography>
                                        }
                                    />
                                )
                            })}
                        </RadioGroup>
                    </FormControl>
                );
            case "multiple select":
                return (
                    <FormGroup>
                        {question.options.map((opt, idx) => {
                            const isSelected = Array.isArray(answer) && answer.includes(opt);
                            const isCorrect = correctAnswers.includes(opt);
                            return (
                                <FormControlLabel
                                    key={idx}
                                    control={
                                        <Checkbox
                                            checked={isSelected}
                                            disabled
                                        />
                                    }
                                    label={<Typography
                                        sx={{
                                            fontWeight: "normal",
                                            color:
                                                isSelected && isCorrect
                                                    ? "#1b5e20"
                                                    : isSelected && !isCorrect
                                                        ? "#b71c1c"
                                                        : "text.primary",
                                        }}
                                    >
                                        {opt}
                                    </Typography>}
                                />
                            )
                        })}
                    </FormGroup>
                );
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                maxWidth: "100%",
                p: 2,
                bgcolor: '#f1f0ea',
                color: 'text.primary',
                textAlign: 'left'
            }}
        >
            {renderInput()}
        </Box>
    );
};

export default AnswersReview;
