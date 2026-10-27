// =====================================================================
//  BRICKSHOP - a giant-LEGO workshop storage system
//  One parametric file. Pick a part, set the options, render, export.
//
//  Everything lives on one 55 mm "giant brick" grid:
//    - Gridock trays are 220 mm = 4 x 55 (this file makes their mesh lid)
//    - LEGO storage box shells use 55 mm cells with 34 mm studs
//    - every part below snaps onto those same studs
//
//  Works in OpenSCAD 2021+ and the MakerWorld customizer.
// =====================================================================

/* [Part] */
// Which part to build
part = "mesh_lid"; // [mesh_lid:Gridock mesh lid (studs + title), title_tile:Title tile (snaps on studs), hex_key_brick:Hex key (L-key) brick, driver_brick:Screwdriver brick, bit_brick:1/4in bit brick, tool_brick:Custom tool brick, lamp:LEGO lamp shade, lamp_stud:Lamp stud cap (print 1 per stud)]

/* [Mesh lid - Gridock] */
// Outer size of the Gridock tray (220 = 4 x 4 studs)
lid_size = 220;
// Corner radius of the Gridock tray
lid_corner_r = 40;
// Solid border around the mesh
lid_frame = 12;
// Plate thickness above the 2 mm seating foot
lid_plate = 3;
// Number of stud rows, counted from the back (4 = full grid, 3 = front row becomes the title plaque)
lid_stud_rows = 3; // [0:4]
// Title on the front plaque (empty = no plaque)
lid_title = "SCREWS & BOLTS";
// Title text height
lid_title_size = 15;

/* [Hex mesh] */
// Hex hole size (across flats)
mesh_cell = 9;
// Rib width between hex holes
mesh_rib = 1.8;

/* [Title tile] */
// Length in studs
tile_len = 4; // [1:6]
// Title line 1
tile_text1 = "HEX KEYS";
// Title line 2 (optional)
tile_text2 = "";
// Text height for line 1
tile_text_size = 16;
// Tile body height (sockets are 10.5 deep inside)
tile_h = 14;

/* [Tool bricks] */
// Brick height in bricks (1 brick = 70 mm). Longer tools need taller bricks.
tb_height = 2; // [1:4]
// Thickness of the top face that holds the tools
tb_top = 4;
// Engraved label height
tb_label_size = 5;
// Extra clearance added to every tool hole
hole_clear = 0.5;
// Custom brick: width in studs
tb_cols = 4; // [1:8]
// Custom brick: depth in studs
tb_rows = 1; // [1:4]
// Custom brick holes, one string per row. Format: shape:size[:label], comma separated. Shapes: hex, round, square
tb_line1 = "hex:1.5, hex:2, hex:2.5, hex:3, hex:4, hex:5, hex:6, hex:8, hex:10";
tb_line2 = "";
tb_line3 = "";

/* [Lamp] */
// Lamp width in studs
lamp_cols = 2; // [2:4]
// Lamp depth in studs
lamp_rows = 2; // [2:4]
// Lamp height in bricks (1 brick = 70 mm)
lamp_h = 1; // [1:3]
// Wall thickness (thin walls glow nicely in white/translucent PLA)
lamp_wall = 1.6;
// Let the LED collar stick out below the brick (if your base needs it)
collar_drop = 0;
// Stud cap press-fit: shrink the plug by this much if it is too tight
stud_plug_fit = 0.2;

/* [Style] */
// classic = smooth LEGO look, rugged = armoured corners, brick seams, grip flutes
style = "classic"; // [classic, rugged]
// Corner chamfer size
rug_chamfer = 6;
// Tool brick wall thickness
tb_wall = 3;

/* [Fit and font] */
// Gap between neighbouring cells (keeps bricks from binding)
fit_gap = 0.4;
// Font (Liberation ships with OpenSCAD)
font = "Liberation Sans:style=Bold";

/* [Hidden] */
$fn = 72;
PITCH = 55;          // giant stud pitch (matches LEGO storage box + Gridock 220/4)
BRICK_H = 70;        // giant brick body height (matches LEGO storage box shells)
STUD_D = 34;         // stud diameter (LEGO storage box shells use 34)
STUD_H = 9.6;        // stud height (their sockets are 10 deep)
SOCKET_D = 35;       // socket diameter (LEGO storage box shells use 35)
SOCKET_DEPTH = 10.5;

// LED lamp kit bayonet, measured from the kit's own shade (z = up from the rim):
// 70.0 OD rim, 33.0 inner radius, two retaining lugs (r 31.5, z 0-3) with
// 53 deg entry gaps between them, a twist channel (z 3.5-5.6) ending at a stop
// wall, 0.5 mm click detents, and a snap bead (r 31.5) at z 7, opening out to r 34.2 above it.
LED_COLLAR = [[33, 0], [35, 0], [35, 8], [37, 12], [34.2, 12], [34.2, 9.6], [31.5, 7.2], [31.5, 6.8], [33, 5.6]];
LED_COLLAR_TOP = 12;
LED_LUG = [105, 230];        // retaining lug span (deg), repeated at +180
LED_STOP = [106, 109];       // stop wall closing the twist channel
LED_DETENT = [144, 150];     // click bump inside the channel

