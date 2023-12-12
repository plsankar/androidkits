import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-10 flex justify-center flex-col items-center gap-5">
      <h2 className="text-2xl">Not Found!</h2>
      <Button>
        <Link href={"/"}>Go Home</Link>
      </Button>
    </div>
  );
}
