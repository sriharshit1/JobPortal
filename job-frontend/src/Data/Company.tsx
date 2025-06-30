const companyData = [
  {
    Name: "Google",
    Overview:
      "Google is a global leader in technology, specializing in internet-related services and products. Our mission is to organize the world’s information and make it universally accessible and useful. Founded by Larry Page and Sergey Brin, Google has grown into one of the most influential companies in the world, providing innovative tools and services that help billions of people across the globe.",
    Industry: "Internet, Software & Technology Services",
    Website: "https://www.google.com",
    Size: "100,000+ Employees",
    Headquarters: "Mountain View, California, United States",
    Specialties: [
      "Search Engine",
      "Online Advertising",
      "Cloud Computing",
      "Software",
      "Hardware",
      "AI & Machine Learning",
      "Mobile Operating Systems",
      "Consumer Electronics"
    ]
  },
  {
    Name: "Meta",
    Overview:
      "Meta Platforms, Inc. is a technology company focused on building products that help people connect and share. Known for platforms like Facebook, Instagram, and WhatsApp, Meta is also pioneering work in the metaverse, virtual reality, and AI.",
    Industry: "Social Media, Technology",
    Website: "https://about.meta.com",
    Size: "58,604 Employees",
    Headquarters: "Menlo Park, California, United States",
    Specialties: [
      "Social Networking",
      "Virtual Reality",
      "Augmented Reality",
      "Digital Advertising",
      "Artificial Intelligence",
      "Communication Platforms"
    ]
  },
  {
    Name: "Netflix",
    Overview:
      "Netflix is a global entertainment company that offers streaming services and produces original content in various genres. It is known for revolutionizing how audiences consume TV shows and movies through its subscription-based model.",
    Industry: "Entertainment, Streaming Services",
    Website: "https://www.netflix.com",
    Size: "12,800 Employees",
    Headquarters: "Los Gatos, California, United States",
    Specialties: [
      "Streaming Media",
      "Original Content Production",
      "Technology Innovation",
      "Film & TV",
      "Global Distribution"
    ]
  },
  {
    Name: "Microsoft",
    Overview:
      "Microsoft Corporation is a global leader in software, services, devices, and solutions. Known for products like Windows, Office, and Azure, Microsoft empowers individuals and organizations to achieve more.",
    Industry: "Software & Cloud Computing",
    Website: "https://www.microsoft.com",
    Size: "221,000 Employees",
    Headquarters: "Redmond, Washington, United States",
    Specialties: [
      "Operating Systems",
      "Productivity Software",
      "Cloud Services",
      "AI & Machine Learning",
      "Business Solutions",
      "Developer Tools",
      "Gaming (Xbox)"
    ]
  },
  {
    Name: "Adobe",
    Overview:
      "Adobe Inc. is a global software company known for its creative and multimedia products, including Photoshop, Illustrator, and Acrobat. Adobe is also a leader in digital experience and marketing solutions.",
    Industry: "Software & Digital Media",
    Website: "https://www.adobe.com",
    Size: "29,439 Employees",
    Headquarters: "San Jose, California, United States",
    Specialties: [
      "Digital Media",
      "Creative Software",
      "Document Management",
      "Marketing Automation",
      "AI & Machine Learning",
      "Cloud Services"
    ]
  },
  {
    Name: "Spotify",
    Overview:
      "Spotify is a leading global music streaming service, providing access to millions of songs, podcasts, and audio content. It offers personalized recommendations and a platform for artists to share their work with the world.",
    Industry: "Music Streaming",
    Website: "https://www.spotify.com",
    Size: "8,200 Employees",
    Headquarters: "Stockholm, Sweden",
    Specialties: [
      "Music Streaming",
      "Podcasts",
      "Audio Personalization",
      "Data Analytics",
      "Content Distribution",
      "Creator Tools"
    ]
  },
  {
    Name: "Amazon",
    Overview:
      "Amazon is a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is one of the world’s most customer-centric companies and a pioneer in online retail.",
    Industry: "E-commerce & Cloud Computing",
    Website: "https://www.amazon.com",
    Size: "1,561,000 Employees",
    Headquarters: "Seattle, Washington, United States",
    Specialties: [
      "E-commerce",
      "Cloud Computing (AWS)",
      "Logistics",
      "Artificial Intelligence",
      "Consumer Electronics",
      "Digital Streaming",
      "Retail Innovation"
    ]
  },
  {
    Name: "Apple",
    Overview:
      "Apple Inc. designs, manufactures, and markets consumer electronics, software, and services. Known for products like the iPhone, Mac, and Apple Watch, Apple leads in innovation, privacy, and design excellence.",
    Industry: "Consumer Electronics & Software",
    Website: "https://www.apple.com",
    Size: "164,000 Employees",
    Headquarters: "Cupertino, California, United States",
    Specialties: [
      "Consumer Electronics",
      "Mobile Devices",
      "Operating Systems",
      "Digital Services",
      "Hardware Design",
      "Retail",
      "Software Development"
    ]
  },
  {
  Name: "Facebook",
  Overview:
    "Facebook, a subsidiary of Meta Platforms Inc., is a leading social media platform connecting billions of users worldwide. It enables people to share content, discover communities, and engage in meaningful conversations. Facebook plays a central role in Meta’s mission to build the future of social interaction and virtual experiences.",
  Industry: "Social Media & Technology",
  Website: "https://www.facebook.com",
  Size: "71,469 Employees",
  Headquarters: "Menlo Park, California, United States",
  Specialties: [
    "Social Networking",
    "Advertising",
    "Digital Media",
    "Community Engagement",
    "Mobile Applications",
    "Virtual Reality",
    "Augmented Reality",
    "AI & Machine Learning"
  ]
}
];

const similar = [
  { name: "Meta", employees: 58604 },
  { name: "Netflix", employees: 12800 },
  { name: "Microsoft", employees: 221000 },
  { name: "Adobe", employees: 29439 },
  { name: "Google", employees: 181798 },
  { name: "Spotify", employees: 8200 },
  { name: "Amazon", employees: 1561000 },
  { name: "Apple", employees: 164000 }
];

export { companyData, similar };
