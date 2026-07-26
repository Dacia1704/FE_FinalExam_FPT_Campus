#File thiết kế ban đầu gen từ file yêu cầu

# LearnHub — Online Learning Platform

### Tài liệu thiết kế dự án (Project Design Document)

**Đề bài:** FE Final Group Exam — Online Learning Platform (multi-page, JS, CRUD, localStorage)

---

## 1. Tổng quan đề bài

Xây dựng 1 nền tảng học trực tuyến gồm **3 trang HTML** dùng chung CSS/JS, không build tool, không server, chạy thẳng bằng Chrome:

| Problem | Nội dung | Trang | Trọng số |
| --- | --- | --- | --- |
| 01 | Course Listing + Course Detail (tĩnh, data hardcode) | `index.html`, `course-detail.html` | 25% |
| 02 | Search + Filter category + Sort (JS thuần, không reload) | `index.html` | 20% |
| 03 | Lesson Progress Tracker + Section Quiz (lưu `localStorage`) | `course-detail.html` | 25% |
| 04 | Admin Panel — Full CRUD khoá học (lưu `localStorage`) | `admin.html` | 30% |

Ràng buộc kỹ thuật quan trọng cần phản ánh vào thiết kế data:

- Không dùng React/Vue/jQuery → mọi state sống trong **biến JS thuần** + `localStorage`.
- Không có backend/database thật → `localStorage` đóng vai trò "DB" giả lập.
- 2 nguồn dữ liệu độc lập nhưng phải **đồng bộ seed** với nhau:
  - Data hiển thị công khai ở `index.html` / `course-detail.html` (Problem 01–03) = **hardcoded** trong `app.js`.
  - Data quản trị ở `admin.html` (Problem 04) = **localStorage**, seed lần đầu bằng đúng 6 khoá học hardcode ở trên.

---

## 2. Cấu trúc thư mục

```
GroupX_fee.finalexam.t01/
├── index.html            # Problem 01 + 02 — Course Listing (hero, tabs, search, sort, grid card)
├── course-detail.html    # Problem 01 + 03 — Course Detail (mô tả, curriculum accordion, quiz)
├── admin.html            # Problem 04 — Admin Panel (sidebar, bảng CRUD, modal, pagination)
├── style.css             # CSS dùng chung: navbar, footer, hero, card, accordion, quiz, admin table...
├── app.js                # "Nguồn dữ liệu gốc" (COURSES array) + hàm dùng chung (navbar/footer render,
│                          #   card render, filter/sort, format tiền, toast, storage helper...)
├── detail.js              # Logic riêng course-detail.html: đọc ?id=, render curriculum, progress
│                          #   tracker, quiz, chấm điểm — chỉ load ở course-detail.html
├── admin.js               # Logic riêng admin.html: seed localStorage, render bảng, search/filter,
│                          #   pagination, modal create/update, xoá, toast — chỉ load ở admin.html
├── images/                # Ảnh thumbnail khoá học, banner, avatar, favicon... (không dùng ảnh CDN)
│   ├── courses/           # thumbnail theo từng course, đặt tên trùng courseId (vd: c001.jpg)
│   └── icons/             # icon phụ nếu không dùng Bootstrap Icons
└── README.txt             # Danh sách 6 thành viên + account name (theo yêu cầu đề bài)
```

**Vì sao tách file như vậy:**

- `app.js` là **single source of truth** cho dữ liệu tĩnh (mảng `COURSES`) và các hàm dùng chung (render card, format giá, debounce search...) — cả `index.html` lẫn `detail.js`/`admin.js` đều `<script src="app.js">` trước, rồi mới load script riêng của trang.
- `detail.js`, `admin.js` tách riêng để mỗi trang chỉ tải đúng logic của nó (đỡ nhầm biến toàn cục, dễ chia việc cho 6 thành viên: 1 người/1 file JS).
- `style.css` dùng chung để tránh lệch UI giữa 3 trang (đề bài yêu cầu navbar/footer nhất quán).

Thứ tự load script gợi ý trong mỗi trang:

