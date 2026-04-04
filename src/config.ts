// Site configuration
// Norfolk Development - Premium Construction Company Website

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface HeroConfig {
  brandLeft: string;
  brandRight: string;
  tagline: string;
  badge: string;
  since: string;
  email: string;
  heroImage: string;
  heroImageAlt: string;
  scrollText: string;
  copyrightText: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutConfig {
  label: string;
  headline: string;
  description: string;
  bottomText: string;
  galleryImages: GalleryImage[];
  stats: StatItem[];
}

export interface Exhibition {
  id: number;
  title: string;
  image?: string;
  video?: string;
  date: string;
}

export interface ExhibitionsConfig {
  label: string;
  headline: string;
  ctaText: string;
  exhibitions: Exhibition[];
}

export interface Collection {
  id: number;
  title: string;
  year: string;
  description: string;
  image: string;
}

export interface CollectionsConfig {
  label: string;
  headline: string;
  ctaText: string;
  collections: Collection[];
}

export interface TestimonialsConfig {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
}

export interface InfoCard {
  icon: string;
  title: string;
  content: string;
}

export interface VisitConfig {
  label: string;
  headline: string;
  description: string;
  ctaText: string;
  infoCards: InfoCard[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  marqueeText: string;
  brandName: string;
  brandDescription: string;
  socialLinks: SocialLink[];
  quickLinks: FooterLink[];
  quickLinksTitle: string;
  contactTitle: string;
  contactItems: string[];
  bottomLinks: FooterLink[];
}

export const siteConfig: SiteConfig = {
  language: "en",
  title: "Norfolk Development | Premium Construction & Development",
  description: "Norfolk Development - Building excellence since 1987. Premium construction services for commercial, residential, and industrial projects.",
};

export const heroConfig: HeroConfig = {
  brandLeft: "NORFOLK",
  brandRight: "DEVELOPMENT",
  tagline: "Building Tomorrow's Landmarks Today",
  badge: "Norfolk, Virginia",
  since: "Since 1987",
  email: "hello@norfolk-dev.com",
  heroImage: "/images/hero-building.png",
  heroImageAlt: "Modern high-rise building under construction",
  scrollText: "Scroll to explore",
  copyrightText: "© 2024 Norfolk Development",
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  socialLinks: [
    { label: "Instagram", href: "https://www.instagram.com/norfolk_development?igsh=MXNuNmJrOXNrbmY5Zw==" },
  ],
};

export const aboutConfig: AboutConfig = {
  label: "Established 1987",
  headline: "",
  description: "At Norfolk Development, we don't just build structures; we craft environments that stand the test of time. Our unwavering commitment to exceptional quality ensures that every joint, every finish, and every layout is executed with surgical precision. From large-scale industrial hubs to intimate luxury residences, our signature is excellence without compromise.",
  bottomText: "We believe every structure tells a story. Our commitment to sustainable building practices and cutting-edge technology ensures that each project not only meets today's needs but anticipates tomorrow's challenges. From groundbreaking to grand opening, we're with you every step of the way.",
  galleryImages: [
    { src: "/images/gallery-residential.jpg", alt: "Luxury home interior office space", label: "Residential" },
    { src: "/images/gallery-3.jpg", alt: "Construction site aerial view", label: "In Progress" },
    { src: "/images/gallery-4.jpg", alt: "Modern office interior", label: "Commercial" },
    { src: "/images/gallery-6.jpg", alt: "Sustainable green building", label: "Sustainable" },
  ],
  stats: [
    { value: "100+", label: "Master Craftsmen" },
    { value: "100%", label: "Uncompromised Quality" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "$15M+", label: "Project Value Delivered" },
  ],
};

export const exhibitionsConfig: ExhibitionsConfig = {
  label: "Featured Work",
  headline: "Signature Projects",
  ctaText: "View Project",
  exhibitions: [
    { 
      id: 1, 
      title: "Porter Estate, Westwood MA", 
      video: "/videos/Porter Estate, Westwood MA.mp4", 
      date: "In Progress" 
    },
    { 
      id: 2, 
      title: "Commercial Service Addition, Norwood MA", 
      video: "/videos/Commercial Service Addition, Norwood MA.mp4", 
      date: "In Progress" 
    },
    { 
      id: 3, 
      title: "Pocahontas Addition, Walpole MA", 
      video: "/videos/Pocahontas Addition. Walpole MA.mp4", 
      date: "In Progress" 
    },
    { 
      id: 4, 
      title: "Hedgerow Progress", 
      video: "/videos/Hedgerow Progress.mp4", 
      date: "In Progress" 
    },
    { 
      id: 5, 
      title: "Kitchen Westwood", 
      video: "/videos/KItchen Westwood.mp4", 
      date: "In Progress" 
    },
  ],
};

export const collectionsConfig: CollectionsConfig = {
  label: "Our Expertise",
  headline: "Construction Services",
  ctaText: "Learn More",
  collections: [
    { 
      id: 2, 
      title: "Residential Development", 
      year: "Luxury Homes & Communities", 
      description: "We create living spaces that blend comfort with elegance. Our residential portfolio includes luxury estates, multi-family complexes, and master-planned communities designed for modern living.", 
      image: "/images/service-2.jpg" 
    },
    { 
      id: 4, 
      title: "Renovation & Restoration", 
      year: "Historic & Modern", 
      description: "Preserving heritage while embracing innovation. Our restoration team specializes in breathing new life into historic structures and modernizing existing buildings for contemporary use.", 
      image: "/images/service-4.jpg" 
    },
    { 
      id: 5, 
      title: "Completed Masterpieces", 
      year: "Excellence Delivered", 
      description: "A showcase of our successfully completed projects, where vision meets reality. These structures stand as a testament to our commitment to quality, durability, and architectural brilliance.", 
      image: "/images/Completed.jpeg" 
    },
  ],
};

export const testimonialsConfig: TestimonialsConfig = {
  quote: "Norfolk Development transformed our vision into reality. Their attention to detail, commitment to quality, and ability to deliver on time exceeded all expectations. They didn't just build a structure; they created a landmark that defines our company's presence.",
  authorName: "Robert Mitchell",
  authorTitle: "CEO, TechHub Industries",
  authorImage: "/images/testimonial-author.jpg",
};

export const visitConfig: VisitConfig = {
  label: "Get In Touch",
  headline: "Let's Build<br />Something Great",
  description: "Ready to start your next project? Contact us to discuss how Norfolk Development can bring your vision to life. Our team is ready to provide expert consultation and turn your ideas into reality.",
  ctaText: "Start Your Project",
  infoCards: [
    { 
      icon: "MapPin", 
      title: "Visit Our Office", 
      content: "1200 Waterfront Drive<br />Norfolk, VA 23510<br />United States" 
    },
    { 
      icon: "Clock", 
      title: "Business Hours", 
      content: "Monday - Friday: 8AM - 6PM<br />Saturday: 9AM - 2PM<br />Sunday: Closed" 
    },
    { 
      icon: "Calendar", 
      title: "Schedule a Meeting", 
      content: "Book a consultation with our project team to discuss your construction needs and get a detailed proposal." 
    },
    { 
      icon: "Ticket", 
      title: "Request a Quote", 
      content: "Get a comprehensive project estimate including timeline, materials, and cost breakdown for your construction project." 
    },
  ],
};

export const footerConfig: FooterConfig = {
  marqueeText: "BUILDING EXCELLENCE • SINCE 1987 • NORFOLK DEVELOPMENT • PREMIUM CONSTRUCTION • BUILDING EXCELLENCE • SINCE 1987 • NORFOLK DEVELOPMENT • PREMIUM CONSTRUCTION • ",
  brandName: "NORFOLK DEVELOPMENT",
  brandDescription: "Building tomorrow's landmarks with precision, passion, and purpose. Your vision, our expertise.",
  socialLinks: [
    { label: "Instagram", href: "https://www.instagram.com/norfolk_development?igsh=MXNuNmJrOXNrbmY5Zw==" },
  ],
  quickLinks: [
    { label: "About Us", href: "#about" },
    { label: "Our Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Careers", href: "#" },
    { label: "News", href: "#" },
  ],
  quickLinksTitle: "Quick Links",
  contactTitle: "Contact",
  contactItems: [
    "1200 Waterfront Drive",
    "Norfolk, VA 23510",
    "hello@norfolk-dev.com",
    "+1 (757) 555-0120",
  ],
  bottomLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};
