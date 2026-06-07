type QuoteDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function QuoteDetailsPage({
  params,
}: QuoteDetailsPageProps) {
  const { id } = await params;

  return <div>Page {id}</div>;
}
