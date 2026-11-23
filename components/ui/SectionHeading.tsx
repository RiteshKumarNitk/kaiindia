type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  id?: string;
};

export function SectionHeading({ title, eyebrow, description, id }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {description && <p className="section-heading__text">{description}</p>}
    </div>
  );
}
