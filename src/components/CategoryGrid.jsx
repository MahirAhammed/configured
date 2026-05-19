function CategoryCard({ category, onSelect }) {
  const isSoon = category.soon

  return (
    <button
      className={`category-card ${isSoon ? 'category-card--soon' : ''}`}
      onClick={() => !isSoon && onSelect(category)}
      disabled={isSoon}
    >
      <div className="card-top">
        {category.icon
          ? <img src={category.icon} alt={category.name} className="card-logo" />
          : <span />
        }
        {category.lang && <span className="card-lang">{category.lang}</span>}
      </div>

      <h3 className="card-name">{category.name}</h3>
      <p className="card-desc">{category.description}</p>

      {category.outputs.length > 0 && (
        <div className="card-outputs">
          {category.outputs.map(output => (
            <span key={output} className="output-pill">{output}</span>
          ))}
        </div>
      )}
    </button>
  )
}

export default function CategoryGrid({ categories, onSelect }) {
  return (
    <section className="category-section" id="generators">
      <div className="category-content">
        <p className="section-label">Choose A Stack</p>
        <div className="category-grid">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </section>
  )
}