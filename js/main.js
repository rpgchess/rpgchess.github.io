var navBtnWidth = $('.navbar a').css('width');
var github = [];
var currentLang = localStorage.getItem('language') || 'en-US';

// Language Icons Map
const languageIcons = {
  'JavaScript': 'fab fa-js-square',
  'TypeScript': 'fab fa-js-square',
  'Python': 'fab fa-python',
  'Java': 'fab fa-java',
  'C': 'fas fa-code',
  'C++': 'fas fa-code',
  'C#': 'fas fa-code',
  'PHP': 'fab fa-php',
  'Ruby': 'fas fa-gem',
  'Go': 'fas fa-code',
  'Rust': 'fas fa-code',
  'HTML': 'fab fa-html5',
  'CSS': 'fab fa-css3-alt',
  'Shell': 'fas fa-terminal',
  'PowerShell': 'fas fa-terminal',
  'Dart': 'fas fa-code'
};

// Initialize
$(document).ready(function() {
  initializeTheme();
  initializeLanguage();
  updateLanguage(currentLang);
});

// Theme Toggle
function initializeTheme() {
  const theme = localStorage.getItem('theme') || 'dark';
  if (theme === 'light') {
    $('body').removeClass('dark-mode').addClass('light-mode');
    $('#theme-toggle i').removeClass('fa-moon').addClass('fa-sun');
  }
}

