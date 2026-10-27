# Brickshop: all-LEGO workshop storage

One parametric OpenSCAD file (`brickshop.scad`). Every part is a giant LEGO brick:
- studs on top, sockets underneath
- 55 mm stud pitch
- 70 mm brick height (3 plates of 23.3 mm)

That's the same scale as the LEGO storage box shells, so your shells and bins snap into the same system.

![assembled](images/assembled-classic.png)

## Parts (pick with `part =`)

| Part | What it is | Default size | Print |
|---|---|---|---|
| `storage_box` | Open-top storage brick. Holds 4×4 screw-box modules. Optional dividers. Title engraved on the front. | 4×4, 1 brick | Right side up |
| `box_lid` | Stud lid. Hex mesh between hollow ring studs, title engraved on the front edge. Locks onto the box rim, and another box stacks on its studs. | 4×4 | Right side up, flat |
| `brick` | Plain brick or plate in any size. Use it for baseplates, risers and spacers. | 2×4, 1 brick | Right side up |
| `hex_key_brick` | Hex keys 1.5–10 mm, short arm in the stud, long arm up. Size engraved on each stud. | 3×3, 1 brick | Right side up |
| `driver_brick` | 8 screwdrivers (PH0–PH3, SL3–SL6.5). The shaft drops through the stud and the handle rests on it. | 4×2, 2 bricks | Right side up |
| `bit_brick` | 16 × 1/4" bits, 4 per stud. | 4×1, 2 plates | Right side up |
| `tool_brick` | Your own tool list (see below). Auto-sizes to fit. | any | Right side up |
| `title_tile` | Flat LEGO tile with sockets. Press it onto any studs to label anything. | 4×1 | Right side up |
| `lamp` + `lamp_stud` | 2×2 lamp brick. Twist-locks onto your LED lamp kit base. Press 4 stud caps into the top and they glow. | 2×2 | Lamp upside down, studs closed side down |
| `gridock_lid` | Optional. Turns a Gridock tray into a LEGO base. | 4×4 | Right side up |

None of the parts need supports. Closed bricks have LEGO-style internal ribs and tubes, so their tops bridge only short gaps.

![exploded](images/exploded.png)

## Customising (no code needed)

Open `brickshop.scad` in OpenSCAD (Window → Customizer) or the MakerWorld customizer.

- **Any size:** `box_cols`, `box_rows`, `box_plates`, and `brick_cols`, `brick_rows`, `brick_plates`.
- **Titles:** `box_title`, `lid_title`, `tile_text1`. `lid_plaque = true` gives a raised title plaque instead, for the top lid of a stack only.
- **Tools:** `tb_tools` is plain text, for example `hex:2.5, round:8:PH2, square:6.35:1/4`.
  - Tools fill the studs back-left to front-right.
  - `tb_per_stud` = 1, 2 or 4 tools per stud.
  - `tb_depth` = how deep each hole goes.
  - `tb_plates` = brick height.
- **Look:** `style = "classic"` (smooth LEGO) or `"rugged"` (armoured corners, brick seams, grip flutes).
- **Fit:** `fit_gap`, `hole_clear`, `stud_plug_fit`.

| classic | rugged |
|---|---|
| ![classic](images/assembled-classic.png) | ![rugged](images/assembled-rugged.png) |

## Fit check

Every joint was tested with mesh booleans, in both styles, against the original LEGO storage box and screw box files. Every one has zero overlap.

| Joint | Side play |
|---|---|
| Stud lid on storage brick rim (tongue in groove) | 0.25–0.35 mm |
| Storage brick stacked on a stud lid | 0.45 mm |
| Driver / bit brick on a stud lid | 0.50 mm |
| Brick on brick, hex key brick on brick | 0.50 mm |
| Title tile on any studs | 0.50 mm |
| Your LEGO box shell on a stud lid | 0.65 mm |
| Storage brick on your LEGO box shell studs | 0.50 mm |
| Neighbouring bricks | 0.40 mm gap |
| 16 screw boxes inside a 4×4 storage brick | fit, 27.5 mm headroom under the lid |
| Lamp bayonet vs LED kit shade | 96 % of 6,840 surface samples within 0.3 mm |

Tip: print one 1×1 `title_tile` first to check stud grip on your printer, then adjust `fit_gap`.

## Not included

The original LEGO storage box, screw box, Gridock and LED lamp files aren't included, because their licences don't allow redistribution. Download them from their MakerWorld/Printables pages.
