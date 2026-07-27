/**
 * LearnHub - Course Detail, Lesson Progress, and Section Quiz
 * Problem 03 implementation using Vanilla JavaScript and localStorage.
 */

let currentCourse = null;
let completedLessonIds = [];
let quizResults = {};
let activeLessonId = null;
let isLessonPlaying = false;

// Initializes the course detail page after the DOM is available.
function initializeCourseDetail() {
  renderNavbar("courses");
  renderFooter();
  loadCourseDetails();
  initializeDetailEvents();
}

// Loads the requested course and restores its saved progress and quiz results.
function loadCourseDetails() {
  const requestedCourseId = getQueryParam("id");
  currentCourse = findCourseById(requestedCourseId) || COURSES[0];

  if (!currentCourse) {
    showCourseLoadError();
    return;
  }

  completedLessonIds = getValidCompletedLessonIds(getProgress(currentCourse.id));
  quizResults = getQuizResults(currentCourse.id);

  renderCourseHeader();
  renderMainContent();
  renderSidebar();
  renderCurriculum(currentCourse.curriculum[0]?.id || null);
  updateProgressBar();
  updateLessonPlayer();
}

// Displays an inline message if no course data is available.
function showCourseLoadError() {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = `
    <div class="container py-5 text-center">
      <h1 class="h3">Course not found</h1>
      <p class="text-muted">The requested course is unavailable.</p>
      <a class="btn btn-primary" href="index.html">Back to Courses</a>
    </div>
  `;
}

// Removes duplicate or unknown lesson IDs from restored localStorage data.
function getValidCompletedLessonIds(progressRecord) {
  const savedLessonIds = Array.isArray(progressRecord?.completedLessonIds)
    ? progressRecord.completedLessonIds
    : [];
  const validLessonIds = new Set(
    currentCourse.curriculum.flatMap((section) => section.lessons.map((lesson) => lesson.id))
  );

  return [...new Set(savedLessonIds)].filter((lessonId) => validLessonIds.has(lessonId));
}

// Registers delegated curriculum events and lesson-player controls.
function initializeDetailEvents() {
  const accordionElement = document.getElementById("curriculum-accordion");
  accordionElement.addEventListener("change", handleCurriculumChange);
  accordionElement.addEventListener("click", handleCurriculumClick);
  accordionElement.addEventListener("submit", handleQuizSubmit);
  document.getElementById("lesson-player-toggle").addEventListener("click", toggleLessonPlayer);
  document.getElementById("enroll-btn").addEventListener("click", handleEnroll);
}

// Renders the course title, category, rating, student count, and instructor.
function renderCourseHeader() {
  document.getElementById("detail-category").textContent = getCategoryName(currentCourse.category);
  document.getElementById("detail-title").textContent = currentCourse.title;
  document.getElementById("detail-rating-text").textContent =
    `${currentCourse.rating} (${currentCourse.ratingCount})`;
  document.getElementById("detail-students-text").textContent =
    `${formatNumber(currentCourse.students)} students`;
  document.getElementById("detail-instructor-text").textContent =
    `By: ${currentCourse.instructor}`;
  document.title = `${currentCourse.title} - LearnHub`;
}

