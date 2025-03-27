import { useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Button,
} from "@mui/material";
import ContentCreation from "../components/ContentCreation";

const CourseContent = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
      };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Course Content
            </Typography>
                <Grid item xl={6} md={6} sm={12} xs={12}>
                    <Button variant="contained" onClick={handleOpenDialog}>
                        Add content
                    </Button>
                </Grid>
                <ContentCreation 
                    open={openDialog} 
                    onClose={handleCloseDialog} 
                />
        </Container>
    );
}

export default CourseContent;
