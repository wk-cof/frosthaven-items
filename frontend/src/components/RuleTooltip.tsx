import React from 'react';

// Pre-process text to highlight modifiers before splitting for glossary terms
function highlightModifiers(text: string) {
  if (!text) return text;
  
  // regex to find modifiers like +X Move, -X Attack, or just +1, x2 etc.
  // We constrain the following word to specific game terminology so we don't accidentally badge '+1 instead'.
  const regex = /([\+\-]\d+\s+(?:Move|Attack|Range|Shield|Retaliate|Heal|Target|Pierce)|[\+\-]\d+|x\d+)/g;
  const parts = text.split(regex);
  const elements: any[] = [];
  
  parts.forEach((part, i) => {
    if (part.match(/x\d+/)) {
      elements.push(<span key={`mod-${i}`} className="mod-mult">{part}</span>);
    } else if (part.match(/\+\d+/)) {
      elements.push(<span key={`mod-${i}`} className="mod-pos">{part}</span>);
    } else if (part.match(/\-\d+/)) {
      elements.push(<span key={`mod-${i}`} className="mod-neg">{part}</span>);
    } else if (part) {
      elements.push(part);
    }
  });
  
  return elements;
}

export function renderTextWithTooltips(text: string, glossary: any, depth = 0) {
  if (!text) return null;
  
  let elements: any = highlightModifiers(text);
  
  Object.keys(glossary).forEach(term => {
    const newElements: any = [];
    elements.forEach((el: any) => {
      if (typeof el === 'string') {
        const regex = new RegExp(`\\b(${term})\\b`, 'gi');
        const parts = el.split(regex);
        parts.forEach(part => {
          if (part.toLowerCase() === term.toLowerCase()) {
            newElements.push(
              <span key={Math.random()} className="rule-term tooltip-container">
                {part}
                {depth < 2 && (
                  <span className="tooltip-content">
                    <span className="tooltip-title">{term}</span>
                    {renderTextWithTooltips(glossary[term], glossary, depth + 1)}
                  </span>
                )}
                {depth >= 2 && (
                  <span className="tooltip-content">
                    <span className="tooltip-title">{term}</span>
                    {glossary[term]}
                  </span>
                )}
              </span>
            );
          } else if (part) {
            newElements.push(part);
          }
        });
      } else {
        newElements.push(el);
      }
    });
    elements = newElements;
  });
  
  return <>{elements.map((el: any, i: number) => <React.Fragment key={i}>{el}</React.Fragment>)}</>;
}
