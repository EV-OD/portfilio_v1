// Toast notification function
export function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-zinc-800 text-zinc-100 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full border border-zinc-700';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.remove('translate-x-full');
  }, 100);
  
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// Copy text to clipboard
export function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMessage);
  }).catch((err) => {
    console.error('Failed to copy text:', err);
    showToast('Failed to copy to clipboard');
  });
}

// Open email client
export function openEmail(email) {
  window.open(`mailto:${email}`, '_blank');
}

// Dispatch search event
export function openSearch() {
  window.dispatchEvent(new CustomEvent('openSearch'));
}

// Load search result from sessionStorage and display it
export function loadSearchResult() {
  const resultData = sessionStorage.getItem('searchResult');
  const container = document.getElementById('search-results-container');
  const noResultDiv = document.getElementById('no-result');
  
  if (resultData && container && noResultDiv) {
    try {
      const result = JSON.parse(resultData);
      
      // Hide the no-result message
      noResultDiv.style.display = 'none';
      
      // Create a simple result display with monochrome styling
      container.innerHTML = `
        <div class="min-h-full flex flex-col bg-zinc-900">
          <!-- Result Header -->
          <div class="mb-6 pb-4 border-b border-zinc-700">
            <div class="flex items-center gap-4 mb-3">
              <div class="text-4xl text-zinc-100">${result.icon}</div>
              <div>
                <h1 class="text-2xl font-bold text-zinc-100">${result.title}</h1>
                ${result.subtitle ? `<p class="text-zinc-400 text-lg">${result.subtitle}</p>` : ''}
              </div>
            </div>
            <div class="inline-block bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm font-medium border border-zinc-700">
              ${result.type.charAt(0).toUpperCase() + result.type.slice(1)} Result
            </div>
          </div>

          <!-- Result Content -->
          <div class="flex-1">
            <div class="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
              <div class="text-center">
                <div class="text-4xl mb-4">${result.icon}</div>
                <h3 class="text-xl font-bold text-zinc-100 mb-2">${result.title}</h3>
                ${result.subtitle ? `<p class="text-zinc-400 mb-4">${result.subtitle}</p>` : ''}
                <p class="text-zinc-300">Information about ${result.title}</p>
                
                ${result.type === 'contact' && result.subtitle?.includes('@') ? `
                  <div class="mt-6 space-y-4">
                    <div class="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
                      <span class="text-zinc-300 font-mono">${result.subtitle}</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button onclick="window.open('mailto:${result.subtitle}', '_blank')"
                              class="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 px-4 py-2 rounded-lg transition-colors border border-zinc-600">
                        Send Email
                      </button>
                      <button onclick="navigator.clipboard.writeText('${result.subtitle}'); showToast('Email copied!')"
                              class="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 px-4 py-2 rounded-lg transition-colors border border-zinc-600">
                        Copy Email
                      </button>
                    </div>
                  </div>
                ` : `
                  <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a href="/about" class="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 px-4 py-2 rounded-lg transition-colors border border-zinc-600">
                      Learn More
                    </a>
                    <a href="/contact" class="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 px-4 py-2 rounded-lg transition-colors border border-zinc-600">
                      Get In Touch
                    </a>
                  </div>
                `}
              </div>
            </div>
          </div>

          <!-- Back to Search -->
          <div class="mt-8 pt-4 border-t border-zinc-700">
            <button onclick="window.dispatchEvent(new CustomEvent('openSearch'))"
                    class="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 px-4 py-2 rounded-lg transition-colors border border-zinc-600">
              🔍 Search Again
            </button>
          </div>
        </div>
      `;
      
      // Clear the sessionStorage after use
      sessionStorage.removeItem('searchResult');
    } catch (error) {
      console.error('Error parsing search result:', error);
      showToast('Error loading search result');
    }
  }
}
