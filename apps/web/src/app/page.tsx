import Link from "next/link";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">

      <h1 className="text-6xl font-bold mb-6">
        Quant Edge Exchange
      </h1>

      <p className="text-xl text-gray-600 mb-10">
        Simulate Global Auction Traffic and Financial Settlement Consistency

        DynamoDB handles high-volume bid ingestion while Aurora DSQL
        stores authoritative settlement records using distributed consensus.
      </p>

      <Link
        href="/simulator"
        className="inline-flex px-6 py-3 rounded-lg bg-black text-white"
      >
        Launch Simulator
      </Link>

      <Link href="/ingestion" className="inline-flex px-6 py-3 rounded-lg bg-black text-white ml-3 mt-3">
        View Ingestion Analytics →
      </Link>
      
      <section className="mt-24">
        <h2 className="text-3xl font-bold mb-8">
          System Architecture
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">
              Traffic Layer
            </h3>

            <p className="text-gray-600">
              Generate high-volume regional bid traffic
              representing global auction workloads.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">
              Truth Layer
            </h3>

            <p className="text-gray-600">
              Evaluate bids and commit authoritative
              financial settlements.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">
              Consensus Layer
            </h3>

            <p className="text-gray-600">
              Store settlement records using
              Aurora DSQL distributed SQL consensus.
            </p>
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
            Vercel
          </span>

          <span className="px-4 py-2 rounded-full bg-black text-white">
            Amazon DynamoDB
          </span>

          <span className="px-4 py-2 rounded-full bg-black text-white">
            Amazon Aurora DSQL
          </span>

          <span className="px-4 py-2 rounded-full bg-black text-white">
            PostgreSQL
          </span>

          <span className="px-4 py-2 rounded-full bg-black text-white">
            AWS SigV4
          </span>

        </div>
      </section>

    </div>
  );
}