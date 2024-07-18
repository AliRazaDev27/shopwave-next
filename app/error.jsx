"use client";
export default function Error({ error }) {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-lg md:text-2xl font-semibold">An Error Occurred</h1>
      <p className="text-center text-wrap">{error.message}</p>
    </div>
  );
}
