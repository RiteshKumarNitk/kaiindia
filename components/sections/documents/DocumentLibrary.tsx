import { ComingSoon } from "@/components/ui/ComingSoon";
import { Icon } from "@/components/ui/Icon";
import { documents } from "@/content/documents";
import { published } from "@/lib/content-status";
import type { ComingSoonCopy, DocumentCollection, OfficialDocument } from "@/lib/types";
import { formatDate } from "@/lib/format";

function DocumentRow({ doc }: { doc: OfficialDocument }) {
  return (
    <tr>
      <th scope="row">
        <span className="doc-name">
          <Icon name="file" size={20} />
          <span>
            <strong>{doc.title}</strong>
            <span className="muted">{doc.description}</span>
          </span>
        </span>
      </th>
      <td data-label="Category">{doc.category}</td>
      <td data-label="Version">{doc.version ?? "—"}</td>
      <td data-label="Published">
        {doc.publishedOn ? <time dateTime={doc.publishedOn}>{formatDate(doc.publishedOn)}</time> : "—"}
      </td>
      <td>
        {doc.file ? (
          <a href={doc.file} className="button button--small" download>
            PDF <span className="sr-only">— download {doc.title}</span>
          </a>
        ) : (
          "—"
        )}
      </td>
    </tr>
  );
}

const columns = ["Document", "Category", "Version", "Published", "Download"];

/** Document resource table with an in-table empty state. */
export function DocumentLibrary({ collection, comingSoon }: { collection: DocumentCollection; comingSoon: ComingSoonCopy }) {
  const items = published(documents[collection]);
  return (
    <section aria-labelledby="docs-heading">
      <h2 id="docs-heading" className="section-title">
        Documents
      </h2>
      <div className="table-wrap">
        <table className="data-table data-table--docs">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((d) => <DocumentRow key={d.title} doc={d} />)
            ) : (
              <tr className="data-table__empty">
                <td colSpan={columns.length}>
                  <ComingSoon {...comingSoon} variant="compact" headingLevel={3} label="Downloads coming soon" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
