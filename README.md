# Opensend Dashboard Widget

## Get Started

Prerequisites:

- Node 20+
- npm 9+

To set up the app execute the following commands.

```bash
cp .env.example .env
npm install
```

##### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Task
**Task 01: Build Login Form**
- [x] Ensure full responsiveness and support for theme switching (dark mode/light mode).
- [x] Utilize Redux Toolkit Query (RTK Query) hooks for all API calls.
- [x] Implement a login form with email and password fields.
- [x] Disable the Login button if the input is invalid.
- [x] Display error messages from the backend correctly.


**Task 02: Conditional Routing**
- [x] Create three pages: Admin page, Dashboard page and Onboarding page
- [x] Routing logic
- [x] Add needed tokens to requests header

**Task 03: Build a dynamic dashboard with editable, draggable, and resizable metric widgets.**
- Metric Widgets:
  - [x] Three metric widgets should be displayed in a responsive grid
  - [x] Each widget should include a title and description.
  - [x] Widgets should be draggable and resizable within the dashboard.
- Metric Sizes:
    - [x] Default sizes should be defined.
    - [x] Minimum size should be 2x2 grid units by default.
    - [x] Maximum size should be full dashboard width.
- Metric Editing:
    - [x] Clicking a widget should display a form to edit its title and description. And only
      Admin can edit the widgets.
- Persistence:
  - [x] Widget positions and sizes should persist after being rearranged or resized.
- Drag-and-Drop:
    - [x] Smooth drag-and-drop transitions should be implemented.
- Visual Handles:
    - [x] Visual handles should be provided for resizing.
    - [ ] Maintaining aspect ratio is optional.

