#!/usr/bin/env python3
"""Refresh the list of publicly shared images without storing the images."""
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

FOLDER_ID = "1yPqNa7F5y8LqtY2kMolfGJ9GdubVIccT"
class FolderParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.current = None
        self.ids = set()
        self.found_listing = False
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = attrs.get("class", "").split()
        if "flip-contents" in classes:
            self.found_listing = True
        match = re.fullmatch(r"entry-([\w-]+)", attrs.get("id", ""))
        if match:
            self.current = match.group(1)
        if tag == "img" and self.current and "/type/image/" in attrs.get("src", ""):
            self.ids.add(self.current)

try:
    url = "https://drive.google.com/embeddedfolderview?" + urlencode({"id": FOLDER_ID})
    with urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=30) as response:
        parser = FolderParser()
        parser.feed(response.read().decode("utf-8"))
    if not parser.found_listing:
        raise ValueError("Google Drive did not return the public folder listing")
    Path("public/drive-photos.json").write_text(json.dumps({"photos": sorted(parser.ids)}) + "\n")
    print(f"Found {len(parser.ids)} shared images")
except Exception as error:
    # Preserve the last checked-in list if Google is temporarily unreachable.
    print(f"Could not refresh photos; keeping existing list: {error}", file=sys.stderr)
