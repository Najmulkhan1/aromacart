import { notFound } from "next/navigation";

// যদি ইউজার এমন কোনো লিংকে যায় যার কোনো আসল পেজ নেই, তখন এই পেজটি অটোমেটিক not-found.tsx কে কল করবে
export default function CatchAllPage() {
  notFound();
}