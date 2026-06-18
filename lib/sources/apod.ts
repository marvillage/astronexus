// Astronomy Picture of the Day — NASA APOD (NASA key, DEMO_KEY fallback).
import { cached, fetchJSON, NASA_KEY } from "@/lib/cache";

export type Apod = {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl?: string;
  mediaType: "image" | "video";
  copyright?: string;
};

export async function getApod(): Promise<Apod> {
  return cached("apod:today", 3600, async () => {
    const data = await fetchJSON<{
      title: string;
      date: string;
      explanation: string;
      url: string;
      hdurl?: string;
      media_type: string;
      copyright?: string;
    }>(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`, { revalidate: 3600 });
    return {
      title: data.title,
      date: data.date,
      explanation: data.explanation,
      url: data.url,
      hdurl: data.hdurl,
      mediaType: data.media_type === "video" ? "video" : "image",
      copyright: data.copyright?.trim(),
    };
  });
}
