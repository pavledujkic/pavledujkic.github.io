// The work on the site. A project with `page` gets a case study at /work/<slug>/.

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  year: string;
  platforms: string;
  /** Two colours for the glow behind its clip. */
  colors: [string, string];
  stats: Array<{ value: string; label: string }>;
  clip?: { webm: string; mp4: string; poster: string; captions?: string; width: number; height: number };
  page: boolean;
}

export const projects: Project[] = [
  {
    slug: "twain",
    title: "Twain",
    tagline: "Two languages. One conversation.",
    summary:
      "A face-to-face live translator. Put the phone on the table between two people and talk: each reads and hears the other in their own language, about as soon as they stop speaking.",
    year: "2026",
    platforms: "iOS · Android",
    colors: ["#FF7A45", "#3DA9FC"],
    stats: [
      { value: "0.76 s", label: "from the last word to the full translation" },
      { value: "2 ms", label: "from the end of a turn to the translated voice" },
      { value: "61", label: "languages, 29 of them spoken" },
    ],
    clip: {
      webm: "media/twain.webm",
      mp4: "media/twain.mp4",
      poster: "media/twain-poster.webp",
      captions: "media/twain.vtt",
      width: 780,
      height: 1688,
    },
    page: true,
  },
];
