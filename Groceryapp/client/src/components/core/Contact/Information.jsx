/* eslint-disable no-unused-vars */
import {motion} from 'framer-motion'
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

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

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Visit Our Store",
      details: [
        "123 Green Street",
        "Fresh Market District",
        "Jaipur, Rajasthan 302001",
      ],
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Phone className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 87654 32109", "Mon-Sat: 8AM-8PM"],
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Email Us",
      details: [
        "hello@greencart.com",
        "support@greencart.com",
        "We reply within 24hrs",
      ],
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Working Hours",
      details: [
        "Monday - Saturday",
        "8:00 AM - 8:00 PM",
        "Sunday: 10:00 AM - 6:00 PM",
      ],
      color: "bg-purple-100 text-purple-600",
    },
  ];

const Information = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-white p-5 md:p-6 rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 ${info.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4`}
                >
                  {info.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 md:mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-xs md:text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
  )
}

export default Information
