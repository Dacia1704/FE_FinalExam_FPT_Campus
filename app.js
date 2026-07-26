/**
 * LearnHub - Online Learning Platform
 * app.js - Shared data and utility functions
 */

// ==================== COURSE DATA ====================
// Hardcoded course data for index.html and course-detail.html (Problem 01)

const COURSES = [
  {
    id: 'c001',
    title: 'HTML & CSS Fundamentals',
    category: 'web-dev',
    instructor: 'Nguyen Van A',
    thumbnail: 'images/courses/c001.jpg',
    rating: 4.8,
    ratingCount: 120,
    students: 1200,
    lessonsCount: 11,
    price: 0,
    status: 'published',
    shortDescription:
      'Learn the building blocks of the modern web with HTML5 and CSS3.',
    whatYouLearn: [
      'Build semantic HTML5 pages from scratch',
      'Style layouts with modern CSS3 techniques',
      'Use Flexbox and Grid confidently',
      'Make responsive pages for any device',
    ],
    description: [
      'This course walks you through HTML5 and CSS3 from the ground up. You will learn how to structure content semantically and style it beautifully.',
      'By the end, you will be able to build fully responsive landing pages and understand best practices for web accessibility and SEO.',
    ],
    curriculum: [
      {
        id: 'c001-s1',
        title: 'Section 1: Getting Started with HTML',
        lessons: [
          {
            id: 'c001-s1-l1',
            title: '1.1 Introduction to HTML',
            durationMin: 5,
          },
          {
            id: 'c001-s1-l2',
            title: '1.2 Basic Tags & Structure',
            durationMin: 8,
          },
          {
            id: 'c001-s1-l3',
            title: '1.3 Setting up your first page',
            durationMin: 6,
          },
        ],
        quiz: [
          {
            id: 'c001-s1-q1',
            question: 'What does HTML stand for?',
            options: [
              'HyperText Markup Language',
              'HighText Machine Language',
              'Hyperlink Text Markup Language',
              'None of the above',
            ],
            correctIndex: 0,
          },
          {
            id: 'c001-s1-q2',
            question: 'Which tag defines a paragraph?',
            options: ['<para>', '<p>', '<pg>', '<paragraph>'],
            correctIndex: 1,
          },
          {
            id: 'c001-s1-q3',
            question: 'Which tag is used for the largest heading?',
            options: ['<h6>', '<heading>', '<h1>', '<head>'],
            correctIndex: 2,
          },
        ],
      },
      {
        id: 'c001-s2',
        title: 'Section 2: CSS Fundamentals',
        lessons: [
          {
            id: 'c001-s2-l1',
            title: '2.1 Introduction to CSS',
            durationMin: 5,
          },
          {
            id: 'c001-s2-l2',
            title: '2.2 Selectors and Properties',
            durationMin: 10,
          },
          { id: 'c001-s2-l3', title: '2.3 The Box Model', durationMin: 8 },
          {
            id: 'c001-s2-l4',
            title: '2.4 Colors and Typography',
            durationMin: 7,
          },
        ],
        quiz: [
          {
            id: 'c001-s2-q1',
            question: 'Which property changes text color?',
            options: ['text-color', 'font-color', 'color', 'foreground'],
            correctIndex: 2,
          },
          {
            id: 'c001-s2-q2',
            question: 'What does CSS stand for?',
            options: [
              'Computer Style Sheets',
              'Creative Style System',
              'Cascading Style Sheets',
              'Colorful Style Sheets',
            ],
            correctIndex: 2,
          },
          {
            id: 'c001-s2-q3',
            question:
              'Which is the correct syntax to link an external CSS file?',
            options: [
              '<link href="style.css">',
              '<stylesheet>style.css</stylesheet>',
              '<css>style.css</css>',
              '<style src="style.css">',
            ],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 'c001-s3',
        title: 'Section 3: Responsive Design',
        lessons: [
          {
            id: 'c001-s3-l1',
            title: '3.1 Introduction to Flexbox',
            durationMin: 10,
          },
          {
            id: 'c001-s3-l2',
            title: '3.2 Flexbox Layout Techniques',
            durationMin: 12,
          },
          { id: 'c001-s3-l3', title: '3.3 CSS Grid Basics', durationMin: 10 },
          { id: 'c001-s3-l4', title: '3.4 Media Queries', durationMin: 8 },
        ],
        quiz: [
          {
            id: 'c001-s3-q1',
            question: 'Which CSS property creates a flex container?',
            options: [
              'flex: 1',
              'display: flex',
              'flexbox: true',
              'container: flex',
            ],
            correctIndex: 1,
          },
          {
            id: 'c001-s3-q2',
            question: "What does the 'media queries' help with?",
            options: [
              'Database queries',
              'Responsive design',
              'Network requests',
              'User authentication',
            ],
            correctIndex: 1,
          },
          {
            id: 'c001-s3-q3',
            question: 'Which breakpoint targets tablets (768px-991px)?',
            options: [
              '@media (max-width: 576px)',
              '@media (min-width: 768px)',
              '@media (min-width: 992px)',
              '@media (max-width: 1200px)',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    createdAt: '2026-06-01T00:00:00.000Z',
  },
  {
    id: 'c002',
    title: 'JavaScript Essentials',
    category: 'web-dev',
    instructor: 'Tran Thi B',
    thumbnail: 'images/courses/c002.jpg',
    rating: 4.6,
    ratingCount: 85,
    students: 850,
    lessonsCount: 10,
    price: 49,
    status: 'published',
    shortDescription:
      'Master JavaScript fundamentals and ES6+ features for modern web development.',
    whatYouLearn: [
      'Understand JavaScript fundamentals and syntax',
      'Work with DOM manipulation and events',
      'Use ES6+ features like arrow functions and destructuring',
      'Handle asynchronous operations with Promises and async/await',
    ],
    description: [
      'JavaScript is the programming language of the web. This course covers everything from basic syntax to modern ES6+ features.',
      'You will build interactive web applications and understand how to work with the DOM, handle events, and manage asynchronous code.',
    ],
    curriculum: [
      {
        id: 'c002-s1',
        title: 'Section 1: JavaScript Basics',
        lessons: [
          {
            id: 'c002-s1-l1',
            title: '1.1 Introduction to JavaScript',
            durationMin: 5,
          },
          {
            id: 'c002-s1-l2',
            title: '1.2 Variables and Data Types',
            durationMin: 8,
          },
          {
            id: 'c002-s1-l3',
            title: '1.3 Operators and Expressions',
            durationMin: 6,
          },
        ],
        quiz: [
          {
            id: 'c002-s1-q1',
            question: 'Which keyword declares a constant in JavaScript?',
            options: ['var', 'let', 'const', 'constant'],
            correctIndex: 2,
          },
          {
            id: 'c002-s1-q2',
            question: 'What is the result of typeof null?',
            options: ['null', 'undefined', 'object', 'number'],
            correctIndex: 2,
          },
          {
            id: 'c002-s1-q3',
            question: 'Which operator checks value and type equality?',
            options: ['==', '===', '=', '!='],
            correctIndex: 1,
          },
        ],
      },
      {
        id: 'c002-s2',
        title: 'Section 2: Functions and Arrays',
        lessons: [
          {
            id: 'c002-s2-l1',
            title: '2.1 Function Declarations and Expressions',
            durationMin: 10,
          },
          { id: 'c002-s2-l2', title: '2.2 Arrow Functions', durationMin: 8 },
          {
            id: 'c002-s2-l3',
            title: '2.3 Working with Arrays',
            durationMin: 10,
          },
          {
            id: 'c002-s2-l4',
            title: '2.4 Array Methods (map, filter, reduce)',
            durationMin: 12,
          },
        ],
        quiz: [
          {
            id: 'c002-s2-q1',
            question: 'Which array method returns a new array?',
            options: ['forEach', 'push', 'map', 'pop'],
            correctIndex: 2,
          },
          {
            id: 'c002-s2-q2',
            question: 'What does an arrow function NOT have?',
            options: ['parameters', 'body', "its own 'this'", 'return value'],
            correctIndex: 2,
          },
          {
            id: 'c002-s2-q3',
            question: 'Which method adds an element to the end of an array?',
            options: ['unshift', 'pop', 'push', 'shift'],
            correctIndex: 2,
          },
        ],
      },
      {
        id: 'c002-s3',
        title: 'Section 3: DOM and Events',
        lessons: [
          { id: 'c002-s3-l1', title: '3.1 DOM Manipulation', durationMin: 10 },
          { id: 'c002-s3-l2', title: '3.2 Event Handling', durationMin: 12 },
          { id: 'c002-s3-l3', title: '3.3 Form Validation', durationMin: 8 },
        ],
        quiz: [
          {
            id: 'c002-s3-q1',
            question: 'Which method selects an element by its ID?',
            options: [
              'getElementByClass',
              'querySelector',
              'getElementById',
              'selectElement',
            ],
            correctIndex: 2,
          },
          {
            id: 'c002-s3-q2',
            question: 'Which event fires when an element is clicked?',
            options: ['mouseover', 'keypress', 'click', 'change'],
            correctIndex: 2,
          },
          {
            id: 'c002-s3-q3',
            question: 'What is the correct way to add an event listener?',
            options: [
              'element.onclick = function',
              "element.addEventListener('click', function)",
              "element.listen('click')",
              "element.on('click')",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    createdAt: '2026-06-15T00:00:00.000Z',
  },
  {
    id: 'c003',
    title: 'UI/UX Design Mastery',
    category: 'design',
    instructor: 'Le Thi C',
    thumbnail: 'images/courses/c003.jpg',
    rating: 4.9,
    ratingCount: 200,
    students: 2000,
    lessonsCount: 10,
    price: 59,
    status: 'published',
    shortDescription:
      'Create beautiful and user-centered designs that delight users.',
    whatYouLearn: [
      'Apply fundamental UI design principles',
      'Conduct user research and create personas',
      'Design wireframes and high-fidelity prototypes',
      'Use Figma for UI/UX design workflow',
    ],
    description: [
      'This comprehensive course teaches you the principles of good UI/UX design. You will learn to create designs that are both beautiful and functional.',
      'From understanding user needs to creating clickable prototypes, this course covers the complete design process used by industry professionals.',
    ],
    curriculum: [
      {
        id: 'c003-s1',
        title: 'Section 1: Design Fundamentals',
        lessons: [
          {
            id: 'c003-s1-l1',
            title: '1.1 Introduction to UI/UX',
            durationMin: 5,
          },
          { id: 'c003-s1-l2', title: '1.2 Color Theory', durationMin: 10 },
          { id: 'c003-s1-l3', title: '1.3 Typography Basics', durationMin: 8 },
        ],
        quiz: [
          {
            id: 'c003-s1-q1',
            question: 'What does UI stand for?',
            options: [
              'User Interaction',
              'User Interface',
              'Universal Interface',
              'User Integration',
            ],
            correctIndex: 1,
          },
          {
            id: 'c003-s1-q2',
            question:
              'Which color scheme uses colors opposite each other on the color wheel?',
            options: ['Analogous', 'Triadic', 'Complementary', 'Monochromatic'],
            correctIndex: 2,
          },
          {
            id: 'c003-s1-q3',
            question: 'What is the primary purpose of white space in design?',
            options: [
              'To fill empty areas',
              'To improve readability and focus',
              'To reduce file size',
              'To add background color',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: 'c003-s2',
        title: 'Section 2: User Research',
        lessons: [
          {
            id: 'c003-s2-l1',
            title: '2.1 Understanding User Needs',
            durationMin: 10,
          },
          {
            id: 'c003-s2-l2',
            title: '2.2 Creating User Personas',
            durationMin: 8,
          },
          {
            id: 'c003-s2-l3',
            title: '2.3 User Journey Mapping',
            durationMin: 10,
          },
          {
            id: 'c003-s2-l4',
            title: '2.4 Information Architecture',
            durationMin: 8,
          },
        ],
        quiz: [
          {
            id: 'c003-s2-q1',
            question: 'What is a user persona?',
            options: [
              'A real user of the product',
              'A fictional representation of a user type',
              'A login credential',
              'A user interface element',
            ],
            correctIndex: 1,
          },
          {
            id: 'c003-s2-q2',
            question: 'What is the purpose of a user journey map?',
            options: [
              'To track user locations',
              'To visualize user experiences over time',
              'To design navigation menus',
              'To create animations',
            ],
            correctIndex: 1,
          },
          {
            id: 'c003-s2-q3',
            question: 'Which method is used for gathering user feedback?',
            options: [
              'Code review',
              'Unit testing',
              'User interviews',
              'Server logs',
            ],
            correctIndex: 2,
          },
        ],
      },
      {
        id: 'c003-s3',
        title: 'Section 3: Prototyping with Figma',
        lessons: [
          {
            id: 'c003-s3-l1',
            title: '3.1 Getting Started with Figma',
            durationMin: 8,
          },
          {
            id: 'c003-s3-l2',
            title: '3.2 Creating Components',
            durationMin: 10,
          },
          {
            id: 'c003-s3-l3',
            title: '3.3 Building Interactive Prototypes',
            durationMin: 12,
          },
        ],
        quiz: [
          {
            id: 'c003-s3-q1',
            question: 'What is a component in Figma?',
            options: [
              'A single pixel',
              'A reusable design element',
              'A type of font',
              'A color palette',
            ],
            correctIndex: 1,
          },
          {
            id: 'c003-s3-q2',
            question: 'Which tool in Figma is used for creating frames?',
            options: ['Pen tool', 'Rectangle tool', 'Frame tool', 'Text tool'],
            correctIndex: 2,
          },
          {
            id: 'c003-s3-q3',
            question: 'What is a design system?',
            options: [
              'A single button design',
              'A collection of reusable components and guidelines',
              'A font family',
              'An image file',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    createdAt: '2026-07-01T00:00:00.000Z',
  },
  {
    id: 'c004',
    title: 'Python for Data Science',
    category: 'data-science',
    instructor: 'Pham Van D',
    thumbnail: 'images/courses/c004.jpg',
    rating: 4.7,
    ratingCount: 150,
    students: 1500,
    lessonsCount: 11,
    price: 79,
    status: 'published',
    shortDescription:
      'Learn Python programming for data analysis, visualization, and machine learning.',
    whatYouLearn: [
      'Master Python fundamentals for data science',
      'Analyze data with pandas and NumPy',
      'Create visualizations with Matplotlib and Seaborn',
      'Build basic machine learning models',
    ],
    description: [
      'Python is the most popular language for data science. This course takes you from Python basics to advanced data analysis techniques.',
      'You will learn to manipulate data, create stunning visualizations, and build your first machine learning models using real-world datasets.',
    ],
    curriculum: [
      {
        id: 'c004-s1',
        title: 'Section 1: Python Fundamentals',
        lessons: [
          {
            id: 'c004-s1-l1',
            title: '1.1 Introduction to Python',
            durationMin: 5,
          },
          {
            id: 'c004-s1-l2',
            title: '1.2 Variables and Data Types',
            durationMin: 8,
          },
          {
            id: 'c004-s1-l3',
            title: '1.3 Control Flow and Functions',
            durationMin: 10,
          },
        ],
        quiz: [
          {
            id: 'c004-s1-q1',
            question: 'Which symbol is used for comments in Python?',
            options: ['//', '#', '/*', '--'],
            correctIndex: 1,
          },
          {
            id: 'c004-s1-q2',
            question: 'What is the output of print(2 ** 3)?',
            options: ['6', '8', '9', '5'],
            correctIndex: 1,
          },
          {
            id: 'c004-s1-q3',
            question: 'Which keyword defines a function in Python?',
            options: ['function', 'def', 'func', 'define'],
            correctIndex: 1,
          },
        ],
      },
      {
        id: 'c004-s2',
        title: 'Section 2: Data Analysis with Pandas',
        lessons: [
          {
            id: 'c004-s2-l1',
            title: '2.1 Introduction to Pandas',
            durationMin: 8,
          },
          { id: 'c004-s2-l2', title: '2.2 DataFrames Basics', durationMin: 10 },
          {
            id: 'c004-s2-l3',
            title: '2.3 Data Cleaning and Preparation',
            durationMin: 12,
          },
          {
            id: 'c004-s2-l4',
            title: '2.4 Aggregation and Grouping',
            durationMin: 10,
          },
        ],
        quiz: [
          {
            id: 'c004-s2-q1',
            question: 'What does a DataFrame represent?',
            options: [
              'A single value',
              'A one-dimensional array',
              'A two-dimensional labeled data structure',
              'A function',
            ],
            correctIndex: 2,
          },
          {
            id: 'c004-s2-q2',
            question: 'Which method reads a CSV file in pandas?',
            options: ['read.csv()', 'load_csv()', 'read_csv()', 'import_csv()'],
            correctIndex: 2,
          },
          {
            id: 'c004-s2-q3',
            question: 'What does NaN stand for?',
            options: [
              'Not a Name',
              'Not a Null',
              'Not a Number',
              'New Array Name',
            ],
            correctIndex: 2,
          },
        ],
      },
      {
        id: 'c004-s3',
        title: 'Section 3: Data Visualization',
        lessons: [
          {
            id: 'c004-s3-l1',
            title: '3.1 Introduction to Matplotlib',
            durationMin: 8,
          },
          {
            id: 'c004-s3-l2',
            title: '3.2 Creating Line and Bar Charts',
            durationMin: 10,
          },
          {
            id: 'c004-s3-l3',
            title: '3.3 Advanced Visualizations with Seaborn',
            durationMin: 12,
          },
          {
            id: 'c004-s3-l4',
            title: '3.4 Interactive Plots with Plotly',
            durationMin: 10,
          },
        ],
        quiz: [
          {
            id: 'c004-s3-q1',
            question: 'Which library is used for basic plotting in Python?',
            options: ['React', 'Pandas', 'Matplotlib', 'NumPy'],
            correctIndex: 2,
          },
          {
            id: 'c004-s3-q2',
            question:
              'What type of chart is best for showing trends over time?',
            options: ['Pie chart', 'Bar chart', 'Line chart', 'Scatter plot'],
            correctIndex: 2,
          },
          {
            id: 'c004-s3-q3',
            question: 'Which function creates a histogram?',
            options: [
              'plot.line()',
              'plot.bar()',
              'plot.hist()',
              'plot.scatter()',
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
    createdAt: '2026-05-20T00:00:00.000Z',
  },
  {
    id: 'c005',
    title: 'Digital Marketing Strategy',
    category: 'marketing',
    instructor: 'Hoang Thi E',
    thumbnail: 'images/courses/c005.jpg',
    rating: 4.5,
    ratingCount: 95,
    students: 950,
    lessonsCount: 10,
    price: 39,
    status: 'published',
    shortDescription:
      'Master digital marketing channels, SEO, social media, and analytics.',
    whatYouLearn: [
      'Develop comprehensive digital marketing strategies',
      'Optimize websites for search engines (SEO)',
      'Run effective social media campaigns',
      'Analyze marketing metrics with Google Analytics',
    ],
    description: [
      'Digital marketing is essential for business growth. This course covers all major digital marketing channels and how to integrate them effectively.',
      'Learn to create data-driven marketing campaigns that reach the right audience and deliver measurable results.',
    ],
    curriculum: [
      {
        id: 'c005-s1',
        title: 'Section 1: Digital Marketing Foundations',
        lessons: [
          {
            id: 'c005-s1-l1',
            title: '1.1 Introduction to Digital Marketing',
            durationMin: 5,
          },
          {
            id: 'c005-s1-l2',
            title: '1.2 Understanding Your Audience',
            durationMin: 8,
          },
          {
            id: 'c005-s1-l3',
            title: '1.3 Building a Marketing Strategy',
            durationMin: 10,
          },
        ],
        quiz: [
          {
            id: 'c005-s1-q1',
            question:
              'What is the first step in creating a marketing strategy?',
            options: [
              'Post on social media',
              'Define goals and target audience',
              'Buy advertising',
              'Create a website',
            ],
            correctIndex: 1,
          },
          {
            id: 'c005-s1-q2',
            question: 'What does KPI stand for?',
            options: [
              'Key Performance Indicator',
              'Knowledge Processing Index',
              'Keyword Position Index',
              'Key Public Information',
            ],
            correctIndex: 0,
          },
          {
            id: 'c005-s1-q3',
            question: 'Which is NOT a digital marketing channel?',
            options: [
              'Social media',
              'Television ads',
              'Email marketing',
              'SEO',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: 'c005-s2',
        title: 'Section 2: SEO and Content Marketing',
        lessons: [
          { id: 'c005-s2-l1', title: '2.1 SEO Fundamentals', durationMin: 10 },
          {
            id: 'c005-s2-l2',
            title: '2.2 On-Page SEO Techniques',
            durationMin: 12,
          },
          {
            id: 'c005-s2-l3',
            title: '2.3 Content Marketing Strategy',
            durationMin: 10,
          },
          {
            id: 'c005-s2-l4',
            title: '2.4 Link Building Strategies',
            durationMin: 8,
          },
        ],
        quiz: [
          {
            id: 'c005-s2-q1',
            question: 'What does SEO stand for?',
            options: [
              'Search Engine Optimization',
              'Social Engine Optimization',
              'Site Enhancement Option',
              'Search Error Output',
            ],
            correctIndex: 0,
          },
          {
            id: 'c005-s2-q2',
            question: 'Which factor is most important for SEO ranking?',
            options: [
              'Meta keywords tag',
              'Quality content',
              'Font color',
              'Page animations',
            ],
            correctIndex: 1,
          },
          {
            id: 'c005-s2-q3',
            question: 'What is a backlink?',
            options: [
              'A link to your homepage',
              'A link from another website to yours',
              'A broken link',
              'A social media link',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: 'c005-s3',
        title: 'Section 3: Social Media Marketing',
        lessons: [
          {
            id: 'c005-s3-l1',
            title: '3.1 Social Media Platforms Overview',
            durationMin: 8,
          },
          {
            id: 'c005-s3-l2',
            title: '3.2 Creating Engaging Content',
            durationMin: 10,
          },
          {
            id: 'c005-s3-l3',
            title: '3.3 Social Media Advertising',
            durationMin: 12,
          },
        ],
        quiz: [
          {
            id: 'c005-s3-q1',
            question: 'What is the best time to post on social media?',
            options: [
              'When your audience is most active',
              'At midnight',
              'Only on weekends',
              'Once a year',
            ],
            correctIndex: 0,
          },
          {
            id: 'c005-s3-q2',
            question: 'What does CTA stand for?',
            options: [
              'Click Through Article',
              'Call To Action',
              'Content Transfer Action',
              'Creative Text Advertisement',
            ],
            correctIndex: 1,
          },
          {
            id: 'c005-s3-q3',
            question: 'Which metric measures engagement rate?',
            options: [
              'Total followers only',
              '(Likes + Comments + Shares) / Reach',
              'Number of posts',
              'Page load time',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    createdAt: '2026-06-20T00:00:00.000Z',
  },
  {
    id: 'c006',
    title: 'Responsive Web Design',
    category: 'design',
    instructor: 'Nguyen Thi F',
    thumbnail: 'images/courses/c006.jpg',
    rating: 4.6,
    ratingCount: 110,
    students: 1100,
    lessonsCount: 9,
    price: 0,
    status: 'published',
    shortDescription:
      'Create websites that look great on any device with modern CSS techniques.',
    whatYouLearn: [
      'Master CSS Flexbox and Grid layouts',
      'Implement mobile-first responsive design',
      'Create adaptive images and media',
      'Optimize performance for all devices',
    ],
    description: [
      'Modern web users access sites from multiple devices. This course teaches you to create websites that work beautifully on everything from phones to large monitors.',
      'Learn the latest CSS techniques including Flexbox, Grid, and CSS Custom Properties to build professional responsive designs.',
    ],
    curriculum: [
      {
        id: 'c006-s1',
        title: 'Section 1: Mobile-First Principles',
        lessons: [
          {
            id: 'c006-s1-l1',
            title: '1.1 Why Mobile-First Design',
            durationMin: 5,
          },
          {
            id: 'c006-s1-l2',
            title: '1.2 Viewport and Media Queries',
            durationMin: 10,
          },
          { id: 'c006-s1-l3', title: '1.3 Fluid Typography', durationMin: 8 },
        ],
        quiz: [
          {
            id: 'c006-s1-q1',
            question: 'What is the mobile-first approach?',
            options: [
              'Designing for desktop first',
              'Starting with mobile design and scaling up',
              'Ignoring mobile devices',
              'Using Flash for mobile',
            ],
            correctIndex: 1,
          },
          {
            id: 'c006-s1-q2',
            question: 'What does the viewport meta tag control?',
            options: [
              'Page title visibility',
              'How the page scales on different devices',
              'Font size only',
              'Image quality',
            ],
            correctIndex: 1,
          },
          {
            id: 'c006-s1-q3',
            question: 'Which unit is relative to the viewport width?',
            options: ['px', 'em', 'rem', 'vw'],
            correctIndex: 3,
          },
        ],
      },
      {
        id: 'c006-s2',
        title: 'Section 2: Flexbox Mastery',
        lessons: [
          {
            id: 'c006-s2-l1',
            title: '2.1 Flex Container Properties',
            durationMin: 10,
          },
          {
            id: 'c006-s2-l2',
            title: '2.2 Flex Item Properties',
            durationMin: 10,
          },
          {
            id: 'c006-s2-l3',
            title: '2.3 Building Flexbox Layouts',
            durationMin: 12,
          },
        ],
        quiz: [
          {
            id: 'c006-s2-q1',
            question: 'Which property aligns items on the main axis?',
            options: [
              'align-items',
              'justify-content',
              'flex-direction',
              'flex-wrap',
            ],
            correctIndex: 1,
          },
          {
            id: 'c006-s2-q2',
            question: 'What does flex: 1 mean?',
            options: [
              'Fixed width of 1px',
              'Grow to fill available space',
              'Minimum 1 item',
              'Align to the left',
            ],
            correctIndex: 1,
          },
          {
            id: 'c006-s2-q3',
            question: 'Which flex property controls direction?',
            options: [
              'justify-content',
              'align-items',
              'flex-direction',
              'flex-wrap',
            ],
            correctIndex: 2,
          },
        ],
      },
      {
        id: 'c006-s3',
        title: 'Section 3: CSS Grid Layout',
        lessons: [
          {
            id: 'c006-s3-l1',
            title: '3.1 Grid Container Setup',
            durationMin: 8,
          },
          {
            id: 'c006-s3-l2',
            title: '3.2 Grid Template Areas',
            durationMin: 10,
          },
          {
            id: 'c006-s3-l3',
            title: '3.3 Responsive Grid Patterns',
            durationMin: 12,
          },
        ],
        quiz: [
          {
            id: 'c006-s3-q1',
            question: 'How do you create a grid container?',
            options: [
              'display: flexbox',
              'display: grid',
              'display: table',
              'display: block',
            ],
            correctIndex: 1,
          },
          {
            id: 'c006-s3-q2',
            question: 'What does fr unit represent in CSS Grid?',
            options: [
              'Frame rate',
              'Free space ratio',
              'Fraction of available space',
              'Fixed ratio',
            ],
            correctIndex: 2,
          },
          {
            id: 'c006-s3-q3',
            question: 'Which property spans an item across multiple columns?',
            options: ['grid-row', 'grid-column', 'column-span', 'flex-span'],
            correctIndex: 1,
          },
        ],
      },
    ],
    createdAt: '2026-07-05T00:00:00.000Z',
  },
];

// ==================== UTILITY FUNCTIONS ====================

/**
 * Format price for display - returns "FREE" for 0 or formatted price string
 */
function formatPrice(price) {
  return price === 0 ? 'FREE' : `$${price}`;
}

/**
 * Format rating stars for display
 */
function formatRating(rating) {
  return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '');
}

/**
 * Format number with commas (e.g., 1200 -> "1,200")
 */
function formatNumber(num) {
  return num.toLocaleString();
}

/**
 * Get category display name from category code
 */
function getCategoryName(category) {
  const categories = {
    'web-dev': 'Web Dev',
    design: 'Design',
    'data-science': 'Data Science',
    marketing: 'Marketing',
    other: 'Other',
  };
  return categories[category] || category;
}

/**
 * Calculate total lessons count from curriculum
 */
function computeLessonsCount(course) {
  return course.curriculum.reduce(
    (total, section) => total + section.lessons.length,
    0,
  );
}

/**
 * Create toast notification element and append to body
 */
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Get progress from localStorage for a course
 */
function getProgress(courseId) {
  const data = localStorage.getItem(`lh_progress_${courseId}`);
  return data ? JSON.parse(data) : { completedLessonIds: [], updatedAt: null };
}

/**
 * Save progress to localStorage for a course
 */
function saveProgress(courseId, completedLessonIds) {
  const record = {
    completedLessonIds,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(`lh_progress_${courseId}`, JSON.stringify(record));
}

/**
 * Get quiz results from localStorage for a course
 */
function getQuizResults(courseId) {
  const data = localStorage.getItem(`lh_quiz_${courseId}`);
  return data ? JSON.parse(data) : {};
}

/**
 * Save quiz result to localStorage for a course
 */
function saveQuizResult(courseId, sectionId, result) {
  const results = getQuizResults(courseId);
  results[sectionId] = result;
  localStorage.setItem(`lh_quiz_${courseId}`, JSON.stringify(results));
}

/**
 * Render navbar into the page
 */
function renderNavbar(activePage = '') {
  const navbarContainer = document.getElementById('navbar-container');
  if (!navbarContainer) return;
  const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark navbar-gradient">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="index.html">
          <svg class="me-2" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
          </svg>
          LearnHub
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarMain">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link ${activePage === 'courses' ? 'active' : ''}" href="index.html">Courses</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${activePage === 'about' ? 'active' : ''}" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${activePage === 'contact' ? 'active' : ''}" href="#">Contact</a>
            </li>
          </ul>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-light" type="button">
              <i class="bi bi-search"></i>
            </button>
            <button class="btn btn-light" type="button">Login</button>
          </div>
        </div>
      </div>
    </nav>
  `;
  navbarContainer.innerHTML = navbarHTML;
}

/**
 * Render footer into the page
 */
function renderFooter() {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) return;
  const footerHTML = `
    <footer class="site-footer text-light py-5 footer-gradient">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <h5 class="footer-heading footer-heading-accent">About LearnHub</h5>
            <p class="text-muted">LearnHub is your trusted platform for online learning. We offer expert-led courses to help you grow your skills and advance your career.</p>
          </div>
          <div class="col-lg-4 col-md-6">
            <h5 class="footer-heading footer-heading-accent">Quick Links</h5>
            <ul class="list-unstyled footer-links">
              <li><a href="index.html">All Courses</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Instructors</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div class="col-lg-4 col-md-12">
            <h5 class="footer-heading footer-heading-accent">Contact</h5>
            <ul class="list-unstyled text-muted footer-contact">
              <li><i class="bi bi-geo-alt me-2 footer-icon-accent"></i>123 Education Street, Hanoi, Vietnam</li>
              <li><i class="bi bi-envelope me-2 footer-icon-accent"></i>contact@learnhub.com</li>
              <li><i class="bi bi-phone me-2 footer-icon-accent"></i>+84 123 456 789</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom text-center mt-4 pt-4 border-top footer-border-top">
          <p class="text-muted mb-0">&copy; 2026 LearnHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
  footerContainer.innerHTML = footerHTML;
}

/**
 * Render a single course card
 */
function renderCourseCard(course) {
  const cardHTML = `
    <div class="course-card h-100" data-category="${course.category}">
      <div class="card shadow-sm h-100">
        <div class="card-img-wrapper position-relative overflow-hidden">
          <img src="${course.thumbnail}" class="card-img-top card-img-fixed" alt="${course.title}" loading="lazy">
          <span class="price-badge ${course.price === 0 ? 'free' : ''}">
            ${formatPrice(course.price)}
          </span>
        </div>
        <div class="card-body d-flex flex-column">
          <span class="category-badge">${getCategoryName(course.category)}</span>
          <h3 class="card-title h6 fw-bold">${course.title}</h3>
          <div class="rating-stars mb-2">
            <span class="stars">${formatRating(course.rating)}</span>
            <span class="rating-text">${course.rating} (${course.ratingCount})</span>
          </div>
          <p class="instructor-text">
            <i class="bi bi-person-circle me-1"></i>${course.instructor}
          </p>
          <p class="lessons-text">
            <i class="bi bi-book me-1"></i>${course.lessonsCount} lessons
          </p>
          <div class="mt-auto">
            <a href="course-detail.html?id=${course.id}" class="btn btn-primary w-100">
              View Course
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
  return cardHTML;
}

/**
 * Render all course cards into the grid container
 */
function renderCourseGrid(courses) {
  const container = document.getElementById('course-grid');
  if (!container) return;

  if (courses.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-search fs-1 text-muted"></i>
        <p class="text-muted mt-3">No courses found</p>
      </div>
    `;
    return;
  }

  container.innerHTML = courses
    .map(
      (course) => `
    <div class="col-12 col-md-6 col-lg-4">
      ${renderCourseCard(course)}
    </div>
  `,
    )
    .join('');
}

/**
 * Find course by ID from COURSES array
 */
function findCourseById(courseId) {
  return COURSES.find((c) => c.id === courseId);
}

/**
 * Get query parameter value by name
 */
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/**
 * Filter courses by search text (matches title and instructor)
 */
function filterCoursesBySearch(courses, searchText) {
  if (!searchText.trim()) return courses;
  const lowerSearch = searchText.toLowerCase();
  return courses.filter(
    (course) =>
      course.title.toLowerCase().includes(lowerSearch) ||
      course.instructor.toLowerCase().includes(lowerSearch),
  );
}

/**
 * Filter courses by category
 */
function filterCoursesByCategory(courses, category) {
  if (!category || category === 'all') return courses;
  return courses.filter((course) => course.category === category);
}

/**
 * Sort courses by criteria
 */
function sortCourses(courses, sortBy) {
  const sorted = [...courses];
  switch (sortBy) {
    case 'price-low':
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

// ==================== ADDED: PROBLEM 02 LOGIC ====================

// Filter state for Problem 02
const filterState = {
  searchQuery: '',
  selectedCategory: 'all',
  sortBy: 'default',
};

// Main entry point for index.html
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('courses');
  renderFooter();
  initCourseListing();
});

// Initializes Search, Category Tabs, and Sort Dropdown listeners
function initCourseListing() {
  const courseGrid = document.getElementById('course-grid');
  if (!courseGrid) return; // Exit if not on index.html

  applyFiltersAndRender();

  // Flexible selector support for different HTML id naming
  const searchInput =
    document.getElementById('search-input') ||
    document.getElementById('searchInput');
  const clearSearchBtn =
    document.getElementById('clear-search-btn') ||
    document.getElementById('clearSearchBtn');

  // Live Search listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterState.searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        if (filterState.searchQuery.length > 0) {
          clearSearchBtn.classList.remove('d-none', 'hidden');
        } else {
          clearSearchBtn.classList.add('d-none', 'hidden');
        }
      }
      applyFiltersAndRender();
    });
  }

  // Clear Search button listener
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        filterState.searchQuery = '';
        clearSearchBtn.classList.add('d-none', 'hidden');
        applyFiltersAndRender();
      }
    });
  }

  // Category Tabs listener
  const categoryTabs =
    document.getElementById('category-tabs') ||
    document.getElementById('categoryTabs');
  if (categoryTabs) {
    categoryTabs.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.nav-link');
      if (!targetBtn) return;

      categoryTabs
        .querySelectorAll('.nav-link')
        .forEach((btn) => btn.classList.remove('active'));
      targetBtn.classList.add('active');

      const rawCategory = targetBtn.getAttribute('data-category') || 'All';
      filterState.selectedCategory = rawCategory
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-');
      applyFiltersAndRender();
    });
  }

  // Sort Dropdown listener
  const sortSelect =
    document.getElementById('sort-select') ||
    document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      filterState.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }
}

// Executes search, filter, and sort combined logic using existing utility functions
function applyFiltersAndRender() {
  let result = filterCoursesBySearch(COURSES, filterState.searchQuery);
  result = filterCoursesByCategory(result, filterState.selectedCategory);
  result = sortCourses(result, filterState.sortBy);

  renderCourseGrid(result);
}
