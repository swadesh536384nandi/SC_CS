// 1. PASTE YOUR NEW DEPLOYMENT LINK HERE
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbxvy61Vy62jYreSeNYYQR94RgGi-IV0Fzbb2fAyVrInJ0XBS-pqFwpdabf_wytVj7bsBA/exec";
//const SHEETS_URL = "YOUR_NEW_DEPLOYMENT_URL_HERE";

async function loadNotices() {
    try {
        const response = await fetch(SHEETS_URL);
        const data = await response.json();

        const containers = {
            'Notice & Circular': document.getElementById('notice-content'),
            'Examination': document.getElementById('exam-content'),
            'Scholarships': document.getElementById('scholar-content')
        };

        Object.values(containers).forEach(el => {
            if (el) el.innerHTML = '<ul class="space-y-4"></ul>';
        });

        // --- NEW: SORTING LOGIC ---
        // This sorts the data by date_added (Newest First)
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        const SIX_MONTHS_MS = 100 * 24 * 60 * 60 * 1000;
        const now = new Date();

        data.forEach(item => {
            const listContainer = containers[item.link_type]?.querySelector('ul');
            
            if (listContainer) {
                const postDate = new Date(item.date);
                const isNew = (now - postDate) < SIX_MONTHS_MS;

                // Format the date for display (Optional: e.g., "Mar 22, 2026")
                const displayDate = postDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });

                const newBadge = isNew 
                    ? `<span class="ml-2 px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded animate-pulse">NEW</span>` 
                    : '';

                const li = document.createElement('li');
                li.className = "border-b border-gray-100 last:border-0 pb-3 hover:bg-gray-50 transition-colors rounded-lg p-2";
                li.innerHTML = `
                    <a href="${item.link}" target="_blank" class="flex flex-col md:flex-row md:items-center group">
                        <div class="flex items-center">
                            <i class="fas fa-calendar-alt mr-2 text-gray-400 text-xs"></i>
                            <span class="text-[11px] text-gray-500 font-mono mr-3">${displayDate}</span>
                        </div>
                        <div class="flex items-center flex-1">
                            <span class="text-gray-800 group-hover:text-indigo-600 font-medium leading-tight">
                                ${item.link_text}
                            </span>
                            ${newBadge}
                        </div>
                    </a>`;
                listContainer.appendChild(li);
            }
        });
    } catch (error) {
        console.error("Error loading notices:", error);
    }
}

loadNotices();