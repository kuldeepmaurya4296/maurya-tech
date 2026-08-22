import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Serialize an object for embedding in a <script type="application/ld+json"> tag.
 *
 * JSON.stringify does not escape "<", so a value containing "</script>" would
 * close the tag early and let the rest of the value run as markup. Emitting the
 * character as its < escape keeps the JSON valid while making that
 * impossible.
 */
export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
