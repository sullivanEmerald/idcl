"use client";

import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { UploadIcon } from "lucide-react";

interface FileUploaderProps {
  accept: string;
  maxSize: number;
  multiple?: boolean;
  maxFiles?: number;
  onDrop: (files: File[]) => void;
}

export function FileUploader({
  accept,
  maxSize,
  multiple = false,
  maxFiles = 1,
  onDrop,
}: FileUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept.split(",").reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    multiple,
    maxFiles,
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed p-6 cursor-pointer transition-colors",
        isDragActive
          ? "border-primary/50 bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
      )}
    >
      <input {...getInputProps()} />
      <UploadIcon className="h-6 w-6 text-muted-foreground" />
      <p className="mt-2 text-sm text-muted-foreground text-center">
        {isDragActive ? (
          "Drop the files here"
        ) : (
          <>
            Drag & drop {multiple ? "files" : "a file"} here, or click to select{" "}
            {multiple ? "files" : "a file"}
            <br />
            <span className="text-xs">
              {accept.split(",").join(", ")} • Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
              {multiple && ` • Max files: ${maxFiles}`}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
