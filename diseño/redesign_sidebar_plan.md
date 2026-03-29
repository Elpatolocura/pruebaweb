# Plan de Rediseño Sidebar - Eventia

## 1. Definición de Identidad Visual
*   **Color Primario (Activo):** Naranja (#ff7a00 o similar vibrante).
*   **Fondo Sidebar:** Blanco puro o gris muy claro (#ffffff / #f9fafb).
*   **Texto/Iconos Inactivos:** Gris suave (#94a3b8).
*   **Tipografía:** Inter (ya en uso).
*   **Estilo:** Dashboards modernos (Notion/Stripe), bordes redondeados (12px-16px), sombras muy sutiles.

## 2. Ajustes en Estilos CSS (`css/styles.css`)
*   Redefinir variables para el sidebar.
*   Ajustar el layout para que el sidebar sea fijo y el contenido se desplace correctamente.
*   Estilizar los `nav-item` (estados neutral, hover, activo).
*   Estilizar los títulos de sección (Labels).
*   Estilizar el botón "+ Crear Evento" en la parte inferior.
*   Implementar microinteracciones (transitions suaves).

## 3. Actualización de Inyección de Sidebar (`js/eventia.js`)
*   Modificar la función `loadSidebar()` para reflejar la nueva jerarquía.
*   Asegurar que todos los elementos solicitados estén presentes.
*   Implementar la lógica del botón "Crear Evento":
    *   Activo si `currentPage === 'index.html'`.
    *   Deshabilitado (beige/gris) en otras páginas.
    *   Agregar atributo de tooltip.

## 4. Estructura del Sidebar en HTML (Mockup)
```html
<aside class="sidebar">
    <div class="sidebar-header">...Logo...</div>
    <div class="sidebar-nav">
        <h3 class="nav-title">GENERAL</h3>
        <ul class="nav-list">
            <li class="nav-item">...Principal...</li>
            <li class="nav-item">...Explorar Eventos...</li>
        </ul>
        <h3 class="nav-title">ORGANIZACIÓN</h3>
        <ul class="nav-list">
            <li class="nav-item">...Mis Eventos...</li>
            <li class="nav-item">...Mis Entradas (Badge)...</li>
            <li class="nav-item">...Mensajes...</li>
            <li class="nav-item">...Estadísticas...</li>
            <li class="nav-item">...Comunidad...</li>
        </ul>
        <h3 class="nav-title">MANTENIMIENTO</h3>
        <ul class="nav-list">
            <li class="nav-item">...Ajustes...</li>
        </ul>
    </div>
    <div class="sidebar-footer">
        <button class="btn-create-event">...Crear Evento...</button>
    </div>
</aside>
```

## 5. Implementación de Tooltips
*   Usar un pseudo-elemento `::after` simple o una pequeña función JS para el tooltip del botón deshabilitado.
