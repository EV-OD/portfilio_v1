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
        <div class="min-h-full flex flex-col">
          <!-- Result Header -->
          <div class="mb-6 pb-6 border-b border-white/10">
            <div class="flex items-center gap-6 mb-4">
              <div class="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl border border-white/10 shadow-lg">
                ${result.icon}
              </div>
              <div>
                <h1 class="text-3xl font-light text-white/95 mb-1 tracking-tight">${result.title}</h1>
                ${result.subtitle ? `<p class="text-white/60 text-lg font-normal">${result.subtitle}</p>` : ''}
              </div>
            </div>
            <div class="inline-flex items-center bg-white/8 backdrop-blur-md text-white/70 px-4 py-2 rounded-full text-sm font-medium border border-white/15 shadow-sm">
              <div class="w-2 h-2 bg-white/40 rounded-full mr-2"></div>
              ${result.type.charAt(0).toUpperCase() + result.type.slice(1)} Result
            </div>
          </div>

          <!-- Result Content -->
          <div class="flex-1">
            <div class="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl ring-1 ring-black/5">
              <div class="text-center">
                <div class="w-20 h-20 bg-white/8 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 border border-white/15 shadow-lg">
                  ${result.icon}
                </div>
                <h2 class="text-2xl font-light text-white/95 mb-3 tracking-tight">${result.title}</h2>
                ${result.subtitle ? `<p class="text-white/60 mb-6 text-lg font-normal leading-relaxed max-w-lg mx-auto">${result.subtitle}</p>` : ''}
                <p class="text-white/50 mb-8 font-normal">Information about ${result.title}</p>
                
                ${result.type === 'contact' && result.subtitle?.includes('@') ? `
                  <div class="mt-8 space-y-6 max-w-md mx-auto">
                    <div class="bg-white/8 backdrop-blur-md rounded-2xl p-6 border border-white/15 shadow-lg">
                      <div class="text-xs text-white/50 mb-2 uppercase tracking-wide font-medium">Email Address</div>
                      <div class="text-white/90 font-mono text-lg bg-white/5 px-4 py-3 rounded-xl border border-white/10">${result.subtitle}</div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button onclick="window.open('mailto:${result.subtitle}', '_blank')"
                              class="group bg-white/10 backdrop-blur-md hover:bg-white/15 text-white/90 px-6 py-4 rounded-2xl transition-all duration-200 border border-white/15 hover:border-white/25 shadow-lg hover:shadow-xl hover:scale-105">
                        <div class="flex items-center justify-center gap-2">
                          <span class="text-lg">✉️</span>
                          <span class="font-medium">Send Email</span>
                        </div>
                      </button>
                      <button onclick="navigator.clipboard.writeText('${result.subtitle}'); showToast('Email copied!')"
                              class="group bg-white/8 backdrop-blur-md hover:bg-white/12 text-white/80 px-6 py-4 rounded-2xl transition-all duration-200 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl hover:scale-105">
                        <div class="flex items-center justify-center gap-2">
                          <span class="text-lg">📋</span>
                          <span class="font-medium">Copy Email</span>
                        </div>
                      </button>
                    </div>
                  </div>
                ` : `
                  <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                    <a href="/about" class="group bg-white/10 backdrop-blur-md hover:bg-white/15 text-white/90 px-6 py-4 rounded-2xl transition-all duration-200 border border-white/15 hover:border-white/25 shadow-lg hover:shadow-xl hover:scale-105 text-center">
                      <div class="flex items-center justify-center gap-2">
                        <span class="text-lg">📖</span>
                        <span class="font-medium">Learn More</span>
                      </div>
                    </a>
                    <a href="/contact" class="group bg-white/8 backdrop-blur-md hover:bg-white/12 text-white/80 px-6 py-4 rounded-2xl transition-all duration-200 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl hover:scale-105 text-center">
                      <div class="flex items-center justify-center gap-2">
                        <span class="text-lg">💬</span>
                        <span class="font-medium">Get In Touch</span>
                      </div>
                    </a>
                  </div>
                `}
              </div>
            </div>
          </div>

          <!-- Back to Search -->
          <div class="mt-8 pt-6 border-t border-white/10">
            <button onclick="window.dispatchEvent(new CustomEvent('openSearch'))"
                    class="group bg-white/8 backdrop-blur-md hover:bg-white/12 text-white/80 px-6 py-3 rounded-2xl transition-all duration-200 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl hover:scale-105">
              <div class="flex items-center gap-2">
                <span class="text-lg">🔍</span>
                <span class="font-medium">Search Again</span>
              </div>
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
