"use client";
import React, { useState } from "react";
import FSCard from "@/components/services/FSCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";

// Explicitly type Link as a React functional component
const TypedLink = Link as React.FC<
  React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>
>;

const supportCards = [
  {
    title: "Tax Planning",
    description: "Access our comprehensive tax planning resources and strategies to optimize your tax position.",
    icon: "📊",
    features: [
      "Strategic tax planning",
      "Tax optimization strategies",
      "Compliance management",
      "Year-round tax support"
    ]
  },
  {
    title: "Case Studies",
    description: "Explore real-world examples of how we've helped businesses achieve their financial goals.",
    icon: "📈",
    features: [
      "Success stories",
      "Industry-specific solutions",
      "Problem-solving approaches",
      "Results and outcomes"
    ]
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Support() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <main>
      <article className="overflow-hidden my-[80px] md:my-[120px] lg:mb-[160px] xl:mb-[210px] mx-8 sm:mx-20 lg:mx-auto p-[40px_0_60px] md:p-[60px_0_80px] lg:p-[100px_0_120px] xl:p-[150px_0_200px]">
        <motion.header 
          className="container mx-auto w-[90%] lg:w-[65%] my-[60px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h1 className="text-3xl font-bold sm:text-5xl xl:text-6xl">
              Support
            </h1>
            <motion.p 
              className="mt-4 text-lg text-gray-600 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              We're here to help you with all your accounting and tax needs. Choose the best way to reach us below.
            </motion.p>
          </div>
        </motion.header>

        <div className="flex flex-col mt-7 sm:mt-[150px] mx-auto overflow-hidden lg:flex-row lg:justify-between">
          <section className="w-full">
            <div className="lg:max-w-[1100px] mx-auto container">
              <div className="flex flex-col lg:flex-row">
                <div className="w-full order-1 mx-auto lg:order-none">
                  <motion.div 
                    className="text-sm text-gray-500 lg:text-base"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                  >
                    <h3 className="text-2xl font-bold text-black">
                      How Can We Help?
                    </h3>

                    <div className="lg:pt-8 lg:pb-16 lg:min-h-[400px] md:ml-56">
                      <div className="max-w-[520px] lg:p-20">
                        <motion.div 
                          className="mb-4 xl:mb-12"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <TypedLink
                            href="tel:17606860609"
                            className="text-3xl font-bold text-black hover:outline-none focus:outline-none transition-colors hover:text-[#fbc710] focus:text-[#fbc710]"
                          >
                            +1 (760) 686 06 09
                          </TypedLink>
                          <p className="text-sm text-gray-600 mt-2">Call us for immediate assistance</p>
                        </motion.div>
                        <motion.div 
                          className="text-[#787878] sm:flex mt-[30px]"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="mb-1.5 text-black font-bold flex-shrink-0 sm:mb-0 sm:mr-2">
                            Email:
                          </div>
                          <div>
                            <TypedLink
                              href="mailto:info@accountingszone.com"
                              className="text-[#787878] focus:text-[#fbc710] focus:outline-none lg:focus:text-[#fbc710] lg:hover:text-[#fbc710]"
                            >
                              info@accountingszone.com
                            </TypedLink>
                            <p className="text-sm text-gray-600 mt-1">We'll respond within 24 hours</p>
                          </div>
                        </motion.div>
                        <motion.div 
                          className="text-[#787878] sm:flex sm:items-center mt-[30px]"
                          variants={fadeInUp}
                        >
                          <div className="mb-1.5 text-black font-bold flex-shrink-0 sm:mb-0 sm:mr-2">
                            Follow us:
                          </div>
                          <div>
                            <ul className="fill-[#929292] flex flex-wrap items-end">
                              {[
                                { icon: <FaFacebookF />, href: "https://www.facebook.com/people/Accountings-Zone/100093148360065/", label: "Facebook" },
                                { icon: <FaXTwitter />, href: "https://x.com/accountingszone", label: "Twitter" },
                                { icon: <FaInstagram />, href: "https://www.instagram.com/accountingszone/", label: "Instagram" },
                                { icon: <FaLinkedin />, href: "https://www.linkedin.com/company/accountingszone/?viewAsMember=true", label: "LinkedIn" }
                              ].map((social, index) => (
                                <motion.li 
                                  key={index}
                                  className="ml-0 sm:ml-7"
                                  whileHover={{ scale: 1.2, rotate: 5 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <TypedLink
                                    className="text-[#787878] focus:text-[#fbc710] focus:outline-none lg:focus:text-[#fbc710] lg:hover:text-[#fbc710] flex size-[17px] justify-center lg:focus:outline-none lg:hover:outline-none active:opacity-70"
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                  >
                                    {social.icon}
                                  </TypedLink>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                        <motion.div 
                          className="text-[#787878] sm:flex mt-[30px] sm:items-end"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="mt-1.5 text-black font-bold flex-shrink-0 sm:mb-0 mr-2">
                            Work Hours:
                          </div>
                          <div>
                            <p>Monday - Friday : 08h00 - 17h30</p>
                            <p className="text-sm text-gray-600 mt-1">Closed on weekends and public holidays</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                  >
                    <h3 className="text-2xl font-bold text-black pt-20 sm:pt-32 lg:pt-12 mb-[18px] lg:mb-[43px]">
                      Frequently Asked Questions (FAQs)
                    </h3>
                    <div className="space-y-4 lg:space-y-8">
                      <p className="text-lg font-semibold text-gray-500">
                        From how to sign up for Accountings Zone to learning about
                        our security process, these FAQs will help you better
                        understand Accountings Zone.
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={() => router.push("/resources/support-and-community/faqs")}
                          data-aos="fade"
                          size="lg"
                          className="text-lg rounded-none bg-[#fbc710] hover:bg-[#e2b512] duration-300 text-black font-normal uppercase"
                        >
                          GO TO FAQS
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    className="mt-20"
                  >
                    <h3 className="text-2xl font-bold text-black mb-[18px] lg:mb-[43px]">
                      Tools & Resources
                    </h3>
                    <div className="space-y-4 lg:space-y-8">
                      <p className="text-lg font-semibold text-gray-500">
                        Detailed information on tax planning strategies,
                        first-hand case studies, and more.
                        We&apos;ve got extensive resources to help you understand
                        how to legally save your clients money in taxes.
                      </p>
                    </div>

                    <div className="pt-6 lg:pt-12">
                      <motion.ul 
                        className="grid grid-cols-1 sm:grid-cols-2 gap-10"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                      >
                        {supportCards.map((item, index) => (
                          <motion.li 
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ 
                              scale: 1.03,
                              transition: { duration: 0.2 }
                            }}
                            onHoverStart={() => setHoveredCard(index)}
                            onHoverEnd={() => setHoveredCard(null)}
                          >
                            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                              <div className="flex items-center mb-4">
                                <span className="text-4xl mr-4">{item.icon}</span>
                                <h4 className="text-xl font-bold">{item.title}</h4>
                              </div>
                              <p className="text-gray-600 mb-4">{item.description}</p>
                              <motion.ul 
                                className="space-y-2"
                                initial={{ opacity: 0 }}
                                animate={{ 
                                  opacity: hoveredCard === index ? 1 : 0,
                                  height: hoveredCard === index ? "auto" : 0
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                {item.features.map((feature, featureIndex) => (
                                  <motion.li 
                                    key={featureIndex}
                                    className="flex items-center text-sm text-gray-500"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ 
                                      x: hoveredCard === index ? 0 : -20,
                                      opacity: hoveredCard === index ? 1 : 0
                                    }}
                                    transition={{ delay: featureIndex * 0.1 }}
                                  >
                                    <span className="mr-2">•</span>
                                    {feature}
                                  </motion.li>
                                ))}
                              </motion.ul>
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
