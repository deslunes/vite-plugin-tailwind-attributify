// src/astro.d.ts

declare namespace astroHTML.JSX {
    interface HTMLAttributes<T> {
      "sm"?: string;
      "md"?: string;
      "lg"?: string;
      "xl"?: string;
      "2xl"?: string;
      "max-sm"?: string;
      "max-md"?: string;
      "max-lg"?: string;
      "max-xl"?: string;
      "max-2xl"?: string;
      "hover"?: string;
      "focus"?: string;
      "focus-within"?: string;
      "focus-visible"?: string;
      "active"?: string;
      "visited"?: string;
      "empty"?: string;
      "disabled"?: string;
      "enabled"?: string;
      "checked"?: string;
      "intermediate"?: string;
      "default"?: string;
      "required"?: string;
      "valid"?: string;
      "invalid"?: string;
      "in-range"?: string;
      "out-of-range"?: string;
      "placeholder-shown"?: string;
      "autofill"?: string;
      "read-only"?: string;
      "first"?: string;
      "last"?: string;
      "only"?: string;
      "odd"?: string;
      "even"?: string;
      "first-of-type"?: string;
      "last-of-type"?: string;
      "only-of-type"?: string;
      "before"?: string;
      "after"?: string;
      "first-letter"?: string;
      "first-line"?: string;
      "marker"?: string;
      "selection"?: string;
      "file"?: string;
      "backdrop"?: string;
      "placeholder"?: string | null;
      "dark"?: string;
      "portrait"?: string;
      "landscape"?: string;
      "motion-safe"?: string;
      "motion-reduce"?: string;
      "contrast-more"?: string;
      "contrast-less"?: string;
      "print"?: string;
      "rtl"?: string;
      "ltr"?: string;
      "aria-busy"?: string;
      "aria-checked"?: string;
      "aria-disabled"?: string;
      "aria-expanded"?: string;
      "aria-hidden"?: string;
      "aria-pressed"?: string;
      "aria-readonly"?: string;
      "aria-required"?: string;
      "aria-selected"?: string;
      "children"?: string;


      [key:
          `sm_${string}` | `md_${string}` | `lg_${string}` | `xl_${string}` | `2xl_${string}` |
          `max-sm_${string}` | `max-md_${string}` | `max-lg_${string}` | `max-xl_${string}` | `max-2xl_${string}` |
          `hover_${string}` | `focus_${string}` | `focus_within_${string}` | `focus_visible_${string}` | `active_${string}` | `visited_${string}` |
          `empty_${string}` | `disabled_${string}` | `enabled_${string}` | `checked_${string}` | `intermediate_${string}` |
          `default_${string}` | `required_${string}` | `valid_${string}` | `invalid_${string}` | `in_range_${string}` | `out_of_range_${string}` |
          `placeholder_shown_${string}` | `autofill_${string}` | `read_only_${string}` |
          `first_${string}` | `last_${string}` | `only_${string}` | `odd_${string}` | `even_${string}` |
          `first_of_type_${string}` | `last_of_type_${string}` | `only_of_type_${string}` |
          `before_${string}` | `after_${string}` | `first_letter_${string}` | `first_line_${string}` |
          `marker_${string}` | `selection_${string}` | `file_${string}` | `backdrop_${string}` | `placeholder_${string}` |
          `dark_${string}` | `portrait_${string}` | `landscape_${string}` | `motion_safe_${string}` | `motion_reduce_${string}` |
          `contrast_more_${string}` | `contrast_less_${string}` | `print_${string}` | `rtl_${string}` | `ltr_${string}` |
          `aria_busy_${string}` | `aria_checked_${string}` | `aria_disabled_${string}` | `aria_expanded_${string}` |
          `aria_hidden_${string}` | `aria_pressed_${string}` | `aria_readonly_${string}` | `aria_required_${string}` | `aria_selected_${string}`

          | `has-${string}` | `min-${string}` | `max-${string}` | `supports-${string}`
      ]: string;
    }
}