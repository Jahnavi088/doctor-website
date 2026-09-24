"""Packs captured frames into horizontal WebP sprite sheets (one per expertise item)."""
import glob, os, sys
from PIL import Image

src, out, n = sys.argv[1], sys.argv[2], int(sys.argv[3])
os.makedirs(out, exist_ok=True)
for item in ("replacement", "arthroscopy", "robotic", "trauma"):
    frames = [Image.open(f).convert("RGB") for f in sorted(glob.glob(os.path.join(src, f"{item}-*.png")))][:n]
    w, h = frames[0].size
    sheet = Image.new("RGB", (w * len(frames), h))
    for i, f in enumerate(frames):
        sheet.paste(f, (i * w, 0))
    sheet = sheet.resize((sheet.width * 360 // w, 360), Image.LANCZOS)
    dst = os.path.join(out, f"{item}.webp")
    sheet.save(dst, quality=82, method=6)
    frames[0].resize((360, 360), Image.LANCZOS).save(os.path.join(out, f"{item}-still.webp"), quality=84)
    print(dst, os.path.getsize(dst) // 1024, "KB")
