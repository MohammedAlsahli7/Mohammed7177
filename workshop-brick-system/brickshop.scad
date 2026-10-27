// =====================================================================
//  BRICKSHOP - an all-LEGO workshop storage system (giant scale)
//  One parametric file. Pick a part, set the options, render, export.
//
//  Every part is a LEGO brick on one 55 mm stud grid: studs on top,
//  sockets underneath, 70 mm brick / 23.3 mm plate heights. The grid
//  matches the LEGO storage box shells (55 mm cells, 34 mm studs), so
//  everything here snaps onto them and onto each other.
//
//  Works in OpenSCAD 2021+ and the MakerWorld customizer.
// =====================================================================

/* [Part] */
// Which part to build
part = "storage_box"; // [storage_box:Storage brick (open box), box_lid:Stud lid with mesh + title, brick:Plain brick / plate, hex_key_brick:Hex key brick, driver_brick:Screwdriver brick, bit_brick:Bit brick, tool_brick:Custom tool brick, title_tile:Title tile, lamp:LEGO lamp shade, lamp_stud:Lamp stud cap, gridock_lid:Gridock tray lid (studs)]

/* [Style] */
// classic = smooth LEGO, rugged = armoured corners, brick seams, grip flutes
style = "classic"; // [classic, rugged]
// Corner chamfer size (rugged)
rug_chamfer = 6;

/* [Storage brick + lid] */
// Width in studs
box_cols = 4; // [1:8]
// Depth in studs
box_rows = 4; // [1:8]
// Height in plates (3 plates = 1 brick = 70 mm)
box_plates = 3; // [2:12]
// Wall thickness
box_wall = 3;
// Divider walls across the width (0 = none)
box_div_x = 0; // [0:7]
// Divider walls front to back (0 = none)
box_div_y = 0; // [0:7]
// Title engraved on the front of the box (empty = none)
box_title = "SCREWS & BOLTS";
// Box title text height
box_title_size = 16;
// Lid title, engraved on the front edge strip (stays stackable)
lid_title = "SCREWS & BOLTS";
// Lid title text height
lid_title_size = 6;
// Raised title plaque on the lid's front row instead of studs (top-of-stack lids only)
lid_plaque = false;
// Lid thickness
lid_t = 5;

/* [Plain brick / plate] */
// Width in studs
brick_cols = 2; // [1:16]
// Depth in studs
brick_rows = 4; // [1:16]
// Height in plates (1 = plate, 3 = brick)
brick_plates = 3; // [1:12]

/* [Hex mesh] */
// Hex hole size (across flats)
mesh_cell = 9;
// Rib width between hex holes
mesh_rib = 1.8;

/* [Tool bricks] */
// Engraved label height
tb_label_size = 4.5;
// Extra clearance added to every tool hole
hole_clear = 0.5;
// Custom brick: rows of studs
tb_rows = 2; // [1:6]
// Custom brick: height in plates
tb_plates = 3; // [1:12]
// Custom brick: tools per stud (1, 2 or 4)
tb_per_stud = 1; // [1, 2, 4]
// Custom brick: hole depth from the stud top (0 = all the way down)
tb_depth = 0;
// Custom brick tools, filled into studs back-left to front-right. Format: shape:size[:label], comma separated. Shapes: hex, round, square
tb_tools = "hex:1.5, hex:2, hex:2.5, hex:3, hex:4, hex:5, hex:6, hex:8, hex:10";

/* [Title tile] */
// Length in studs
tile_len = 4; // [1:8]
// Title line 1
tile_text1 = "HEX KEYS";
// Title line 2 (optional)
tile_text2 = "";
// Text height for line 1
tile_text_size = 16;
// Tile body height (sockets are 10.5 deep inside)
tile_h = 14;

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

/* [Gridock lid] */
// Gridock tray size (220 = 4 x 4 studs)
gl_size = 220;
// Gridock corner radius
gl_corner_r = 40;
// Stud rows from the back (front row becomes the title plaque when < 4)
gl_stud_rows = 3; // [0:4]

/* [Fit and font] */
// Gap between neighbouring bricks (keeps them from binding)
fit_gap = 0.4;
// Font (Liberation ships with OpenSCAD)
font = "Liberation Sans:style=Bold";

