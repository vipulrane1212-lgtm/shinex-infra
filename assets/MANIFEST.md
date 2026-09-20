# ShineX Infra — generated asset library

All stills are concept / design-language images. On the site, Work = Studies.
Founder portrait is a generated stand-in for Saleh Ahmed — replace with a real photo.

## Hero
- `02-hero/02-hero-living.jpg` — homepage hero still / poster
- `02-hero/02-hero-detail.jpg`
- `02-hero/02-hero-kitchen.jpg`
- `02-hero/02-materials-band.jpg`

## Video (`video/`) — now included
1920×1080 · 8 seconds · 24fps · H.264 · muted · web faststart

These are Ken Burns loops built from the generated stills, not full AI room-flythroughs.

| File | Motion | Where |
|---|---|---|
| `video/v-00-paper-drift.mp4` | slow pan | hero overlay |
| `video/v-00-linen-light.mp4` | slow push | materials |
| `video/v-00-dust-light.mp4` | slow pan | process / studio |
| `video/v-00-brass.mp4` | slow push | detail |
| `video/v-hero-living-push.mp4` | slow push-in | homepage hero |
| `video/v-materials-table.mp4` | pan | materials section |
| `video/v-process-site.mp4` | pan | process step 4 |

```html
<video autoplay muted loop playsinline poster="/assets/02-hero/02-hero-living.jpg">
  <source src="/assets/video/v-hero-living-push.mp4" type="video/mp4" />
</video>
```

v1 recommendation: still + `v-00-paper-drift.mp4` at ~20% opacity. Full room video only if you want motion in the hero.
