import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";

const TruncatedText = styled(ListItemText)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const QuestionSelector = ({ questions, selectedId, onSelect }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <List>
      {questions.map((q) => (
        <ListItem key={q.id} disablePadding>
          <ListItemButton
            selected={q.id === selectedId}
            onClick={() => onSelect(q.id)}
          >
            <TruncatedText
              primary={`${q.id}. ${q.text}`}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default QuestionSelector;