/* [Hidden] */
$fn = 72;
PITCH = 55;              // stud pitch (matches the LEGO storage box shells)
BRICK_H = 70;            // brick height (matches the LEGO storage box shells)
PLATE_H = BRICK_H / 3;   // plate height, like real LEGO (1 brick = 3 plates)
STUD_D = 34;             // stud diameter (LEGO storage box shells use 34)
STUD_H = 9.6;            // stud height (their sockets are 10 deep)
SOCKET_D = 35;           // socket diameter (LEGO storage box shells use 35)
SOCKET_DEPTH = 10.5;
BASE_T = 12.5;           // solid bottom that holds the sockets
TOP_T = 2.4;             // top skin of closed bricks
RIB = 1.6;               // internal rib / divider thickness
TONGUE = [1.2, 2];       // storage brick rim tongue [width, height]

// LED lamp kit bayonet, measured from the kit's own shade (z = up from the rim):
// 70.0 OD rim, 33.0 inner radius, two retaining lugs (r 31.5, z 0-3) with
// 53 deg entry gaps between them, a twist channel (z 3.5-5.6) ending at a stop
// wall, 0.5 mm click detents, and a snap bead (r 31.5) at z 7, opening out to r 34.2 above it.
LED_COLLAR = [[33, 0], [35, 0], [35, 8], [37, 12], [34.2, 12], [34.2, 9.6], [31.5, 7.2], [31.5, 6.8], [33, 5.6]];
LED_COLLAR_TOP = 12;
LED_LUG = [105, 230];        // retaining lug span (deg), repeated at +180
LED_STOP = [106, 109];       // stop wall closing the twist channel
LED_DETENT = [144, 150];     // click bump inside the channel

HEX_KEYS = "hex:1.5, hex:2, hex:2.5, hex:3, hex:4, hex:5, hex:6, hex:8, hex:10";
DRIVERS = "round:6:PH0, round:7:PH1, round:8:PH2, round:9:PH3, round:6:SL3, round:7:SL4, round:8:SL5.5, round:9:SL6.5";
BITS = "hex:6.35, hex:6.35, hex:6.35, hex:6.35, hex:6.35, hex:6.35, hex:6.35, hex:6.35, hex:6.35, hex:6.35, hex:6.35, hex:6.35, hex:6.35, hex:6.35, hex:6.35, hex:6.35";

// ------------------------------------------------------------------ main
if (part == "storage_box") storage_box(box_cols, box_rows, box_plates);
else if (part == "box_lid") box_lid(box_cols, box_rows);
else if (part == "brick") brick(brick_cols, brick_rows, brick_plates);
// hex keys stand short arm down, long arm up
else if (part == "hex_key_brick") tool_brick(3, 3, parse_line(HEX_KEYS), 1, 0);
// screwdrivers hang shaft down, handle resting on the stud
else if (part == "driver_brick") tool_brick(2, 6, parse_line(DRIVERS), 1, 0);
// four 1/4in bits per stud, 16 mm deep
else if (part == "bit_brick") tool_brick(1, 2, parse_line(BITS), 4, 16);
else if (part == "tool_brick") tool_brick(tb_rows, tb_plates, parse_line(tb_tools), tb_per_stud, tb_depth);
else if (part == "title_tile") title_tile(tile_len, tile_text1, tile_text2);
else if (part == "lamp") lamp();
else if (part == "lamp_stud") lamp_stud();
else if (part == "gridock_lid") gridock_lid();

// ------------------------------------------------------------- 2D helpers
module rrect(w, h, r) {
    rr = max(0.01, min(r, w/2 - 0.01, h/2 - 0.01));
    offset(r = rr) square([w - 2*rr, h - 2*rr], center = true);
}