```html
<!-- index.html -->
<script src="app.js"></script>
<!-- data + shared helpers -->
<!-- (logic search/filter/sort của Problem 02 có thể viết thẳng trong app.js hoặc 1 file index.js riêng) -->

<!-- course-detail.html -->
<script src="app.js"></script>
<script src="detail.js"></script>

<!-- admin.html -->
<script src="app.js"></script>
<script src="admin.js"></script>
```

---

## 3. Kiến trúc dữ liệu tổng quát

Có **2 tầng lưu trữ** hoàn toàn tách biệt:

```
┌─────────────────────────────┐        ┌──────────────────────────────┐
│  TẦNG 1 — STATIC (app.js)   │        │  TẦNG 2 — PERSISTENT          │
│  const COURSES = [...]      │  seed  │  window.localStorage          │
│  (6 khoá học hardcode,      │ ─────► │  - lh_courses        (P.04)   │
│   dùng cho index +          │        │  - lh_progress_<id>  (P.03)   │
│   course-detail)            │        │  - lh_quiz_<id>      (P.03)   │
└─────────────────────────────┘        └──────────────────────────────┘
```

- **index.html / course-detail.html** đọc trực tiếp từ `COURSES` (biến JS trong RAM, mất khi refresh — đúng yêu cầu "Problem 01 là static, data hardcode").
- **course-detail.html** (Problem 03) đọc thêm 2 key localStorage để khôi phục tiến độ học (`lh_progress_<courseId>`) và kết quả quiz (`lh_quiz_<courseId>`) — 2 key này **độc lập với `lh_courses`**.
- **admin.html** (Problem 04) đọc/ghi **bản sao độc lập** trong `lh_courses`. Lần đầu tiên (`lh_courses` chưa tồn tại) → seed = `structuredClone(COURSES)` từ `app.js`. Sau đó admin CRUD trên bản sao này, **không** ảnh hưởng ngược lại mảng `COURSES` gốc (vì đề bài không yêu cầu 2 trang đồng bộ real-time, chỉ yêu cầu admin tự persist).

---

## 4. Schema chi tiết

### 4.1. `Course` — object khoá học (dùng trong `COURSES` ở app.js, và seed cho `lh_courses`)

```ts
Course {
  id: string                // "c001".."c006" — bắt buộc unique, dùng làm khoá query (?id=) và khoá localStorage
  title: string              // "HTML & CSS Fundamentals" — min 5 ký tự (ràng buộc form Problem 04)
  category: "web-dev" | "design" | "data-science" | "marketing" | "other"
  instructor: string          // tên giảng viên, hiển thị "By: {instructor}"
  thumbnail: string           // đường dẫn ảnh, vd "images/courses/c001.jpg"
  rating: number              // 1.0 - 5.0, hiển thị "⭐ 4.8"
  ratingCount: number         // số lượt đánh giá, hiển thị "(120)"
  students: number            // "1,200 students" ở trang detail
  lessonsCount: number        // tổng số lesson — PHẢI khớp với tổng length của curriculum[].lessons
  price: number                // 0 = FREE, ngược lại hiển thị "$49"
  status: "published" | "draft" // dùng lọc ở Admin (Problem 04), index.html chỉ hiển thị course "published"
  shortDescription: string    // 1 dòng, hiển thị trên card
  whatYouLearn: string[]      // đúng 4 bullet, hiển thị mục "What You'll Learn"
  description: string[]       // mảng 2 đoạn văn, mỗi phần tử = 1 <p>
  curriculum: CurriculumSection[]   // xem 4.2
  createdAt: string            // ISO date, phục vụ sort/hiển thị admin (không bắt buộc ở đề nhưng nên có)
}
```

Ví dụ 1 record đầy đủ:

```json
{
  "id": "c001",
  "title": "HTML & CSS Fundamentals",
  "category": "web-dev",
  "instructor": "Nguyen Van A",
  "thumbnail": "images/courses/c001.jpg",
  "rating": 4.8,
  "ratingCount": 120,
  "students": 1200,
  "lessonsCount": 12,
  "price": 0,
  "status": "published",
  "shortDescription": "Learn the building blocks of the modern web.",
  "whatYouLearn": [
    "Build semantic HTML5 pages",
    "Style layouts with modern CSS3",
    "Use Flexbox and Grid confidently",
    "Make responsive pages for any device"
  ],
  "description": [
    "This course walks you through HTML5 and CSS3 from the ground up...",
    "By the end, you will be able to build fully responsive landing pages..."
  ],
  "curriculum": [
    /* xem CurriculumSection bên dưới */
  ],
  "createdAt": "2026-06-01T00:00:00.000Z"
}
```

