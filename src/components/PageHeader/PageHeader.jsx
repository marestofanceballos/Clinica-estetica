import "./pageHeader.css";

export default function PageHeader({ eyebrow, title, lede }) {
  return (
    <section className="page-header">
      <div className="container-narrow">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="page-header__title">{title}</h1>
        {lede && <p className="page-header__lede">{lede}</p>}
      </div>
    </section>
  );
}
