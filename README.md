# 🚀 Vue 3 Application Blueprint

A production-ready frontend blueprint built with Vue 3, designed for scalability, maintainability, and real-world application needs.  
This project provides a solid foundation for applications requiring authentication, role & permission management, theming, localization, and notifications.

---

## ✨ Features Overview

### 🧱 Architecture
- **Vue 3 + TypeScript**
- Modular layout system:
  - `AppLayout` (authenticated / main app)
  - `AuthLayout` (login, guest pages)
- Clean plugin-based setup (Vuetify, i18n, Toasts)
- Scalable folder structure

---

### 🎨 UI & Styling
- **Vuetify 3** for UI components
- **Tailwind CSS** for utility-first styling and fine-grained layout control
- Responsive design (desktop & mobile)
- Mobile-first interaction (no hover-only UX)

---

### 🧭 Navigation System
- TopBar (full-width)
- Sidebar:
  - Rail mode (desktop)
  - Drawer mode (mobile)
- Auto-hide on mobile
- Active route highlighting
- Permission-aware navigation items

---

### 🔐 Authentication & Authorization
- Centralized auth state with **Pinia**
- Route protection:
  - `requiresAuth`
  - `guestOnly`
- Redirect users to intended route after login
- UI adapts automatically to auth state

---

### 🧑‍⚖️ Role-Based Access Control (RBAC)
- Role support in auth store
- Role-aware navigation filtering
- Clean separation of concerns

---

### 🔑 Fine-Grained Permissions
- Permission constants (`PERMISSIONS`)
- Navigation items protected by permissions
- Ready for backend-driven permission systems
- Scales beyond simple role checks

---

### 🌗 Theme System
- Light / Dark / System modes
- System preference detection (`prefers-color-scheme`)
- Persistent theme selection via `localStorage`
- Vuetify-integrated theming
- Icon-based theme selector
- Fully reactive across the app

---

### 🌍 Internationalization (i18n)
- Vue i18n plugin integrated
- Translation-ready navigation titles
- Language switching architecture prepared
- Locale persistence supported

---

### 🔔 Notification System
- Toast-based notifications
- Centralized toast service (`notify`)
- Supported types:
  - Success
  - Error
  - Info
  - Warning
- Configurable:
  - Position
  - Duration
  - Icons
- UI-framework agnostic usage (usable from stores, services, views)

---

### 👤 User Menu System
- Guest view:
  - Sign-in button
  - Settings menu (theme, language, help, etc.)
- Authenticated view:
  - Profile avatar
  - Dropdown menu
  - Settings + Sign out
- Fully mobile-compatible (no hover dependency)

---

### 📱 Mobile Support
- Responsive layouts
- Drawer-based navigation on mobile
- Click-based menus instead of hover
- Touch-friendly interactions

---

## 🧰 Tech Stack

- **Vue 3**
- **TypeScript**
- **Vuetify 3**
- **Tailwind CSS**
- **Pinia**
- **Vue Router**
- **Vue I18n**
- **Vue Toast Notification**
- **Material Design Icons (MDI)**

---

## 📁 Project Structure (Simplified)

```text
src/
├── assets/
├── components/
│   ├── layout/
│   └── ui/
├── layouts/
│   ├── AppLayout.vue
│   └── AuthLayout.vue
├── plugins/
│   ├── vuetify.ts
│   ├── i18n.ts
│   └── toast.ts
├── router/
│   └── index.ts
├── stores/
│   ├── auth.store.ts
│   └── ui.store.ts
├── views/
│   ├── HomeView.vue
│   ├── LoginView.vue
│   └── NotFound.vue
└── main.ts
```
