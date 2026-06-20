"use client";

import {
  useEffect,
  useState,
} from "react";

export function IngestionAnalytics() {

  const [data, setData] =
    useState<any>(null);

  async function load() {

    const response = await fetch( "/api/ingress-analytics" );

    const analytics = await response.json();

    setData(analytics);
  }

  useEffect(() => {
    load();
  }, []);

  if (!data) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          DynamoDB Ingestion Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Real-time bid event ingestion
          and regional traffic telemetry.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">

        <div className="border rounded-xl p-6">
          <p>Total Events</p>
          <h2 className="text-3xl font-bold">
            {data.totalEvents}
          </h2>
        </div>

        <div className="border rounded-xl p-6">
          <p>Events Last Hour</p>
          <h2 className="text-3xl font-bold">
            {data.eventsLastHour}
          </h2>
        </div>

        <div className="border rounded-xl p-6">
          <p>Top Region</p>
          <h2 className="text-3xl font-bold">
            {data.topRegion}
          </h2>
        </div>

        <div className="border rounded-xl p-6">
          <p> Top DynamoDB Partition</p>
          <h2 className="text-3xl font-bold">
              SLOT#{data.topSlot}
          </h2>
        </div>

      </div>

      <div className="border rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          Regional Event Distribution
        </h2>

        {data.regionDistribution.map(
          (region: any) => (
            <div
              key={region.region}
              className="flex justify-between py-2"
            >
              <span>
                {region.region}
              </span>

              <span>
                {region.count}
              </span>
            </div>
          )
        )}

      </div>

      <div className="border rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          Hot Slots
        </h2>

        {data.hotSlots.map(
          (slot: any) => (
            <div
              key={slot.slotId}
              className="flex justify-between py-2"
            >
              <span>
                {slot.slotId}
              </span>

              <span>
                {slot.count}
              </span>
            </div>
          )
        )}

      </div>

    </div>
  );
}