> **Lưu ý ràng buộc chéo:** `lessonsCount` phải bằng tổng số lesson trong toàn bộ `curriculum` — nên tính bằng hàm `computeLessonsCount(course)` thay vì hardcode 2 lần để tránh lệch số liệu giữa card và trang detail.

### 4.2. `CurriculumSection` + `Lesson` + `Quiz` (nested trong `Course.curriculum`)

```ts
CurriculumSection {
  id: string                 // "c001-s1" — dùng làm khoá lưu trạng thái quiz đã pass hay chưa
  title: string               // "Section 1: Getting Started"
  lessons: Lesson[]           // ≥ 3 lesson mỗi section (theo mẫu UI trong đề)
  quiz: QuizQuestion[]        // ≥ 3 câu hỏi mỗi section (bắt buộc theo đề — mục 5n)
}

Lesson {
  id: string                  // "c001-s1-l1" — duy nhất toàn hệ thống, dùng để lưu vào mảng completed lesson id
  title: string                // "1.1 Introduction to HTML"
  durationMin: number           // 5 — hiển thị "5 min", không bắt buộc nhưng hữu ích cho UI
}

QuizQuestion {
  id: string                   // "c001-s1-q1"
  question: string              // "What does HTML stand for?"
  options: string[]             // 3-4 phần tử, vd ["HyperText Markup Language", "HighText Machine Language", ...]
  correctIndex: number           // index (0-based) của đáp án đúng trong options — ĐÁP ÁN HARDCODE Ở JS, không hiện ra HTML
}
```

Ví dụ:

```json
{
  "id": "c001-s1",
  "title": "Section 1: Getting Started",
  "lessons": [
    { "id": "c001-s1-l1", "title": "1.1 Introduction to HTML", "durationMin": 5 },
    { "id": "c001-s1-l2", "title": "1.2 Basic Tags & Structure", "durationMin": 8 },
    { "id": "c001-s1-l3", "title": "1.3 Setting up your first page", "durationMin": 6 }
  ],
  "quiz": [
    {
      "id": "c001-s1-q1",
      "question": "What does HTML stand for?",
      "options": [
        "HyperText Markup Language",
        "HighText Machine Language",
        "Hyperlink Text Markup Language",
        "None of the above"
      ],
      "correctIndex": 0
    },
    {
      "id": "c001-s1-q2",
      "question": "Which tag defines a paragraph?",
      "options": ["<para>", "<p>", "<pg>"],
      "correctIndex": 1
    },
    {
      "id": "c001-s1-q3",
      "question": "Which tag is used for the largest heading?",
      "options": ["<h6>", "<heading>", "<h1>"],
      "correctIndex": 2
    }
  ]
}
```

---

### 4.3. localStorage — `lh_progress_<courseId>` (Problem 03 — Lesson Progress Tracker)

Key: `` `lh_progress_${courseId}` `` (mỗi khoá học 1 key riêng, tránh 1 blob khổng lồ chung).

```ts
ProgressRecord {
  completedLessonIds: string[]     // vd ["c001-s1-l1", "c001-s1-l2"] — nguồn để tính progress bar
  updatedAt: string                 // ISO timestamp, phục vụ debug
}
```

Ví dụ giá trị lưu trong `localStorage.getItem("lh_progress_c001")`:

```json
{
  "completedLessonIds": ["c001-s1-l1", "c001-s1-l2", "c001-s1-l3"],
  "updatedAt": "2026-07-20T09:15:00.000Z"
}
```

Cách tính hiển thị:

- `% progress = completedLessonIds.length / course.lessonsCount * 100`
- Section được coi là **hoàn thành** (✅ badge) khi **toàn bộ** `lesson.id` của section đó nằm trong `completedLessonIds`.
- "Take Quiz" chỉ hiện khi lesson cuối cùng của section đã có trong `completedLessonIds`.

