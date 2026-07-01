// Detail level for smoother curves
$fn = 100;

// Main Tower
cylinder(h = 120, r1 = 20, r2 = 15, center = true);

// Clock Face
translate([0, 0, 60]) {
    difference() {
        cylinder(h = 10, r = 18, center = true);
        // Clock Hands
        translate([0, 0, 1]) {
            cube([12, 2, 2], center = true);
            rotate([0, 0, 120])
                cube([8, 2, 2], center = true);
        }
        // Clock Numbers (simplified as dots for complexity)
        for (i = [0 : 11]) {
            rotate([0, 0, i * 30])
                translate([16, 0, 5])
                    sphere(r = 1);
        }
    }
}

// Gears in the Tower
for (i = [1:4]) {
    translate([0, 0, i*30 - 30]) {
        gear(20, 2, 6);
    }
}

// Base with Mechanical Legs
translate([0, 0, -70]) {
    for (i = [0:5]) {
        rotate([0, 0, i * 60]) {
            translate([0, 16, 0]) {
                cylinder(h = 20, r = 3, center = true);
                translate([0, 0, -10]) {
                    sphere(r = 3);
                }
            }
        }
    }
}

// Function to create a gear
module gear(outer_radius, height, tooth_size) {
    difference() {
        cylinder(h = height, r = outer_radius, center = true);
        cylinder(h = height + 2, r = outer_radius - tooth_size, center = true);
    }
    // Teeth
    for (i = [0:359]) {
        rotate([0, 0, i * 10])
            translate([outer_radius - 1, 0, 0])
                cube([tooth_size, 3, height + 1], center = true);
    }
}
