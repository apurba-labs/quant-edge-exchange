import { getDynamoClient } from "@/lib/dynamodb/client";

const BID_EVENTS_TABLE = process.env.BID_EVENTS_TABLE || "bid_events";

export async function getIngressAnalytics() {
    const { ScanCommand } = await import("@aws-sdk/lib-dynamodb");
    const client = getDynamoClient();

    const result = await client.send(
        new ScanCommand({
        TableName: BID_EVENTS_TABLE,
        })
    );

    const items = result.Items || [];

    const regionCounts: Record<string, number> = {};
    const slotCounts: Record<string, number> = {};

    console.log(items);
    for (const item of items) {

        const region = item.region;

        const slot =
        String(item.PK || "")
            .replace("SLOT#", "");

        regionCounts[region] =
        (regionCounts[region] || 0) + 1;

        slotCounts[slot] =
        (slotCounts[slot] || 0) + 1;
    }

    const topRegionEntry = Object.entries(regionCounts).sort((a, b) => b[1] - a[1])[0];

    const topSlotEntry = Object.entries(slotCounts).sort((a, b) => b[1] - a[1])[0];

    const regionDistribution = Object.entries(regionCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([region, count]) => ({
            region,
            count,
        }));

    const hotSlots = Object.entries(slotCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([slotId, count]) => ({
                slotId,
                count,
            }));

    const oneHourAgo = Date.now() - 60 * 60 * 1000;

    const eventsLastHour = items.filter((item:any) => {

            const timestamp = new Date(item.timestamp).getTime();

            return timestamp >= oneHourAgo;

        }).length;

    return {
        totalEvents: items.length,
        eventsLastHour,
        topRegion: topRegionEntry?.[0] || "N/A",
        topRegionCount: topRegionEntry?.[1] || 0,
        topSlot: topSlotEntry?.[0] || "N/A",
        topSlotCount: topSlotEntry?.[1] || 0,
        regionDistribution,
        hotSlots,
    };
}
