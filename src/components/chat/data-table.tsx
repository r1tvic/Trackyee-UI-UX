import { cn } from "@/lib/utils";

export type Column<T> = {
  key: keyof T & string;
  header: string;
  align?: "left" | "right";
  /** Rendered value; falls back to the raw field. */
  render?: (row: T) => React.ReactNode;
};

/**
 * Compact table for AI replies. Scrolls inside its own container so a wide
 * result never pushes the chat column sideways.
 */
export function DataTable<T extends { [k: string]: unknown }>({
  title,
  columns,
  rows,
  caption,
  maxHeight = 340,
}: {
  title?: string;
  columns: Column<T>[];
  rows: T[];
  caption?: string;
  maxHeight?: number;
}) {
  return (
    <div className="liquid-glass overflow-hidden rounded-xl">
      {title && (
        <p className="px-4 py-3 text-sm font-semibold">{title}</p>
      )}
      <div className="overflow-auto" style={{ maxHeight }}>
        <table className="w-full text-sm">
          <thead className="bg-background/40 sticky top-0 backdrop-blur-sm">
            <tr className="text-muted-foreground border-border/60 border-y">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "px-4 py-2 text-[0.68rem] font-semibold tracking-wider whitespace-nowrap uppercase",
                    col.align === "right" ? "text-right" : "text-left",
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-border/40 hover:bg-foreground/[0.03] border-b transition-colors last:border-0"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-4 py-2 whitespace-nowrap",
                      col.align === "right" ? "tabular text-right" : "text-left",
                    )}
                  >
                    {col.render ? col.render(row) : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <p className="text-muted-foreground border-border/60 border-t px-4 py-2 text-xs">
          {caption}
        </p>
      )}
    </div>
  );
}
