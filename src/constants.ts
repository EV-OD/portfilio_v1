import { pre } from "motion/react-client";
import CPU from "./assets/port_assets/4bit_cpu/img.jpeg"
import Shaper from "./assets/port_assets/shaper/img.png"
import Digisim from "./assets/port_assets/DigiSim/img.jpeg"
import Celes from "./assets/port_assets/Celestial-Odyssey/img.png"


export const PERSONAL_INFO = {
  name: "Rabin Lamichhane",
  title: "Programmer, Developer & Web Enthusiast",
  shortBio: "I might sound a little crazy but I am someone who has fallen in love with tech. I build whatever the f#ck I want to build.",
  location: "Lalitpur, Nepal",

  contact: {
    email: "evod599@gmail.com",
    alternateEmail: "rabin@ieee.org",
    linkedin: "https://www.linkedin.com/in/rabinlc01/",
    phone: "", // you can fill this later if you want
    website: "https://lamichhanerabin.com.np",
    github: "https://github.com/EV-OD",
  },

  summary: "I might sound a little crazy, but I’m someone who’s fallen in love with tech in all its forms. I’m proficient in web development, have built my own microprocessor designs (done using logisim-evolution), and even created a digital logic simulator from scratch. Whether it’s coding interactive 3D experiences or low-level hardware projects, I build whatever the f#ck I want to build.",

  experience: [
    {
      title: "Web Developer",
      company: "Self-employed",
      duration: ""
    },
    {
      title: "Webmaster",
      company: "IEEE Pulchowk Student Branch",
      duration: "January 2025 – Present (7 months)"
    },
    {
      title: "Member",
      company: "IEEE",
      duration: "January 2025 – Present (7 months)"
    },
    {
      title: "President",
      company: "Developers",
      duration: "September 2023 – Present (1 year 11 months)"
    }
  ],

  skills: {
    frontend: ["React", "JavaScript", "Next.js", "Svelte", "Three.js", "HTML", "CSS"],
    backend: ["Node.js", "Python"],
    other: ["3D", "Digital Logic", "Verilog", "Chip Design", "C++/C", "Qt", "QML"]
  },

  projects: [
    {
      title: "4Bit Microprocessor",
      description: "This system is designed with minimalism and clarity in mind, ideal for education, simulations, or hobbyist CPU development. (Done using logisim-evolution)",
      technologies: ["Logisim", "Logisim-Evolution", "Digital Logic"],
      category: "Hardware Design & Simulation",
      status: "Completed",
      imageUrl: CPU.src,
      githubUrl: "https://github.com/EV-OD/4bit_computer",
    },
    {
      title: "Shaper",
      description: "Shaper is a web-based application designed for creating and manipulating geometry nodes. It provides an intuitive and interactive interface for users to design complex geometric shapes and structures directly in their web browser. Built using React and Three.js.",
      technologies: ["React", "Three.js", "Node.js", "Python"],
      category: "Web-based 3D Geometry Editor",
      status: "Completed",
      imageUrl: Shaper.src,
      githubUrl: "https://github.com/EV-OD/shaper",
      previewLink: "https://ev-od.github.io/shaper/"
    },
    {
      title: "Digisim - Digital Logic Simulator",
      description: "Digisim is a digital logic simulator developed using C++ and Gtkmm 4. It is designed for educational purposes, allowing users to design, simulate, and manage digital circuits. The application supports the creation and reuse of custom chips, facilitating the construction of complex circuits.",
      technologies: ["C++", "Gtkmm 4"],
      category: "Digital Logic Simulator",
      status: "Completed",
      imageUrl: Digisim.src,
      githubUrl: "https://github.com/EV-OD/Digital-Logic",
      liveUrl: "https://ev-od.github.io/DigiSem-WebSite/"
    },
    {
      title: "Celestial Odyssey",
      description: "Celestial Odyssey is an interactive application designed to provide a thrilling and educational 3D exploration of the planets in our solar system. It blends education and entertainment, making it ideal for schools, science centers, and space enthusiasts. Key features include 3D planet tours, detailed planetary data, immersive sound effects, an interactive AI guide, and location-based exploration.",
      technologies: ["React", "Three.js", "Node.js", "Python"],
      category: "Educational 3D Space Exploration",
      status: "Completed",
      imageUrl: Celes.src,
      githubUrl: "https://github.com/clerisy47/Celestial-Odyssey"
    },

  ],

  education: {
    degree: "Bachelor of Engineering (Computer)",
    institution: "Tribhuvan University, IOE, Pulchowk Campus",
    status: "Ongoing"
  },

  certifications: ["NASA International Space Apps Challenge"],

  funFacts: [
    "I love reading manhwa",
    "Making 3D designs",
    "Love tinkering with hardware",
    "Cycling"
  ]
} as const;

export const NAVIGATION_LINKS = {
  primary: [
    { href: "#", label: "Book a call" },
    { href: "/projects", label: "View recent work", variant: "secondary" as const }
  ],
  secondary: [
    { href: "/blog", label: "Blog", variant: "secondary" as const },
    { href: "/about", label: "About", variant: "secondary" as const },
    { href: "/contact", label: "Contact", variant: "secondary" as const }
  ]
} as const;
