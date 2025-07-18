import { image, pre } from "motion/react-client";
import CPU from "./assets/port_assets/4bit_cpu/img.jpeg"
import CPU1 from "./assets/port_assets/4bit_cpu/img1.jpeg"
import CPU2 from "./assets/port_assets/4bit_cpu/img2.jpeg"


import Shaper from "./assets/port_assets/shaper/img.png"
import Shaper1 from "./assets/port_assets/shaper/img1.png"


import Digisim from "./assets/port_assets/DigiSim/img.jpeg"
import Digisim1 from "./assets/port_assets/DigiSim/img1.jpeg"

import Celes from "./assets/port_assets/Celestial-Odyssey/img.png"


import Acss from "./assets/port_assets/acss/img.jpeg"
import Acss1 from "./assets/port_assets/acss/img1.jpeg"

import Wcons from "./assets/port_assets/Custom-terminal/img.jpeg"
import Wcons1 from "./assets/port_assets/Custom-terminal/img1.jpeg"

import NyayaPrep from "./assets/port_assets/EntrancePrepWeb/img.png"
import NyayaPrep1 from "./assets/port_assets/EntrancePrepWeb/img1.png"
import NyayaPrep2 from "./assets/port_assets/EntrancePrepWeb/img2.png"
import NyayaPrep3 from "./assets/port_assets/EntrancePrepWeb/img3.png"

import Graphzier from "./assets/port_assets/Graphzier/img.jpeg"


import LicenseExam from "./assets/port_assets/license_exam/img.png"
import LicenseExam1 from "./assets/port_assets/license_exam/img1.png"

import PatternGen from "./assets/port_assets/pattern_generator/img.jpeg"
import PatternGen1 from "./assets/port_assets/pattern_generator/img1.jpeg"


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
      imageGallery: [
        CPU1.src,
        CPU2.src
      ]
    },
    {
      title: "Shaper",
      description: "Shaper is a web-based application designed for creating and manipulating geometry nodes. It provides an intuitive and interactive interface for users to design complex geometric shapes and structures directly in their web browser. Built using React and Three.js.",
      technologies: ["React", "Three.js", "Node.js", "Python"],
      category: "Web-based 3D Geometry Editor",
      status: "Completed",
      imageUrl: Shaper.src,
      githubUrl: "https://github.com/EV-OD/shaper",
      liveUrl: "https://ev-od.github.io/shaper/",
      imageGallery: [
        Shaper1.src
      ]
    },
    {
      title: "Digisim - Digital Logic Simulator",
      description: "Digisim is a digital logic simulator developed using C++ and Gtkmm 4. It is designed for educational purposes, allowing users to design, simulate, and manage digital circuits. The application supports the creation and reuse of custom chips, facilitating the construction of complex circuits.",
      technologies: ["C++", "Gtkmm 4"],
      category: "Digital Logic Simulator",
      status: "Completed",
      imageUrl: Digisim.src,
      githubUrl: "https://github.com/EV-OD/Digital-Logic",
      website: "https://ev-od.github.io/DigiSem-WebSite/",
      imageGallery: [
        Digisim1.src
      ]
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
    {
      title: "Acss",
      description: "Acss is a CSS Engine that allows you to write and compile ACSS code for styling your web projects. It supports if-else logic and browser runtime events, enabling dynamic and interactive styles.Syntax includes inline/external statehooks, CSS variables, calculations, and runtime event handling.",
      technologies: ["Node.js", "HTML", "CSS", "JavaScript"],
      category: "Engine & Library",
      status: "Completed",
      githubUrl: "https://github.com/EV-OD/acss",
      imageUrl: Acss.src,
      websiteUrl: "https://ev-od.github.io/acsspage/",
      imageGallery: [
        Acss1.src
      ]
    },
    {
      title: "Wcons - Custom Command-Line Interface",
      description: "A customizable command-line interface (CLI) with extensible commands and modules. Features include a customizable prompt, extensible command system, nested commands/arguments, module system, built-in networking/system commands, and cross-platform support.",
      technologies: ["Python"],
      category: "CLI Tool",
      status: "Completed",
      githubUrl: "https://github.com/EV-OD/wcons",
      imageUrl: Wcons.src,
      imageGallery: [
        Wcons1.src
      ]
    },
    {
      title: "NyayaPrep - BALLB MCQ Preparation",
      description: "This is a Next.js application designed for BALLB (Bachelor of Arts, Bachelor of Laws) preparation classes, providing an MCQ system with features like real-time translation, user/admin roles, and subscription management.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Firebase",
      ],
      category: "Education Platform",
      status: "Ongoing",
      githubUrl: "https://github.com/EV-OD/nyayaprep",
      imageUrl: NyayaPrep.src,
      websiteUrl: "https://nyayaprep.vercel.app/",
      imageGallery: [
        NyayaPrep1.src,
        NyayaPrep2.src,
        NyayaPrep3.src
      ]
    },
    {
      title: "Nepal Driving License Exam Practice",
      description: "A free and user-friendly web application to help users prepare for the official driving license exam in Nepal. Practice, learn, and succeed with real-style mock tests, detailed guides, and essential resources — all in one place.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      category: "Education Platform",
      status: "Ongoing",
      imageUrl: LicenseExam.src,
      githubUrl: "https://github.com/EV-OD/License-test",
      websiteUrl: "https://license-test.vercel.app/",
      imageGallery: [
        LicenseExam1.src
      ]
    },
    {
      title: "Graph Plotter in C",
      description: "This is a simple Graph Plotter implemented in C that allows you to visualize mathematical functions on a graph. The plotter uses the Cairo graphics library to render the graph on the screen.",
      technologies: ["C", "Cairo Graphics"],
      category: "Graph Plotting Tool",
      status: "Completed",
      githubUrl: "https://github.com/bct2079/graphzier",
      imageUrl: Graphzier.src,
    },
    {
      title: "Pattern Generator",
      description: "A web-based pattern generator that allows users to create and customize various patterns. It provides an intuitive interface for designing patterns using different shapes, colors, and styles.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      category: "Web-based Pattern Generator",
      status: "Completed",
      imageUrl: PatternGen.src,
      githubUrl: "https://github.com/EV-OD/react-pattern-generator",
      websiteUrl: "https://react-pattern-generator.netlify.app/",
      imageGallery: [
        PatternGen1.src
      ]
    }
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
