// eventia.js — Sistema Central de Eventia (Navegación Dinámica Indestructible)

document.addEventListener('DOMContentLoaded', () => {
    // ─── 1. GESTIÓN DE TEMAS Y APARIENCIA ──────────────────────────
    const applyGlobalTheme = () => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', localStorage.getItem('eventia-primary-color') || '#ff6b00');
        root.style.setProperty('--primary-light', localStorage.getItem('eventia-primary-light') || '#fff7ed');
        root.style.setProperty('--primary-dark', localStorage.getItem('eventia-primary-dark') || '#ea580c');

        const savedTheme = localStorage.getItem('eventia-theme') || 'light';
        document.body.classList.toggle('dark-theme', savedTheme === 'dark' || (savedTheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches));
    };
    applyGlobalTheme();

    const isPremium = localStorage.getItem('is-premium') === 'true';
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // ─── 1.5 PROTECCIÓN DE NAVEGACIÓN SEGÚN PLAN ─────────────────
    // Asegurar que el flag de "bienvenida vista" esté presente si el usuario está en el dashboard
    if (currentPage !== 'welcome.html' && currentPage !== 'login.html' && currentPage !== 'registro.html' && currentPage !== 'onboarding.html') {
        localStorage.setItem('eventia-welcome-seen', 'true');
    }

    // Si un usuario NO es premium e intenta entrar a Principal (index.html), redirigir
    if (!isPremium && (currentPage === 'index.html' || currentPage === '')) {
        window.location.replace('explorar-eventos.html');
        return;
    }

    // Función global para redirección inicial post-login/onboarding
    window.redirectToStart = () => {
        const premium = localStorage.getItem('is-premium') === 'true';
        window.location.href = premium ? 'index.html' : 'explorar-eventos.html';
    };

    // ─── 2. INYECCIÓN DE ESTILOS GLOBALES ──────────────────────────
    const injectGlobalStyles = () => {
        if (document.getElementById('eventia-global-styles')) return;
        const style = document.createElement('style');
        style.id = 'eventia-global-styles';
        style.textContent = `
            /* Perfil Cursor */
            .user-profile { cursor: pointer; transition: opacity 0.2s; } 
            .user-profile:hover { opacity: 0.85; }
            
            /* Animaciones Premium Alert */
            @keyframes slideIntoView { from { top: -100px; opacity: 0; } to { top: 32px; opacity: 1; } }
            @keyframes slideOutOfView { from { top: 32px; opacity: 1; } to { top: -100px; opacity: 0; } }
            
            /* Notificaciones Dropdown */
            .notif-dropdown-global {
                position: absolute; top: 70px; right: 20px; width: 340px;
                background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px);
                border-radius: 24px; border: 1px solid rgba(0,0,0,0.05);
                box-shadow: 0 20px 50px rgba(0,0,0,0.1); z-index: 10000; padding: 20px;
                display: none; transform-origin: top right;
                animation: notifAppear 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .notif-dropdown-global.active { display: block; }
            @keyframes notifAppear { from { opacity: 0; transform: scale(0.9) translateY(-10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
            
            .notif-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
            .notif-header h3 { font-size: 1.1rem; margin: 0; }
            .notif-header span { font-size: 0.8rem; color: var(--primary-color); font-weight: 600; cursor: pointer; }
            
            .notif-list-global { display: flex; flex-direction: column; gap: 16px; }
            .notif-item-global { display: flex; gap: 12px; padding: 12px; border-radius: 16px; transition: 0.2s; cursor: pointer; }
            .notif-item-global:hover { background: rgba(0,0,0,0.02); }
            .notif-icon-global { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
            .notif-content-global p { margin: 0; font-size: 0.9rem; line-height: 1.4; color: var(--text-main); }
            .notif-content-global strong { color: var(--text-main); }
            .notif-content-global span { font-size: 0.75rem; color: var(--text-light); }
        `;
        document.head.appendChild(style);
    };
    injectGlobalStyles();

    // ─── 2.5 INICIALIZACIÓN DE NOTIFICACIONES ──────────────────────
    let dropdown;
    const initializeNotifications = () => {
        if (document.getElementById('notif-dropdown-global')) {
            dropdown = document.getElementById('notif-dropdown-global');
            return;
        }

        dropdown = document.createElement('div');
        dropdown.id = 'notif-dropdown-global';
        dropdown.className = 'notif-dropdown-global';
        dropdown.innerHTML = `
            <div class="notif-header">
                <h3>Notificaciones</h3>
                <span onclick="this.closest('.notif-dropdown-global').classList.remove('active')">Cerrar</span>
            </div>
            <div class="notif-list-global">
                <div class="notif-item-global">
                    <div class="notif-icon-global" style="background: rgba(255, 107, 0, 0.1); color: var(--primary-color);">
                        <i class="ph-fill ph-ticket"></i>
                    </div>
                    <div class="notif-content-global">
                        <p><strong>Entrada confirmada:</strong> Tu ticket para "Indie Rock" está listo.</p>
                        <span>Hace 5 minutos</span>
                    </div>
                </div>
                <div class="notif-item-global">
                    <div class="notif-icon-global" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;">
                        <i class="ph-fill ph-chat-circle-dots"></i>
                    </div>
                    <div class="notif-content-global">
                        <p><strong>Nuevo mensaje:</strong> Sofía Martí te ha escrito al chat.</p>
                        <span>Hace 12 minutos</span>
                    </div>
                </div>
                <div class="notif-item-global">
                    <div class="notif-icon-global" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">
                        <i class="ph-fill ph-shield-check"></i>
                    </div>
                    <div class="notif-content-global">
                        <p><strong>Seguridad:</strong> Se ha iniciado sesión desde un nuevo dispositivo.</p>
                        <span>Ayer, 20:30</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(dropdown);
    };
    initializeNotifications();

    // ─── 2.6 SOPORTE MOBILE (Hamburguesa y Overlay) ──────────────
    const setupMobileMenu = () => {
        // Inyectar Overlay si no existe
        if (!document.querySelector('.sidebar-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
        }

        // Inyectar Botón Hamburguesa en el Header si no existe
        const header = document.querySelector('.top-header');
        if (header && !document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '<i class="ph ph-list"></i>';
            header.prepend(menuBtn);

            menuBtn.onclick = () => {
                const sidebar = document.querySelector('.sidebar');
                const overlay = document.querySelector('.sidebar-overlay');
                if (sidebar) sidebar.classList.toggle('active');
                if (overlay) overlay.classList.toggle('active');
            };
        }

        // Cerrar al clickear overlay
        document.querySelector('.sidebar-overlay').onclick = () => {
            document.querySelector('.sidebar')?.classList.remove('active');
            document.querySelector('.sidebar-overlay')?.classList.remove('active');
        };
    };
    setupMobileMenu();

    // ─── 3. CARGA DEL SIDEBAR (Rediseño Moderno Orange) ───────────

    const loadSidebar = () => {
        let container = document.getElementById('sidebar-container');
        if (!container) {
            const existingSidebar = document.querySelector('aside.sidebar');
            if (existingSidebar) {
                container = document.createElement('div');
                container.id = 'sidebar-container';
                existingSidebar.parentNode.replaceChild(container, existingSidebar);
            } else {
                const layout = document.querySelector('.dashboard-layout');
                if (layout) {
                    container = document.createElement('div');
                    container.id = 'sidebar-container';
                    layout.prepend(container);
                }
            }
        }

        if (!container) return;

        const isLocked = (page) => {
            const premiumPages = ['index.html', 'mis-eventos.html', 'estadisticas.html', 'crear-evento.html'];
            return !isPremium && premiumPages.includes(page);
        };

        const sidebarHTML = `
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    <div class="logo-icon"><i class="ph-fill ph-planet"></i></div>
                    <h2>Eventia</h2>
                    <button class="mobile-close-btn" style="display:none; margin-left:auto; font-size:1.5rem; color:var(--text-muted);"><i class="ph ph-x"></i></button>
                </div>
            </div>
            
            <nav class="sidebar-nav">
                <h3 class="nav-title">GENERAL</h3>
                <ul class="nav-list">
                    <li class="nav-item ${isLocked('index.html') ? 'locked' : ''} ${currentPage === 'index.html' ? 'active' : ''}">
                        <a href="${isLocked('index.html') ? '#' : 'index.html'}">
                            <i class="ph ph-squares-four${currentPage === 'index.html' ? '-fill' : ''}"></i> 
                            <span>Principal</span> ${isLocked('index.html') ? '<i class="ph-fill ph-crown" style="color:var(--primary-color);"></i>' : ''}
                        </a>
                    </li>
                    <li class="nav-item ${(currentPage === 'explorar-eventos.html' || currentPage === 'explorar-mapa.html') ? 'active' : ''}">
                        <a href="explorar-eventos.html">
                            <i class="ph ph-compass${(currentPage === 'explorar-eventos.html' || currentPage === 'explorar-mapa.html') ? '-fill' : ''}"></i> 
                            <span>Explorar Eventos</span>
                        </a>
                    </li>
                </ul>

                <h3 class="nav-title">ORGANIZACIÓN</h3>
                <ul class="nav-list">
                    <li class="nav-item ${isLocked('mis-eventos.html') ? 'locked' : ''} ${currentPage === 'mis-eventos.html' ? 'active' : ''}">
                        <a href="${isLocked('mis-eventos.html') ? '#' : 'mis-eventos.html'}">
                            <i class="ph ph-calendar-blank${currentPage === 'mis-eventos.html' ? '-fill' : ''}"></i> 
                            <span>Mis Eventos</span> ${isLocked('mis-eventos.html') ? '<i class="ph-fill ph-crown" style="color:var(--primary-color);"></i>' : ''}
                        </a>
                    </li>
                    <li class="nav-item ${currentPage === 'mis-entradas.html' ? 'active' : ''}">
                        <a href="mis-entradas.html">
                            <i class="ph ph-ticket${currentPage === 'mis-entradas.html' ? '-fill' : ''}"></i> 
                            <span>Mis Entradas</span>
                        </a>
                    </li>
                    <li class="nav-item ${currentPage === 'mensajes.html' ? 'active' : ''}">
                        <a href="mensajes.html">
                            <i class="ph ph-chat-circle-dots${currentPage === 'mensajes.html' ? '-fill' : ''}"></i> 
                            <span>Mensajes</span>
                        </a>
                    </li>
                    <li class="nav-item ${isLocked('estadisticas.html') ? 'locked' : ''} ${currentPage === 'estadisticas.html' ? 'active' : ''}">
                        <a href="${isLocked('estadisticas.html') ? '#' : 'estadisticas.html'}">
                            <i class="ph ph-chart-line-up${currentPage === 'estadisticas.html' ? '-fill' : ''}"></i> 
                            <span>Estadísticas</span> ${isLocked('estadisticas.html') ? '<i class="ph-fill ph-crown" style="color:var(--primary-color);"></i>' : ''}
                        </a>
                    </li>
                    <li class="nav-item ${currentPage === 'comunidad.html' ? 'active' : ''}">
                        <a href="comunidad.html">
                            <i class="ph ph-users${currentPage === 'comunidad.html' ? '-fill' : ''}"></i> 
                            <span>Comunidad</span>
                        </a>
                    </li>
                </ul>

                <h3 class="nav-title">SISTEMA</h3>
                <ul class="nav-list">
                    <li class="nav-item ${currentPage === 'ajustes.html' ? 'active' : ''}">
                        <a href="ajustes.html">
                            <i class="ph ph-gear${currentPage === 'ajustes.html' ? '-fill' : ''}"></i> 
                            <span>Ajustes</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div class="sidebar-footer">
                <button class="btn-create-event ${isLocked('crear-evento.html') ? 'locked' : ''}">
                    <i class="ph ph-plus-circle"></i> <span>Crear Evento</span>
                </button>
                <a href="#" class="logout-link" id="sidebar-logout">
                    <i class="ph ph-sign-out"></i> <span>Cerrar Sesión</span>
                </a>
            </div>
        </aside>`;

        container.innerHTML = sidebarHTML;

        // Configurar botones de cierre en mobile
        const sidebar = container.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const closeBtn = container.querySelector('.mobile-close-btn');

        if (closeBtn) {
            closeBtn.style.display = window.innerWidth <= 768 ? 'block' : 'none';
            closeBtn.onclick = () => {
                sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
            };
        }
    };
    loadSidebar();

    // ─── 4. MODAL PREMIUM REUTILIZABLE ───────────────────────────
    const showPremiumModal = () => {
        if (document.getElementById('premium-modal-container')) return;

        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'premium-modal-container';
        modalOverlay.style.cssText = `
            position: fixed; inset: 0; background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(8px); z-index: 1000000;
            display: flex; align-items: center; justify-content: center; padding: 20px;
            animation: fadeIn 0.3s ease;
        `;

        modalOverlay.innerHTML = `
            <div class="premium-modal glass-panel" style="max-width: 440px; width: 100%; padding: 40px; text-align: center; background: white; border-radius: 32px; box-shadow: 0 30px 60px rgba(0,0,0,0.2);">
                <div style="width: 80px; height: 80px; background: var(--primary-color); color: white; border-radius: 24px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 24px; box-shadow: var(--shadow-colored);">
                    <i class="ph-fill ph-crown"></i>
                </div>
                <h2 style="font-size: 1.8rem; margin-bottom: 12px; font-weight: 800; letter-spacing: -1px;">Función Premium</h2>
                <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 32px; font-size: 1.05rem;">
                    Esta función está disponible solo para usuarios <strong>Premium</strong>. 
                    Únete a la élite de Eventia para desbloquear todo el potencial.
                </p>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <button id="upgrade-btn" class="btn btn-primary" style="padding: 16px; font-weight: 700; font-size: 1rem; border-radius: 16px;">
                        Actualizar a Premium
                    </button>
                    <button id="close-modal-btn" class="btn btn-outline" style="padding: 14px; font-weight: 600; font-size: 0.95rem; border: none; color: var(--text-muted);">
                        Ahora no, gracias
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        const closeModal = () => {
            modalOverlay.style.opacity = '0';
            modalOverlay.style.transition = 'opacity 0.3s ease';
            setTimeout(() => modalOverlay.remove(), 300);
        };

        document.getElementById('upgrade-btn').onclick = () => window.location.href = 'premium.html';
        document.getElementById('close-modal-btn').onclick = closeModal;
        modalOverlay.onclick = (e) => { if (e.target === modalOverlay) closeModal(); };
    };

    // ─── 6. DELEGACIÓN DE EVENTOS GLOBAL (Optimizada) ─────────────
    document.addEventListener('click', (e) => {
        // A. Manejo de Logout
        if (e.target.closest('#sidebar-logout')) {
            e.preventDefault();
            if (confirm('¿Cerrar sesión?')) {
                // Logout selectivo: borrar solo la sesión, mantener preferencias
                localStorage.removeItem('is-premium');
                // Opcional: localStorage.removeItem('eventia-welcome-seen'); // Si quieres que vuelvan a ver el splash
                window.location.href = 'login.html';
            }
            return;
        }

        // B. Manejo de Funciones Premium Bloqueadas
        const lockedItem = e.target.closest('.locked');
        if (lockedItem) {
            e.preventDefault();
            e.stopPropagation();
            showPremiumModal();
            return;
        }

        // C. Navegación al Perfil de Usuario
        const profileContainer = e.target.closest('.user-profile');
        if (profileContainer && !e.target.closest('.icon-btn') && !e.target.closest('button')) {
            const targetUrl = profileContainer.getAttribute('data-url') || 'perfil.html';
            window.location.href = targetUrl;
            return;
        }

        // D. Apertura/Cierre de Notificaciones
        const bellBtn = e.target.closest('.ph-bell')?.parentElement || e.target.closest('button.icon-btn');
        if (bellBtn && (bellBtn.querySelector('.ph-bell') || bellBtn.classList.contains('ph-bell'))) {
            e.preventDefault();
            e.stopPropagation();
            if (dropdown) {
                dropdown.classList.toggle('active');

                const rect = bellBtn.getBoundingClientRect();
                dropdown.style.top = `${rect.bottom + 15}px`;
                dropdown.style.right = `${window.innerWidth - rect.right}px`;
            }
        } else if (dropdown && dropdown.classList.contains('active') && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

