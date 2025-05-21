import {
    Drawer,
    Toolbar,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Box,
    Button,
    ListItemText,
} from "@mui/material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

const drawerWidth = 240;

const ExamSidebar = ({
    questions,
    userAnswers,
    selectedId,
    onSelect,
    onSubmit,
}) => (
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
        <List>
            {questions.map((q) => {
                const answer = userAnswers[q.id];
                const isAnswered =
                    q.type === "multiSelect"
                        ? Array.isArray(answer) && answer.length > 0
                        : Boolean(answer && answer.toString().trim() !== "");

                return (
                    <ListItem key={q.id} disablePadding>
                        <ListItemButton
                            selected={q.id === selectedId}
                            onClick={() => onSelect(q.id)}
                        >
                            <ListItemText primary={`Question ${q.id}`} />
                            <ListItemIcon sx={{ minWidth: 0, ml: 1 }}>
                                {isAnswered ? (
                                    <CheckBoxOutlinedIcon
                                        fontSize="small"
                                        color="success"
                                    />
                                ) : (
                                    <IndeterminateCheckBoxOutlinedIcon
                                        fontSize="small"
                                        color="disabled"
                                    />
                                )}
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>

        <Box sx={{ p: 2 }}>
            <Button variant="contained" fullWidth onClick={onSubmit}>
                Submit
            </Button>
        </Box>
    </Drawer>
);

export default ExamSidebar;
