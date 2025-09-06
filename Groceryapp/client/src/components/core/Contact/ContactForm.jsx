/* eslint-disable no-unused-vars */
import { Headphones, MapPin, MapPinCheckIcon, MessageCircle, Send, Users } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {motion} from 'framer-motion'

 

  const features = [
    {
      icon: <Headphones className="w-6 h-6 md:w-8 md:h-8" />,
      title: "24/7 Customer Support",
      description:
        "Get help whenever you need it with our round-the-clock support team.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Quick Response",
      description:
        "We respond to all inquiries within 2-4 hours during business hours.",
    },
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Dedicated Team",
      description:
        "Our experienced team is here to assist you with any questions or concerns.",
    },
  ];

const ContactForm = () => {


 const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

   
    console.log("Form data:", data);

    setIsSubmitted(true);
    reset();
    setIsSubmitting(false);

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };


  return (
   <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-green-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full"
            >
              <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
                  Send us a Message
                </h2>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 p-3 md:p-4 rounded-lg mb-4 md:mb-6 flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
                    <span className="text-green-700 font-medium text-sm md:text-base">
                      Thank you! Your message has been sent successfully.
                    </span>
                  </motion.div>
                )}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 md:space-y-6"
                >
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-red-500 text-xs md:text-sm"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className={`w-full px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-red-500 text-xs md:text-sm"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Message *
                    </label>
                    <textarea
                      rows="4"
                      className={`w-full px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors resize-none ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Tell us how we can help you..."
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      })}
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-red-500 text-xs md:text-sm"
                      >
                        {errors.message.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-500 text-white py-3 md:py-4 px-6 rounded-lg font-semibold text-base md:text-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 md:w-5 md:h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6 md:space-y-8"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
                  Why Contact GreenCart?
                </h3>
                <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  We're committed to providing exceptional customer service and
                  support. Whether you have questions about our products, need
                  help with an order, or want to provide feedback, we're here to
                  help.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-lg md:rounded-xl shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg md:rounded-xl flex items-center justify-center text-green-500 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-gray-800 mb-1 md:mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div
                className="bg-gray-200 rounded-xl md:rounded-2xl h-48 md:h-64 flex items-center justify-center shadow-lg overflow-hidden relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop"
                  alt="Store location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                  <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg text-center">
                    <MapPin className="w-6 h-6 md:w-8 md:h-8 text-green-500 mx-auto mb-1 md:mb-2" />
                    <p className="text-gray-800 font-semibold text-sm md:text-base">
                      Visit Our Store
                    </p>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Jaipur, Rajasthan
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
  )
}

export default ContactForm
