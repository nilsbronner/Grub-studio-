import { cx } from "@/lib/cx";
import {
  campaignTierNames,
  campaignRecommendedIndex,
  type PricingTable as PricingTableData,
} from "@/lib/content/campaign-package";

export function PricingTable({ table }: { table: PricingTableData }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <caption className="sr-only">{table.title}</caption>
        <thead>
          <tr>
            <th scope="col" className="w-1/4" />
            {campaignTierNames.map((name, i) => (
              <th
                key={name}
                scope="col"
                className={cx(
                  "border-b border-border px-4 py-4 text-left align-bottom font-medium",
                  i === campaignRecommendedIndex && "bg-accent-pink/[0.06]"
                )}
              >
                {i === campaignRecommendedIndex && (
                  <span className="mb-2 inline-flex items-center rounded-full border border-accent-pink/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-pink">
                    Recommandée
                  </span>
                )}
                <p className="mt-1 text-base font-semibold tracking-tight">
                  {name}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0">
              <th
                scope="row"
                className="px-4 py-3 text-left text-xs uppercase tracking-[0.1em] text-muted"
              >
                {row.label}
              </th>
              {row.values.map((value, i) => (
                <td
                  key={i}
                  className={cx(
                    "px-4 py-3 tabular",
                    i === campaignRecommendedIndex && "bg-accent-pink/[0.06]",
                    row.label.toLowerCase().includes("prix") &&
                      "text-xl font-bold tracking-tight"
                  )}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
