// js/stats.js
document.addEventListener('DOMContentLoaded', () => {

    const colors = {
        primary: '#6366f1',
        primaryLight: 'rgba(99, 102, 241, 0.2)',
        success: '#10b981',
        warning: '#f59e0b',
        info: '#3b82f6',
        danger: '#ef4444',
        textMuted: '#64748b'
    };

    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = colors.textMuted;

    // 1. Historial de Ventas (Line Chart)
    const ctxRevenue = document.getElementById('revenueChart');
    if (ctxRevenue) {
        new Chart(ctxRevenue, {
            type: 'line',
            data: {
                labels: ['01 Mar', '05 Mar', '10 Mar', '15 Mar', '20 Mar', '25 Mar', '30 Mar'],
                datasets: [{
                    label: 'Ventas ($)',
                    data: [1200, 1900, 1500, 2800, 3400, 3100, 4500],
                    borderColor: colors.primary,
                    backgroundColor: colors.primaryLight,
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false } },
                    y: { grid: { color: 'rgba(0,0,0,0.03)', borderDash: [5, 5] } }
                }
            }
        });
    }

    // 2. Fuentes de Tráfico (Doughnut/Pie)
    const ctxTraffic = document.getElementById('trafficSourcesChart');
    if (ctxTraffic) {
        new Chart(ctxTraffic, {
            type: 'doughnut',
            data: {
                labels: ['TikTok', 'Instagram', 'Directo', 'Google'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [colors.primary, '#ec4899', colors.info, colors.success],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, padding: 20 } } }
            }
        });
    }

    // 3. Tipos de Entradas
    const ctxTickets = document.getElementById('ticketsChart');
    if (ctxTickets) {
        new Chart(ctxTickets, {
            type: 'doughnut',
            data: {
                labels: ['Gratis', 'Pagas', 'VIP'],
                datasets: [{
                    data: [40, 45, 15],
                    backgroundColor: ['#94a3b8', colors.primary, colors.success],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, padding: 20 } } }
            }
        });
    }

    // 4. Demografía: Edad (Bar Chart)
    const ctxAge = document.getElementById('ageChart');
    if (ctxAge) {
        new Chart(ctxAge, {
            type: 'bar',
            data: {
                labels: ['18-24', '25-34', '35-44', '45+'],
                datasets: [{
                    label: 'Usuarios',
                    data: [450, 320, 150, 80],
                    backgroundColor: colors.primary,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false } },
                    y: { grid: { display: false }, ticks: { display: false } }
                }
            }
        });
    }

    // 5. Demografía: Género (Pie Chart)
    const ctxGender = document.getElementById('genderChart');
    if (ctxGender) {
        new Chart(ctxGender, {
            type: 'pie',
            data: {
                labels: ['Mujer', 'Hombre', 'Otro'],
                datasets: [{
                    data: [52, 44, 4],
                    backgroundColor: ['#f472b6', '#60a5fa', '#94a3b8'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, padding: 10 } } }
            }
        });
    }
});