### 4.4. localStorage — `lh_quiz_<courseId>` (Problem 03 — Section Quiz result)

Key: `` `lh_quiz_${courseId}` ``, value là **object map theo sectionId** (1 course có nhiều section):

```ts
QuizResultMap {
  [sectionId: string]: {
    passed: boolean            // score >= 70%
    score: number                // số câu đúng, vd 2
    total: number                 // tổng số câu, vd 3
    answers: number[]            // index đáp án user đã chọn theo thứ tự question, vd [0, 1, 2]
    attemptedAt: string           // ISO timestamp lần cuối submit
  }
}
```

Ví dụ:

```json
{
  "c001-s1": {
    "passed": true,
    "score": 2,
    "total": 3,
    "answers": [0, 1, 1],
    "attemptedAt": "2026-07-20T09:20:00.000Z"
  }
}
```

> Khi `passed = true` → mở khoá accordion panel tiếp theo (theo yêu cầu 5p). Khi `passed = false` → hiển thị nút "Retake Quiz", reset form (không cần xoá record cũ, chỉ ghi đè khi submit lại).

---

### 4.5. localStorage — `lh_courses` (Problem 04 — Admin CRUD, nguồn dữ liệu độc lập)

Key: `lh_courses` → value là **mảng `AdminCourse[]`**, cấu trúc kế thừa gần như y hệt `Course` (mục 4.1) nhưng **bỏ bớt phần nội dung học tập** (curriculum/description) vì admin chỉ quản lý thông tin catalogue, không soạn nội dung bài học trong phạm vi đề:

```ts
AdminCourse {
  id: string                 // vd "c007" — sinh mới bằng `"c" + Date.now()` hoặc increment id lớn nhất hiện có
  title: string                // required, min 5 ký tự
  category: "web-dev" | "design" | "data-science" | "marketing" | "other"
  instructor: string            // required
  lessonsCount: number           // required, 1-100
  price: number                  // >= 0, 0 = Free
  rating: number                  // 1.0 - 5.0
  status: "published" | "draft"
  createdAt: string               // ISO, set khi CREATE, không đổi khi UPDATE
  updatedAt: string               // ISO, set/refresh mỗi lần CREATE hoặc UPDATE
}
```

Ví dụ toàn bộ giá trị `lh_courses`:

```json
[
  {
    "id": "c001",
    "title": "HTML & CSS Fundamentals",
    "category": "web-dev",
    "instructor": "Nguyen Van A",
    "lessonsCount": 12,
    "price": 0,
    "rating": 4.8,
    "status": "published",
    "createdAt": "2026-06-01T00:00:00.000Z",
    "updatedAt": "2026-06-01T00:00:00.000Z"
  }
]
```

**Quy tắc seed lần đầu (chạy 1 lần trong `admin.js`, khi `localStorage.getItem("lh_courses") === null`):**

```js
function seedCoursesIfEmpty() {
  if (localStorage.getItem("lh_courses") === null) {
    const seed = COURSES.map((c) => ({
      id: c.id,
      title: c.title,
      category: c.category,
      instructor: c.instructor,
      lessonsCount: c.lessonsCount,
      price: c.price,
      rating: c.rating,
      status: c.status,
      createdAt: c.createdAt,
      updatedAt: c.createdAt,
    }));
    localStorage.setItem("lh_courses", JSON.stringify(seed));
  }
}
```

**Quy tắc CRUD ghi đè localStorage (mọi thao tác đều đọc mảng ra, sửa, rồi `setItem` lại nguyên mảng — không có API partial update):**

- **CREATE:** validate form → tạo `id` mới duy nhất → push vào mảng → `updatedAt = createdAt = now` → save → re-render → toast "Course created."
- **UPDATE:** tìm theo `id` → merge field mới → `updatedAt = now` (giữ nguyên `createdAt`) → save → re-render → toast "Course updated."
- **DELETE:** confirm modal → `filter(c => c.id !== targetId)` → save → nếu course đang mở edit modal thì đóng modal trước → re-render → toast "Course deleted."
- **Search/Filter/Pagination là thao tác thuần hiển thị (view-only)**, không ghi lại localStorage — luôn tính lại từ mảng gốc mỗi lần render: `filter theo title` → `filter theo category` → `filter theo status` → `slice theo page * 5`.

