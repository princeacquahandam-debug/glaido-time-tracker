

# Glaido Ops — Implementation Plan

## Overview
An internal operations app for time tracking, AI-powered transcript-to-task extraction, and invoicing. Dark UI with neon-lime (#BFF549) highlights, sharp edges, and pill-shaped glowing buttons.

---

## Phase 1: Design System & Layout Shell

- Apply the custom dark design system: pure black background (#000000), neon-lime accent (#BFF549), Inter font, 0px border radius, pill-shaped buttons with glow effect
- Card surfaces (#0A0A0A), panel surfaces (#121212), readable text colors (#F8FAFC / #99A1AF)
- Set favicon to Glaido's favicon SVG
- Build the app shell with header containing Glaido logo, navigation, and logout
- Create separate layouts for Admin and Employee views

---

## Phase 2: Backend Setup (Supabase)

- Connect your Supabase project
- Create database tables:
  - **profiles** (id, name, email, hourly_rate, active) linked to auth.users
  - **user_roles** (user_id, role enum: admin/employee) — separate table for security
  - **transcripts** (id, title, source, raw_text, created_by, created_at)
  - **tasks** (id, title, description, status enum, owner, project, transcript_id, confidence, created_at)
  - **time_sessions** (id, task_id, user_id, state enum, started_at, ended_at, total_seconds, last_resumed_at)
  - **time_entries** (id, task_id, user_id, seconds, notes, approved, approved_by, created_at)
  - **status_history** (id, task_id, from_status, to_status, changed_by, changed_at)
- Set up Row-Level Security policies so employees only see their own data and admins see everything
- Seed demo users (admin@glaido.local, worker1@glaido.local, worker2@glaido.local)

---

## Phase 3: Authentication

- Login page (/login) with dark themed email+password form and glowing primary button
- Role-based routing: admins → /admin, employees → /app
- Protected routes with auth guards
- Logout functionality

---

## Phase 4: Employee App (/app)

- **My Tasks** — Kanban board (Backlog, To Do, In Progress, Blocked, Done) showing only the employee's assigned tasks
- Drag-and-drop between columns
- **Automation**: Dragging to "In Progress" auto-starts a timer; dragging out auto-pauses/stops
- **One active timer rule**: Starting a new timer auto-pauses any running one
- Timer controls on each card: Start, Pause, Resume, Stop (with optional work note)
- Running tasks show a neon-lime pulsing dot
- **My Time** — List of time entries by date/task with weekly totals

---

## Phase 5: Admin Dashboard (/admin)

- **Transcripts tab**: Paste transcript text, set title/project, click "Generate Tasks" to call AI, review extracted tasks with confidence scores, assign owners via dropdown, then "Create Tasks"
- **Tasks tab**: Full Kanban board of all tasks across all users; admin can reassign, edit, and change status
- **Users tab**: Create/edit users (name, email, password, role, hourly rate), activate/deactivate
- **Approvals tab**: List pending time entries, approve or reject with reason

---

## Phase 6: AI Task Extraction (Edge Function)

- Create a Supabase Edge Function that calls OpenAI's API with the transcript text
- Prompt engineered to return JSON array of tasks with: title, description, suggestedOwnerName, project, dueDate, confidence
- Auto-match suggested owner names to existing users; unmatched tasks assigned to admin
- Tasks with confidence < 0.6 flagged as "Needs Review"
- Store your OpenAI API key as a Supabase secret

---

## Phase 7: Timer Automation & Audit Trail

- Kanban status change triggers:
  - → In Progress: create/resume TimeSession, auto-pause any other running session
  - → Blocked/To Do: auto-pause session
  - → Done: auto-stop session and generate TimeEntry summary
- Every status change logged to StatusHistory table
- Timer math: totalSeconds accumulates across pause/resume segments

---

## Phase 8: Polish & Mobile

- Ensure responsive layout for all screens
- Smooth Kanban drag-and-drop on mobile
- Error states and loading indicators throughout

