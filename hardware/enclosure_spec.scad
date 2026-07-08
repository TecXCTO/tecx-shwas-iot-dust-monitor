$fn = 60;
box_width = 120;
box_length = 100;
box_height = 60;
wall_thick = 3;

union() {
    difference() {
        minkowski() {
            cube([box_width, box_length, box_height], center=true);
            cylinder(r=wall_thick, h=1);
        }
        cube([box_width - wall_thick, box_length - wall_thick, box_height + 5], center=true);
        
        // Louver dust defense channels
        for (i = [-15, 0, 15]) {
            translate([-(box_width/2 + wall_thick), i, -10])
                rotate([0, -35, 0])
                cube([15, 12, 6], center=true);
        }
    }
    // PCB Mount Posts
    translate([-40, -30, -box_height/2]) cylinder(h=6, r1=3, r2=2);
    translate([40, -30, -box_height/2])  cylinder(h=6, r1=3, r2=2);
    translate([-40, 30, -box_height/2])  cylinder(h=6, r1=3, r2=2);
    translate([40, 30, -box_height/2])   cylinder(h=6, r1=3, r2=2);
}
