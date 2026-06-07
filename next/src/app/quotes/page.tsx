import Link from "next/link";

export default function QuotesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page ?? 1);

  return (
    <article className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Quotes</h1>

      {/* Placeholder list */}
      <div className="space-y-3">
        <div className="p-4 border rounded-lg bg-white">
          Quote item (page {page})
        </div>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-6">
        <Link
          href={`/quotes?page=${page - 1}`}
          className="px-3 py-2 border rounded"
        >
          Prev
        </Link>

        <span className="px-3 py-2">
          Page {page}
        </span>

        <Link
          href={`/quotes?page=${page + 1}`}
          className="px-3 py-2 border rounded"
        >
          Next
        </Link>
      </div>
    </article>
  );
}