// Renders the banner image, learning outcomes, and course description.
function renderMainContent() {
  const detailImage = document.getElementById("detail-image");
  detailImage.src = currentCourse.thumbnail;
  detailImage.alt = `${currentCourse.title} lesson player`;

  document.getElementById("what-you-learn").innerHTML = currentCourse.whatYouLearn
    .map((outcome) => `
      <li>
        <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
        <span>${escapeHtml(outcome)}</span>
      </li>
    `)
    .join("");

  document.getElementById("course-description").innerHTML = currentCourse.description
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

// Renders the enrollment sidebar using the actual curriculum lesson count.
function renderSidebar() {
  const totalLessons = computeLessonsCount(currentCourse);
  const sidebarImage = document.getElementById("sidebar-image");
  sidebarImage.src = currentCourse.thumbnail;
  sidebarImage.alt = currentCourse.title;
  document.getElementById("sidebar-price").textContent = formatPrice(currentCourse.price);
  document.getElementById("sidebar-lessons-count").textContent =
    `${totalLessons} video lessons`;
}

// Renders all curriculum sections, lesson checkboxes, quiz buttons, and inline quiz panels.
function renderCurriculum(openSectionId, visibleQuizSectionId = null) {
  const accordionElement = document.getElementById("curriculum-accordion");
  accordionElement.innerHTML = currentCourse.curriculum
    .map((section, sectionIndex) =>
      renderCurriculumSection(section, sectionIndex, openSectionId, visibleQuizSectionId)
    )
    .join("");
}

// Builds one Bootstrap accordion section with lessons and its quiz.
function renderCurriculumSection(section, sectionIndex, openSectionId, visibleQuizSectionId) {
  const isOpen = section.id === openSectionId;
  const isComplete = isSectionComplete(section);
  const quizResult = getQuizResultForSection(section.id);
  const isQuizVisible = section.id === visibleQuizSectionId;
  const collapseId = `collapse-${section.id}`;
  const headingId = `heading-${section.id}`;

  return `
    <div class="accordion-item" data-section-id="${section.id}">
      <h3 class="accordion-header" id="${headingId}">
        <button class="accordion-button ${isOpen ? "" : "collapsed"}" type="button"
                data-bs-toggle="collapse" data-bs-target="#${collapseId}"
                aria-expanded="${isOpen}" aria-controls="${collapseId}">
          <span class="section-heading-copy">
            <span>${escapeHtml(section.title)}</span>
            <span class="section-lesson-count">${section.lessons.length} lessons</span>
          </span>
          <span class="section-complete-badge ${isComplete ? "" : "d-none"}"
                id="section-badge-${section.id}" aria-label="Section completed">
            <i class="bi bi-check-circle-fill" aria-hidden="true"></i> Complete
          </span>
        </button>
      </h3>
      <div id="${collapseId}" class="accordion-collapse collapse ${isOpen ? "show" : ""}"
           aria-labelledby="${headingId}" data-bs-parent="#curriculum-accordion">
        <div class="accordion-body p-0">
          <div class="lesson-list">
            ${section.lessons.map((lesson) => renderLesson(section, lesson)).join("")}
          </div>
          <div class="quiz-launch">
            <button class="btn btn-outline-primary take-quiz-btn" type="button"
                    data-section-id="${section.id}">
              <i class="bi bi-patch-question me-1" aria-hidden="true"></i>
              ${quizResult ? "Review Quiz" : "Take Quiz"}
            </button>
            ${renderQuizStatusBadge(quizResult)}
          </div>
          ${renderQuizPanel(section, sectionIndex, quizResult, isQuizVisible)}
        </div>
      </div>
    </div>
  `;
}

// Builds one lesson row with a persisted completion checkbox and player button.
function renderLesson(section, lesson) {
  const isCompleted = completedLessonIds.includes(lesson.id);
  const isActive = lesson.id === activeLessonId;

  return `
    <div class="lesson-item ${isCompleted ? "lesson-completed" : ""}"
         data-lesson-id="${lesson.id}">
      <div class="lesson-info">
        <input class="form-check-input lesson-checkbox" type="checkbox"
               id="lesson-${lesson.id}" data-lesson-id="${lesson.id}"
               data-section-id="${section.id}" ${isCompleted ? "checked" : ""}>
        <button class="lesson-title-button ${isActive ? "active" : ""}" type="button"
                data-lesson-id="${lesson.id}" aria-current="${isActive ? "true" : "false"}">
          <i class="bi ${isActive && isLessonPlaying ? "bi-pause-circle-fill" : "bi-play-circle"}"
             aria-hidden="true"></i>
          <span>${escapeHtml(lesson.title)}</span>
        </button>
      </div>
      <span class="lesson-duration">${lesson.durationMin} min</span>
    </div>
  `;
}

// Builds the saved pass or fail badge shown beside the Take Quiz button.
function renderQuizStatusBadge(quizResult) {
  if (!quizResult) {
    return "";
  }

  const badgeClass = quizResult.passed ? "text-bg-success" : "text-bg-danger";
  const badgeText = quizResult.passed ? "Passed" : "Not passed";
  return `<span class="badge ${badgeClass} quiz-status-badge">${badgeText}</span>`;
}

// Builds an inline multiple-choice quiz panel for one curriculum section.
function renderQuizPanel(section, sectionIndex, quizResult, isVisible) {
  return `
    <div class="quiz-section mx-3 mb-3 ${isVisible ? "" : "d-none"}"
         id="quiz-${section.id}" data-section-id="${section.id}">
      <div class="quiz-heading">
        <div>
          <span class="quiz-eyebrow">Section knowledge check</span>
          <h4 class="h5 mb-0">Quiz: ${escapeHtml(section.title)}</h4>
        </div>
        <span class="badge text-bg-light">${section.quiz.length} questions</span>
      </div>
      <form class="quiz-form ${quizResult ? "is-graded" : ""}"
            id="quiz-form-${section.id}" data-section-id="${section.id}" novalidate>
        ${section.quiz
          .map((question, questionIndex) =>
            renderQuizQuestion(section, question, questionIndex, quizResult)
          )
          .join("")}
        <div class="quiz-actions">
          <button class="btn btn-primary submit-quiz-btn ${quizResult ? "d-none" : ""}"
                  type="submit">
            Submit Quiz
          </button>
        </div>
        <div class="quiz-result-section" aria-live="polite">
          ${quizResult ? renderQuizResult(section, sectionIndex, quizResult) : ""}
        </div>
      </form>
    </div>
  `;
}

// Builds one quiz question with three or four accessible radio options.
function renderQuizQuestion(section, question, questionIndex, quizResult) {
  return `
    <fieldset class="quiz-question" data-question-index="${questionIndex}">
      <legend class="h6">Q${questionIndex + 1}. ${escapeHtml(question.question)}</legend>
      <div class="quiz-options">
        ${question.options
          .map((option, optionIndex) =>
            renderQuizOption(section, question, questionIndex, option, optionIndex, quizResult)
          )
          .join("")}
      </div>
    </fieldset>
  `;
}

// Builds one radio option and restores its graded correct or incorrect state.
function renderQuizOption(section, question, questionIndex, option, optionIndex, quizResult) {
  const selectedAnswer = getStoredAnswer(quizResult, questionIndex);
  const isSelected = selectedAnswer === optionIndex;
  const resultClass = getQuizOptionResultClass(
    quizResult,
    optionIndex,
    selectedAnswer,
    question.correctIndex
  );
  const inputId = `${question.id}-option-${optionIndex}`;

  return `
    <label class="quiz-option ${resultClass}" for="${inputId}">
      <input class="form-check-input quiz-radio" type="radio"
             id="${inputId}" name="quiz-${section.id}-question-${questionIndex}"
             value="${optionIndex}" ${isSelected ? "checked" : ""}
             ${quizResult ? "disabled" : ""}>
      <span class="quiz-option-letter">${String.fromCharCode(97 + optionIndex)})</span>
      <span>${escapeHtml(option)}</span>
    </label>
  `;
}

// Returns a previously selected answer index when the stored result is valid.
function getStoredAnswer(quizResult, questionIndex) {
  if (!quizResult || !Array.isArray(quizResult.answers)) {
    return null;
  }

  return Number.isInteger(quizResult.answers[questionIndex])
    ? quizResult.answers[questionIndex]
    : null;
}

// Returns the CSS class that marks correct answers green and selected wrong answers red.
function getQuizOptionResultClass(quizResult, optionIndex, selectedAnswer, correctIndex) {
  if (!quizResult) {
    return "";
  }
  if (optionIndex === correctIndex) {
    return "correct";
  }
  if (optionIndex === selectedAnswer) {
    return "incorrect";
  }
  return "";
}

// Builds the scored pass/fail result and the required next-step button.
function renderQuizResult(section, sectionIndex, quizResult) {
  const percentage = Math.round((quizResult.score / quizResult.total) * 100);
  const isLastSection = sectionIndex === currentCourse.curriculum.length - 1;
  const resultClass = quizResult.passed ? "pass" : "fail";
  const statusText = quizResult.passed
    ? "Congratulations! You passed this section."
    : "You need at least 70% to pass. Review the answers and try again.";
  const resultIcon = quizResult.passed ? "bi-trophy-fill" : "bi-arrow-repeat";

  return `
    <div class="quiz-result ${resultClass}">
      <div class="quiz-result-summary">
        <div>
          <i class="bi ${resultIcon} me-1" aria-hidden="true"></i>
          <strong>${quizResult.score} / ${quizResult.total} correct (${percentage}%)</strong>
          <p class="mb-0 mt-1">${statusText}</p>
        </div>
        ${quizResult.passed
          ? `
            <button class="btn btn-success btn-sm continue-btn" type="button"
                    data-section-id="${section.id}">
              ${isLastSection ? "Finish Course" : "Continue to Next Section"}
              <i class="bi bi-arrow-right ms-1" aria-hidden="true"></i>
            </button>
          `
          : `
            <button class="btn btn-outline-danger btn-sm retake-btn" type="button"
                    data-section-id="${section.id}">
              Retake Quiz
            </button>
          `}
      </div>
    </div>
  `;
}

// Handles checkbox and radio changes inside the curriculum.
function handleCurriculumChange(event) {
  if (event.target.matches(".lesson-checkbox")) {
    handleLessonToggle(event.target);
    return;
  }

  if (event.target.matches(".quiz-radio")) {
    updateSelectedQuizOption(event.target);
  }
}

// Handles lesson-player, quiz-open, retake, and continue button clicks.
function handleCurriculumClick(event) {
  const lessonButton = event.target.closest(".lesson-title-button");
  const takeQuizButton = event.target.closest(".take-quiz-btn");
  const retakeButton = event.target.closest(".retake-btn");
  const continueButton = event.target.closest(".continue-btn");

  if (lessonButton) {
    playSelectedLesson(lessonButton.dataset.lessonId);
  } else if (takeQuizButton) {
    showQuiz(takeQuizButton.dataset.sectionId);
  } else if (retakeButton) {
    resetQuiz(retakeButton.dataset.sectionId);
  } else if (continueButton) {
    openNextSection(continueButton.dataset.sectionId);
  }
}

// Adds or removes a lesson ID, persists it, and refreshes progress-related UI.
function handleLessonToggle(checkbox) {
  const lessonId = checkbox.dataset.lessonId;
  const sectionId = checkbox.dataset.sectionId;

  if (checkbox.checked && !completedLessonIds.includes(lessonId)) {
    completedLessonIds.push(lessonId);
  } else if (!checkbox.checked) {
    completedLessonIds = completedLessonIds.filter((completedId) => completedId !== lessonId);
  }

  saveProgress(currentCourse.id, completedLessonIds);
  updateLessonRow(lessonId, checkbox.checked);
  updateSectionBadge(sectionId);
  updateProgressBar();
}

// Updates a lesson row's completion styling without rebuilding the accordion.
function updateLessonRow(lessonId, isCompleted) {
  const lessonRow = document.querySelector(`.lesson-item[data-lesson-id="${lessonId}"]`);
  if (lessonRow) {
    lessonRow.classList.toggle("lesson-completed", isCompleted);
  }
}

// Updates the completed badge for one curriculum section.
function updateSectionBadge(sectionId) {
  const section = currentCourse.curriculum.find((item) => item.id === sectionId);
  const badge = document.getElementById(`section-badge-${sectionId}`);

  if (section && badge) {
    badge.classList.toggle("d-none", !isSectionComplete(section));
  }
}

// Returns true when every lesson in a section is included in saved progress.
function isSectionComplete(section) {
  return section.lessons.every((lesson) => completedLessonIds.includes(lesson.id));
}

// Updates the progress count, percentage, accessible value, and visual fill.
function updateProgressBar() {
  const totalLessons = computeLessonsCount(currentCourse);
  const completedCount = completedLessonIds.length;
  const percentage = totalLessons === 0
    ? 0
    : Math.round((completedCount / totalLessons) * 100);
  const progressBar = document.getElementById("progress-bar");

  document.getElementById("progress-label").textContent =
    `${completedCount} / ${totalLessons} lessons completed`;
  document.getElementById("progress-percent").textContent = `${percentage}%`;
  progressBar.style.width = `${percentage}%`;
  progressBar.setAttribute("aria-valuenow", String(percentage));
}

// Returns the locally cached quiz result for a section.
function getQuizResultForSection(sectionId) {
  return quizResults && typeof quizResults === "object" ? quizResults[sectionId] : null;
}

// Reveals a section quiz inline and scrolls it into view.
function showQuiz(sectionId) {
  const quizPanel = document.getElementById(`quiz-${sectionId}`);
  if (!quizPanel) {
    return;
  }

  quizPanel.classList.remove("d-none");
  quizPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Applies the selected style to the checked radio option in one question.
function updateSelectedQuizOption(radioInput) {
  const questionElement = radioInput.closest(".quiz-question");
  questionElement.querySelectorAll(".quiz-option").forEach((option) => {
    option.classList.remove("selected");
  });
  radioInput.closest(".quiz-option").classList.add("selected");
}

// Validates, scores, persists, and displays a submitted section quiz.
function handleQuizSubmit(event) {
  if (!event.target.matches(".quiz-form")) {
    return;
  }

  event.preventDefault();
  const formElement = event.target;
  const sectionId = formElement.dataset.sectionId;
  const section = currentCourse.curriculum.find((item) => item.id === sectionId);
  const answers = collectQuizAnswers(formElement);

  if (!section || answers.includes(null)) {
    showIncompleteQuizMessage(formElement, answers);
    return;
  }

  const score = section.quiz.reduce(
    (total, question, index) => total + (answers[index] === question.correctIndex ? 1 : 0),
    0
  );
  const total = section.quiz.length;
  const result = {
    passed: score / total >= 0.7,
    score,
    total,
    answers,
    attemptedAt: new Date().toISOString()
  };

  quizResults[sectionId] = result;
  saveQuizResult(currentCourse.id, sectionId, result);
  renderCurriculum(sectionId, sectionId);
  document.getElementById(`quiz-${sectionId}`)?.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

// Collects the selected option index for every question in a quiz form.
function collectQuizAnswers(formElement) {
  return [...formElement.querySelectorAll(".quiz-question")].map((questionElement) => {
    const selectedInput = questionElement.querySelector(".quiz-radio:checked");
    return selectedInput ? Number(selectedInput.value) : null;
  });
}

// Displays a validation message and focuses the first unanswered question.
function showIncompleteQuizMessage(formElement, answers) {
  const resultElement = formElement.querySelector(".quiz-result-section");
  const firstMissingIndex = answers.findIndex((answer) => answer === null);
  resultElement.innerHTML = `
    <div class="alert alert-warning mb-0" role="alert">
      Please answer every question before submitting the quiz.
    </div>
  `;
  formElement
    .querySelector(`.quiz-question[data-question-index="${firstMissingIndex}"] .quiz-radio`)
    ?.focus();
}

// Resets a failed quiz form so the learner can select and submit new answers.
function resetQuiz(sectionId) {
  const quizPanel = document.getElementById(`quiz-${sectionId}`);
  if (!quizPanel) {
    return;
  }

  const formElement = quizPanel.querySelector(".quiz-form");
  formElement.reset();
  formElement.classList.remove("is-graded");
  formElement.querySelectorAll(".quiz-radio").forEach((radioInput) => {
    radioInput.checked = false;
    radioInput.disabled = false;
  });
  formElement.querySelectorAll(".quiz-option").forEach((option) => {
    option.classList.remove("selected", "correct", "incorrect");
  });
  formElement.querySelector(".submit-quiz-btn").classList.remove("d-none");
  formElement.querySelector(".quiz-result-section").innerHTML = "";
  formElement.querySelector(".quiz-radio")?.focus();
}

// Opens the next Bootstrap accordion panel after a passing quiz.
function openNextSection(sectionId) {
  const currentIndex = currentCourse.curriculum.findIndex((section) => section.id === sectionId);
  const nextSection = currentCourse.curriculum[currentIndex + 1];

  if (!nextSection) {
    document.getElementById("progress-section").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    showToast("You completed all section quizzes.", "success");
    return;
  }

  const nextCollapse = document.getElementById(`collapse-${nextSection.id}`);
  openAccordionCollapse(nextCollapse);
  nextCollapse.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Opens a collapse panel with Bootstrap and provides an offline fallback.
function openAccordionCollapse(collapseElement) {
  if (window.bootstrap?.Collapse) {
    bootstrap.Collapse.getOrCreateInstance(collapseElement, { toggle: false }).show();
    return;
  }

  document.querySelectorAll("#curriculum-accordion .accordion-collapse").forEach((panel) => {
    panel.classList.remove("show");
  });
  document.querySelectorAll("#curriculum-accordion .accordion-button").forEach((button) => {
    button.classList.add("collapsed");
    button.setAttribute("aria-expanded", "false");
  });
  collapseElement.classList.add("show");
  const targetButton = document.querySelector(`[aria-controls="${collapseElement.id}"]`);
  targetButton?.classList.remove("collapsed");
  targetButton?.setAttribute("aria-expanded", "true");
}

// Finds and starts the simulated player for a selected lesson.
function playSelectedLesson(lessonId) {
  const lessonRecord = findLessonById(lessonId);
  if (!lessonRecord) {
    return;
  }

  activeLessonId = lessonId;
  isLessonPlaying = true;
  updateLessonPlayer();
  updateActiveLessonButtons();
  document.getElementById("lesson-player").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

// Toggles the simulated lesson player between playing and paused.
function toggleLessonPlayer() {
  if (!activeLessonId) {
    const firstLesson = currentCourse.curriculum[0]?.lessons[0];
    activeLessonId = firstLesson?.id || null;
  }
  if (!activeLessonId) {
    return;
  }

  isLessonPlaying = !isLessonPlaying;
  updateLessonPlayer();
  updateActiveLessonButtons();
}

// Updates the simulated player title, status, icon, and visual state.
function updateLessonPlayer() {
  const playerElement = document.getElementById("lesson-player");
  const lessonRecord = findLessonById(activeLessonId);
  const playerIcon = document.getElementById("lesson-player-icon");
  const playerToggle = document.getElementById("lesson-player-toggle");

  playerElement.classList.toggle("is-playing", Boolean(lessonRecord && isLessonPlaying));
  playerIcon.className = isLessonPlaying ? "bi bi-pause-fill" : "bi bi-play-fill";
  playerToggle.setAttribute(
    "aria-label",
    isLessonPlaying ? "Pause selected lesson" : "Play selected lesson"
  );

  if (!lessonRecord) {
    document.getElementById("lesson-player-title").textContent = "Course preview";
    document.getElementById("lesson-player-status").textContent =
      "Select a lesson from the curriculum to begin.";
    return;
  }

  document.getElementById("lesson-player-title").textContent = lessonRecord.lesson.title;
  document.getElementById("lesson-player-status").textContent = isLessonPlaying
    ? `Playing simulated lesson • ${lessonRecord.lesson.durationMin} min`
    : `Paused • ${lessonRecord.lesson.durationMin} min`;
}

// Updates active and play/pause styling on all lesson title buttons.
function updateActiveLessonButtons() {
  document.querySelectorAll(".lesson-title-button").forEach((button) => {
    const isActive = button.dataset.lessonId === activeLessonId;
    const icon = button.querySelector("i");
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
    icon.className = `bi ${
      isActive && isLessonPlaying ? "bi-pause-circle-fill" : "bi-play-circle"
    }`;
  });
}

// Finds a lesson and its parent section by lesson ID.
function findLessonById(lessonId) {
  if (!currentCourse || !lessonId) {
    return null;
  }

  for (const section of currentCourse.curriculum) {
    const lesson = section.lessons.find((item) => item.id === lessonId);
    if (lesson) {
      return { section, lesson };
    }
  }

  return null;
}

// Shows enrollment feedback for the simulated front-end experience.
function handleEnroll() {
  showToast(`You are enrolled in ${currentCourse.title}.`, "success");
}

// Escapes hardcoded course text before inserting it into an HTML template.
function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = String(value);
  return element.innerHTML;
}

document.addEventListener("DOMContentLoaded", initializeCourseDetail);
