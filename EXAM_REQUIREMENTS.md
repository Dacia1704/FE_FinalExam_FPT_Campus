# File này là bản md của file docx yêu cầu

# Front-End Essentials — Online Learning Platform

### Final Group Exam | Group of 6 | Take-home

- **Document Code:** 25 e-BM/HR/HDCV/FSOFT
- **Version:** 1.0
- **Effective Date:** 07/Jul/2026
- **Location:** Hanoi, 07/2026

---

## 0. Ghi chú chung về bài thi

- Đây là **bài thi nhóm 6 thành viên**, làm ở nhà (take-home).
- Tạo 1 thư mục dự án tên **`GroupX_fee.finalexam.t01`** (thay `X` bằng số nhóm).
- Nén toàn bộ file thành **`GroupX_fee.finalexam.t01.zip`**, nộp qua **XYZ@fsoft.com.vn**.
- Bắt buộc có file **`README.txt`** liệt kê đủ tên + account của 6 thành viên.
- Tất cả các trang phải **mở và chạy được trực tiếp trên Google Chrome**, không cần build step hay server.
- Giám khảo có thể gọi **bất kỳ thành viên nào** để giải trình bất kỳ phần nào trong bài nộp.
- **Bài nộp giống nhau giữa 2 nhóm khác nhau → cả 2 nhóm nhận điểm 0.**

---

## 1. Working Tools & Delivery Requirements

- **Công cụ:** Visual Studio Code (khuyến nghị). Có thể dùng bất kỳ text editor nào.
- **Nộp bài:** source code nén dưới dạng **.zip**.
- **Tên project:** `GroupX_fee.finalexam.t01` — toàn bộ file nằm trong 1 thư mục duy nhất này.

### Cấu trúc thư mục gợi ý (từ đề bài)

```
GroupX_fee.finalexam.t01/
├── index.html          ← Course Listing page (Problem 01 + 02)
├── course-detail.html  ← Course Detail + Lesson Player (Problem 03)
├── admin.html           ← Admin CRUD Panel (Problem 04)
├── style.css            ← Shared styles
├── app.js               ← Shared JS (data, utility functions)
├── admin.js             ← Admin page logic
├── detail.js            ← Detail/quiz page logic
├── images/              ← Any image assets
└── README.txt           ← Group members list
```

---

## 2. Technologies (bắt buộc)

- **HTML5, CSS3, Bootstrap 5** (dùng CDN — không dùng npm). Được phép dùng Bootstrap Icons.
- **Vanilla JavaScript (ES6+).** Không dùng jQuery, không dùng React, không dùng Vue.
- **localStorage** — bắt buộc dùng để lưu dữ liệu xuyên suốt việc reload trang cho **Problem 03** và **Problem 04**.
- **Chart.js (CDN)** — **tuỳ chọn**, chỉ dùng nếu làm widget dashboard cho Admin (Problem 04).
- Tất cả asset (ảnh, font) phải nằm sẵn trong thư mục project — **không dùng CDN cho ảnh**.

---

## 3. Technical Requirements (bắt buộc, áp dụng cho toàn bộ bài)

- Tất cả các trang phải **responsive hoàn toàn**:
  - Desktop: ≥ 992px
  - Tablet: 768–991px
  - Mobile: < 576px
- Tuân thủ **naming convention chuẩn**:
  - Tên file: chữ thường (lowercase)
  - Tên class CSS: kebab-case (vd: `course-card`)
  - Biến JS: camelCase
- **Không dùng** thuộc tính inline `style="..."` — chỉ dùng CSS class.
- **Không dùng** `onclick="..."` inline — phải dùng `addEventListener`.
- Code phải **dễ đọc và có comment đầy đủ**. Mỗi hàm JavaScript phải có **1 dòng comment** mô tả chức năng.

---

## 4. Problem 01 — Course Listing & Detail Pages (Static) — **[25%]**

**Tổng quan:** Xây dựng phần khung giao diện của nền tảng: **Course Listing page** (`index.html`) và **Course Detail page** (`course-detail.html`). Ở problem này, data được **hardcode trong 1 mảng JS**, chưa có tương tác người dùng.