// ------------------------------------------------------------------ main
if (part == "mesh_lid") mesh_lid();
else if (part == "title_tile") title_tile(tile_len, tile_text1, tile_text2);
else if (part == "hex_key_brick")
    tool_brick(4, 1, tb_height, [parse_line("hex:1.5, hex:2, hex:2.5, hex:3, hex:4, hex:5, hex:6, hex:8, hex:10")]);
else if (part == "driver_brick")
    tool_brick(4, 2, tb_height, [
        parse_line("round:6:PH0, round:7:PH1, round:8:PH2, round:9:PH3, round:7:PZ2"),
        parse_line("round:6:SL3, round:7:SL4, round:8:SL5.5, round:9:SL6.5, round:10:SL8")]);
else if (part == "bit_brick")
    tool_brick(4, 1, 1, [
        parse_line("hex:6.35:PH1, hex:6.35:PH2, hex:6.35:PH3, hex:6.35:PZ1, hex:6.35:PZ2, hex:6.35:PZ3, hex:6.35:T10, hex:6.35:T15"),
        parse_line("hex:6.35:T20, hex:6.35:T25, hex:6.35:T30, hex:6.35:H2, hex:6.35:H2.5, hex:6.35:H3, hex:6.35:H4, hex:6.35:H5")]);
else if (part == "tool_brick")
    tool_brick(tb_cols, tb_rows, tb_height,
        [for (l = [tb_line1, tb_line2, tb_line3]) if (len(l) > 0) parse_line(l)]);
else if (part == "lamp") lamp();
else if (part == "lamp_stud") lamp_stud();

// ------------------------------------------------------------- 2D helpers
module rrect(w, h, r) {
    rr = max(0.01, min(r, w/2 - 0.01, h/2 - 0.01));
    offset(r = rr) square([w - 2*rr, h - 2*rr], center = true);
}

// Honeycomb ribs filling a w x h rectangle
module hex_mesh_2d(w, h, cell = mesh_cell, rib = mesh_rib) {
    p = cell + rib;
    dy = p * sqrt(3) / 2;
    nx = ceil(w / p / 2) + 1;
    ny = ceil(h / dy / 2) + 1;
    difference() {
        square([w, h], center = true);
        for (j = [-ny:ny], i = [-nx:nx])
            translate([i*p + (j % 2) * p/2, j*dy])
                rotate(30) circle(d = cell / cos(30), $fn = 6);
    }
}

// Brick outline: chamfered "armour" corners when rugged, rounded otherwise.
// inset = wall thickness when drawing an inner outline (keeps the wall even).
module footprint(w, d, r, inset = 0) {
    if (style == "rugged") {
        c = max(0.5, rug_chamfer - inset * (sqrt(2) - 1));
        polygon([[-w/2 + c, -d/2], [w/2 - c, -d/2], [w/2, -d/2 + c], [w/2, d/2 - c],
                 [w/2 - c, d/2], [-w/2 + c, d/2], [-w/2, d/2 - c], [-w/2, -d/2 + c]]);
    } else rrect(w, d, r);
}

// Solid block with a chamfered top edge
module chamfered_block(w, d, h, r, ch) {
    linear_extrude(h - ch) footprint(w, d, r);
    hull() {
        translate([0, 0, h - ch - 0.01]) linear_extrude(0.01) footprint(w, d, r);
        translate([0, 0, h - 0.01]) linear_extrude(0.01) footprint(w - 2*ch, d - 2*ch, max(0.5, r - ch), ch);
    }
}

function cell_centers(n) = [for (i = [0:n-1]) (i - (n-1)/2) * PITCH];

// ---------------------------------------------------------- mesh lid
// Drop-in replacement for the Gridock top plate. The 2 mm foot copies the
// tray's own bevel, so it nests on the rim exactly like another tray would.
module mesh_lid() {
    S = lid_size;
    R = lid_corner_r;
    top = 2 + lid_plate;
    win = S - 2*lid_frame;
    cols = cell_centers(4);
    rows = lid_stud_rows > 0 ? [for (j = [0:lid_stud_rows-1]) cols[3 - j]] : [];
    plaque = len(lid_title) > 0;
    plaque_y = cols[0];
    plaque_w = S - 2*lid_frame - 4;
    plaque_d = PITCH - 14;

