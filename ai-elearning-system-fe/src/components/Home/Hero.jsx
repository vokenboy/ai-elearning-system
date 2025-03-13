import React from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      className="hero"
      style={{
        height: "200vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 200px",
        marginTop: "1000px",
        position: "relative",
        backgroundImage: `url("/background.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          filter: "blur(10px)",
          zIndex: 0,
        }}
      ></div>

      <div className="hero-content" style={{ zIndex: 1 }}>
        <Typography variant="h2" color="black">
          Welcome to Our E-Learning Platform
        </Typography>

        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          whileOutOfView={{ opacity: 0 }}
          transition={{ duration: 2 }}
          style={{
            marginTop: "400px",
            fontSize: "1.5rem",
            color: "black",
            fontWeight: 500,
          }}
        >
          <br />
          <br />
          <br />
          Scroll for more information
        </motion.div>
      </div>
    </motion.div>
  );
}