### 1a — Shared Navbar & Footer

**Navbar** (dùng chung cho cả 2 trang):

```
[Logo] LearnHub   Courses   About   Contact   [🔍 Search]   [Login]
```

- Trên mobile: thu gọn về dạng hamburger menu (☰).
- Nút "Login" style theo Bootstrap button.

**Footer** (dùng chung, full width, nhất quán trên cả 2 trang):

- 3 cột: **About LearnHub** | **Quick Links** | **Contact**
- Dòng copyright ở dưới cùng.

### 1b — Course Listing Page (`index.html`)

**Hero Section:**

```
Grow Your Skills with LearnHub
"Explore 100+ expert-led courses at your own pace."
[Browse Courses ▶]   [Learn More]
```

**Category Tabs** (ngay dưới hero):

```
[ All ]  [ Web Dev ]  [ Design ]  [ Data Science ]  [ Marketing ]
```

**Course Cards Grid** — Bootstrap responsive: 3 cột (lg), 2 cột (md), 1 cột (sm). Mỗi card gồm:

- Thumbnail ảnh
- Tên khoá học
- ⭐ Rating + số lượt đánh giá (vd: `⭐ 4.8 (120)`)
- 👤 Tên giảng viên
- 📚 Số lượng lesson (vd: `12 lessons`)
- Giá tiền (hoặc `FREE`) + nút `[Enroll]`

**Yêu cầu:** hiển thị **ít nhất 6 khoá học hardcode**, trải đều trên **3 category**.

### 1c — Course Detail Page (`course-detail.html`)

**Bố cục 2 cột:**

**Cột trái (col-lg-8):**

- Video/Image Banner
- Tiêu đề khoá học (thẻ `<h1>`)
- ⭐ Rating • số học viên (vd: `4.8 • 1,200 students`)
- "By: Tên giảng viên"
- Mục **"What You'll Learn"** — 4 bullet point
- Mục **"Course Description"** — 2 đoạn văn
- Mục **Curriculum** (dạng **Bootstrap Accordion**):
  - `▶ Section 1 — 3 lessons`
  - `▶ Section 2 — 4 lessons`
  - `▶ Section 3 — 5 lessons`

**Cột phải (col-lg-4) — sidebar sticky (dính khi cuộn):**

- Thumbnail khoá học
- Giá tiền
- Nút `[Enroll Now ▶]`
- Mục "This course includes:"
  - ✅ 12 video lessons
  - ✅ Lifetime access
  - ✅ Certificate
  - ✅ Mobile-friendly

> Dùng **Bootstrap Accordion** cho phần curriculum. Toàn bộ data ở trang này là **hardcode**.

---

## 5. Problem 02 — Interactive Course Search & Filtering — **[20%]**

**Tổng quan:** Làm cho trang Course Listing trở nên tương tác. Toàn bộ việc lọc dữ liệu thực hiện bằng JavaScript trên mảng khoá học hardcode — **không reload trang**.

### 2.1 — Search + Live Filter — **[8%]**

Thêm ô tìm kiếm live (đặt trong navbar hoặc phía trên grid khoá học):

- a) Gõ tới đâu, lọc card tới đó, theo thời gian thực. So khớp với **Course Title** và **Instructor Name** (không phân biệt hoa/thường).
- b) Card không khớp thì **ẩn đi (không xoá khỏi DOM)**. Nếu kết quả rỗng → hiển thị thông báo **"No courses found"**.
- c) Bấm icon xoá (✕) hoặc xoá hết chữ trong ô tìm kiếm → reset danh sách ngay lập tức.

### 2.2 — Category Filter Tabs — **[7%]**

Các tab category phía trên course grid có tương tác:

- d) Tab "All" hiện toàn bộ khoá học. Bấm 1 category cụ thể → chỉ hiện khoá học thuộc category đó.
- e) Search và category filter **hoạt động cùng nhau**: ví dụ đã search "JavaScript" rồi bấm tab "Web Dev" → chỉ hiện khoá học Web Dev có chứa "JavaScript".
- f) Tab đang active phải được **highlight rõ ràng** (dùng class `nav-link active` của Bootstrap hoặc style riêng).

