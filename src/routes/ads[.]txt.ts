import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// AdSense ads.txt.
// Once your AdSense account is approved, replace PUBLISHER_ID with your
// own pub-XXXXXXXXXXXXXXXX id (do NOT include the "pub-" prefix twice —
// just the digits after "pub-").
const PUBLISHER_ID = "4947055003744994"; // e.g. "0000000000000000"

export const Route = createFileRoute("/ads.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = PUBLISHER_ID
          ? `google.com, pub-${PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`
          : "# ads.txt — add your Google AdSense publisher id in src/routes/ads[.]txt.ts once approved.\n";
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
