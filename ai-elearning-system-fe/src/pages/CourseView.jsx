import { useEffect, useState } from "react";
import { fetchCourses } from "../api/auth/courseAPI";
import CourseExplorer from "../components/Course/CourseExplorer";
import CourseDetails from "../components/Course/CourseDetails";
const CourseView = () => {

    const [courses, setCourses] = useState([]);

    useEffect( () => {
            retrieveCourses()
        },[]);


        const retrieveCourses = async () => {
            setCourses(await fetchCourses());
        }

        return (
            <CourseExplorer courses={courses}/>
          )
        }

export default CourseView;

