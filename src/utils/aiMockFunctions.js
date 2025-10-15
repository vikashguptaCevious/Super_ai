// Mock AI Functions for the Creator Platform

export const generateCourseOutline = (idea) => {
  const modules = [
    {
      title: "Introduction to " + idea,
      lessons: [
        "Welcome and Overview",
        "What You'll Learn",
        "Prerequisites and Requirements"
      ]
    },
    {
      title: "Core Concepts",
      lessons: [
        "Understanding the Fundamentals",
        "Key Principles and Best Practices",
        "Common Pitfalls to Avoid"
      ]
    },
    {
      title: "Practical Implementation",
      lessons: [
        "Step-by-Step Guide",
        "Real-World Examples",
        "Hands-on Exercises"
      ]
    },
    {
      title: "Advanced Topics",
      lessons: [
        "Advanced Techniques",
        "Optimization Strategies",
        "Future Trends"
      ]
    },
    {
      title: "Conclusion",
      lessons: [
        "Summary and Key Takeaways",
        "Next Steps",
        "Resources and Further Learning"
      ]
    }
  ];

  return {
    title: `AI Course: ${idea}`,
    description: `A comprehensive course covering all aspects of ${idea}, from basics to advanced concepts.`,
    duration: "4-6 hours",
    modules,
    difficulty: "Beginner to Intermediate",
    tags: [idea.toLowerCase(), "ai", "learning", "course"]
  };
};

export const generateWebinarAgenda = (idea) => {
  return {
    title: `Webinar: Mastering ${idea}`,
    description: `Join us for an interactive webinar where we'll dive deep into ${idea} and answer your questions.`,
    duration: "60 minutes",
    speakers: ["AI Expert", "Industry Professional"],
    agenda: [
      { time: "0-5 min", topic: "Welcome and Introductions" },
      { time: "5-15 min", topic: `Overview of ${idea}` },
      { time: "15-35 min", topic: "Deep Dive and Case Studies" },
      { time: "35-50 min", topic: "Q&A Session" },
      { time: "50-60 min", topic: "Wrap-up and Next Steps" }
    ],
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    maxAttendees: 100,
    price: 49.99
  };
};

export const generateBrandingAssets = (title) => {
  const colorPalettes = [
    ["#7C5CFB", "#6C63FF", "#FF6B6B", "#4ECDC4"],
    ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
    ["#4facfe", "#00f2fe", "#43e97b", "#38f9d7"],
    ["#fa709a", "#fee140", "#a8edea", "#fed6e3"]
  ];

  const fonts = ["Inter", "Poppins", "Roboto", "Open Sans", "Montserrat"];
  
  const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
  const randomFont = fonts[Math.floor(Math.random() * fonts.length)];

  return {
    logo: `${title.replace(/\s+/g, '-').toLowerCase()}-logo.png`,
    colors: randomPalette,
    fonts: [randomFont],
    tagline: `Empowering ${title} enthusiasts worldwide`,
    logoVariations: [
      `${title.replace(/\s+/g, '-').toLowerCase()}-logo-horizontal.png`,
      `${title.replace(/\s+/g, '-').toLowerCase()}-logo-vertical.png`,
      `${title.replace(/\s+/g, '-').toLowerCase()}-logo-icon.png`
    ],
    socialMediaTemplates: {
      linkedin: `${title} LinkedIn Post Template`,
      instagram: `${title} Instagram Story Template`,
      twitter: `${title} Twitter Header Template`
    }
  };
};

export const generateAutomationTask = (content) => {
  const platforms = ["Twitter", "LinkedIn", "Instagram", "Facebook", "YouTube"];
  const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  return {
    title: `Schedule Post: ${content.substring(0, 30)}...`,
    platform: randomPlatform,
    content,
    scheduledTime: tomorrow.toISOString(),
    status: "scheduled",
    engagement: {
      expectedReach: Math.floor(Math.random() * 1000) + 100,
      expectedEngagement: Math.floor(Math.random() * 50) + 10
    }
  };
};

export const generateIdeaSuggestions = (keyword) => {
  const suggestions = [
    `${keyword} for Beginners`,
    `Advanced ${keyword} Techniques`,
    `${keyword} in 2024`,
    `Mastering ${keyword}`,
    `${keyword} Best Practices`,
    `Common ${keyword} Mistakes`,
    `${keyword} Case Studies`,
    `${keyword} Tools and Resources`
  ];

  return suggestions.slice(0, 5);
};

export const generateCommunityPost = (idea) => {
  const postTemplates = [
    `Just had an amazing idea about ${idea}! What do you think?`,
    `Excited to share my thoughts on ${idea}. Looking forward to your feedback!`,
    `Working on something related to ${idea}. Anyone else interested in this topic?`,
    `New insights on ${idea} that I wanted to share with the community.`,
    `Curious about ${idea}? Let's discuss and learn together!`
  ];

  const randomTemplate = postTemplates[Math.floor(Math.random() * postTemplates.length)];

  return {
    content: randomTemplate,
    hashtags: [idea.toLowerCase().replace(/\s+/g, ''), 'ai', 'learning', 'community'],
    category: 'idea',
    engagement: {
      likes: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 20),
      shares: Math.floor(Math.random() * 10)
    }
  };
};

export const generateAnalyticsData = () => {
  const last30Days = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    last30Days.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 1000) + 100,
      students: Math.floor(Math.random() * 50) + 5,
      ideas: Math.floor(Math.random() * 10) + 1,
      engagement: Math.floor(Math.random() * 100) + 20
    });
  }

  return {
    overview: {
      totalRevenue: 15420,
      totalStudents: 1247,
      totalIdeas: 89,
      totalEngagement: 89.2
    },
    dailyData: last30Days,
    topCourses: [
      { name: "AI for Beginners", revenue: 3240, students: 156 },
      { name: "Advanced Machine Learning", revenue: 2890, students: 98 },
      { name: "Data Science Fundamentals", revenue: 2150, students: 134 }
    ],
    demographics: {
      ageGroups: [
        { range: "18-24", percentage: 25 },
        { range: "25-34", percentage: 40 },
        { range: "35-44", percentage: 25 },
        { range: "45+", percentage: 10 }
      ],
      locations: [
        { country: "United States", percentage: 35 },
        { country: "United Kingdom", percentage: 15 },
        { country: "Canada", percentage: 12 },
        { country: "Australia", percentage: 10 },
        { country: "Other", percentage: 28 }
      ]
    }
  };
};
