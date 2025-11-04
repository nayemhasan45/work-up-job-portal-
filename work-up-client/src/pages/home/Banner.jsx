import React from "react";
import bannerBg from "../../assets/bannerBg.jpg";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Banner = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const stats = [
    { label: "Projects Completed", value: 500 },
    { label: "Happy Clients", value: 120 },
    { label: "Years Experience", value: 5 },
  ];

  return (
    <div
      className="hero min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bannerBg})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="hero-content text-neutral-content text-center relative z-10">
        <div className="max-w-2xl">
          {/* Heading animation */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-5 text-5xl font-extrabold text-white drop-shadow-lg"
          >
            Hello there 
          </motion.h1>

          {/* Paragraph animation */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="mb-8 text-gray-200 leading-relaxed"
          >
            I’m a passionate developer focused on creating engaging, modern, and
            high-performance web experiences. Let’s build something amazing
            together.
          </motion.p>

          {/* Stats Section (no motion here) */}
          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
            {stats.map((stat, index) => (
              <div key={index}>
                <h2 className="text-4xl font-bold text-white">
                  {inView && <CountUp start={0} end={stat.value} duration={5} />}+
                </h2>
                <p className="text-gray-300 mt-2 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Button animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <button className="btn btn-primary px-8 text-lg font-semibold shadow-md hover:shadow-lg transition-transform hover:scale-105">
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
