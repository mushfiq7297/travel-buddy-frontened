/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ImageUploader({ value, onChange }: any) {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET!);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setUploading(false);

    if (data.secure_url) onChange(data.secure_url);
  };

  return (
    <div className="space-y-2">
      {value && (
        <Image
          src={value}
          alt="Profile Image"
          width={96}       
          height={96}      
          className="rounded-full object-cover"
        />
      )}

      <Button asChild variant="outline">
        <label className="cursor-pointer">
          {uploading ? "Uploading..." : "Upload Image"}
          <input type="file" className="hidden" onChange={uploadImage} />
        </label>
      </Button>
    </div>
  );
}