// Brick outline: chamfered "armour" corners when rugged, crisp LEGO corners otherwise.
// inset = wall thickness when drawing an inner outline (keeps the wall even).
module footprint(w, d, r = 1, inset = 0) {
    if (style == "rugged") {
        c = max(0.5, rug_chamfer - inset * (sqrt(2) - 1));
        polygon([[-w/2 + c, -d/2], [w/2 - c, -d/2], [w/2, -d/2 + c], [w/2, d/2 - c],
                 [w/2 - c, d/2], [-w/2 + c, d/2], [-w/2, d/2 - c], [-w/2, -d/2 + c]]);
    } else rrect(w, d, r);
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

function cell_centers(n) = [for (i = [0:n-1]) (i - (n-1)/2) * PITCH];
function bsize(n) = n*PITCH - fit_gap;

// ------------------------------------------------------------- LEGO basics
// Solid block with a small chamfer on the top edge
module chamfered_block(w, d, h, ch = (style == "rugged" ? 1.5 : 0.6)) {
    linear_extrude(h - ch) footprint(w, d);
    hull() {
        translate([0, 0, h - ch - 0.01]) linear_extrude(0.01) footprint(w, d);
        translate([0, 0, h - 0.01]) linear_extrude(0.01) footprint(w - 2*ch, d - 2*ch, 1, ch);
    }
}

module stud(h = STUD_H) {
    cylinder(d = STUD_D, h = h - 0.8);
    translate([0, 0, h - 0.81]) cylinder(d1 = STUD_D, d2 = STUD_D - 1.6, h = 0.8);
}

module studs(cols, rows, z) {
    for (x = cell_centers(cols), y = cell_centers(rows))
        translate([x, y, z - 0.01]) stud();
}

module sockets(cols, rows) {
    for (x = cell_centers(cols), y = cell_centers(rows))
        translate([x, y, -1]) cylinder(d = SOCKET_D, h = SOCKET_DEPTH + 1);
}

// Brick seams + end grip flutes for the rugged style
module rugged_marks(W, D, H) {
    if (style == "rugged") {
        if (H > BRICK_H + 1) for (k = [1:floor((H - 1) / BRICK_H)])
            translate([0, 0, k*BRICK_H - 1]) linear_extrude(2) difference() {
                footprint(W + 2, D + 2);
                footprint(W - 2.4, D - 2.4, 1, 1.2);
            }
        if (H > 30) for (s = [-1, 1], y = [-1, 0, 1] * min(12, D/5))
            translate([s*W/2, y, BASE_T]) linear_extrude(H - BASE_T - 6) square([2.4, 3.5], center = true);
    }
}

// Closed brick: sockets below, studs on top, hollow inside with LEGO-style
// ribs and tubes so the top prints right side up without supports.
module brick(cols, rows, plates, with_studs = true, tubes = true) {
    W = bsize(cols);
    D = bsize(rows);
    H = plates * PLATE_H;
    difference() {
        chamfered_block(W, D, H);
        if (H - TOP_T > BASE_T + 1)
            translate([0, 0, BASE_T]) linear_extrude(H - TOP_T - BASE_T) footprint(W - 2*box_wall, D - 2*box_wall, 1, box_wall);
        sockets(cols, rows);
        rugged_marks(W, D, H);
    }
    if (H - TOP_T > BASE_T + 1) translate([0, 0, BASE_T - 0.01]) {
        ribs(cols, rows, W, D, H - TOP_T - BASE_T + 0.02);
        if (tubes) for (x = cell_centers(cols), y = cell_centers(rows))
            translate([x, y, 0]) cylinder(d = 20, h = H - TOP_T - BASE_T + 0.02);
    }
    if (with_studs) studs(cols, rows, H);
}

module ribs(cols, rows, W, D, h) {
    if (cols > 1) for (i = [1:cols-1]) translate([-W/2 + i*PITCH - fit_gap/2, 0, h/2]) cube([RIB, D - 2*box_wall + 0.02, h], center = true);
    if (rows > 1) for (j = [1:rows-1]) translate([0, -D/2 + j*PITCH - fit_gap/2, h/2]) cube([W - 2*box_wall + 0.02, RIB, h], center = true);
}

// ---------------------------------------------------------- storage brick
// Open-top box shaped like a LEGO brick. The stud lid clicks onto the rim
// tongue; a stacked box's sockets grip the lid's studs.
module storage_box(cols, rows, plates) {
    W = bsize(cols);
    D = bsize(rows);
    H = plates * PLATE_H;
    w = box_wall;
    difference() {
        linear_extrude(H) footprint(W, D);
        translate([0, 0, BASE_T]) linear_extrude(H) footprint(W - 2*w, D - 2*w, 1, w);
        sockets(cols, rows);
        rugged_marks(W, D, H);
    }
    if (len(box_title) > 0)
        translate([0, -D/2 + 0.8, BASE_T + (H - BASE_T)/2]) rotate([90, 0, 0])
            linear_extrude(1) text(box_title, size = box_title_size, font = font, halign = "center", valign = "center");
    // rim tongue on the inner half of the wall
    translate([0, 0, H - 0.01]) linear_extrude(TONGUE[1]) tongue_ring(W, D, 0);
    // optional dividers
    dh = H - BASE_T - 4;
    translate([0, 0, BASE_T - 0.01]) {
        if (box_div_x > 0) for (k = [1:box_div_x])
            translate([-W/2 + w + k*(W - 2*w)/(box_div_x + 1), 0, dh/2]) cube([RIB, D - 2*w + 0.02, dh], center = true);
        if (box_div_y > 0) for (k = [1:box_div_y])
            translate([0, -D/2 + w + k*(D - 2*w)/(box_div_y + 1), dh/2]) cube([W - 2*w + 0.02, RIB, dh], center = true);
    }
}

// Ring along the inside of the wall; grow > 0 widens it (used for the lid groove)
module tongue_ring(W, D, grow) {
    w = box_wall;
    t = TONGUE[0];
    difference() {
        footprint(W - 2*(w - t) + 2*grow, D - 2*(w - t) + 2*grow, 1, w - t - grow);
        footprint(W - 2*w - 2*grow, D - 2*w - 2*grow, 1, w + grow);
    }
}

// ---------------------------------------------------------- stud lid
// LEGO plate-style lid: hex mesh between hollow ring studs, title plaque on
// the front row. Prints flat, right side up; the groove underneath locks
// onto the storage brick rim.
module box_lid(cols, rows) {
    W = bsize(cols);
    D = bsize(rows);
    frame = box_wall + 7;
    plaque = lid_plaque && len(lid_title) > 0 && rows > 1;
    front = plaque ? 1 : 0;
    xs = cell_centers(cols);
    ys = cell_centers(rows);
    plaque_w = W - 2*frame;
    plaque_d = PITCH - 14;

