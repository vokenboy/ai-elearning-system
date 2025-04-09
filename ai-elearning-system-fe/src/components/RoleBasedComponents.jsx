import React from "react";
import { Link, Outlet } from "react-router-dom";
import { getUserRole } from "../api/auth/authAPI";
import Button from "@mui/material/Button";

const HeaderButton = ({allowedRoles}) => {
    const userRole = getUserRole();
    if(allowedRoles.includes(userRole)){
        return <Button color='inherit' component={Link} to="/editor/courses">
                    Edit Courses
               </Button>
    }
    return <Outlet/>;
}
export default HeaderButton;