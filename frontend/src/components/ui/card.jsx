// src/components/ui/card.jsx (sesuaikan path impor)
import * as React from "react"
import { cn } from "@/lib/utils" // Asumsikan utilitas cn ada

function Card({
  className,
  size = "default",
  ...props
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        // Ubah rounded-2xl menjadi rounded-xl atau rounded-lg di baris bawah ini
        "bg-white rounded-xl shadow-md flex flex-col p-8 md:p-10", 
        size === "sm" && "p-6",
        className
      )}
      {...props} />
  );
}

function CardHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "space-y-1.5", // Jarak antara judul dan deskripsi
        className
      )}
      {...props} />
  );
}

function CardTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-md md:text-xl font-bold text-neutral-900 leading-tight", className)} // Teks besar, tebal, hitam
      {...props} />
  );
}

function CardDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-base text-neutral-600", className)} // Teks abu-abu
      {...props} />
  );
}

function CardAction({ // Tetap simpan, meskipun mungkin tidak digunakan dalam contoh referensi
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "flex items-center gap-2",
        className
      )}
      {...props} />
  );
}

function CardContent({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-content"
      className={cn("space-y-4", className)} // Jarak dari header dan jarak antar input
      {...props} />
  );
}

function CardFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "mt-10", // Jarak dari konten
        className
      )}
      {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}