# Kanban Board

A simple and fast Kanban Board built with **SvelteKit**.  
This application helps you manage your work visually using lanes such as "Todo", "In Progress", and "Done".  
It includes drag-and-drop, browser storage, CSV export, calendar downloads, and browser notifications.

---

## Features

- Drag and drop tasks between lanes  
- Tasks are saved automatically in your browser (no backend needed)  
- Create and delete tasks with title, description, priority, story points, and due date  
- Export all tasks to CSV  
- Download a single task as a .ics calendar file  
- Receive a desktop notification when a task is moved to the Done lane  
- Works well on both desktop and mobile

---

## Technology

- **Framework:** SvelteKit  
- **Language:** JavaScript (ES6)  
- **Styling:** Tailwind CSS  
- **State Management:** Svelte reactivity (`$state`, `$effect`)  
- **Data Storage:** Browser Local Storage  
- **Utilities:** CSV export, ICS calendar export, and date formatting  
- **Notifications:** Web Notifications API

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/kanban-board.git
   cd kanban-board
