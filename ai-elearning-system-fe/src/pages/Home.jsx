import Hero from "../components/Home/Hero";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Import images
import elearningImage from "../pages/elearning.jpg";
import elearningImage2 from "../pages/elearning2.jpg";
import elearningImage3 from "../pages/elearning3.jpg";
import elearningImage4 from "../pages/elearning4.jpg";

export default function HomePage() {
  // Create an array of images
  const images = [
    elearningImage,
    elearningImage2,
    elearningImage3,
    elearningImage4,
  ];

  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State to track scroll position and opacity
  const [scrollY, setScrollY] = useState(0);

  // Change the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // Track the scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate opacity based on scroll position (fading out)
  const opacity = Math.max(1 - scrollY / 500, 0); // Fade out as you scroll

  return (
    <div>
      {/* Hero Section with Scroll-based Fade-out */}
      <motion.div
        style={{
          opacity: opacity, // Adjust opacity based on scroll
          transition: "opacity 0.1s ease-out", // Smooth transition for opacity
        }}
      >
        <Hero />
      </motion.div>

      {/* Flexbox container for text on the left and image on the right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 20px",
          position: "relative",
          height: "100vh",
        }}
      >
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0 }} // Start as invisible
          whileInView={{ opacity: 1 }} // Fade in when scrolled into view
          transition={{ duration: 2 }} // Fade-in transition duration
          viewport={{ once: false }} // Trigger only once when in view
          style={{
            flex: 1, // Takes up remaining space
            padding: "10px", // Padding for the text content
            color: "white", // Set text color for contrast
            position: "relative", // Allow layering of text over image
            zIndex: 1, // Make sure the text is above the background image
          }}
        >
          <Typography variant="h5" color="textPrimary">
            The AI-based e-learning system is designed to offer personalized,
            interactive learning experiences for individuals seeking to improve
            their programming skills. <br />
            The platform uses advanced AI algorithms to adapt the learning content
            to each student's unique progress, learning pace, and skill level.{" "}
            <br />
            Through a series of engaging modules and exercises, the system covers
            various programming languages such as Python, Java, C++, JavaScript,
            and others. <br />
            The system assesses learners' knowledge through a dynamic set of
            questions, which include coding challenges, multiple-choice queries,
            and real-time problem-solving tasks. <br />
            The AI engine intelligently analyzes the learners' responses, identifies
            areas where they may need improvement, and recommends targeted lessons
            or additional practice to help them progress effectively. <br />
            It also provides instant feedback, explanations, and hints to guide
            users as they navigate through different topics, ensuring an effective
            learning experience. <br />
            Additionally, the system offers performance analytics, tracking learners’
            strengths and weaknesses, and enabling instructors or self-learners to
            tailor their study plans accordingly. <br />
            With real-time adaptive learning, this AI-driven platform is an
            invaluable resource for individuals looking to gain proficiency in
            programming languages at any level.
          </Typography>
        </motion.div>

        {/* Background Image Section with Image Cycling */}
        <motion.div
          initial={{ opacity: 0 }} // Start as invisible
          animate={{ opacity: 1 }} // Fade in when scrolled into view
          key={currentImageIndex} // Change the key every time the image changes
          transition={{
            opacity: { duration: 3 }, // Fade duration for smooth transitions
            ease: "easeInOut", // Use smooth easing for the opacity transition
          }} // Ensure the transition is smooth
          style={{
            flex: 1, // Takes up remaining space
            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%), url(${images[currentImageIndex]})`,
            backgroundSize: "70%",
            backgroundPosition: "center",
            height: "30vh",
            zIndex: 0,
          }}
        />
      </div>
      <div style={{ height: "0px" }}></div>
    </div>
  );
}