### 2.3 — Sort Dropdown — **[5%]**

Thêm 1 dropdown phía trên grid (vd: "Sort by"):

- g) **Default** — giữ nguyên thứ tự gốc.
- h) **Price: Low to High** / **Price: High to Low** — sắp xếp lại card theo giá.
- i) **Rating: High to Low** — sắp xếp lại theo rating giảm dần.

---

## 6. Problem 03 — Lesson Player & Quiz Feature — **[25%]**

**Tổng quan:** Thêm tương tác cho `course-detail.html`: mô phỏng trình phát video bài học và 1 bài quiz cuối mỗi section. Tiến độ được lưu vào **localStorage**.

### 3.1 — Lesson Progress Tracker — **[10%]**

- j) Mỗi lesson trong curriculum accordion có 1 checkbox (✅). Khi user tick, đánh dấu lesson đó **hoàn thành** (lưu vào localStorage dưới dạng **mảng các lesson ID đã hoàn thành**).
- k) Hiển thị **progress bar** ở đầu phần curriculum: **"X / Y lessons completed"**, độ dài thanh progress tỉ lệ thuận.
- l) Khi reload trang, checkbox và progress bar phải được **khôi phục từ localStorage**.
- m) Nếu tất cả lesson trong 1 section đã hoàn thành → tiêu đề section hiện **badge ✅**.

### 3.2 — Section Quiz — **[15%]**

Sau lesson cuối cùng của mỗi section, hiện nút **"Take Quiz"**. Bấm vào sẽ mở ra 1 panel quiz inline gồm:

```
Quiz: Section 1

Q1. What does HTML stand for?
 ◯ a) HyperText Markup Language
 ◯ b) HighText Machine Language
 ◯ c) Hyperlink Text Markup Language
 ◯ d) None of the above

Q2. Which tag defines a paragraph?
 ◯ a) <para>  ◯ b) <p>  ◯ c) <pg>

Q3. (thêm ít nhất 3 câu hỏi mỗi section)

[Submit Quiz]
```

- n) Mỗi section phải có **ít nhất 3 câu hỏi trắc nghiệm**, mỗi câu có **3–4 đáp án**. Đáp án đúng hardcode trong JS.
- o) Khi bấm "Submit Quiz": tính điểm (vd: **"2 / 3 correct"**). Hiển thị kết quả từng câu ngay tại chỗ: đáp án đúng tô **xanh**, đáp án sai tô **đỏ**.
- p) Nếu điểm **≥ 70%**: hiện thông báo **pass** kèm nút **"Continue to next section"** (mở accordion panel tiếp theo). Lưu kết quả pass/fail vào localStorage.
- q) Nếu điểm **< 70%**: hiện thông báo fail kèm nút **"Retake Quiz"** (reset lại form quiz).

---

## 7. Problem 04 — Admin Panel — Full CRUD + localStorage — **[30%]**

**Tổng quan:** Xây dựng 1 trang riêng `admin.html` cho phép admin quản lý danh mục khoá học. Dữ liệu lưu trong **localStorage**, phải tồn tại xuyên suốt các lần reload trang.

### Bố cục trang Admin

```
Top: Navbar [Logo] | "Admin Panel" | [👤 Admin] [Logout]

Left sidebar (fixed): 🏠 Dashboard | 📚 Courses | 👤 Instructors | 📊 Reports

Main area (mặc định active: Courses Management):
┌──────────────────────────────────────────────────────────┐
│ Courses Management                    [+ Add New Course] │
│ [🔍 Search courses...]  [Category ▼]  [Status ▼]         │
│                                                            │
│ ┌────┬──────────────────┬──────────┬───────┬──────────┐  │
│ │ #  │ Title            │ Category │ Price │ Actions  │  │
│ ├────┼──────────────────┼──────────┼───────┼──────────┤  │
│ │ 1  │ HTML Fundamentals│ Web Dev  │ FREE  │ ✏️ 🗑️    │  │
│ │ 2  │ CSS Mastery      │ Design   │ $49   │ ✏️ 🗑️    │  │
│ └────┴──────────────────┴──────────┴───────┴──────────┘  │
│ Pagination: [◀ Prev]  1  2  3  [Next ▶]  (5 per page)     │
└──────────────────────────────────────────────────────────┘
```

