## Keyboard Interactions

| **Command**     | **Desscription**                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `ArrowDown`     | When the input field is focused, it opens the dropdown list and focuses the first selectable option (skipping disabled options). |
| `ArrowUp`       | When the dropdown is open, it focuses the previous selectable option (skipping disabled options).                                |
| `Escape`        | Closes the dropdown if it is open.                                                                                               |
| `Tab`           | Closes the dropdown and moves focus to the next interactive element.                                                             |
| **in list**     |                                                                                                                                  |
| `ArrowDown`     | Moves focus to the next selectable option (skipping disabled options).                                                           |
| `ArrowUp`       | Moves focus to the previous selectable option (skipping disabled options).                                                       |
| `Enter`         | Selects the currently foccused option and closes the list.                                                                       |
| `Escape`        | Closes the list and returns focus to the input field.                                                                            |
| `Any other key` | Opens the list (if closed) and filters the options based on the text typed into the input field.                                 |

## Interaction Flow

1. **ArrowDown/ArrowUp:** In the input field, pressing `ArrowDown` opens the dropdown and focuses the first selectable option. If an option is already selected, it focuses that option.
2. **Navigating the list:** Use arrow keys to navigate through the options. Disabled options are skipped.
3. **Enter:** Selects the focused option and closes the dropdown.
4. **Escape:** Closes the dropdown and returns focus to the input field without selecting an option.
5. **Tab:** Closes the dropdown and moves focus to the next interactive element.
