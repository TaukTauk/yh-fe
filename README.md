# Event Management Web App – Frontend Prototype

## Overview

This repository contains a **frontend-only prototype** of an event management web application inspired by platforms like **Eventbrite**. The goal of this prototype is to validate **UX, routing, role-based access control (RBAC), and organization workflows** before backend implementation.

The application is designed primarily for **Burmese users**, with an initial geographic focus on:

* Yangon
* Mandalay
* Online events

At this stage, there is **no backend integration**. All authentication, organization data, and permissions are mocked on the frontend to simulate real-world scenarios.

---

## Key Goals of the Prototype

* Validate navigation structure and layouts
* Demonstrate role-based and organization-based access control
* Simulate organization lifecycle (create → verify → suspend)
* Show differences between:

  * Guest users
  * Logged-in users
  * Organization members (admin / organizer / member)
* Provide a solid foundation for backend integration later

---

## User Types

### 1. Guest (Not Logged In)

* Browse public events
* Search events
* View event details
* No access to personal or organization features

### 2. Logged-in User (No Organization)

* Same access as guest users for public content
* Additional access to:

  * My Events
  * Favorite Events
  * Tickets
* Can register or join an organization

### 3. Organization Member

A logged-in user who belongs to one or more organizations.

Roles within an organization:

* **Admin** – full access to organization settings and all events
* **Organizer** – can create and manage their own events
* **Member** – limited access (view-only or assigned actions)

---

## Organization Lifecycle

Each organization exists in one of the following states:

* `draft`
* `pending_verification`
* `verified`
* `rejected`
* `suspended`

### Important Rules

* Only **verified organizations** can create **paid events**
* Suspended or rejected organizations cannot host events
* Organization status affects **route access and UI visibility**

---

## Application Layouts

The app uses **layout-based routing** to clearly separate concerns.

### PublicLayout

Used for public-facing pages:

* Home
* Search results

Accessible by everyone (guest or logged in).

---

### AccountLayout

Used for personal account settings:

* Account settings

Requires authentication.

---

### EventLayout (My Events)

Used for personal event-related pages:

* Joined events
* Favorite events
* Tickets

Requires authentication and user-level permissions.

---

### OrgLayout

Used for organization management:

* Organization dashboard
* Event creation
* Paid event creation
* Organization settings

Requires authentication and valid organization membership.

---

## Routing & Access Control

### Authentication Guards

* Routes marked with `requiresAuth` redirect unauthenticated users to login
* Routes marked `guestOnly` are inaccessible once logged in

### Global Permissions

Some routes require user-level permissions (e.g. viewing tickets, managing account settings).

### Organization Guards

Organization routes enforce:

* Organization membership
* Minimum role level (admin / organizer / member)
* Specific organization permissions
* Organization verification status (for paid events)

The router is the **single source of truth** for access control.

---

## Navigation Structure

Navigation is separated by scope to match layouts:

### Public Navigation

* Home
* Search

Visible to all users.

---

### My Events Navigation

* My Events
* Favorites
* Tickets

Visible only to logged-in users.

---

### Organization Navigation

* Org Dashboard
* Create Event
* Create Paid Event (verified org only)
* Org Settings (admin only)

Visible only when the user belongs to an organization.

---

## Demo Authentication

For demonstration purposes, the login page provides **mock login options**:

### Normal User

* Logged in
* No organization memberships

### Power User

* Logged in
* Member of multiple organizations:

  * Draft org
  * Pending verification org
  * Verified orgs (admin / organizer / member)
  * Rejected org
  * Suspended org

This allows testing of all permission and status scenarios without a backend.

---

## Tech Stack (Frontend)

* Vue 3
* TypeScript
* Vue Router
* Pinia
* Vuetify
* i18n (multilingual support)

---

## What This Prototype Is NOT

* No backend API
* No real authentication
* No payment processing
* No persistent data storage

All data is stored in memory and resets on refresh.

---

## Next Planned Steps

* Backend API integration
* Organization verification workflow
* Payment gateway integration
* Fraud prevention for paid events
* Organizer analytics dashboard

---

## Purpose

This prototype exists to:

* Align product vision
* Validate UX and permission logic
* Communicate clearly with stakeholders
* Reduce risk before backend development

---

**Status:** Frontend prototype (in progress)
