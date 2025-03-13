import Hero from "../components/Home/Hero";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import elearningImage from "../pages/elearning.jpg";
import elearningImage2 from "../pages/elearning2.jpg";
import elearningImage3 from "../pages/elearning3.jpg";
import elearningImage4 from "../pages/elearning4.jpg";

export default function HomePage() {
  const images = [
    elearningImage,
    elearningImage2,
    elearningImage3,
    elearningImage4,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const opacity = Math.max(1 - scrollY / 500, 0);

  return (
    <div>
      <motion.div
        style={{
          opacity: opacity,
          transition: "opacity 0.1s ease-out",
        }}
      >
        <Hero />
      </motion.div>

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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: false }}
          style={{
            flex: 1,
            padding: "40px",
            color: "white",
            position: "relative",
            zIndex: 1,
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={currentImageIndex}
          transition={{
            opacity: { duration: 3 },
            ease: "easeInOut",
          }}
          style={{
            flex: 1,
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
