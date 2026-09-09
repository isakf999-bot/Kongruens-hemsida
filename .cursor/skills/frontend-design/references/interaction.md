# Interaction: states, focus, and forms

Visual design that cannot be used is costume. These states are part of the look, not an accessibility appendix.

## The state set (every control)

Design them on purpose, in tokens:

| State | What the eye should get |
| --- | --- |
| Rest | The default in the system |
| Hover | Confirmation (lift, shadow, underline) — pointer devices only |
| Focus-visible | A ring or bar that cannot be missed, on paper *and* on deep |
| Active / press | Slightly inset or darker mix; 50–100ms |
| Disabled | Reduced contrast, not invisible; not the only way to hide an illegal action |
| Current / on | Weight or fill; do not rely on color alone if it is the only cue |

`:hover` is not `:focus`. Keyboard users never see a lift. If you `outline: none`, you owe a `:focus-visible` that is stronger than the hover.

Hit target: 44px minimum on pointer-coarse. Compact nav pills can look smaller and still have a padded hit area.

## Links vs buttons

Links go places (including `mailto:`). Buttons do actions on this page. Do not make a `div` with a click handler look like a button. If it is a route, it is an `a`. Hover on a link in a sentence must not shift layout.

## Forms (behavior as design)

- `label` associated with `id`. Autocomplete attributes that match the field.
- Name, email, subject, message — use the locked strings if the brief locked them.
- Validate after blur or submit, not on every keystroke unless the field is a code.
- Error text names the field and the fix: "Ange en e-postadress" not "Invalid."
- Success is a sentence in the page or a quiet confirmation — not a confetti canvas.
- Do not clear a long message on a failed submit.
- Required: mark in the label, not only with a red asterisk after the fact.

Keyboard: tab order follows reading order. Skip the repeating header if you have a skip link; at least do not trap focus except in an open menu.

## Menus and overlays

Open on click, close on Escape and on outside click (if that does not fight the control). Focus moves into the panel and returns to the toggle on close. Background can dim *slightly* on a light page; on a dark hero, a dim is often a second overlay — prefer a solid sheet from paper.

## Dark plate, light plate

The same control must exist in both chapters. Ghost buttons on video need type that reads on the quiet zone; on paper they need ink. Do not keep `color: white` after the header has become a paper bar.

## Motion and interaction

Confirmation is short (see [motion.md](motion.md)). Do not delay a page change with an animation. Do not animate layout of a form error so the button jumps; reserve space or accept a small shift, but do not spring it.

## Reduced motion

Menus can appear without travel. Hover lift can become a color mix only. Nothing essential may exist only in a hover that never fires on touch — the information must be visible at rest (prices, names, the primary action).

## Touch

No hover-only disclosure of the main CTA. Larger gaps between nav links. Sticky headers should not eat half of 390px; compact them or let them scroll away after a threshold.
