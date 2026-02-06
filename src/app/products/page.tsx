import { getSupabaseClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const { supabase, error: envError } = getSupabaseClient();

  if (envError || !supabase) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <section className="mt-6">
          <h2 className="text-lg font-medium text-red-600">Configuration error</h2>
          <pre className="mt-2 overflow-auto rounded-md border border-red-200 bg-red-50 p-4 text-sm">
            {envError}
          </pre>
        </section>
      </main>
    );
  }

  const { data, error } = await supabase.from("products").select("*").limit(20);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">Products</h1>

      <p className="mt-2 text-sm text-neutral-600">
        Showing up to 20 rows from the <code className="font-mono">products</code>{" "}
        table.
      </p>

      {error ? (
        <section className="mt-6">
          <h2 className="text-lg font-medium text-red-600">Supabase error</h2>
          <pre className="mt-2 overflow-auto rounded-md border border-red-200 bg-red-50 p-4 text-sm">
            {JSON.stringify(error, null, 2)}
          </pre>
          <p className="mt-3 text-sm text-neutral-700">
            Common causes: missing/invalid env vars, RLS denying access, or the{" "}
            <code className="font-mono">products</code> table does not exist.
          </p>
        </section>
      ) : (
        <section className="mt-6">
          <h2 className="text-lg font-medium">Result</h2>
          <pre className="mt-2 overflow-auto rounded-md border bg-neutral-50 p-4 text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}

