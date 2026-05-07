import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dnncha.github.io/dotmatch";
const socialImageUrl = `${siteUrl}/dotmatch-og.png`;
const twitterImageUrl = `${siteUrl}/dotmatch-twitter.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DotMatch - Exact Short-DNA Assignment",
  description:
    "DotMatch turns known short-DNA FASTQs into CRISPR guide counts, barcode splits, and QC reports with explicit ambiguity handling.",
  keywords: [
    "bioinformatics",
    "computational biology",
    "CRISPR",
    "FASTQ",
    "barcode demultiplexing",
    "edit distance",
    "known-target assignment"
  ],
  openGraph: {
    title: "DotMatch",
    description:
      "CRISPR guide counts, barcode splits, and QC reports for known short-DNA targets, with ambiguous reads reported instead of guessed.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "DotMatch exact known-target short-DNA assignment"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DotMatch",
    description:
      "CRISPR guide counts, barcode splits, and QC reports for known short-DNA targets, with ambiguous reads reported instead of guessed.",
    images: [
      {
        url: twitterImageUrl,
        width: 1200,
        height: 630,
        alt: "DotMatch exact known-target short-DNA assignment"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
