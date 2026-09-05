import eventImg from "@/assets/event.jpg";
import fiberImg from "@/assets/fiber.jpg";
import studentsImg from "@/assets/students.jpg";
import students2Img from "@/assets/students2.jpg";
import journeeImg from "@/assets/journee.jpg";
import arduinoImg from "@/assets/arduino.jpg";
import towerImg from "@/assets/tower.jpg";
import libraryImg from "@/assets/library.jpg";
import event2Img from "@/assets/event2.jpg";
import fiber2Img from "@/assets/fiber2.jpg";

/** Ordered pool used by the Actualités feed and detail pages. */
export const ACTU_IMAGES: string[] = [
  eventImg as string,
  fiberImg as string,
  students2Img as string,
  journeeImg as string,
  studentsImg as string,
];

/** Wider pool used by the Galerie micro-feed cards. */
export const FEED_IMAGES: string[] = [
  studentsImg as string,
  fiberImg as string,
  arduinoImg as string,
  towerImg as string,
  eventImg as string,
  libraryImg as string,
  journeeImg as string,
  students2Img as string,
];

export function actuImage(index: number) {
  return ACTU_IMAGES[((index % ACTU_IMAGES.length) + ACTU_IMAGES.length) % ACTU_IMAGES.length]!;
}

/** Stable numeric hash so a given post always gets the same photos. */
export function hashString(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
}

export function feedPhotos(seed: string, count: number) {
  const h = hashString(seed);
  const n = Math.max(1, Math.min(4, count));
  return Array.from({ length: n }, (_, i) => FEED_IMAGES[(h + i * 3) % FEED_IMAGES.length]!);
}
