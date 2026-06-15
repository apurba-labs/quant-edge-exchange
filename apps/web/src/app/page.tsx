import Link from "next/link";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">

      <h1 className="text-6xl font-bold mb-6">
        Quant Edge Exchange
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Simulate distributed bidding, settlement workflows,
        and exchange activity across global regions.
      </p>

      <Link
        href="/simulator"
        className="inline-flex px-6 py-3 rounded-lg bg-black text-white"
      >
        Launch Simulator
      </Link>

      <Link href="/ingestion" className="text-2xl font-semibold">
        View Ingestion Analytics →
      </Link>
      
      <section className="mt-24">
        <h2 className="text-3xl font-bold mb-8">
          Core Platform Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">
              Bid Simulation
            </h3>

            <p className="text-gray-600">
              Generate synthetic exchange traffic
              across multiple regions and account
              profiles.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">
              Settlement Engine
            </h3>

            <p className="text-gray-600">
              Execute auction settlement logic
              and determine winning bids.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">
              Aurora DSQL
            </h3>

            <p className="text-gray-600">
              Persist simulation runs using
              distributed SQL infrastructure.
            </p>
          </div>

        </div>
      </section>

      <section className="mt-24">
        <h2 className="text-3xl font-bold mb-8">
          Platform Architecture
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-white rounded-xl shadow p-6 text-center">
            Simulator
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            Settlement Engine
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            Aurora DSQL
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            Analytics
          </div>

        </div>
      </section>

      <section className="mt-24 mb-24">
        <h2 className="text-3xl font-bold mb-8">
          Technology Stack
        </h2>

        <div className="flex flex-wrap gap-3">

          <span className="px-4 py-2 rounded-full bg-black text-white">
            Next.js
          </span>

          <span className="px-4 py-2 rounded-full bg-black text-white">
            TypeScript
          </span>

          <span className="px-4 py-2 rounded-full bg-black text-white">
            AWS Aurora DSQL
          </span>

          <span className="px-4 py-2 rounded-full bg-black text-white">
            PostgreSQL
          </span>

          <span className="px-4 py-2 rounded-full bg-black text-white">
            Vercel
          </span>

        </div>
      </section>

    </div>
  );
}