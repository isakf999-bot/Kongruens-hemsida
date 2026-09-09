# Media: photographs, video, and honesty of the plate

Read this whenever a hero, card, or section is using an image or video. The plate is either the thesis or it is support. Treat it like a print crop, not like wallpaper.

## What the picture is for

Name the job in a line:

- **Thesis** — this *is* the site (weather, a landscape looking out, a product in light)
- **Evidence** — this is the work, the room, the person
- **Texture** — this is atmosphere; it must stay quieter than type

If you cannot name the job, you are decorating. Remove the image and see if the section still holds; if it does, you did not need the image. If it collapses, the image was load-bearing — crop and place it like it matters.

Do not use one picture as both thesis and texture (full-bleed video plus a gray wash plus a card overlapping it). That is three jobs.

## Crop is composition

`object-fit: cover` without a focal point is a random crop. Set `object-position` from the subject: horizon high or low, face in the upper third, product on its stand. Check 390, 768, 1440, 1920. A desktop "wide sea" often becomes "a wall of water" on mobile if the focus is `center`.

Prefer fewer, larger pictures over a grid of small ones that all have the same ratio. Same ratio everywhere is a catalog default. Vary: a wide plate, a portrait of a person, a still of a tool.

Do not letterbox with a trendy 21:9 on every section. Choose an aspect because of the picture.

## Living video

Video is a signature, not a default hero treatment.

- One living plate per site, usually home. Interior routes stay still.
- Poster image for LCP; it must be the same crop and hour as the video, not a brighter leftover still.
- Delay playback slightly so the poster can paint; avoid a flash of empty.
- No audio unless the brief is sound.
- Loop only if the loop is invisible (weather, water, slow vegetation). A loop with a hitch becomes a gif.
- `prefers-reduced-motion: reduce` shows the poster and does not play.

A close-up of a texture looping (ripples, smoke, particles) is rarely a thesis. A wide landscape with weather can be. If the camera could not be a person standing somewhere, question it.

Do not add Ken Burns on top of video. The video already moves.

## Still heroes

A still can be as strong as video if the crop is wide and the hour is specific. Do not animate a zoom on every still to "make it alive." If home already has life, interiors should not compete.

If you do use a slow zoom, it is a signature — not a global class on `.hero img`. Freeze it when reduced-motion is requested. Never combine a CSS `transform` for layout with an animation that also transforms.

## Honesty

Do not:

- Desaturate and darken a photo to make it a background
- Put a heavy gradient over 100% of the frame so type can sit anywhere
- Mix five stock photographers in five color temperatures on one page
- Fake grain, fake light leaks, fake film frames as craft
- Run a face through a beauty filter that the rest of the site's materials contradict

Do:

- Match grade across a page by choosing pictures from the same world (hour, weather, palette)
- Let skin, water, and sky keep their color
- Give media radius + shadow when it is a *card image*; give full-bleed plates none of that chrome
- Write real `alt` that describes the picture's job, or empty alt if it is purely decorative — not "image of hero"

## People

If there is a person, they are not a texture. Give them a crop that includes the gesture you care about. Do not put type on a face. Do not overlap a card on a face.

## Cards and thumbnails

Photo on top, surface below, no stroke around the picture. Hover lifts the card, not a zoom that crops the subject. Featured: different fill or different size, not a vertical nudge of the middle tile.

If a service has no honest photograph, a still from the same landscape family is better than a random icon in a colored square.

## Technical floor

- Serve an appropriate size; do not ship a 4000px still into a 360px card.
- Width/height or aspect-ratio to stop layout shift.
- For video, a compressed mp4 plus poster; do not autoplay in a module that is offscreen.
- Dark-hero type sits *on* the media element in a quiet zone, not in a separate colored slab that covers the subject.
