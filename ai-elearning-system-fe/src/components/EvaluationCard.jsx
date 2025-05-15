import { useEffect } from "react";
import {
    Box,
    Card,
    Typography,
    Stack,
    Divider,
} from "@mui/material";
import AnswersReview from "../components/AnswersReview";

const EvaluationCard = ({ index, evaluation, question, userAnswer }) => {

    return (
        <Card
            key={index}
            variant="outlined"
            sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                flex: 1,
                bgcolor:
                    evaluation?.score === question?.score
                        ? '#d0f0c0'
                        : evaluation?.score === 0
                            ? '#f8d7da'
                            : '#fff9c4',
            }}
        >
            <Box sx={{ p: 2 }}>
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignevaluations: 'left'
                    }}
                >
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Question {index + 1}:
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {question?.question}
                        </Typography>
                    </Typography>
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                            backgroundColor: "#f5f5f5",
                            px: 2,
                            py: 1,
                            whiteSpace: "nowrap", 
                            borderRadius: 2,
                            maxHeight:30,
                        }}
                    >
                        <Typography variant="subtitle2" color="text.secondary" sx={{ flexShrink: 0 }}>
                            Score:
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {evaluation?.score} / {question?.score}
                        </Typography>
                    </Box>

                </Stack>
                <Divider />

                <Typography variant="body1" component="div">
                    Your answer:
                    <AnswersReview
                        question={question}
                        answer={userAnswer}
                        showCorrect={false}
                    />
                </Typography>

                <Divider />
                <Typography variant="body1" component="div">
                    Correct answer:
                    <AnswersReview
                        question={question}
                        answer={question?.answers}
                    />
                </Typography>

                <Divider />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Feedback: {evaluation?.feedback}
                </Typography>

            </Box>
        </Card >
    );

}


export default EvaluationCard;