/**
 * LearnHub - Online Learning Platform
 * admin.js - Logic for Admin Panel (Problem 04)
 */

// ==================== STATE VARIABLES ====================
let adminCourses = [];
let filteredCourses = [];
let currentSearch = "";
let currentCategory = "all";
let currentStatus = "all";
let currentPage = 1;
const ITEMS_PER_PAGE = 5;
const selectedIds = new Set();
let deletingTarget = null; // single course ID or "bulk"

// Bootstrap Modal Instances
let courseModalInstance = null;
let deleteModalInstance = null;

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function () {
  // Load courses from localStorage (seeded if first run)
  adminCourses = getAdminCourses();

  // Initialize Bootstrap modal references
  const courseModalEl = document.getElementById("courseModal");
  if (courseModalEl) {
    courseModalInstance = new bootstrap.Modal(courseModalEl);
  }

  const deleteModalEl = document.getElementById("deleteConfirmModal");
  if (deleteModalEl) {
    deleteModalInstance = new bootstrap.Modal(deleteModalEl);
  }

  // Initialize event listeners
  initSidebarNavigation();
  initFilterControls();
  initFormHandlers();
  initBulkAndDeleteControls();

  // Initial render
  renderAdminView();
});

// ==================== SIDEBAR & TABS ====================
function initSidebarNavigation() {
  const sidebarLinks = document.querySelectorAll(".admin-sidebar .nav-link");

  sidebarLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetTab = this.dataset.tab;
      if (!targetTab) return;

      // Update active link state
      sidebarLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");

      // Hide all view sections
      document.querySelectorAll("main.admin-main-content > section").forEach(sec => {
        sec.classList.add("d-none");
      });

      // Show target view section
      const targetView = document.getElementById(`view-${targetTab}`);
      if (targetView) {
        targetView.classList.remove("d-none");
      }

      // Refresh stats if switching to dashboard
      if (targetTab === "dashboard") {
        renderDashboardStats();
      }
    });
  });
}

// ==================== FILTER & SEARCH CONTROLS ====================
function initFilterControls() {
  const searchInput = document.getElementById("admin-search-input");
  const clearSearchBtn = document.getElementById("admin-clear-search");
  const categoryFilter = document.getElementById("admin-category-filter");
  const statusFilter = document.getElementById("admin-status-filter");

  // Live search input
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      currentSearch = this.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = currentSearch ? "block" : "none";
      }
      currentPage = 1; // Reset to Page 1 on filter change
      renderAdminView();
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      if (searchInput) searchInput.value = "";
      currentSearch = "";
      this.style.display = "none";
      currentPage = 1;
      renderAdminView();
    });
  }

  // Category filter dropdown
  if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
      currentCategory = this.value;
      currentPage = 1;
      renderAdminView();
    });
  }

  // Status filter dropdown
  if (statusFilter) {
    statusFilter.addEventListener("change", function () {
      currentStatus = this.value;
      currentPage = 1;
      renderAdminView();
    });
  }
}