    module islands() {
        for (x = cols, y = rows) translate([x, y]) circle(d = STUD_D);
        if (plaque) translate([0, plaque_y]) rrect(plaque_w, plaque_d, 6);
    }

    difference() {
        hull() {
            linear_extrude(0.01) rrect(S - 6, S - 6, R - 3);
            translate([0, 0, 2]) linear_extrude(lid_plate) rrect(S, S, R);
        }
        translate([0, 0, -1]) linear_extrude(top + 2) difference() {
            rrect(win, win, R - lid_frame);
            hex_mesh_2d(win, win);
            islands();
        }
    }
    // ring studs: the mesh stays visible through the middle
    for (x = cols, y = rows) translate([x, y, top - 0.01])
        linear_extrude(STUD_H) difference() {
            circle(d = STUD_D);
            circle(d = STUD_D - 2*2.4);
        }
    if (plaque) translate([0, plaque_y, top - 0.01]) {
        linear_extrude(2) rrect(plaque_w, plaque_d, 6);
        translate([0, 0, 2]) linear_extrude(1.2)
            text(lid_title, size = lid_title_size, font = font, halign = "center", valign = "center");
    }
}

// ---------------------------------------------------------- title tile
// A flat giant "tile" with sockets underneath. Press it onto any stud row
// (lid, LEGO box shells, tool bricks) to relabel a stack in seconds.
// Print right side up; swap filament at the text layer for two colours.
module title_tile(n, t1, t2) {
    W = n*PITCH - fit_gap;
    D = PITCH - fit_gap;
    difference() {
        chamfered_block(W, D, tile_h, 4, 1.5);
        for (x = cell_centers(n)) translate([x, 0, -1]) cylinder(d = SOCKET_D, h = SOCKET_DEPTH + 1);
    }
    translate([0, 0, tile_h - 0.01]) linear_extrude(1.2) {
        if (len(t2) == 0)
            text(t1, size = tile_text_size, font = font, halign = "center", valign = "center");
        else {
            translate([0, tile_text_size * 0.45]) text(t1, size = tile_text_size, font = font, halign = "center", valign = "bottom");
            translate([0, -tile_text_size * 0.25]) text(t2, size = tile_text_size * 0.6, font = font, halign = "center", valign = "top");
        }
    }
}

// ---------------------------------------------------------- tool brick
// Hollow brick with sized holes in the top. Open bottom with fins that
// grip the studs it sits on. Tools rest on the studs/lid below.
// Print upside down (top face on the bed) - no supports needed.
module tool_brick(cols, rows, hb, lines) {
    W = cols*PITCH - fit_gap;
    D = rows*PITCH - fit_gap;
    H = hb*BRICK_H;
    nl = len(lines);
    w = tb_wall;
    fin_len = PITCH/2 - fit_gap/2 - w - STUD_D/2 - 0.3;

    difference() {
        chamfered_block(W, D, H, 3, 1.5);
        translate([0, 0, -1]) linear_extrude(H - tb_top + 1) footprint(W - 2*w, D - 2*w, 1, w);
        if (style == "rugged") {
            // brick seams: one every brick height, so a 2-high brick reads as two stacked bricks
            if (hb > 1) for (k = [1:hb-1])
                translate([0, 0, k*BRICK_H - 1]) linear_extrude(2) difference() {
                    footprint(W + 2, D + 2, 3);
                    footprint(W - 2.4, D - 2.4, 3, 1.2);
                }
            // grip flutes on both ends
            for (s = [-1, 1], y = [-1, 0, 1] * min(12, D/5))
                translate([s*W/2, y, 8]) linear_extrude(H - 16) square([2.4, 3.5], center = true);
        }
        for (j = [0:nl-1]) {
            line = lines[j];
            n = len(line);
            y = D/2 - D*(j + 0.5)/nl + tb_label_size * 0.6;
            for (i = [0:n-1]) {
                h = line[i];
                x = -W/2 + W*(i + 0.5)/n;
                translate([x, y, -1]) linear_extrude(H + 2) tool_hole_2d(h[0], h[1] + hole_clear);
                translate([x, y - h[1]/2 - 2.5, H - 0.6]) linear_extrude(1)
                    text(h[2], size = tb_label_size, font = font, halign = "center", valign = "top");
            }
        }
    }
    // stud-gripping fins on the inside of the walls
    for (x = cell_centers(cols), s = [-1, 1])
        translate([x - 0.8, s > 0 ? D/2 - w - fin_len : -D/2 + w, 0]) cube([1.6, fin_len + 0.01, 8]);
    for (y = cell_centers(rows), s = [-1, 1])
        translate([s > 0 ? W/2 - w - fin_len : -W/2 + w, y - 0.8, 0]) cube([fin_len + 0.01, 1.6, 8]);
}

module tool_hole_2d(shape, size) {
    if (shape == "hex") rotate(30) circle(d = size / cos(30), $fn = 6);
    else if (shape == "square") square(size, center = true);
    else circle(d = size);
}

