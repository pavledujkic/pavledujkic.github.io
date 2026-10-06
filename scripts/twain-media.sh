#!/usr/bin/env bash
# Turns the Twain demo recorder's output (talk-talk: apps/mobile/e2e/demo.e2e.mjs, the "demo"
# workflow's artifact) into the site's media: the clip, its poster, captions and stills.
#   scripts/twain-media.sh <dark-take-dir> [<light-take-dir>]
set -euo pipefail
dark="${1:?usage: $0 dark-take-dir [light-take-dir]}"
light="${2:-$1}"
dst="$(dirname "$0")/../public/media"
mkdir -p "$dst"
cp "$dark/twain-dark.mp4" "$dst/twain.mp4"
cp "$dark/twain-dark.webm" "$dst/twain.webm"
cp "$dark/twain-dark.vtt" "$dst/twain.vtt"
webp() { ffmpeg -v error -y -i "$1" -vf "scale=${3:-780}:-2" -c:v libwebp -quality "${4:-82}" -compression_level 6 "$2"; }
webp "$dark/twain-dark-poster.jpg" "$dst/twain-poster.webp" 780 80
webp "$dark/twain-dark-conversation.png" "$dst/twain-conversation.webp" 600
webp "$dark/twain-dark-languages.png" "$dst/twain-languages.webp" 600
webp "$light/twain-light-thread.png" "$dst/twain-thread.webp" 600
ls -la "$dst"
