import zlib
import struct
import math
import os

def create_png(width, height, pixels):
    def chunk(tag, data):
        return (struct.pack('>I', len(data)) +
                tag +
                data +
                struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff))

    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)  # Filter type 0 (None)
        for x in range(width):
            r, g, b, a = pixels[y][x]
            raw_data.extend([r, g, b, a])
    
    idat = zlib.compress(bytes(raw_data), 9)
    return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', idat) + chunk(b'IEND', b'')

def render_ldxg(size=400):
    scale = size / 200.0
    cx, cy = size / 2.0, size / 2.0
    pixels = [[(0, 0, 0, 0) for _ in range(size)] for _ in range(size)]

    for y in range(size):
        for x in range(size):
            dx = x - cx
            dy = y - cy
            dist = math.hypot(dx, dy)
            
            # Anti-aliased outer circular dark disc (radius 98 on 200 scale)
            r_disc = 98.0 * scale
            if dist > r_disc + 1.0:
                continue
            
            alpha_disc = 1.0
            if dist > r_disc - 1.0:
                alpha_disc = max(0.0, min(1.0, (r_disc + 1.0 - dist) / 2.0))

            # Disc base color (deep charcoal radial gradient)
            radial_ratio = dist / r_disc
            # from #232528 (35, 37, 40) to #121315 (18, 19, 21)
            bg_r = int(35 - radial_ratio * 17)
            bg_g = int(37 - radial_ratio * 18)
            bg_b = int(40 - radial_ratio * 19)

            curr_r, curr_g, curr_b, curr_a = bg_r, bg_g, bg_b, alpha_disc

            # 1. Outer 'C' Ring (center cx, cy, radius 69*scale, thickness 22*scale)
            # Starts at angle +32 deg, goes clockwise to -32 deg
            ring_r = 69.0 * scale
            half_thick = 11.0 * scale
            angle = math.atan2(dy, dx) # -pi to +pi
            
            # Angle check for gap on the right (between -32 deg and +32 deg)
            cap_angle_pos = math.radians(32)
            cap_angle_neg = math.radians(-32)
            cap_pos_x = cx + ring_r * math.cos(cap_angle_pos)
            cap_pos_y = cy + ring_r * math.sin(cap_angle_pos)
            cap_neg_x = cx + ring_r * math.cos(cap_angle_neg)
            cap_neg_y = cy + ring_r * math.sin(cap_angle_neg)

            dist_to_ring_center = abs(dist - ring_r)
            in_ring = False
            ring_alpha = 0.0

            if angle > cap_angle_pos or angle < cap_angle_neg:
                # Main continuous body of the 'C'
                if dist_to_ring_center <= half_thick + 1.0:
                    in_ring = True
                    ring_alpha = max(0.0, min(1.0, (half_thick + 1.0 - dist_to_ring_center) / 1.5))
            else:
                # Inside the opening gap, check rounded end caps
                d_cap1 = math.hypot(x - cap_pos_x, y - cap_pos_y)
                d_cap2 = math.hypot(x - cap_neg_x, y - cap_neg_y)
                min_d = min(d_cap1, d_cap2)
                if min_d <= half_thick + 1.0:
                    in_ring = True
                    ring_alpha = max(0.0, min(1.0, (half_thick + 1.0 - min_d) / 1.5))

            if in_ring and ring_alpha > 0:
                # Gold linear gradient across diagonal
                diag_t = max(0.0, min(1.0, (x + y) / (2.0 * size)))
                # from champagne #fbe6ab (251, 230, 171) to warm amber #a0630e (160, 99, 14)
                gr_r = int(251 * (1 - diag_t) + 160 * diag_t)
                gr_g = int(230 * (1 - diag_t) + 99 * diag_t)
                gr_b = int(171 * (1 - diag_t) + 14 * diag_t)

                curr_r = int(curr_r * (1 - ring_alpha) + gr_r * ring_alpha)
                curr_g = int(curr_g * (1 - ring_alpha) + gr_g * ring_alpha)
                curr_b = int(curr_b * (1 - ring_alpha) + gr_b * ring_alpha)

            # 2. Inner 'L' Glyphs
            # x from 68 to 132, y from 61 to 138 (on 200 scale)
            # Vertical stem: x in [68, 94], y in [61, 138]
            # Horizontal base: x in [68, 132], y in [112, 138]
            x_200 = x / scale
            y_200 = y / scale

            in_stem = (68 <= x_200 <= 94) and (61 <= y_200 <= 138)
            in_base = (68 <= x_200 <= 132) and (112 <= y_200 <= 138)
            
            if in_stem or in_base:
                l_t = max(0.0, min(1.0, ((x_200 - 68) + (y_200 - 61)) / 140.0))
                l_r = int(253 * (1 - l_t) + 171 * l_t)
                l_g = int(242 * (1 - l_t) + 109 * l_t)
                l_b = int(208 * (1 - l_t) + 20 * l_t)
                curr_r, curr_g, curr_b = l_r, l_g, l_b

            # 3. 3D Golden Sphere in the elbow of the 'L'
            # Center: (119, 113), radius 13 on 200 scale
            sp_cx = 119.0 * scale
            sp_cy = 113.0 * scale
            sp_r = 13.0 * scale
            d_sp = math.hypot(x - sp_cx, y - sp_cy)

            if d_sp <= sp_r + 1.0:
                sp_alpha = max(0.0, min(1.0, (sp_r + 1.0 - d_sp) / 1.5))
                # 3D spherical shading with specular highlight offset at (-0.35 * sp_r, -0.35 * sp_r)
                hl_x = sp_cx - 0.35 * sp_r
                hl_y = sp_cy - 0.35 * sp_r
                d_hl = math.hypot(x - hl_x, y - hl_y) / (1.5 * sp_r)
                d_hl = max(0.0, min(1.0, d_hl))
                
                # Shading from bright white-gold specular highlight to deep golden core
                s_r = int(255 * (1 - d_hl) + 122 * d_hl)
                s_g = int(250 * (1 - d_hl) + 70 * d_hl)
                s_b = int(235 * (1 - d_hl) + 4 * d_hl)

                curr_r = int(curr_r * (1 - sp_alpha) + s_r * sp_alpha)
                curr_g = int(curr_g * (1 - sp_alpha) + s_g * sp_alpha)
                curr_b = int(curr_b * (1 - sp_alpha) + s_b * sp_alpha)

            pixels[y][x] = (curr_r, curr_g, curr_b, int(curr_a * 255))

    return create_png(size, height=size, pixels=pixels)

if __name__ == '__main__':
    png_data = render_ldxg(400)
    os.makedirs('public', exist_ok=True)
    with open('public/LDXG logo.png', 'wb') as f:
        f.write(png_data)
    with open('public/ldxg-logo.png', 'wb') as f:
        f.write(png_data)
    print("Successfully generated public/LDXG logo.png and public/ldxg-logo.png (size 400x400)!")