// ---------------------------------------------------------- lamp
// Giant LEGO brick shade for the LED lamp kit base. The collar copies the
// kit's snap fit. Print upside down (top face on the bed), then press a
// lamp_stud into each hole - the studs glow.
module lamp() {
    W = lamp_cols*PITCH - fit_gap;
    D = lamp_rows*PITCH - fit_gap;
    H = lamp_h*BRICK_H;
    top = lamp_wall;
    iw = W - 2*lamp_wall;
    id = D - 2*lamp_wall;
    cone_h = sqrt(iw*iw + id*id)/2 - 34.2 + 2;

    difference() {
        linear_extrude(H) rrect(W, D, 3);
        translate([0, 0, -1]) linear_extrude(H - top + 1) rrect(iw, id, 1);
        for (x = cell_centers(lamp_cols), y = cell_centers(lamp_rows))
            translate([x, y, H - top - 1]) cylinder(d = STUD_D - 3, h = top + 2);
    }
    translate([0, 0, -collar_drop]) {
        led_bayonet();
        // 45 degree skirt from the collar out to the walls (closes the bottom)
        intersection() {
            translate([0, 0, collar_drop]) linear_extrude(H - top) rrect(iw + 0.4, id + 0.4, 1);
            translate([0, 0, LED_COLLAR_TOP]) difference() {
                cylinder(h = cone_h, r1 = 37, r2 = 37 + cone_h, $fn = 180);
                translate([0, 0, -0.01]) cylinder(h = cone_h + 0.02, r1 = 34.2, r2 = 34.2 + cone_h, $fn = 180);
            }
        }
    }
}

module led_bayonet() {
    rotate_extrude($fn = 180) polygon(LED_COLLAR);
    for (k = [0, 180]) rotate(k) {
        // retaining lug with a 45 deg lead-in on top
        rotate(LED_LUG[0]) rotate_extrude(angle = LED_LUG[1] - LED_LUG[0], $fn = 180)
            polygon([[31.5, 0], [33.05, 0], [33.05, 3.5], [31.5, 2]]);
        rotate(LED_STOP[0]) rotate_extrude(angle = LED_STOP[1] - LED_STOP[0], $fn = 180)
            polygon([[31.5, 0], [33.05, 0], [33.05, 7], [31.5, 7]]);
        rotate(LED_DETENT[0]) rotate_extrude(angle = LED_DETENT[1] - LED_DETENT[0], $fn = 180)
            polygon([[32.5, 3.5], [33.05, 3.5], [33.05, 6], [32.5, 6]]);
    }
}

// Hollow glowing stud cap with a press-fit plug. Print closed side down.
module lamp_stud() {
    w = 1.2;
    plug_od = STUD_D - 3 - stud_plug_fit;
    difference() {
        cylinder(d = STUD_D, h = STUD_H);
        translate([0, 0, w]) cylinder(d = STUD_D - 2*w, h = STUD_H);
    }
    translate([0, 0, STUD_H - 0.01]) difference() {
        cylinder(d = plug_od, h = 3);
        translate([0, 0, -1]) cylinder(d = plug_od - 2.4, h = 5);
    }
}

// ---------------------------------------------------------- string parsing
// "hex:2.5, round:8:PH2" -> [["hex", 2.5, "2.5"], ["round", 8, "PH2"]]
function parse_line(s) = [for (e = split(s, ",")) let(t = trim(e)) if (len(t) > 0) parse_entry(t)];
function parse_entry(t) = let(f = [for (p = split(t, ":")) trim(p)])
    [f[0], str2num(f[1]), len(f) > 2 ? f[2] : f[1]];
function split(s, sep, i = 0, cur = "", out = []) =
    i >= len(s) ? concat(out, [cur])
    : s[i] == sep ? split(s, sep, i + 1, "", concat(out, [cur]))
    : split(s, sep, i + 1, str(cur, s[i]), out);
function join(v, i = 0, acc = "") = i >= len(v) ? acc : join(v, i + 1, str(acc, v[i]));
function _lead(s, i = 0) = i < len(s) && s[i] == " " ? _lead(s, i + 1) : i;
function _tail(s, i) = i >= 0 && s[i] == " " ? _tail(s, i - 1) : i;
function trim(s) = let(a = _lead(s), b = _tail(s, len(s) - 1)) a > b ? "" : join([for (i = [a:b]) s[i]]);
function _int(s, i = 0, acc = 0) = i >= len(s) ? acc : _int(s, i + 1, acc*10 + search(s[i], "0123456789")[0]);
function str2num(s) = let(p = split(s, ".")) len(p) == 1 ? _int(p[0]) : _int(p[0]) + _int(p[1]) / pow(10, len(p[1]));
