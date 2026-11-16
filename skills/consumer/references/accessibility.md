# Accessibility

Kirby supplies component behavior, not automatic application-level compliance. Apply the relevant
task recipe's specific accessibility constraints and check the composed result.

## Acceptance checks

- Use semantic headings, links, buttons, form controls and table markup with a logical information
  order. Add ARIA for relationships/names that semantic HTML does not already provide.
- Ensure controls have meaningful accessible names and instructions. A visible heading or label
  should agree with the accessible name.
- Test keyboard-only operation and visible focus, including opening/closing overlays and returning
  to the invoking control.
- Communicate status/error/selection through text or another non-color cue as well as color.
- Check zoom, small screens and usable target sizes. Consider motor, hearing, vestibular,
  reduced-motion and seizure-related needs, not only screen readers.
- Run existing automated accessibility checks, then manually review relevant screen-reader,
  focus/order and interaction behavior. Automation alone cannot verify the application context.
- Ask for the application's accessibility targets when they affect acceptance. Report tested
  behavior rather than claiming WCAG compliance from component choice alone.

For an acceptance criterion not covered here, use the
[documentation index](./documentation-index.md#other-documentation) to locate WCAG/WAI guidance
rather than inventing requirements not established by the app.
