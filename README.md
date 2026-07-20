# Profile-Pilot ✈️
<img width="2048" height="2048" alt="Minimalist airplane icon logo" src="https://github.com/user-attachments/assets/07cf862a-c3b4-48fe-ae48-2a658630798a" />

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Ziqian-Huang0607/Profile-Pilot)

**WAIC 2026 X SuperBrain AI Incubator enlisted project**
**An AI-powered web application that generates a comprehensive, human-readable analysis of any GitHub user's profile, now with a modern Vue 3 frontend.**
**Aplicación web potenciada con IA que genera un análisis completo y legible de cualquier perfil de GitHub, ahora con un frontend moderno en Vue 3.**

---

## 🔗 Live Demo | Demo en Vivo

**Frontend:** https://profile-pilot-seven.vercel.app

**Backend:** Hosted on Northflank(Vercel for online demo)

---

## 🌍 Overview | Descripción General

Profile-Pilot has been upgraded from a static HTML/JS site to a **Vue 3 + Vite + TailwindCSS** application, providing a more modern, responsive, and feature-rich experience.
Profile-Pilot ha sido actualizado de un sitio estático en HTML/JS a una aplicación **Vue 3 + Vite + TailwindCSS**, ofreciendo una experiencia más moderna, adaptable y con más funcionalidades.

**New Features / Nuevas Funciones:**
- 🌐 **Internationalization (i18n):** English & Spanish support.
  🌐 **Internacionalización (i18n):** Soporte para inglés y español.
- 🌓 **Theme Toggle:** Light/Dark mode with persistence.
  🌓 **Cambio de Tema:** Modo claro/oscuro con persistencia.
- 📱 **Responsive Design:** Fully optimized for mobile and desktop.
  📱 **Diseño Responsive:** Totalmente optimizado para móviles y escritorio.
- 🖥 **Modern UI:** Component-based architecture with reusable elements.
  🖥 **Interfaz Moderna:** Arquitectura basada en componentes con elementos reutilizables.

---

## ✨ Features | Funcionalidades

* **AI-Powered Analysis / Análisis con IA**
  Generates a report with:
    * 📊 **Overall Summary / Resumen General**
    * 💻 **Key Technical Skills / Habilidades Técnicas Clave**
    * 🚀 **Notable Projects / Proyectos Destacados**
    * 🧑‍💻 **Developer Archetype / Arquetipo de Desarrollador**

* **User-Friendly Tools / Herramientas Útiles:**
    * 📋 Copy to Clipboard / Copiar al portapapeles
    * ⬇️ Download as Markdown / Descargar como `.md`

---

## 🛠 Technology Stack | Tecnologías

**Frontend:**
- Vue 3 (Composition API)
- Vite
- TailwindCSS
- vue-i18n
- Lucide Vue Icons

**Backend:**
- Python 3
- Google Gemini API
- GitHub API
- Libraries: `google-generativeai`, `requests`, `markdown2`
- **Hosting:** Backend hosted on **Northflank(Vercel)**

**Hosting Frontend:**
- **Vercel**

---

## 🏛 Architecture | Arquitectura

```mermaid
flowchart TD
    subgraph "Frontend (Vue 3 on Vercel)"
        A[User Interface]
    end

    subgraph "Backend (Northflank Serverless API)"
        B[FastAPI Python Service]
    end

    subgraph "External APIs"
        C[GitHub API]
        D[Google Gemini API]
    end

    A -->|Request Username| B
    B -->|Fetch Profile Data| C
    B -->|Send Cleaned Data| D
    D -->|Return Markdown Report| B
    B -->|Return JSON (HTML + MD)| A
```

---

## 🚀 Local Development | Desarrollo Local

1. **Clone repository / Clonar repositorio:**
```bash
git clone git@github.com:Ziqian-Huang0607/Profile-Pilot.git
cd Profile-Pilot
```

2. **Install dependencies / Instalar dependencias:**
```bash
npm install
```

3. **Configure environment variables / Configurar variables de entorno:**
Create `.env` files for both frontend and backend with API keys.

4. **Run development / Ejecutar desarrollo:**
```bash
npm run dev
```

---

## 📜 License | Licencia

MIT License.

---

## 🤝 Contribution | Contribución

Contributions are welcome!
¡Las contribuciones son bienvenidas!

---