$('#theme-toggle').click(function() {
  if ($('body').hasClass('dark-mode')) {
    $('body').removeClass('dark-mode').addClass('light-mode');
    $(this).find('i').removeClass('fa-moon').addClass('fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    $('body').removeClass('light-mode').addClass('dark-mode');
    $(this).find('i').removeClass('fa-sun').addClass('fa-moon');
    localStorage.setItem('theme', 'dark');
  }
});

// Language Toggle
function initializeLanguage() {
  if (currentLang === 'pt-BR') {
    $('#flag-icon').attr('src', 'https://flagcdn.com/w40/br.png').attr('alt', 'Português');
  }
}

$('#lang-toggle').click(function() {
  currentLang = currentLang === 'en-US' ? 'pt-BR' : 'en-US';
  localStorage.setItem('language', currentLang);
  updateLanguage(currentLang);
  
  if (currentLang === 'pt-BR') {
    $('#flag-icon').attr('src', 'https://flagcdn.com/w40/br.png').attr('alt', 'Português');
  } else {
    $('#flag-icon').attr('src', 'https://flagcdn.com/w40/us.png').attr('alt', 'English');
  }
});

// ============================================
// INTERNATIONALIZATION (i18n) SYSTEM
// ============================================
// This page uses a data-i18n attribute system for translations.
//
// Usage in HTML:
// 1. Simple text: <h1 data-i18n="sections.about">About</h1>
// 2. Dot notation accesses nested objects: data-i18n="about.softwareDev.title"
// 3. Dynamic content: <div data-i18n-repeat="professional.companies">
//
// The system automatically:
// - Finds all [data-i18n] elements and updates their content
// - Supports HTML content (detects <br> tags)
// - Uses dot notation to access nested translation objects
// - Handles repeated/dynamic content separately with data-i18n-repeat
// ============================================

function updateLanguage(lang) {
  const t = setLanguage(lang);
  
  // Apply all translations using data-i18n attributes
  applyTranslations(t);
  
  // Update sections with dynamic/repeated content
  updateRepeatedContent(t);
  
  // Update Books section (internationalized)
  updateBooksContent(t);
  
  // Reload portfolio with new language
  if (github.length > 0) {
    addProfiles();
  }
}

// Generic i18n function using data-i18n attributes
function applyTranslations(translations) {
  $('[data-i18n]').each(function() {
    const key = $(this).attr('data-i18n');
    const value = getNestedValue(translations, key);
    
    if (value !== undefined) {
      // Check if element should render HTML (via data-i18n-html attribute or <br> detection)
      const forceHtml = $(this).attr('data-i18n-html') !== undefined;
      
      if (forceHtml || value.includes('<br>')) {
        $(this).html(value);
      } else {
        $(this).text(value);
      }
    }
  });
}

// Get nested object value using dot notation
// Examples:
//   getNestedValue(obj, "nav.home") → obj.nav.home
//   getNestedValue(obj, "about.softwareDev.title") → obj.about.softwareDev.title
//   getNestedValue(obj, "sections.professional") → obj.sections.professional
// Uses optional chaining (?.) to safely handle missing properties
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Update sections with repeated content (Professional, Education)
function updateRepeatedContent(t) {
  // Professional section
  const professionalContainer = $('[data-i18n-repeat="professional.companies"]');
  if (professionalContainer.length && t.professional.companies) {
    let html = '';
    t.professional.companies.forEach(company => {
      html += `<h3>${company.name}</h3>`;
      company.roles.forEach(role => {
        html += `<span><h5>${role.title}</h5></span>`;
        html += `<p>${role.description}</p>`;
      });
      html += `<h4>${company.period}</h4><br><br>`;
    });
    professionalContainer.html(html);
  }
  
  // Education section
  const educationContainer = $('[data-i18n-repeat="education.institutions"]');
  if (educationContainer.length && t.education.institutions) {
    let html = '';
    t.education.institutions.forEach(institution => {
      html += `<h3>${institution.name}</h3>`;
      html += `<span><h5>${institution.course}</h5></span>`;
      html += `<h4>${institution.period}</h4><br><br>`;
    });
    educationContainer.html(html);
  }
}

// Update Books section with internationalized content
function updateBooksContent(t) {
  const booksGrid = document.querySelector('.books-grid');
  
  if (booksGrid && t.books && Array.isArray(t.books)) {
    let html = '';
    
    t.books.forEach(book => {
      html += '<div class="book-card">';
      html += `  <i class="${book.icon} book-icon" aria-hidden="true"></i>`;
      html += `  <h3>${book.title}</h3>`;
      html += `  <p class="book-subtitle">${book.subtitle}</p>`;
      html += `  <p class="book-author">${book.author}</p>`;
      html += `  <span class="book-publisher">${book.publisher}</span>`;
      html += '</div>';
    });
    
    booksGrid.innerHTML = html;
  }
}

// Navbar animations
$('.navbar a').mouseenter(e => {
  $(e.target).clearQueue();
  $(e.target).animate({
    width: $(e.target).get(0).scrollWidth
  }, 300, () => {
    $(e.target).width('auto');
  });
});

$('.navbar a').mouseout(e => {
  $(e.target).animate({
    width: navBtnWidth
  }, 300);
});

// ============================================
// GITHUB API INTEGRATION (with Loading & Error Handling)
// ============================================
// Load GitHub Repositories with loading state and error handling
function loadRepositories() {
  const portfolioSection = document.getElementById('github');
  const t = setLanguage(currentLang);
  
  // Show loading state
  portfolioSection.innerHTML = `
    <h1>${t.sections.portfolio}</h1>
    <div class="loading-container" role="status" aria-live="polite">
      <div class="spinner"></div>
      <p>${t.portfolio?.loading || 'Loading repositories...'}</p>
    </div>
  `;
  
  $.ajax({
    url: "https://api.github.com/users/rpgchess/repos",
    method: "GET",
    timeout: 10000, // 10 second timeout
    success: function(data) {
      github = [];
      data.forEach(function(repo) {
        github.push({
          name: repo.name,
          href: repo.html_url,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updated: repo.updated_at
        });
      });
      addProfiles();
    },
    error: function(xhr, status, error) {
      console.error('Failed to load GitHub repositories:', error);
      
      // Show user-friendly error message
      portfolioSection.innerHTML = `
        <h1>${t.sections.portfolio}</h1>
        <div class="error-container" role="alert" aria-live="assertive">
          <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #e74c3c; margin-bottom: 1rem;"></i>
          <p>${t.portfolio?.error || 'Unable to load repositories at this time.'}</p>
          <button onclick="loadRepositories()" class="retry-btn" aria-label="Retry loading repositories">
            <i class="fas fa-redo"></i> ${t.portfolio?.retry || 'Try Again'}
          </button>
        </div>
      `;
    }
  });
}

loadRepositories();

function addProfiles() {
  const t = setLanguage(currentLang);
  const slide = document.getElementById('github');
  let html = `<h1>${t.sections.portfolio}</h1>`;
  html += '<div class="row" style="width: 99%;">';

  if (github.length === 0) {
    html += `<div class="col-12"><p class="text-center">${t.portfolio?.noRepositories || 'No repositories found.'}</p></div>`;
  } else {
    github.forEach(function(repo) {
      const description = repo.description || t.portfolio.noDescription;
      const language = repo.language || 'Code';
      const icon = languageIcons[language] || 'fas fa-code';
      
      html += '<div class="col mb-2 col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">';
      html += `<a href="${repo.href}" target="_blank" rel="noopener noreferrer" class="card-link-wrapper" aria-label="View ${repo.name} repository on GitHub">`;
      html += '<div class="repo-card">';
      html += `<i class="${icon} language-icon" aria-hidden="true"></i>`;
      html += `<h3 class="card-title">${repo.name}</h3>`;
      html += `<p class="card-description">${description}</p>`;
      html += '<div class="card-meta">';
      html += `<span class="language-badge">${language}</span>`;
      if (repo.stars > 0) html += `<span class="stat"><i class="fas fa-star" aria-hidden="true"></i> ${repo.stars}</span>`;
      if (repo.forks > 0) html += `<span class="stat"><i class="fas fa-code-branch" aria-hidden="true"></i> ${repo.forks}</span>`;
      html += '</div>';
      html += '</div>';
      html += '</a>';
      html += '</div>';
    });
  }

  html += '</div>';
  slide.innerHTML = html;
}
