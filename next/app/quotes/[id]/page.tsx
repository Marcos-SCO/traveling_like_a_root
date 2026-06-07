import { getQuote } from "@/services/quoteService";

const zoneStyles = {
  NACIONAL: "bg-emerald-100 text-emerald-700",
  AMERICAS: "bg-sky-100 text-sky-700",
  EUROPA: "bg-violet-100 text-violet-700",
};

type QuoteDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const displayUppercase = (code: string) =>
  code.replaceAll("_", " ")?.toLocaleUpperCase();

export default async function QuoteDetailsPage({
  params,
}: QuoteDetailsPageProps) {
  const { id } = await params;

  const quote = await getQuote(id);

  return (
    <div className="mx-auto p-8">
      <div className="mb-8">
        <p className="text-sm text-slate-500">Detalhes da Cotação</p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Cotação #{quote.id}
        </h1>
      </div>

      {/* Quote */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              zoneStyles[
                displayUppercase(quote.travel_zone) as keyof typeof zoneStyles
              ]
            }`}
          >
            {displayUppercase(quote.travel_zone)}
          </span>

          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Valor Total
            </p>

            <p className="text-2xl font-bold text-slate-900">
              R$ {Number(quote.total_amount).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs uppercase text-slate-500">Data Inicial</p>

            <p className="mt-1 font-medium">
              {new Date(quote.start_date).toLocaleDateString("pt-BR")}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs uppercase text-slate-500">Data Final</p>

            <p className="mt-1 font-medium">
              {new Date(quote.end_date).toLocaleDateString("pt-BR")}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs uppercase text-slate-500">Dias Cobrados</p>

            <p className="mt-1 font-medium">{quote.charged_days}</p>
          </div>
        </div>
      </div>

      <h2 className="mb-4 text-xl font-semibold text-slate-900">Viajantes</h2>

      <div className="space-y-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        {quote.travelers.map((traveler: any) => (
          <div
            key={traveler.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md lg:min-h-[190px] lg:max-h-[190px]"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {traveler.name}
                </h3>

                <p className="text-sm text-slate-500">
                  Nascimento:{" "}
                  {new Date(traveler.birth_date).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs uppercase text-slate-500">Subtotal</p>

                <p className="font-semibold text-slate-900">
                  R$ {Number(traveler.subtotal_amount).toFixed(2)}
                </p>
              </div>
            </div>

            {traveler.additionals.length > 0 ? (
              <div className="border-t border-slate-100 pt-4">
                <p className="mb-2 text-sm font-medium text-slate-600">
                  Coberturas adicionais
                </p>

                <div className="flex flex-wrap gap-2">
                  {traveler.additionals.map((additional: any) => (
                    <span
                      key={additional.coverage_code}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {displayUppercase(additional.coverage_code)}
                    </span>
                  ))}
                </div>
              </div>
            ) : (<div className="min-h-[68.79px] pt-4" />)}
          </div>
        ))}
      </div>
    </div>
  );
}