    module islands() {
        for (x = xs, j = [front:rows-1]) translate([x, ys[j]]) circle(d = STUD_D);
        if (plaque) translate([0, ys[0]]) rrect(plaque_w, plaque_d, 6);
    }

    difference() {
        chamfered_block(W, D, lid_t);
        // opening (shrink then grow) drops hairline slivers where a hex touches a stud
        translate([0, 0, -1]) linear_extrude(lid_t + 2) offset(delta = 0.15) offset(delta = -0.15) difference() {
            footprint(W - 2*frame, D - 2*frame, 1, frame);
            hex_mesh_2d(W - 2*frame, D - 2*frame);
            islands();
        }
        translate([0, 0, -0.01]) linear_extrude(TONGUE[1] + 0.4) tongue_ring(W, D, 0.25);
        // engraved title on the front edge strip
        if (!plaque && len(lid_title) > 0)
            translate([0, -D/2 + frame/2, lid_t - 0.6])
                linear_extrude(1) text(lid_title, size = (plaque ? 15 : lid_title_size), font = font, halign = "center", valign = "center");
    }
    // ring studs: the mesh stays visible through the middle
    for (x = xs, j = [front:rows-1]) translate([x, ys[j], lid_t - 0.01])
        difference() {
            stud();
            translate([0, 0, -1]) cylinder(d = STUD_D - 2*2.4, h = STUD_H + 2);
        }
    if (plaque) translate([0, ys[0], lid_t - 0.01]) {
        linear_extrude(2) rrect(plaque_w, plaque_d, 6);
        translate([0, 0, 1.98]) linear_extrude(1.22)
            text(lid_title, size = (plaque ? 15 : lid_title_size), font = font, halign = "center", valign = "center");
    }
}

// ---------------------------------------------------------- tool bricks
// A normal LEGO brick whose studs hold the tools: each stud is drilled with
// 1, 2 or 4 holes that run down a solid sleeve. Size labels are engraved on
// the stud tops. Prints right side up, no supports.
module tool_brick(rows, plates, tools, per_stud, depth) {
    n_studs = ceil(len(tools) / per_stud);
    cols = ceil(n_studs / rows);
    H = plates * PLATE_H;
    top = H + STUD_H;
    hole_depth = depth > 0 ? depth : top - BASE_T + 0.01;
    o = 7.5;
    offs = per_stud == 1 ? [[0, 0]] : per_stud == 2 ? [[-o, 0], [o, 0]] : [[-o, o], [o, o], [-o, -o], [o, -o]];
    xs = cell_centers(cols);
    ys = cell_centers(rows);
    function stud_xy(s) = [xs[s % cols], ys[rows - 1 - floor(s / cols)]];
    max_tool = max([for (t = tools) t[1]]);
    sleeve_d = min(STUD_D, 2*(norm(offs[0]) + (max_tool + hole_clear)/cos(30)/2 + 1.6));