### Required Features

**6. [8%] localStorage Persistence**

- Khi load trang, `admin.js` đọc danh sách khoá học từ localStorage.
- Nếu **chưa có gì được lưu**, seed bằng đúng **6 khoá học hardcode** từ Problem 01.
- Mọi thao tác Create/Update/Delete phải **cập nhật localStorage ngay lập tức**.

**7. [5%] READ + Search + Filter**

- Render danh sách khoá học ra bảng.
- Ô search lọc theo **title** (live, gõ tới đâu lọc tới đó).
- Dropdown **Category** và **Status** để lọc bảng.
- Hiện dòng **"No results"** nếu rỗng.
- Tất cả filter phải **áp dụng đồng thời**.

**8. [5%] Pagination**

- Hiển thị **5 khoá học / trang**.
- Hiện số trang ở dưới cùng, nút **Prev / Next**.
- Khi search/filter thay đổi kết quả → **reset về trang 1**.

**9. [6%] CREATE**

- Nút **"+ Add New Course"** mở **Bootstrap modal** với các field:
  - **Title** (text, required, tối thiểu 5 ký tự)
  - **Category** (select: Web Dev / Design / Data Science / Marketing / Other)
  - **Instructor Name** (text, required)
  - **Lesson Count** (number, required, 1–100)
  - **Price** (number, ≥ 0 — nhập 0 nghĩa là Free)
  - **Rating** (number, 1.0–5.0)
  - **Status** (select: Published / Draft)
- Khi submit: validate → sinh ID → thêm vào mảng → lưu localStorage → render lại bảng → đóng modal → hiện toast **"Course created."**

**10. [5%] UPDATE**

- Nút ✏️ (Edit) mở lại đúng modal trên, **điền sẵn dữ liệu hiện tại** của khoá học.
- Khi lưu: cập nhật object trong mảng → lưu localStorage → render lại → hiện toast **"Course updated."**

**11. [6%] DELETE**

- Nút 🗑️ (Delete) hiện **modal xác nhận**.
- Khi confirm: xoá khỏi mảng → lưu localStorage → render lại.
- Nếu khoá học đang bị xoá cũng đang mở ở modal edit → **đóng modal edit trước**.
- Hiện toast **"Course deleted."**

### Bonus (+5% mỗi phần, cộng thêm)

- **(a) Bulk delete:** checkbox trên mỗi dòng + nút "Delete Selected".
- **(b) Export to CSV:** nút tải xuống danh sách khoá học đang lọc dưới dạng file `.csv`, dùng JavaScript `Blob`.

---

## 8. Grading Rubric

| Problem | Section | Tiêu chí đánh giá | Trọng số |
| --- | --- | --- | --- |
| 01 | Course Listing & Detail (Static) | Độ chính xác layout, accordion, grid responsive, navbar/footer dùng chung | **25%** |
| 02 | Search, Filter & Sort | Live search, category tabs, sort — tất cả phải hoạt động cùng nhau | **20%** |
| 03 | Lesson Player & Quiz | Progress bar, localStorage, chấm điểm quiz, logic pass/fail | **25%** |
| 04 | Admin CRUD + localStorage | Đầy đủ create/read/update/delete, pagination, persistence | **30%** |
|  | **TOTAL** |  | **100%** |

---

## 9. Submission Instructions

- **Tên file zip:** `GroupX_fee.finalexam.t01.zip`
- Chứa nguyên vẹn thư mục project. Toàn bộ trang phải mở được trên Chrome **không cần server**.
- Bắt buộc kèm **README.txt** — đủ tên 6 thành viên + account name.
- Nộp qua **XYZ@fsoft.com.vn** hoặc kênh do lớp/admin chỉ định, đúng deadline được thông báo.

---

_— THE END —_
