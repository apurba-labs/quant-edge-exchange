type SimulationRun = {
  id: string;
  total_bids: number;
  winning_region: string;
  winning_bid: string;
  settlement_status: string;
  created_at: string;
};

export function RecentSimulations({
  runs,
}: {
  runs: SimulationRun[];
}) {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-bold">
        Recent Simulation Runs
      </h2>

      <table className="w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bids</th>
            <th>Region</th>
            <th>Winning Bid</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {runs.map((run) => (
            <tr key={run.id}>
              <td>{run.id.slice(0, 8)}</td>
              <td>{run.total_bids}</td>
              <td>{run.winning_region}</td>
              <td>${run.winning_bid}</td>
              <td>{run.settlement_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}