    difference() {
        union() {
            brick(cols, rows, plates, tubes = false);
            for (s = [0:n_studs-1]) translate(concat(stud_xy(s), [BASE_T - 0.01]))
                cylinder(d = max(14, sleeve_d), h = H - BASE_T);
        }
        for (k = [0:len(tools)-1]) {
            t = tools[k];
            s = floor(k / per_stud);
            translate(concat(stud_xy(s) + offs[k % per_stud], [top - hole_depth]))
                linear_extrude(hole_depth + 1) tool_hole_2d(t[0], t[1] + hole_clear);
            if (per_stud == 1)
                translate(concat(stud_xy(s), [top - 0.6])) translate([0, -(t[1] + hole_clear)/2/cos(30) - 2])
                    linear_extrude(1) text(t[2], size = tb_label_size, font = font, halign = "center", valign = "top");
        }
    }
}

module tool_hole_2d(shape, size) {
    if (shape == "hex") rotate(30) circle(d = size / cos(30), $fn = 6);
    else if (shape == "square") square(size, center = true);
    else circle(d = size);
}

// ---------------------------------------------------------- title tile
// A flat LEGO tile with sockets underneath. Press it onto any stud row to
// relabel a stack in seconds. Print right side up; swap filament at the
// text layer for two colours.
module title_tile(n, t1, t2) {
    W = bsize(n);
    D = bsize(1);
    difference() {
        chamfered_block(W, D, tile_h, 1.5);
        sockets(n, 1);
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

// ---------------------------------------------------------- lamp
// Giant LEGO brick shade for the LED lamp kit base. The collar copies the
// kit's twist-lock. Print upside down (top face on the bed), then press a
// lamp_stud into each hole - the studs glow.
module lamp() {
    W = bsize(lamp_cols);
    D = bsize(lamp_rows);
    H = lamp_h*BRICK_H;
    top = lamp_wall;
    iw = W - 2*lamp_wall;
    id = D - 2*lamp_wall;
    cone_h = sqrt(iw*iw + id*id)/2 - 34.2 + 2;

    difference() {
        linear_extrude(H) footprint(W, D);
        translate([0, 0, -1]) linear_extrude(H - top + 1) footprint(iw, id, 1, lamp_wall);
        for (x = cell_centers(lamp_cols), y = cell_centers(lamp_rows))
            translate([x, y, H - top - 1]) cylinder(d = STUD_D - 3, h = top + 2);
    }
    translate([0, 0, -collar_drop]) {
        led_bayonet();
        // 45 degree skirt from the collar out to the walls (closes the bottom)
        intersection() {
            translate([0, 0, collar_drop]) linear_extrude(H - top) footprint(iw + 0.4, id + 0.4, 1, lamp_wall - 0.2);
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

// ---------------------------------------------------------- Gridock lid
// Optional: turns a Gridock tray into a LEGO base. Its 2 mm foot copies the
// tray's own bevel, so it nests on the rim like another tray would.
module gridock_lid() {
    S = gl_size;
    R = gl_corner_r;
    top = 5;
    frame = 12;
    win = S - 2*frame;
    cols = cell_centers(4);
    rows = gl_stud_rows > 0 ? [for (j = [0:gl_stud_rows-1]) cols[3 - j]] : [];
    plaque = len(lid_title) > 0 && gl_stud_rows < 4;
    plaque_w = S - 2*frame - 4;
    plaque_d = PITCH - 14;

    module islands() {
        for (x = cols, y = rows) translate([x, y]) circle(d = STUD_D);
        if (plaque) translate([0, cols[0]]) rrect(plaque_w, plaque_d, 6);
    }

    difference() {
        hull() {
            linear_extrude(0.01) rrect(S - 6, S - 6, R - 3);
            translate([0, 0, 2]) linear_extrude(top - 2) rrect(S, S, R);
        }
        translate([0, 0, -1]) linear_extrude(top + 2) offset(delta = 0.15) offset(delta = -0.15) difference() {
            rrect(win, win, R - frame);
            hex_mesh_2d(win, win);
            islands();
        }
    }
    for (x = cols, y = rows) translate([x, y, top - 0.01])
        difference() {
            stud();
            translate([0, 0, -1]) cylinder(d = STUD_D - 2*2.4, h = STUD_H + 2);
        }
    if (plaque) translate([0, cols[0], top - 0.01]) {
        linear_extrude(2) rrect(plaque_w, plaque_d, 6);
        translate([0, 0, 1.98]) linear_extrude(1.22)
            text(lid_title, size = (plaque ? 15 : lid_title_size), font = font, halign = "center", valign = "center");
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
