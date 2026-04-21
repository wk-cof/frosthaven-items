
import { renderTextWithTooltips } from './RuleTooltip';

function ItemCard({ item, glossary }: any) {
  return (
    <div className="item-card" id={`item-${item.id}`}>
      <div className="card-header">
        <h3 className="item-name">{item.name}</h3>
        <span className="item-id">#{item.id}</span>
      </div>
      
      <div className="card-middle">
        <div className="card-image-wrapper">
          {item.image && (
            <img 
              src={`https://raw.githubusercontent.com/cmlenius/gloomhaven-card-browser/images/images/${item.image}`} 
              alt={item.name} 
              className="item-image"
              loading="lazy"
            />
          )}
        </div>
        <div className="item-stats-vertical">
          {(item.cost && Number(item.cost) > 0) ? (
            <span className="stat cost">💰 {item.cost}</span>
          ) : null}
          <span className="stat slot">🎒 {item.slot || 'None'}</span>
          {item.spent && <span className="stat warning">🔄 Spent</span>}
          {item.consumed && <span className="stat danger">❌ Consumed</span>}
          {item.resources && Object.entries(item.resources).map(([res, count]) => {
            if (res.startsWith('Item ')) {
              const itemNum = parseInt(res.replace('Item ', ''), 10);
              return (
                <span key={res} className="stat resource" title={res}>
                  📦 {String(count)} <a href={`#item-${itemNum}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>{res}</a>
                </span>
              );
            }
            return (
              <span key={res} className="stat resource" title={res}>
                📦 {String(count)} {res}
              </span>
            );
          })}
        </div>
      </div>
      
      <div className="card-body">
        {renderTextWithTooltips(item.text, glossary)}
      </div>
    </div>
  );
}

export default ItemCard;
