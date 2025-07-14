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

  summary: "I might sound a little crazy, but I’m someone who’s fallen in love with tech in all its forms. I’m proficient in web development, have built my own microprocessor designs, and even created a digital logic simulator from scratch. Whether it’s coding interactive 3D experiences or low-level hardware projects, I build whatever the f#ck I want to build.",

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
      title: "Project One",
      description: "Short description of what this project does.",
      technologies: ["React", "JavaScript", "Next.js"],
      category: "Web Development",
      status: "Completed",
      imageUrl: "https://placehold.co/600x400"
    },
    {
      title: "Project Two",
      description: "Another project description goes here.",
      technologies: ["Node.js", "Python"],
      category: "Backend Development",
      status: "In Progress",
      imageUrl: "https://placehold.co/600x400"
    },
    {
      title: "Project Three",
      description: "Yet another cool project.",
      technologies: ["3D", "Digital Logic", "Verilog"],
      category: "Hardware Design",
      status: "Completed",
      imageUrl: "https://placehold.co/600x400"
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
