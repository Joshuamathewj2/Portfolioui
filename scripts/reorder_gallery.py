#!/usr/bin/env python3
"""
Reorders galleryProjects in Systems.tsx:
  - Slot 1 (MIRAGE)     -> moves to Slot 5
  - Slot 3 (ResQ)       -> moves to Slot 1
  - Slot 5 (BloodChain) -> moves to Slot 3
  - Slot 7 (Aura-X1)   -> thumbnail changed to valoratn.png

coinLabels array is also updated to match.
"""

import re

FILE = r"c:\Portfolioui-main\src\app\components\Systems.tsx"

with open(FILE, "r", encoding="utf-8") as f:
    content = f.read()

# ── 1. Fix coinLabels ────────────────────────────────────────────────────────
old_labels = '''  const coinLabels = [
    "MIRAGE",
    "Analyser Agent",
    "ResQ",
    "PillPulse AI",
    "BloodChain",
    "PixelTrust",
    "Aura-X1",
    "Valora",
    "Silent Words MVC",
    "Gesture Hologram PRO"
  ];'''

new_labels = '''  const coinLabels = [
    "ResQ",
    "Analyser Agent",
    "BloodChain",
    "PillPulse AI",
    "MIRAGE",
    "PixelTrust",
    "Aura-X1",
    "Valora",
    "Silent Words MVC",
    "Gesture Hologram PRO"
  ];'''

assert old_labels in content, "coinLabels block not found!"
content = content.replace(old_labels, new_labels, 1)
print("✓ coinLabels updated")

# ── 2. Extract each project object block from galleryProjects ────────────────
# Strategy: split on the boundary "  },\n  {" within the galleryProjects array
# We'll find the start of galleryProjects and split the array items.

START_MARKER = "const galleryProjects: GalleryItem[] = ["
END_MARKER   = "];\n\n"  # closing of the galleryProjects array

start_idx = content.index(START_MARKER)
# Find the end of the array - it's "];" on its own line after the last item
# We search from start_idx forward
array_body_start = content.index("[", start_idx) + 1

# Find the closing bracket of the array.
# We count brackets to find matching ].
depth = 1
i = array_body_start
in_template = False
template_depth = 0

while i < len(content) and depth > 0:
    ch = content[i]
    if not in_template:
        if ch == '`':
            in_template = True
        elif ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
    else:
        # Inside template literal - only exit on unescaped backtick
        if ch == '\\':
            i += 1  # skip next char
        elif ch == '`':
            in_template = False
    i += 1

array_body_end = i - 1  # position of the closing ']'
array_body = content[array_body_start:array_body_end]

# Now split into individual objects. Each object starts with "\n  {\n" and ends with "\n  }"
# We'll split by the separator between objects: "},\n  {"
# But we need to handle template literals that might contain those chars.
# Better: parse manually tracking depth and template literals.

def split_objects(s):
    """Split a JS array body string into individual object strings."""
    objects = []
    current = []
    depth = 0
    in_template = False
    i = 0
    while i < len(s):
        ch = s[i]
        if not in_template:
            if ch == '`':
                in_template = True
                current.append(ch)
            elif ch == '{':
                depth += 1
                current.append(ch)
            elif ch == '}':
                depth -= 1
                current.append(ch)
                if depth == 0:
                    # End of this object
                    obj_str = ''.join(current).strip()
                    if obj_str.startswith('{') or obj_str:
                        objects.append(obj_str)
                    current = []
            else:
                current.append(ch)
        else:
            if ch == '\\':
                current.append(ch)
                i += 1
                if i < len(s):
                    current.append(s[i])
            elif ch == '`':
                in_template = False
                current.append(ch)
            else:
                current.append(ch)
        i += 1
    return [o for o in objects if o.strip()]

objects = split_objects(array_body)
print(f"Found {len(objects)} gallery project objects")

# Verify we have 10 objects
assert len(objects) == 10, f"Expected 10 objects, got {len(objects)}"

# Print first line of each to verify order
for idx, obj in enumerate(objects):
    first_url_line = [l for l in obj.split('\n') if 'url:' in l]
    print(f"  Slot {idx+1}: {first_url_line[0].strip() if first_url_line else '???'}")

# ── 3. Perform the reorder ───────────────────────────────────────────────────
# Current: [MIRAGE, Analyser, ResQ, PillPulse, BloodChain, PixelTrust, Aura, Valora, Silent, Gesture]
# Desired: [ResQ,   Analyser, BloodChain, PillPulse, MIRAGE, PixelTrust, Aura, Valora, Silent, Gesture]
# Indices:   0->2,  1->1,     2->4,       3->3,      4->0,   5->5,       6->6,  7->7,   8->8,   9->9

new_objects = [
    objects[2],   # Slot 1: ResQ (was slot 3)
    objects[1],   # Slot 2: Analyser Agent (unchanged)
    objects[4],   # Slot 3: BloodChain (was slot 5)
    objects[3],   # Slot 4: PillPulse AI (unchanged)
    objects[0],   # Slot 5: MIRAGE (was slot 1)
    objects[5],   # Slot 6: PixelTrust (unchanged)
    objects[6],   # Slot 7: Aura-X1 (unchanged, thumbnail fix below)
    objects[7],   # Slot 8: Valora (unchanged)
    objects[8],   # Slot 9: Silent Words (unchanged)
    objects[9],   # Slot 10: Gesture Hologram (unchanged)
]

print("\nNew order:")
for idx, obj in enumerate(new_objects):
    first_url_line = [l for l in obj.split('\n') if 'url:' in l]
    print(f"  Slot {idx+1}: {first_url_line[0].strip() if first_url_line else '???'}")

# ── 4. Fix Slot 7 (Aura-X1) thumbnail: auratn.png -> valoratn.png ───────────
new_objects[6] = new_objects[6].replace('"auratn.png"', '"valoratn.png"', 1)
print('\n✓ Slot 7 thumbnail updated: auratn.png -> valoratn.png')

# ── 5. Rebuild the array body ────────────────────────────────────────────────
new_array_body = "\n  " + ",\n  ".join(new_objects) + "\n"

# ── 6. Replace in content ────────────────────────────────────────────────────
new_content = (
    content[:array_body_start]
    + new_array_body
    + content[array_body_end:]
)

with open(FILE, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"\n✓ Systems.tsx written successfully ({len(new_content)} bytes)")
print("Done!")
