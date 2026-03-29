// eventia.js — Sistema Central de Eventia (Navegación Dinámica Indestructible)

document.addEventListener('DOMContentLoaded', () => {
    // ─── 1. GESTIÓN DE TEMAS Y APARIENCIA ──────────────────────────
    const applyGlobalTheme = () => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', localStorage.getItem('eventia-primary-color') || '#6366f1');
        root.style.setProperty('--primary-light', localStorage.getItem('eventia-primary-light') || 'rgba(99, 102, 241, 0.1)');
        root.style.setProperty('--primary-dark', localStorage.getItem('eventia-primary-dark') || '#4f46e5');

        const savedTheme = localStorage.getItem('eventia-theme') || 'light';
        document.body.classList.toggle('dark-theme', savedTheme === 'dark' || (savedTheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches));
    };
    applyGlobalTheme();

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

    // ─── 3. CARGA DEL SIDEBAR ─────────────────────────────────────
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isPremium = localStorage.getItem('is-premium') === 'true';

    const loadSidebar = () => {
        const sidebarContainer = document.getElementById('sidebar-container');
        if (!sidebarContainer) return;
        
        sidebarContainer.innerHTML = `
        <aside class="sidebar glass-panel">
            <div class="sidebar-header"><div class="logo"><div class="logo-icon"><i class="ph-fill ph-planet"></i></div><h2>Eventia</h2></div></div>
            <nav class="sidebar-nav">
                <ul class="nav-list">
                    <li class="nav-item ${currentPage === 'index.html' ? 'active' : ''}" data-page="index.html"><a href="index.html"><i class="ph ph-squares-four"></i> Principal</a></li>
                    <li class="nav-item ${currentPage === 'explorar-eventos.html' ? 'active' : ''}" data-page="explorar-eventos.html"><a href="explorar-eventos.html"><i class="ph ph-calendar-blank"></i> Explorar Eventos</a></li>
                    <li class="nav-item premium-feature ${currentPage === 'mis-eventos.html' ? 'active' : ''}" data-page="mis-eventos.html"><a href="#"><i class="ph ph-list-bullets"></i> Mis Eventos <i class="ph-fill ph-crown" style="font-size: 0.75rem; margin-left: auto; color: #f59e0b;"></i></a></li>
                    <li class="nav-item ${currentPage === 'mis-entradas.html' ? 'active' : ''}" data-page="mis-entradas.html"><a href="mis-entradas.html"><i class="ph ph-ticket"></i> Mis Entradas <span class="badge badge-purple">3</span></a></li>
                    <li class="nav-item ${currentPage === 'mensajes.html' ? 'active' : ''}" data-page="mensajes.html"><a href="mensajes.html"><i class="ph ph-chat-circle-dots"></i> Mensajes</a></li>
                    <li class="nav-item premium-feature ${currentPage === 'estadisticas.html' ? 'active' : ''}" data-page="estadisticas.html"><a href="#"><i class="ph ph-chart-line-up"></i> Estadísticas <i class="ph-fill ph-crown" style="font-size: 0.75rem; margin-left: auto; color: #f59e0b;"></i></a></li>
                </ul>
                <h3 class="nav-title">ORGANIZACIÓN</h3>
                <ul class="nav-list">
                    <li class="nav-item ${currentPage === 'comunidad.html' ? 'active' : ''}" data-page="comunidad.html"><a href="comunidad.html"><i class="ph ph-users"></i> Comunidad</a></li>
                    <li class="nav-item ${currentPage === 'ajustes.html' ? 'active' : ''}" data-page="ajustes.html"><a href="ajustes.html"><i class="ph ph-gear"></i> Ajustes</a></li>
                </ul>
            </nav>
            <div class="sidebar-footer">
                <div class="create-btn-container" style="display: flex; flex-direction: column; width: 100%; padding: 0 16px 16px;">
                    <a href="#" class="btn btn-primary premium-feature" id="sidebar-create-btn" data-page="crear-evento.html" style="width: 100%; justify-content: center; margin-bottom: 8px; position: relative;">
                        <i class="ph ph-plus"></i> Crear Evento
                        <i class="ph-fill ph-crown" style="position: absolute; top: -5px; right: -5px; font-size: 0.9rem; color: #f59e0b; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));"></i>
                    </a>
                    <a href="#" class="logout-link" id="sidebar-logout" style="color: #ef4444; display: flex; align-items: center; gap: 12px; padding: 10px 0; font-weight: 500; font-size: 0.95rem; text-decoration: none;"><i class="ph ph-sign-out"></i> Cerrar Sesión</a>
                </div>
            </div>
        </aside>`;
    };
    loadSidebar();

    // ─── 4. ALERTA PREMIUM REUTILIZABLE ───────────────────────────
    const showPremiumAlert = () => {
        if (document.getElementById('premium-alert')) return; // Previene spam de alertas
        const alert = document.createElement('div');
        alert.id = 'premium-alert';
        alert.style.cssText = `
            position: fixed; top: 32px; left: 50%; transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(12px);
            color: white; padding: 20px 32px; border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4); z-index: 100000;
            display: flex; align-items: center; gap: 16px; border: 1px solid rgba(245, 158, 11, 0.3);
            animation: slideIntoView 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;
        alert.innerHTML = `
            <div style="background: #f59e0b; color: white; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;"><i class="ph-fill ph-crown"></i></div>
            <div>
                <h4 style="margin: 0; font-size: 1.1rem;">Función de Pago</h4>
                <p style="margin: 4px 0 0; font-size: 0.9rem; opacity: 0.8;">Sube a <strong>Premium</strong> para desbloquear esta herramienta.</p>
            </div>
            <button onclick="window.location='premium.html'" style="background: #f59e0b; color: white; border: none; padding: 10px 18px; border-radius: 12px; font-weight: 700; cursor: pointer; margin-left: 10px;">Mejorar</button>
        `;
        document.body.appendChild(alert);

        setTimeout(() => {
            const el = document.getElementById('premium-alert');
            if(el) { el.style.animation = 'slideOutOfView 0.5s ease forwards'; setTimeout(() => el.remove(), 500); }
        }, 4000);
    };

    // ─── 5. SISTEMA DE NOTIFICACIONES ─────────────────────────────
    let dropdown = document.querySelector('.notif-dropdown-global');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'notif-dropdown-global';
        dropdown.innerHTML = `
            <div class="notif-header"><h3>Notificaciones</h3><span>Marcar como leído</span></div>
            <div class="notif-list-global">
                <div class="notif-item-global">
                    <div class="notif-icon-global" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;"><i class="ph ph-calendar-check"></i></div>
                    <div class="notif-content-global"><p>Tu evento <strong>"Workshop UI"</strong> ha sido aprobado.</p><span>Hace 2 horas</span></div>
                </div>
                <div class="notif-item-global" style="background: var(--primary-light);">
                    <div class="notif-icon-global" style="background: var(--primary-color); color: white;"><i class="ph ph-ticket"></i></div>
                    <div class="notif-content-global"><p>¡Nuevo ticket vendido para <strong>Summer Fest!</strong></p><span>Hace 5 horas</span></div>
                </div>
                <div class="notif-item-global">
                    <div class="notif-icon-global" style="background: rgba(16, 185, 129, 0.1); color: #10b981;"><i class="ph ph-user-plus"></i></div>
                    <div class="notif-content-global"><p><strong>Maria Lopez</strong> se ha unido a tu comunidad.</p><span>Ayer</span></div>
                </div>
            </div>`;
        document.body.appendChild(dropdown);
    }

    // ─── 6. DELEGACIÓN DE EVENTOS GLOBAL (Optimizada) ─────────────
    document.addEventListener('click', (e) => {
        // A. Manejo de Logout
        if (e.target.closest('#sidebar-logout')) {
            e.preventDefault();
            if (confirm('¿Cerrar sesión?')) { localStorage.clear(); window.location.href = 'login.html'; }
            return;
        }

        // B. Manejo de Funciones Premium en Sidebar
        const premiumBtn = e.target.closest('.premium-feature');
        if (premiumBtn) {
            e.preventDefault();
            if (!isPremium) {
                showPremiumAlert();
            } else {
                window.location.href = premiumBtn.getAttribute('data-page');
            }
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
        const bellBtn = e.target.closest('.ph-bell')?.parentElement || e.target.closest('.icon-btn');
        if (bellBtn && bellBtn.querySelector('.ph-bell')) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('active');
            
            const rect = bellBtn.getBoundingClientRect();
            dropdown.style.top = `${rect.bottom + 15}px`;
            dropdown.style.right = `${window.innerWidth - rect.right}px`;
        } else if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

