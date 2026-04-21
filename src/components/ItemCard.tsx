
import { renderTextWithTooltips } from './RuleTooltip';

function ItemCard({ item, glossary, status, onStatusChange }: any) {
  return (
    <div className="item-card" id={`item-${item.id}`}>
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {import.meta.env.DEV && (
            <div className="status-buttons" style={{ display: 'flex', gap: '0.25rem' }}>
              <button
                onClick={() => onStatusChange(status === 'verified' ? null : 'verified')}
                style={{
                  background: 'transparent',
                  border: '1px solid',
                  borderColor: status === 'verified' ? '#16a34a' : 'rgba(255,255,255,0.1)',
                  opacity: status === 'verified' ? 1 : 0.4,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  transition: 'all 0.2s',
                  filter: status === 'verified' ? 'drop-shadow(0 0 4px #16a34a)' : 'none'
                }}
                title="Verified"
              >
                ✅
              </button>
              <button
                onClick={() => onStatusChange(status === 'flagged' ? null : 'flagged')}
                style={{
                  background: 'transparent',
                  border: '1px solid',
                  borderColor: status === 'flagged' ? '#dc2626' : 'rgba(255,255,255,0.1)',
                  opacity: status === 'flagged' ? 1 : 0.4,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  transition: 'all 0.2s',
                  filter: status === 'flagged' ? 'drop-shadow(0 0 4px #dc2626)' : 'none'
                }}
                title="Needs Work"
              >
                🚩
              </button>
            </div>
          )}
          <h3 className="item-name">{item.name}</h3>
        </div>
        <span className="item-id">#{item.id}</span>
      </div>

      <div className="card-middle">
        <div className="card-image-wrapper">
          {item.image && (
            <img
              src={`/assets/items/${item.image.split('/').pop()}`}
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
