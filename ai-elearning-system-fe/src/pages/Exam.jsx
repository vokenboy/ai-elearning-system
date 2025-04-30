import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import QuestionSelector from "../components/QuestionSelector";

// Mock data
const exam = {
  courseId: "COURSE-123",
  questions: [
    { id: 1, text: "What is React?", score: 5 },
    { id: 2, text: "Explain the Virtual DOM.", score: 10 },
    // add more questions here
  ],
};

const drawerWidth = 240;

const Exam = () => {
  const [selectedId, setSelectedId] = useState(exam.questions[0]?.id || null);
  const selectedQuestion = exam.questions.find((q) => q.id === selectedId);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Exam Page
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <QuestionSelector
          questions={exam.questions}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography variant="subtitle1" gutterBottom>
          Course ID: {exam.courseId}
        </Typography>

        {selectedQuestion ? (
          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              Question {selectedQuestion.id}
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedQuestion.text}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Score: {selectedQuestion.score}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1">
            Select a question from the sidebar.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Exam;