// ==================== CORE RENDER FUNCTION ====================
function renderAdminView() {
  // 1. Filter dataset by search text, category, and status simultaneously
  filteredCourses = adminCourses.filter(course => {
    // Search filter (matches title or instructor case-insensitive)
    const matchesSearch = !currentSearch.trim() ||
      course.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
      course.instructor.toLowerCase().includes(currentSearch.toLowerCase());

    // Category filter
    const matchesCategory = currentCategory === "all" || course.category === currentCategory;

    // Status filter
    const matchesStatus = currentStatus === "all" || course.status === currentStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 2. Update badge count on sidebar
  const badgeEl = document.getElementById("courses-count-badge");
  if (badgeEl) badgeEl.textContent = adminCourses.length;

  // 3. Calculate pagination values
  const totalItems = filteredCourses.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  // Ensure current page remains within valid bounds
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageSlice = filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 4. Render Table Rows
  renderTableRows(pageSlice, startIndex);

  // 5. Render Pagination Controls
  renderPagination(totalItems, totalPages);

  // 6. Update Empty State visibility
  const emptyStateEl = document.getElementById("admin-empty-state");
  const tableBody = document.getElementById("admin-course-table-body");
  if (emptyStateEl && tableBody) {
    if (totalItems === 0) {
      emptyStateEl.classList.remove("d-none");
      tableBody.innerHTML = "";
    } else {
      emptyStateEl.classList.add("d-none");
    }
  }

  // 7. Update Bulk Select Header Checkbox & Bulk Delete Button
  updateBulkDeleteUI();

  // 8. Refresh Dashboard Analytics
  renderDashboardStats();
}

// ==================== TABLE ROW RENDERING ====================
function renderTableRows(coursesSlice, startIndex) {
  const tbody = document.getElementById("admin-course-table-body");
  if (!tbody) return;

  tbody.innerHTML = coursesSlice.map((course, idx) => {
    const isChecked = selectedIds.has(course.id) ? "checked" : "";
    const indexNumber = startIndex + idx + 1;
    const thumbnailSrc = course.thumbnail || "images/courses/c001.jpg";

    return `
      <tr data-id="${course.id}">
        <td class="text-center">
          <input type="checkbox" class="form-check-input course-select-checkbox" data-id="${course.id}" ${isChecked}>
        </td>
        <td class="fw-semibold text-muted">${indexNumber}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <img src="${thumbnailSrc}" alt="${course.title}" class="course-thumb-mini shadow-sm" onerror="this.src='images/courses/c001.jpg'">
            <div>
              <div class="fw-bold text-dark text-truncate" style="max-width: 260px;" title="${course.title}">
                ${escapeHTML(course.title)}
              </div>
              <small class="text-muted">ID: ${course.id}</small>
            </div>
          </div>
        </td>
        <td>
          <span class="badge bg-light text-dark border">
            ${getCategoryName(course.category)}
          </span>
        </td>
        <td>
          <div class="small fw-medium">${escapeHTML(course.instructor)}</div>
        </td>
        <td class="text-center">
          <span class="badge bg-secondary bg-opacity-10 text-secondary border">
            ${course.lessonsCount || 0} lessons
          </span>
        </td>
        <td class="text-end fw-bold ${course.price === 0 ? 'text-success' : 'text-dark'}">
          ${formatPrice(course.price)}
        </td>
        <td class="text-center">
          <span class="small fw-semibold text-warning">
            ⭐ ${course.rating ? course.rating.toFixed(1) : '5.0'}
          </span>
        </td>
        <td class="text-center">
          <span class="badge-status ${course.status === 'published' ? 'published' : 'draft'}">
            ${course.status || 'published'}
          </span>
        </td>
        <td class="text-center">
          <div class="d-flex justify-content-center gap-1">
            <button class="btn btn-sm btn-outline-primary action-btn edit-course-btn" data-id="${course.id}" title="Edit Course">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger action-btn delete-course-btn" data-id="${course.id}" title="Delete Course">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  // Attach row event listeners for checkbox selection, edit button, delete button
  tbody.querySelectorAll(".course-select-checkbox").forEach(chk => {
    chk.addEventListener("change", function () {
      const courseId = this.dataset.id;
      if (this.checked) {
        selectedIds.add(courseId);
      } else {
        selectedIds.delete(courseId);
      }
      updateBulkDeleteUI();
    });
  });

  tbody.querySelectorAll(".edit-course-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const courseId = this.dataset.id;
      openEditModal(courseId);
    });
  });

  tbody.querySelectorAll(".delete-course-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const courseId = this.dataset.id;
      openDeleteConfirmation(courseId);
    });
  });
}

// ==================== PAGINATION RENDERING ====================
function renderPagination(totalItems, totalPages) {
  const paginationContainer = document.getElementById("admin-pagination");
  const infoText = document.getElementById("admin-pagination-info");

  if (!paginationContainer || !infoText) return;

  if (totalItems === 0) {
    infoText.textContent = "Showing 0 courses";
    paginationContainer.innerHTML = "";
    return;
  }

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);
  infoText.textContent = `Showing ${startItem}-${endItem} of ${totalItems} courses`;

  let html = "";

  // Prev Button
  const isPrevDisabled = currentPage === 1 ? "disabled" : "";
  html += `
    <li class="page-item ${isPrevDisabled}">
      <a class="page-link" href="#" data-page="${currentPage - 1}" aria-label="Previous">
        <i class="bi bi-chevron-left"></i> Prev
      </a>
    </li>
  `;

  // Page Numbers
  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage ? "active" : "";
    html += `
      <li class="page-item ${isActive}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>
    `;
  }

  // Next Button
  const isNextDisabled = currentPage === totalPages ? "disabled" : "";
  html += `
    <li class="page-item ${isNextDisabled}">
      <a class="page-link" href="#" data-page="${currentPage + 1}" aria-label="Next">
        Next <i class="bi bi-chevron-right"></i>
      </a>
    </li>
  `;

  paginationContainer.innerHTML = html;

  // Add click listeners to pagination links
  paginationContainer.querySelectorAll(".page-link").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetPage = parseInt(this.dataset.page);
      if (targetPage && targetPage >= 1 && targetPage <= totalPages && targetPage !== currentPage) {
        currentPage = targetPage;
        renderAdminView();
      }
    });
  });
}

// ==================== BULK DELETE & EXPORT CONTROLS ====================
function initBulkAndDeleteControls() {
  const selectAllCheckbox = document.getElementById("select-all-courses");
  const bulkDeleteBtn = document.getElementById("bulk-delete-btn");
  const exportCsvBtn = document.getElementById("export-csv-btn");
  const confirmDeleteBtn = document.getElementById("confirm-delete-btn");

  // Select all checkbox handler
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", function () {
      const currentPageRowCheckboxes = document.querySelectorAll("#admin-course-table-body .course-select-checkbox");
      currentPageRowCheckboxes.forEach(chk => {
        chk.checked = this.checked;
        const courseId = chk.dataset.id;
        if (this.checked) {
          selectedIds.add(courseId);
        } else {
          selectedIds.delete(courseId);
        }
      });
      updateBulkDeleteUI();
    });
  }

  // Bulk Delete Button Click
  if (bulkDeleteBtn) {
    bulkDeleteBtn.addEventListener("click", function () {
      if (selectedIds.size === 0) return;
      deletingTarget = "bulk";
      const deleteMsgEl = document.getElementById("delete-modal-msg");
      if (deleteMsgEl) {
        deleteMsgEl.textContent = `Are you sure you want to delete the ${selectedIds.size} selected courses? This action cannot be undone.`;
      }
      if (deleteModalInstance) {
        deleteModalInstance.show();
      }
    });
  }

  // Confirm Delete Button Click (Handles both Single & Bulk Delete)
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", function () {
      if (!deletingTarget) return;

      if (deletingTarget === "bulk") {
        // Bulk Delete
        const countToDelete = selectedIds.size;
        adminCourses = adminCourses.filter(c => !selectedIds.has(c.id));
        selectedIds.clear();
        saveAdminCourses(adminCourses);
        showToast(`Successfully deleted ${countToDelete} courses.`, "success");
      } else {
        // Single Delete
        const courseToDelete = adminCourses.find(c => c.id === deletingTarget);
        adminCourses = adminCourses.filter(c => c.id !== deletingTarget);
        selectedIds.delete(deletingTarget);
        saveAdminCourses(adminCourses);

        const courseTitle = courseToDelete ? courseToDelete.title : "Course";
        showToast(`Course "${courseTitle}" deleted.`, "success");
      }

      deletingTarget = null;
      if (deleteModalInstance) {
        deleteModalInstance.hide();
      }

      // Re-render
      renderAdminView();
    });
  }

  // Export CSV Button Click
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener("click", exportCoursesToCSV);
  }
}

// Update Bulk Delete UI State
function updateBulkDeleteUI() {
  const bulkDeleteBtn = document.getElementById("bulk-delete-btn");
  const selectedCountEl = document.getElementById("selected-count");
  const selectAllCheckbox = document.getElementById("select-all-courses");

  if (selectedCountEl) {
    selectedCountEl.textContent = selectedIds.size;
  }

  if (bulkDeleteBtn) {
    if (selectedIds.size > 0) {
      bulkDeleteBtn.classList.remove("d-none");
      bulkDeleteBtn.classList.add("d-flex");
    } else {
      bulkDeleteBtn.classList.add("d-none");
      bulkDeleteBtn.classList.remove("d-flex");
    }
  }

  // Sync select-all checkbox header state
  if (selectAllCheckbox) {
    const visibleCheckboxes = document.querySelectorAll("#admin-course-table-body .course-select-checkbox");
    if (visibleCheckboxes.length > 0) {
      const allChecked = Array.from(visibleCheckboxes).every(c => c.checked);
      selectAllCheckbox.checked = allChecked;
    } else {
      selectAllCheckbox.checked = false;
    }
  }
}

// ==================== CSV EXPORT FUNCTIONALITY ====================
function exportCoursesToCSV() {
  if (filteredCourses.length === 0) {
    showToast("No courses available to export.", "warning");
    return;
  }

  // Define CSV Header
  const headers = ["ID", "Title", "Category", "Instructor", "Lessons Count", "Price", "Rating", "Status", "Created At"];

  // Map courses data to CSV rows
  const csvRows = [
    headers.join(","),
    ...filteredCourses.map(c => [
      `"${c.id}"`,
      `"${(c.title || '').replace(/"/g, '""')}"`,
      `"${c.category}"`,
      `"${(c.instructor || '').replace(/"/g, '""')}"`,
      c.lessonsCount || 0,
      c.price || 0,
      c.rating || 5.0,
      `"${c.status || 'published'}"`,
      `"${c.createdAt || new Date().toISOString()}"`
    ].join(","))
  ];

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.setAttribute("download", `LearnHub_Courses_Export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);

  showToast("Exported courses to CSV file successfully.", "info");
}

// ==================== MODAL FORM & CRUD HANDLERS ====================
function initFormHandlers() {
  const addCourseBtn = document.getElementById("add-course-btn");
  const courseForm = document.getElementById("course-form");

  // Open modal for Create Course
  if (addCourseBtn) {
    addCourseBtn.addEventListener("click", function () {
      openAddModal();
    });
  }

  // Form submission handler
  if (courseForm) {
    courseForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Perform validation
      if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add("was-validated");
        return;
      }

      // Read form data
      const idField = document.getElementById("course-id").value;
      const title = document.getElementById("course-title").value.trim();
      const category = document.getElementById("course-category").value;
      const instructor = document.getElementById("course-instructor").value.trim();
      const lessonsCount = parseInt(document.getElementById("course-lessons").value, 10);
      const price = parseFloat(document.getElementById("course-price").value);
      const rating = parseFloat(document.getElementById("course-rating").value);
      const status = document.getElementById("course-status").value;
      const thumbnail = document.getElementById("course-thumbnail").value.trim() || "images/courses/c001.jpg";
      const shortDesc = document.getElementById("course-short-desc").value.trim() || title;

      if (idField) {
        // UPDATE EXISTING COURSE
        const courseIndex = adminCourses.findIndex(c => c.id === idField);
        if (courseIndex !== -1) {
          adminCourses[courseIndex] = {
            ...adminCourses[courseIndex],
            title,
            category,
            instructor,
            lessonsCount,
            price,
            rating,
            status,
            thumbnail,
            shortDescription: shortDesc
          };
          saveAdminCourses(adminCourses);
          showToast("Course updated successfully.", "success");
        }
      } else {
        // CREATE NEW COURSE
        const newId = generateNewCourseId();
        const newCourse = {
          id: newId,
          title,
          category,
          instructor,
          thumbnail,
          rating: isNaN(rating) ? 4.5 : rating,
          ratingCount: 1,
          students: 0,
          lessonsCount,
          price: isNaN(price) ? 0 : price,
          status,
          shortDescription: shortDesc,
          whatYouLearn: [
            `Master key principles of ${title}`,
            "Build practical real-world projects and implementations",
            "Apply industry best practices and optimal workflows",
            "Evaluate and verify course concepts with interactive quizzes"
          ],
          description: [
            shortDesc,
            `This course provides comprehensive instruction in ${getCategoryName(category)}, designed to take your skills to the next level.`
          ],
          curriculum: [
            {
              id: `${newId}-s1`,
              title: `Section 1: Fundamentals of ${getCategoryName(category)}`,
              lessons: Array.from({ length: Math.min(lessonsCount, 4) }, (_, i) => ({
                id: `${newId}-s1-l${i + 1}`,
                title: `1.${i + 1} Introduction to ${title}`,
                durationMin: 8 + i * 2
              })),
              quiz: [
                {
                  id: `${newId}-s1-q1`,
                  question: `What is the primary topic of ${title}?`,
                  options: [getCategoryName(category), "General Knowledge", "Advanced Theory", "Other"],
                  correctIndex: 0
                },
                {
                  id: `${newId}-s1-q2`,
                  question: "What is recommended for optimal learning progress?",
                  options: ["Consistent practice", "Skipping lessons", "No practice", "Memorizing"],
                  correctIndex: 0
                },
                {
                  id: `${newId}-s1-q3`,
                  question: "Which feature is supported by LearnHub courses?",
                  options: ["Interactive quizzes and progress tracking", "Static text only", "No progress saving", "None"],
                  correctIndex: 0
                }
              ]
            }
          ],
          createdAt: new Date().toISOString()
        };

        adminCourses.unshift(newCourse); // Add to top of list
        saveAdminCourses(adminCourses);
        showToast("Course created successfully.", "success");
      }

      // Hide Modal
      if (courseModalInstance) {
        courseModalInstance.hide();
      }

      // Re-render
      renderAdminView();
    });
  }
}

// Open Add Course Modal
function openAddModal() {
  const form = document.getElementById("course-form");
  if (form) {
    form.reset();
    form.classList.remove("was-validated");
  }

  document.getElementById("course-id").value = "";
  document.getElementById("courseModalLabel").innerHTML = `<i class="bi bi-plus-circle me-2"></i>Add New Course`;
  document.getElementById("course-rating").value = "4.5";
  document.getElementById("course-status").value = "published";

  if (courseModalInstance) {
    courseModalInstance.show();
  }
}

// Open Edit Course Modal
function openEditModal(courseId) {
  const course = adminCourses.find(c => c.id === courseId);
  if (!course) return;

  const form = document.getElementById("course-form");
  if (form) {
    form.classList.remove("was-validated");
  }

  document.getElementById("course-id").value = course.id;
  document.getElementById("courseModalLabel").innerHTML = `<i class="bi bi-pencil-square me-2"></i>Edit Course`;

  document.getElementById("course-title").value = course.title || "";
  document.getElementById("course-category").value = course.category || "web-dev";
  document.getElementById("course-instructor").value = course.instructor || "";
  document.getElementById("course-lessons").value = course.lessonsCount || 10;
  document.getElementById("course-price").value = course.price !== undefined ? course.price : 0;
  document.getElementById("course-rating").value = course.rating || 4.5;
  document.getElementById("course-status").value = course.status || "published";
  document.getElementById("course-thumbnail").value = course.thumbnail || "";
  document.getElementById("course-short-desc").value = course.shortDescription || "";

  if (courseModalInstance) {
    courseModalInstance.show();
  }
}

// Open Delete Confirmation Modal for Single Course
function openDeleteConfirmation(courseId) {
  const course = adminCourses.find(c => c.id === courseId);
  if (!course) return;

  // Requirement 11: If course being deleted is currently open in edit modal, close edit modal first!
  const currentModalId = document.getElementById("course-id").value;
  if (currentModalId === courseId && courseModalInstance) {
    courseModalInstance.hide();
  }

  deletingTarget = courseId;
  const deleteMsgEl = document.getElementById("delete-modal-msg");
  if (deleteMsgEl) {
    deleteMsgEl.textContent = `Are you sure you want to delete course "${course.title}"? This action cannot be undone.`;
  }

  if (deleteModalInstance) {
    deleteModalInstance.show();
  }
}

// Generate unique ID for new course
function generateNewCourseId() {
  const numericIds = adminCourses
    .map(c => parseInt(c.id.replace(/\D/g, ""), 10))
    .filter(n => !isNaN(n));

  const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
  const nextNum = maxId + 1;
  return `c${String(nextNum).padStart(3, "0")}`;
}

// ==================== DASHBOARD STATS RENDERING ====================
function renderDashboardStats() {
  const totalCoursesEl = document.getElementById("dash-total-courses");
  const publishedCoursesEl = document.getElementById("dash-published-courses");
  const totalInstructorsEl = document.getElementById("dash-total-instructors");
  const avgRatingEl = document.getElementById("dash-avg-rating");
  const categoryBarsEl = document.getElementById("category-distribution-bars");

  if (!totalCoursesEl) return;

  const total = adminCourses.length;
  const published = adminCourses.filter(c => c.status === "published").length;

  const uniqueInstructors = new Set(adminCourses.map(c => c.instructor.trim()).filter(Boolean)).size;

  const sumRating = adminCourses.reduce((sum, c) => sum + (c.rating || 0), 0);
  const avgRating = total > 0 ? (sumRating / total).toFixed(1) : "0.0";

  totalCoursesEl.textContent = total;
  publishedCoursesEl.textContent = published;
  totalInstructorsEl.textContent = uniqueInstructors;
  avgRatingEl.textContent = avgRating;

  // Category Breakdown
  if (categoryBarsEl) {
    const categoryCounts = {
      "web-dev": 0,
      "design": 0,
      "data-science": 0,
      "marketing": 0,
      "other": 0
    };

    adminCourses.forEach(c => {
      if (categoryCounts[c.category] !== undefined) {
        categoryCounts[c.category]++;
      } else {
        categoryCounts["other"]++;
      }
    });

    categoryBarsEl.innerHTML = Object.keys(categoryCounts).map(cat => {
      const count = categoryCounts[cat];
      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
      const catName = getCategoryName(cat);

      return `
        <div>
          <div class="d-flex justify-content-between small mb-1">
            <span class="fw-semibold text-dark">${catName}</span>
            <span class="text-muted">${count} courses (${pct}%)</span>
          </div>
          <div class="progress" style="height: 8px;">
            <div class="progress-bar bg-primary" role="progressbar" style="width: ${pct}%;" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      `;
    }).join("");
  }
}

// Helper: Escape HTML special characters
function escapeHTML(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
