import { useState } from "react"
import CourseDetails from "./CourseDetails"


const CourseExplorer = ({courses}) => {
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [hoveredId, setHoveredId] = useState(null)
  
    const styles = {
        container: {
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        },
        header: {
          textAlign: "center",
          marginBottom: "30px",
        },
        grid: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          height: "calc(100vh - 150px)",
        },
        courseList: {
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        },
        courseListHeader: {
          padding: "15px",
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "#f9f9f9",
        },
        courseListContent: {
          height: "calc(100% - 56px)",
          overflowY: "auto",
        },
        courseItem: {
          padding: "15px",
          borderBottom: "1px solid #e0e0e0",
          cursor: "pointer",
          transition: "background-color 0.2s",
        },
        courseItemSelected: {
          backgroundColor: "#f0f0f0",
        },
        courseItemHover: {
          backgroundColor: "#f5f5f5",
        },
        difficultyBadge: {
          display: "inline-block",
          padding: "3px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "bold",
          marginTop: "5px",
        },
        beginnerBadge: {
          backgroundColor: "#4caf50",
          color: "white",
        },
        intermediateBadge: {
          backgroundColor: "#2196f3",
          color: "white",
        },
        advancedBadge: {
          backgroundColor: "#f44336",
          color: "white",
        },
        detailsContainer: {
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        },
        detailsHeader: {
          padding: "15px",
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "#f9f9f9",
        },
        detailsContent: {
          padding: "20px",
          height: "calc(100% - 56px)",
        },
        detailsCard: {
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "20px",
        },
        detailsTitle: {
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "10px",
        },
        detailsSection: {
          marginBottom: "20px",
        },
        detailsLabel: {
          fontSize: "14px",
          color: "#666",
          marginBottom: "5px",
        },
        courseId: {
          fontFamily: "monospace",
          backgroundColor: "#f5f5f5",
          padding: "8px",
          borderRadius: "4px",
          fontSize: "14px",
        },
        enrollButton: {
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "10px",
        },
        placeholder: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "#666",
        },
        twoColumnGrid: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "20px",
        },
      }

    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Course Explorer</h1>
        </header>
  
        <div style={styles.grid}>
          {/* Course List (Left Side) */}
          <div style={styles.courseList}>
            <div style={styles.courseListHeader}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Available Courses</h2>
            </div>
            <div style={styles.courseListContent}>
              {courses.map((course) => (
                <div
                  key={course._id}
                  style={{
                    ...styles.courseItem,
                    ...(selectedCourse && selectedCourse._id === course._id ? styles.courseItemSelected : {}),
                    ...(hoveredId === course._id ? styles.courseItemHover : {}),
                  }}
                  onClick={() => setSelectedCourse(course)}
                  onMouseEnter={() => setHoveredId(course._id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <h3 style={{ fontWeight: "medium" }}>{course.title}</h3>
                  <div
                    style={{
                      ...styles.difficultyBadge,
                      ...(course.difficulty === "Beginner"
                        ? styles.beginnerBadge
                        : course.difficulty === "Intermediate"
                          ? styles.intermediateBadge
                          : styles.advancedBadge),
                    }}
                  >
                    {course.difficulty}
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Course Details (Right Side) */}
          <div style={styles.detailsContainer}>
            <div style={styles.detailsHeader}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Course Details</h2>
            </div>
            <div style={styles.detailsContent}>
              {selectedCourse ? (
                <CourseDetails course={selectedCourse} />
              ) : (
                <div style={styles.placeholder}>
                  <p style={{ fontSize: "18px" }}>Select a course from the list to view details</p>
                  <div style={{ marginTop: "15px", fontSize: "24px" }}>←</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  

  export default CourseExplorer;