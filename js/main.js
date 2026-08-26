function toggleMenu() {
    let links = document.getElementById('navLinks');
    if (links) links.classList.toggle('mobile-open');
}

function filterResources(btn, cat) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.querySelectorAll('.resource-card').forEach(card => {
        let cats = card.getAttribute('data-cat') || '';
        card.style.display = (cat === 'all' || cats.includes(cat)) ? 'flex' : 'none';
    });
}

function doSearch() {
    let kw = document.getElementById('searchInput');
    if (!kw) return;
    let keyword = kw.value.trim().toLowerCase();
    let rows = document.querySelectorAll('.resource-row');
    rows.forEach(row => {
        let name = (row.getAttribute('data-name') || '').toLowerCase();
        let grade = (row.getAttribute('data-grade') || '').toLowerCase();
        let subject = (row.getAttribute('data-subject') || '').toLowerCase();
        let type = (row.getAttribute('data-type') || '').toLowerCase();
        let note = (row.querySelector('.note')?.textContent || '').toLowerCase();
        row.style.display = (!keyword || name.includes(keyword) || grade.includes(keyword) || subject.includes(keyword) || type.includes(keyword) || note.includes(keyword)) ? 'flex' : 'none';
    });
}

function applyFilter() {
    let grade = document.getElementById('filterGrade')?.value || '';
    let subject = document.getElementById('filterSubject')?.value || '';
    let type = document.getElementById('filterType')?.value || '';
    let keyword = document.getElementById('searchInput')?.value.trim().toLowerCase() || '';
    document.querySelectorAll('.resource-row').forEach(row => {
        let rg = row.getAttribute('data-grade') || '';
        let rs = row.getAttribute('data-subject') || '';
        let rt = row.getAttribute('data-type') || '';
        let rn = (row.getAttribute('data-name') || '').toLowerCase();
        let rnote = (row.querySelector('.note')?.textContent || '').toLowerCase();
        let ok = (!grade || rg === grade || rg.includes(grade) || grade.includes(rg))
            && (!subject || rs === subject)
            && (!type || rt === type)
            && (!keyword || rn.includes(keyword) || rnote.includes(keyword) || rs.toLowerCase().includes(keyword) || rg.toLowerCase().includes(keyword));
        row.style.display = ok ? 'flex' : 'none';
    });
}

function resetFilter() {
    ['filterGrade', 'filterSubject', 'filterType', 'searchInput'].forEach(id => {
        let el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.querySelectorAll('.resource-row').forEach(row => row.style.display = 'flex');
}

function copyText(text, btn) {
    let old = btn.textContent;
    let oldBg = btn.style.background;
    let oldColor = btn.style.color;
    let oldBorder = btn.style.borderColor;
    let done = () => {
        btn.textContent = '已复制 ✓';
        btn.style.background = '#dcfce7';
        btn.style.color = '#16a34a';
        btn.style.borderColor = '#86efac';
        setTimeout(() => {
            btn.textContent = old;
            btn.style.background = oldBg;
            btn.style.color = oldColor;
            btn.style.borderColor = oldBorder;
        }, 2000);
    };
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
        fallbackCopy(text, done);
    }
}

function fallbackCopy(text, callback) {
    let ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
    if (callback) callback();
}

function copyWechat() { copyText('17795600558', event.target); }
function copyQQ() { copyText('3616927242', event.target); }
function copyXhs() { copyText('Nebula_official', event.target); }

document.addEventListener('DOMContentLoaded', function() {
    let params = new URLSearchParams(window.location.search);
    let kw = params.get('kw');
    if (kw && document.getElementById('searchInput')) {
        document.getElementById('searchInput').value = kw;
        doSearch();
    }
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            let links = document.getElementById('navLinks');
            if (links) links.classList.remove('mobile-open');
        });
    });
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            let target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
