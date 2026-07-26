File này tổng hợp lại schema trong project

# Data Structure Documentation

## LearnHub - Online Learning Platform

**Project:** Front-End Essentials Final Exam - Online Learning Platform **Version:** 1.0 **Last Updated:** 2026-07-26

---

## 1. Overview

This document describes the data structures implemented in the LearnHub Online Learning Platform project. The project uses vanilla JavaScript with hardcoded data and localStorage for persistence.

### Data Storage Architecture

```
┌─────────────────────────────────────────────────────────┐
│  TIER 1 - STATIC (app.js)                               │
│  const COURSES = [...]                                  │
│  - 6 courses hardcoded                                 │
│  - Used by index.html and course-detail.html            │
│  - Problem 01 (static display)                          │
└─────────────────────────────────────────────────────────┘
                         │
                         │ (seeded on first admin.js load)
                         ▼
┌─────────────────────────────────────────────────────────┐
│  TIER 2 - PERSISTENT (localStorage)                     │
│  - lh_courses (Problem 04 - Admin CRUD)                │
│  - lh_progress_<courseId> (Problem 03 - Lesson)        │
│  - lh_quiz_<courseId> (Problem 03 - Quiz)              │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Course Data Schema

### 2.1 Course Object

```javascript
{
  id: string,                    // "c001" - unique course identifier
  title: string,                 // Course title (min 5 chars for admin form)
  category: string,              // "web-dev" | "design" | "data-science" | "marketing" | "other"
  instructor: string,             // Instructor name
  thumbnail: string,             // Image path, e.g., "images/courses/c001.jpg"
  rating: number,                // 1.0 - 5.0
  ratingCount: number,           // Number of ratings
  students: number,              // Number of enrolled students
  lessonsCount: number,          // Total lessons (auto-calculated from curriculum)
  price: number,                 // 0 = FREE, otherwise price in USD
  status: string,                // "published" | "draft"
  shortDescription: string,      // Short description for card display
  whatYouLearn: string[],       // Array of 4 learning outcomes
  description: string[],         // Array of 2 paragraphs
  curriculum: CurriculumSection[], // Array of curriculum sections
  createdAt: string              // ISO date string
}
```

### 2.2 Category Mapping

| Category Code  | Display Name |
| -------------- | ------------ |
| `web-dev`      | Web Dev      |
| `design`       | Design       |
| `data-science` | Data Science |
| `marketing`    | Marketing    |
| `other`        | Other        |

---

## 3. Curriculum Schema

### 3.1 CurriculumSection

```javascript
{
  id: string,              // "c001-s1" - section identifier
  title: string,           // "Section 1: Getting Started"
  lessons: Lesson[],       // Array of lessons (minimum 3)
  quiz: QuizQuestion[]      // Array of quiz questions (minimum 3)
}
```

### 3.2 Lesson

```javascript
{
  id: string,              // "c001-s1-l1" - unique lesson identifier
  title: string,           // "1.1 Introduction to HTML"
  durationMin: number      // Duration in minutes
}
```

### 3.3 QuizQuestion

```javascript
{
  id: string,              // "c001-s1-q1" - question identifier
  question: string,        // "What does HTML stand for?"
  options: string[],        // Array of 3-4 answer options
  correctIndex: number     // 0-based index of correct answer
}
```

---

## 4. Implemented Courses

### Course List

| ID   | Title                      | Category     | Price | Lessons | Sections |
| ---- | -------------------------- | ------------ | ----- | ------- | -------- |
| c001 | HTML & CSS Fundamentals    | web-dev      | FREE  | 12      | 3        |
| c002 | JavaScript Essentials      | web-dev      | $49   | 10      | 3        |
| c003 | UI/UX Design Mastery       | design       | $59   | 11      | 3        |
| c004 | Python for Data Science    | data-science | $79   | 12      | 3        |
| c005 | Digital Marketing Strategy | marketing    | $39   | 10      | 3        |
| c006 | Responsive Web Design      | design       | FREE  | 9       | 3        |

### Curriculum Structure per Course

Each course contains:

- **3 sections**
- **3-4 lessons per section**
- **3 quiz questions per section**

---

## 5. localStorage Schema

### 5.1 Lesson Progress

**Key:** `lh_progress_<courseId>`  
**Example:** `lh_progress_c001`

```javascript
{
  completedLessonIds: string[],  // ["c001-s1-l1", "c001-s1-l2", ...]
  updatedAt: string              // ISO timestamp
}
```

### 5.2 Quiz Results

**Key:** `lh_quiz_<courseId>`  
**Example:** `lh_quiz_c001`

```javascript
{
  "c001-s1": {
    passed: boolean,             // true if score >= 70%
    score: number,               // Number of correct answers
    total: number,               // Total questions
    answers: number[],           // Selected answer indices
    attemptedAt: string          // ISO timestamp
  }
}
```

### 5.3 Admin Course Data

**Key:** `lh_courses`

```javascript
[
  {
    id: string,
    title: string,
    category: string,
    instructor: string,
    lessonsCount: number,
    price: number,
    rating: number,
    status: string,
    createdAt: string,
    updatedAt: string,
  },
  // ... more courses
];
```

---

## 7. localStorage Keys Summary

| Key                      | Written By | Read By   | Purpose                    |
| ------------------------ | ---------- | --------- | -------------------------- |
| `lh_courses`             | admin.js   | admin.js  | Admin CRUD storage         |
| `lh_progress_<courseId>` | detail.js  | detail.js | Lesson completion tracking |
| `lh_quiz_<courseId>`     | detail.js  | detail.js | Quiz results per section   |

---

## 8. Helper Functions

### Data Manipulation

- `findCourseById(courseId)` - Find course by ID
- `filterCoursesBySearch(courses, searchText)` - Filter by title/instructor
- `filterCoursesByCategory(courses, category)` - Filter by category
- `sortCourses(courses, sortBy)` - Sort by price or rating
- `computeLessonsCount(course)` - Calculate total lessons

### Display Formatting

- `formatPrice(price)` - Format price ($49 or FREE)
- `formatRating(rating)` - Format star display
- `formatNumber(num)` - Add thousand separators
- `getCategoryName(category)` - Get display name for category

### localStorage Operations

- `getProgress(courseId)` - Get lesson progress
- `saveProgress(courseId, completedLessonIds)` - Save lesson progress
- `getQuizResults(courseId)` - Get quiz results
- `saveQuizResult(courseId, sectionId, result)` - Save quiz result

### Rendering Functions

- `renderNavbar(activePage)` - Render shared navbar
- `renderFooter()` - Render shared footer
- `renderCourseCard(course)` - Render single course card
- `renderCourseGrid(courses)` - Render course grid

---

## 9. File Structure

```
FE_Final/
├── index.html              # Course Listing (Problem 01 + 02)
├── course-detail.html      # Course Detail (Problem 01 + 03)
├── admin.html              # Admin Panel (Problem 04)
├── app.js                 # Shared data + utilities
├── detail.js              # Course detail page logic
├── admin.js               # Admin page logic
├── style.css              # Shared styles
├── images/
│   └── courses/           # Course thumbnails (c001.jpg - c006.jpg)
└── DataStructure.md       # This documentation
```
