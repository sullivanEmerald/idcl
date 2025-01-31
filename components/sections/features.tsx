"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Easy Ad Creation",
    description:
      "Create your Ads in seconds with our user-friendly platform. Whether you're an experienced marketer or a novice, our platform simplifies the ad creation process. No more complex procedures, just vibes and good energy. No Caps!",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="48"
          height="48"
          rx="24"
          fill="url(#paint0_linear)"
          fillOpacity="0.1"
        />
        <path
          d="M24 12C17.373 12 12 17.373 12 24C12 30.627 17.373 36 24 36C30.627 36 36 30.627 36 24C36 17.373 30.627 12 24 12ZM28.707 23.293L22.707 17.293C22.512 17.098 22.256 17 22 17C21.744 17 21.488 17.098 21.293 17.293L15.293 23.293C14.902 23.684 14.902 24.316 15.293 24.707C15.684 25.098 16.316 25.098 16.707 24.707L22 19.414L27.293 24.707C27.488 24.902 27.744 25 28 25C28.256 25 28.512 24.902 28.707 24.707C29.098 24.316 29.098 23.684 28.707 23.293Z"
          fill="url(#paint1_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="0"
            y1="0"
            x2="48"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#4D9AFF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="12"
            y1="12"
            x2="36"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#4D9AFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Access to Our Network of Online Digital Community Promoters",
    description:
      "Harness the power of our vibrant community of niche digital promoters. Connect with nano, micro and macro influencers who genuinely understand the assignment. Expand your reach and amplify your message through trusted voices that have a genuine connection.",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="48"
          height="48"
          rx="24"
          fill="url(#paint0_linear)"
          fillOpacity="0.1"
        />
        <path
          d="M32 20C32 17.794 30.206 16 28 16C25.794 16 24 17.794 24 20C24 22.206 25.794 24 28 24C30.206 24 32 22.206 32 20ZM36 32V31C36 28.243 33.757 26 31 26H25C22.243 26 20 28.243 20 31V32H36ZM20 20C20 17.794 18.206 16 16 16C13.794 16 12 17.794 12 20C12 22.206 13.794 24 16 24C18.206 24 20 22.206 20 20ZM28 26H22C19.243 26 17 28.243 17 31V32H33V31C33 28.243 30.757 26 28 26Z"
          fill="url(#paint1_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="0"
            y1="0"
            x2="48"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#4D9AFF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="12"
            y1="12"
            x2="36"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#4D9AFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Transparent Tracking",
    description:
      "Maintain control with our transparent tracking solution. Keep a real-time watch over your campaigns, access detailed analytics. You only pay for goals achieved.",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="48"
          height="48"
          rx="24"
          fill="url(#paint0_linear)"
          fillOpacity="0.1"
        />
        <path
          d="M36 16H12C10.897 16 10 16.897 10 18V30C10 31.103 10.897 32 12 32H36C37.103 32 38 31.103 38 30V18C38 16.897 37.103 16 36 16ZM35 30H13C12.448 30 12 29.552 12 29V19C12 18.448 12.448 18 13 18H35C35.552 18 36 18.448 36 19V29C36 29.552 35.552 30 35 30ZM32 22H28V26H32V22ZM26 22H22V26H26V22ZM20 22H16V26H20V22Z"
          fill="url(#paint1_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="0"
            y1="0"
            x2="48"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#4D9AFF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="10"
            y1="16"
            x2="38"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#4D9AFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Precise Targeted Advertising",
    description:
      "Reach your ideal audience with precision. Create custom campaigns that hit the mark every time.",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="48"
          height="48"
          rx="24"
          fill="url(#paint0_linear)"
          fillOpacity="0.1"
        />
        <path
          d="M24 12C17.373 12 12 17.373 12 24C12 30.627 17.373 36 24 36C30.627 36 36 30.627 36 24C36 17.373 30.627 12 24 12ZM24 32C19.589 32 16 28.411 16 24C16 19.589 19.589 16 24 16C28.411 16 32 19.589 32 24C32 28.411 28.411 32 24 32ZM24 20C21.794 20 20 21.794 20 24C20 26.206 21.794 28 24 28C26.206 28 28 26.206 28 24C28 21.794 26.206 20 24 20Z"
          fill="url(#paint1_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="0"
            y1="0"
            x2="48"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#4D9AFF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="12"
            y1="12"
            x2="36"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#4D9AFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Powerful Insights",
    description:
      "Our platform provides in-depth reports and analytics to help you understand what works and what doesn't. Make data-driven decisions to continuously improve your campaigns and drive better results.",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="48"
          height="48"
          rx="24"
          fill="url(#paint0_linear)"
          fillOpacity="0.1"
        />
        <path
          d="M36 32H12V16C12 15.448 11.552 15 11 15C10.448 15 10 15.448 10 16V33C10 33.552 10.448 34 11 34H36C36.552 34 37 33.552 37 33C37 32.448 36.552 32 36 32ZM17 26C17.552 26 18 25.552 18 25V22C18 21.448 17.552 21 17 21C16.448 21 16 21.448 16 22V25C16 25.552 16.448 26 17 26ZM23 26C23.552 26 24 25.552 24 25V19C24 18.448 23.552 18 23 18C22.448 18 22 18.448 22 19V25C22 25.552 22.448 26 23 26ZM29 26C29.552 26 30 25.552 30 25V16C30 15.448 29.552 15 29 15C28.448 15 28 15.448 28 16V25C28 25.552 28.448 26 29 26Z"
          fill="url(#paint1_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="0"
            y1="0"
            x2="48"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#4D9AFF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="10"
            y1="15"
            x2="37"
            y2="34"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#4D9AFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Multi-Platform Reach",
    description:
      "Expand your reach across multiple platforms including social media, search engines, and More.",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="48"
          height="48"
          rx="24"
          fill="url(#paint0_linear)"
          fillOpacity="0.1"
        />
        <path
          d="M36 18H12C10.897 18 10 18.897 10 20V34C10 35.103 10.897 36 12 36H36C37.103 36 38 35.103 38 34V20C38 18.897 37.103 18 36 18ZM36 34H12V20H36V34ZM33 15H15C14.448 15 14 14.552 14 14C14 13.448 14.448 13 15 13H33C33.552 13 34 13.448 34 14C34 14.552 33.552 15 33 15ZM30 12H18C17.448 12 17 11.552 17 11C17 10.448 17.448 10 18 10H30C30.552 10 31 10.448 31 11C31 11.552 30.552 12 30 12Z"
          fill="url(#paint1_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="0"
            y1="0"
            x2="48"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#4D9AFF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="10"
            y1="10"
            x2="38"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#4D9AFF" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Our Features
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Adminting seamlessly connects advertisers with niche digital
            promoters, empowering businesses to achieve their advertising goals
            with ease.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-card hover:bg-muted/50 border rounded-2xl p-6 space-y-4 transition-colors">
                <div className="p-3 w-fit rounded-2xl bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
