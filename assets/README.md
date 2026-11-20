# Assets Folder — Instructions 💜

## Images (`assets/images/`)
Drop your photos here with these exact filenames to replace the placeholders:

| Filename        | Used For                         |
|-----------------|----------------------------------|
| `sister.jpg`    | About You section — main photo   |
| `memory1.jpg`   | Memory 1 — "Our happy place"     |
| `memory2.jpg`   | Memory 2 — "Always laughing"     |
| `memory3.jpg`   | Memory 3 — "Sisters forever"     |
| `memory4.jpg`   | Memory 4 — "Best memories"       |
| `memory5.jpg`   | Memory 5 — "Pure happiness"      |
| `memory6.jpg`   | Memory 6 — "Magical moments"     |

Any image format works (jpg, png, webp). Recommended size: ~600×480px for memories, ~400×500px for the sister portrait.

## Music (`assets/music/`)
Drop a background music file here named exactly:

```
birthday.mp3
```

Suggested: a soft, happy birthday / piano background track.
Music will only start after the user clicks anywhere on the page (browser autoplay policy).
The mute/unmute button is in the bottom-right corner.

## Birthday Date
To set your sister's birthday, open `script.js` and edit line 11:

```js
const BIRTHDAY = new Date(new Date().getFullYear(), 10, 25); // Nov 25
```

Month is 0-indexed: Jan=0, Feb=1, Mar=2 ... Nov=10, Dec=11
