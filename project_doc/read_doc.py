from docx import Document

doc_path = r'C:\Users\sanga\OneDrive\Desktop\WEB\project_doc\BCSE203E WEB PROGRAMMING Project Document.docx'
doc = Document(doc_path)

# Print ALL paragraphs including empty ones
for i, p in enumerate(doc.paragraphs):
    style = p.style.name if p.style else "None"
    text = p.text if p.text else "(empty)"
    # Also check for runs and their formatting
    runs_info = []
    for r in p.runs:
        bold = "B" if r.bold else ""
        italic = "I" if r.italic else ""
        size = r.font.size if r.font.size else ""
        runs_info.append(f"[{bold}{italic} sz={size}] '{r.text}'")
    runs_str = " | ".join(runs_info) if runs_info else ""
    print(f"P{i}: [{style}] text='{text}' runs={runs_str}")

# Check for images
print("\n\nIMAGES/INLINE SHAPES:")
for i, shape in enumerate(doc.inline_shapes):
    print(f"  Shape {i}: type={shape.type}, width={shape.width}, height={shape.height}")
