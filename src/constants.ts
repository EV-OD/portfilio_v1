export const PERSONAL_INFO = {
  name: "Rabin Lamichhane",
  title: "Computer Engineer & Full-Stack Developer",
  shortBio: "I might sound a little crazy but I'm someone who has fallen in love with tech. I don't tie myself to a single tech stack — I build whatever the f#ck I want to build.",
  location: "Bharatpur, Nepal",
  
  contact: {
    email: "evod599@gmail.com",
    linkedin: "https://www.linkedin.com/in/rabinlc01",
    phone: "+977-9800000000", // You can update with real number
    website: "https://rabinlc.dev",
    github: "https://github.com/rabinlc",
  },
  
  summary: "As a full-stack web developer with proficiency in Python, JavaScript, Node.js, TypeScript, and frameworks like Next.js and React.js, I have extensive experience building responsive websites that meet client needs. Currently pursuing my Bachelor's in Computer Engineering at Pulchowk Campus, I am driven by a passion to leverage my skills for innovation and quality solutions.",
  
  experience: [
    {
      title: "Developer",
      company: "Sevenx Innovations",
      duration: "July 2024 – Present (1 year 1 month)"
    },
    {
      title: "Chief Executive Officer",
      company: "Sevenx Innovations", 
      duration: "November 2024 – Present (9 months)"
    },
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
      title: "Developer",
      company: "seven x innovation",
      duration: "March 2024 – Present (1 year 5 months)"
    },
    {
      title: "President",
      company: "Developers",
      duration: "September 2023 – Present (1 year 11 months)"
    }
  ],
  
  skills: {
    frontend: ["React.js", "Next.js", "JavaScript", "TypeScript"],
    backend: ["Node.js", "Python"],
    other: ["Website Administration", "CRM systems"]
  },
  
  education: {
    degree: "Bachelor of Computer Engineering",
    institution: "Tribhuvan University, IOE, Pulchowk Campus"
  },
  
  certifications: ["NASA International Space Apps Challenge"],
  
  funFacts: [
    "Big fan of sci-fi and cyberpunk themes",
    "Love tinkering with hardware, low-level systems, and trying wild tech ideas"
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
