The **App Layout / App Layout** component provides a standardized layout structure for applications.
It divides the user interface into three main sections:
_Header_, _Main_, and _Footer_, allowing developers to populate these areas flexibly using slots.
The component ensures a clean presentation of content using grid layouts and offers various styling options for different layout needs.

## Structure:

The **App Layout** consists of an HTML template with three main sections:

-   **Header:** For navigation or application title.
-   **Main:** The main content of the application.
-   **Footer:** The bottom section, e.g., for links, copyright notices, etc.

## Usage:

```vue
<gymx-app-layout>
  <template #header>
    <!-- Your header content -->
  </template>

  <template #main>
    <!-- Your main content -->
  </template>

  <template #footer>
    <!-- Your footer content -->
  </template>
</gymx-app-layout>
```

## Slots:

-   **header:** Contains the header content.
-   **main:** Contains the main page content.
-   **footer:** Contains the footer area.

## Styles:

The component uses a flexible grid layout:

-   _grid-template-areas_ controls the arrangement of sections.
-   The **header** is sticky and remains visible as the user scrolls.
-   The **footer** is also sticky and remains fixed at the bottom of the screen.

Additionally, there is a **fixed-main** variant that makes the main window scrollable while keeping the header and footer fixed.

### Custom Properties:

The component uses CSS Custom Properties for flexibility:

-   **--app-layout-inline-padding:** Defines horizontal padding for sections.
-   **--app-layout-block-padding:** Defines vertical padding for sections.
-   **--app-layout-grid-template-areas:** Defines the layout of sections in the grid.

## Additional Features:

-   **Overflow Handling:** When the class `app-layout--fixed-main` is used, the main content scrolls while the header and footer remain fixed.
-   **Sticky Elements:** Both the header and footer are sticky and remain visible during scrolling.