---

## 5. Bảng tổng hợp localStorage keys

| Key | Ghi bởi | Đọc bởi | Kiểu dữ liệu | Vòng đời |
| --- | --- | --- | --- | --- |
| `lh_courses` | admin.js | admin.js | `AdminCourse[]` | Seed 1 lần từ `COURSES`, sau đó độc lập, tồn tại vĩnh viễn cho tới khi user clear browser data |
| `lh_progress_<courseId>` | detail.js | detail.js | `ProgressRecord` | 1 key / course, ghi mỗi lần tick checkbox lesson |
| `lh_quiz_<courseId>` | detail.js | detail.js | `QuizResultMap` (theo sectionId) | 1 key / course, ghi mỗi lần "Submit Quiz" |

Quy ước đặt tên key: prefix `lh_` (LearnHub) để tránh đụng key của extension trình duyệt hoặc site khác khi test trên cùng `localhost`/`file://`.

---

## 6. Luồng dữ liệu giữa các trang (không dùng router/framework)

```
index.html (Problem 01+02)
   │  lấy COURSES từ app.js → render card → search/filter/sort chỉ thao tác trên bản copy trong RAM
   │
   │  user click "Enroll" / card → điều hướng
   ▼
course-detail.html?id=c001  (Problem 01+03)
   │  đọc query param "id" → find trong COURSES (app.js) → render mô tả + curriculum
   │  đọc localStorage["lh_progress_c001"] + localStorage["lh_quiz_c001"] → khôi phục UI
   │  user tick lesson / làm quiz → ghi đè 2 key trên
   ▼
(độc lập) admin.html (Problem 04)
   │  đọc/seed localStorage["lh_courses"] — KHÔNG liên quan gì đến 2 trang trên
   │  CRUD → luôn ghi đè lại toàn bộ localStorage["lh_courses"]
```

Điều hướng giữa `index.html` → `course-detail.html` dùng query string chuẩn:

```html
<a href="course-detail.html?id=c001">View Course</a>
```

```js
// detail.js
const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");
const course = COURSES.find((c) => c.id === courseId);
```

---

## 7. Quy ước đặt tên (khớp yêu cầu "Technical Requirements" của đề)

- File: chữ thường, gạch nối — `course-detail.html`, `admin.js`.
- CSS class: kebab-case — `.course-card`, `.quiz-panel`, `.progress-bar-track`.
- Biến/hàm JS: camelCase — `renderCourseCard()`, `computeLessonsCount()`, `filteredCourses`.
- ID phần tử DOM dùng để bind JS: camelCase hoặc kebab-case nhất quán trong toàn team, ví dụ `#courseGrid`, `#searchInput`.
- Toàn bộ ID nghiệp vụ (course/section/lesson/question) đi theo prefix phân cấp: `c001` → `c001-s1` → `c001-s1-l1` / `c001-s1-q1`, giúp dễ trace và tránh trùng khi 6 thành viên cùng thêm data.

---

## 8. Ghi chú phân công theo file (gợi ý cho nhóm 6 người)

| File | Vai trò |
| --- | --- |
| `app.js` (COURSES data + helpers) | 1 người chốt schema + hardcode data trước tiên — cả nhóm phụ thuộc vào file này |
| `index.html` + phần search/filter/sort | 1-2 người (Problem 01b + 02) |
| `course-detail.html` + `detail.js` | 1-2 người (Problem 01c + 03) |
| `admin.html` + `admin.js` | 1-2 người (Problem 04) |
| `style.css` + responsive | Cả nhóm đóng góp, 1 người tổng hợp lại cho đồng nhất |

---

_Tài liệu này chỉ mô tả kiến trúc thư mục và schema dữ liệu — không phải là code hoàn chỉnh. Khi bắt tay code thật, giữ nguyên tên field/key ở trên để các file JS của các thành viên khác nhau ghép lại không bị lệch._
