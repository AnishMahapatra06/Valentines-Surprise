import { Link } from "wouter";
import { HeartCrack } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-pink-50">
      <div className="text-center space-y-6">
        <HeartCrack className="w-24 h-24 text-pink-300 mx-auto" />
        <h1 className="text-4xl font-serif text-accent">404 Page Not Found</h1>
        <p className="text-gray-500 font-body">
          Looks like we got lost on the way to love.
        </p>
        <Link href="/">
          <a className="inline-block px-6 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors">
            Return Home
          </a>
        </Link>
      </div>
    </div>
  );
}
