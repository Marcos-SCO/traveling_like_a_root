import { Suspense } from "react";
import QuotesClient from "./QuotesClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando cotações...</div>}>
      <QuotesClient />
    </Suspense>
  );
}