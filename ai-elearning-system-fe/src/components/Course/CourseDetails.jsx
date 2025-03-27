"use client"

import { useEffect, useState } from "react"
import { fetchTopicsByCourseID } from "../../api/auth/topicAPI"

const CourseDetails = ({ course }) => {
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(null)

  useEffect(() => {
    retrieveTopicsByCourseID()
    // Reset selected topic when course changes
    setSelectedTopic(null)
  }, [course])

  const retrieveTopicsByCourseID = async () => {
    setTopics(await fetchTopicsByCourseID(course._id))
  }

  // Format the date
  const formattedDate = new Date(course.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Format topic date
  const formatTopicDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

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
    // Topic list styles
    topicsList: {
      listStyleType: "none",
      padding: 0,
      margin: 0,
    },
    topicItem: {
      padding: "10px 15px",
      marginBottom: "8px",
      backgroundColor: "#f5f5f5",
      borderRadius: "4px",
      borderLeft: "4px solid #2196f3",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    topicItemHover: {
      backgroundColor: "#e3f2fd",
      transform: "translateX(5px)",
    },
    topicTitle: {
      fontWeight: "500",
      margin: 0,
    },
    topicNumber: {
      backgroundColor: "#e0e0e0",
      color: "#666",
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "bold",
    },
    noTopics: {
      padding: "15px",
      backgroundColor: "#f9f9f9",
      borderRadius: "4px",
      textAlign: "center",
      color: "#666",
    },
    // Topic details styles
    topicDetailsContainer: {
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px",
    },
    topicDetailsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
    },
    topicDetailsTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      margin: 0,
    },
    backButton: {
      backgroundColor: "transparent",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "5px 10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "14px",
    },
    topicProperty: {
      marginBottom: "15px",
    },
    topicPropertyLabel: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "5px",
      fontWeight: "500",
    },
    topicPropertyValue: {
      margin: 0,
    },
    tagsList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
    tag: {
      backgroundColor: "#e0e0e0",
      color: "#333",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
    },
    topicId: {
      fontFamily: "monospace",
      backgroundColor: "#f0f0f0",
      padding: "8px",
      borderRadius: "4px",
      fontSize: "12px",
      overflowX: "auto",
    },
    topicDates: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
    },
    topicDate: {
      fontSize: "14px",
    },
  }

  return (
    <div style={styles.detailsCard}>
      <div style={styles.detailsSection}>
        <h3 style={styles.detailsTitle}>{course.title}</h3>
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

      <div style={styles.detailsSection}>
        <h4 style={styles.detailsLabel}>Description</h4>
        <p>{course.description}</p>
      </div>

      {/* Topics Section */}
      <div style={styles.detailsSection}>
        <h4 style={styles.detailsLabel}>Course Topics</h4>

        {selectedTopic ? (
          // Topic Details View
          <div style={styles.topicDetailsContainer}>
            <div style={styles.topicDetailsHeader}>
              <h5 style={styles.topicDetailsTitle}>{selectedTopic.topic}</h5>
              <button style={styles.backButton} onClick={() => setSelectedTopic(null)}>
                ← Back to topics
              </button>
            </div>

            <div style={styles.topicProperty}>
              <div style={styles.topicPropertyLabel}>Description</div>
              <p style={styles.topicPropertyValue}>{selectedTopic.description}</p>
            </div>

            <div style={styles.topicProperty}>
              <div style={styles.topicPropertyLabel}>Language</div>
              <p style={styles.topicPropertyValue}>{selectedTopic.language}</p>
            </div>

            {selectedTopic.tags && selectedTopic.tags.length > 0 && (
              <div style={styles.topicProperty}>
                <div style={styles.topicPropertyLabel}>Tags</div>
                <ul style={styles.tagsList}>
                  {selectedTopic.tags.map((tag, index) => (
                    <li key={index} style={styles.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={styles.topicProperty}>
              <div style={styles.topicPropertyLabel}>Topic ID</div>
              <div style={styles.topicId}>{selectedTopic._id}</div>
            </div>

            <div style={styles.topicProperty}>
              <div style={styles.topicPropertyLabel}>Dates</div>
              <div style={styles.topicDates}>
                <div>
                  <strong>Created:</strong>
                  <div style={styles.topicDate}>{formatTopicDate(selectedTopic.createdAt)}</div>
                </div>
                <div>
                  <strong>Updated:</strong>
                  <div style={styles.topicDate}>{formatTopicDate(selectedTopic.updatedAt)}</div>
                </div>
              </div>
            </div>
          </div>
        ) : // Topics List View
        topics && topics.length > 0 ? (
          <ul style={styles.topicsList}>
            {topics.map((topic, index) => (
              <li
                key={topic._id || index}
                style={styles.topicItem}
                onClick={() => setSelectedTopic(topic)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e3f2fd"
                  e.currentTarget.style.transform = "translateX(5px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f5f5"
                  e.currentTarget.style.transform = "translateX(0)"
                }}
              >
                <h5 style={styles.topicTitle}>{topic.topic || `Topic ${index + 1}`}</h5>
                <span style={styles.topicNumber}>{index + 1}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div style={styles.noTopics}>No topics available for this course yet.</div>
        )}
      </div>

      <div style={styles.twoColumnGrid}>
        <div>
          <h4 style={styles.detailsLabel}>Course ID</h4>
          <p style={styles.courseId}>{course._id}</p>
        </div>
        <div>
          <h4 style={styles.detailsLabel}>Created On</h4>
          <p>{formattedDate}</p>
        </div>
      </div>

      <div>
        <button style={styles.enrollButton}>Enroll Now</button>
      </div>
    </div>
  )
}

export default CourseDetails

