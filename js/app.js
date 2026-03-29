// app.js — Eventia Dashboard

document.addEventListener('DOMContentLoaded', () => {
    console.log("Eventia Dashboard Inicializado...");

    // ─── Marcar item activo del sidebar según la página actual ───────────────
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-item a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href === currentPage) {
            link.closest('.nav-item').classList.add('active');
        } else {
            link.closest('.nav-item').classList.remove('active');
        }
    });

    // ─── Efecto hover en tarjetas de evento del dashboard ───────────────────
    const dashedCard = document.querySelector('.dashed-border');
    if (dashedCard) {
        dashedCard.addEventListener('click', () => {
            window.location.href = 'crear-evento.html';
        });
    }

    // ─── Toggle de notificaciones (visual básico) ────────────────────────────
    const bellBtn = document.querySelector('.icon-btn .ph-bell')?.parentElement;
    if (bellBtn) {
        bellBtn.addEventListener('click', () => {
            const dot = bellBtn.querySelector('.notification-dot');
            if (dot) dot.style.display = dot.style.display === 'none' ? '' : 'none';
        });
    }

    // ─── Animar KPI values al cargar (contador animado) ──────────────────────
    document.querySelectorAll('.kpi-content h3').forEach(el => {
        const raw = el.textContent.replace(/[^0-9.]/g, '');
        const suffix = el.textContent.replace(/[0-9.,]/g, '').trim();
        const target = parseFloat(raw.replace(',', ''));
        if (isNaN(target)) return;
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            const formatted = current >= 1000
                ? (current / 1000).toFixed(1).replace('.0', '') + 'K'
                : Math.round(current).toLocaleString('es-ES');
            el.textContent = formatted + (suffix && !suffix.includes('K') ? suffix : '');
            if (current >= target) clearInterval(timer);
        }, 30);
    });

});
