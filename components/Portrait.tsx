"use client";

import { useState } from "react";
import Image from "next/image";
import { profile } from "@/content/profile";

/**
 * Hero portrait. Fixed 3:4 frame so the layout doesn't shift while the image
 * loads, with a wordmark standing in if the file is missing.
 */
export default function Portrait() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div className="anim-fade-up relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-sm border border-line bg-surface-2 sm:max-w-[360px]">
      {photoFailed ? (
        <div
          className="grid h-full place-items-center px-4 text-center font-display text-2xl font-semibold tracking-[0.08em] text-muted"
          aria-label={profile.name}
        >
          {profile.initials}
        </div>
      ) : (
        <Image
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          fill
          priority
          sizes="(min-width: 640px) 360px, 320px"
          className="object-cover"
          onError={() => setPhotoFailed(true)}
        />
      )}
    </div>
  );
}
