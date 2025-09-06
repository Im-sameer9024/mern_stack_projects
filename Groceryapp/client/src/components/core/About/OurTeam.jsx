/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { assets } from "../../../assets/assets";

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image:assets.team1,
    description:
      "Passionate about bringing fresh, quality groceries to every household.",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image:assets.team2,
    description:
      "Ensures seamless operations and delivery excellence across all locations.",
  },
  {
    name: "Emily Rodriguez",
    role: "Quality Manager",
    image:assets.team3,
    description:
      "Maintains our high quality standards and manages supplier relationships.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const OurTeam = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate individuals working together to revolutionize grocery
            shopping
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={fadeInUp}
            >
              <motion.div
                className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {member.name}
              </h3>
              <p className="text-green-500 font-semibold mb-4">{member.role}</p>
              <p className="text-gray-600 leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default OurTeam;
