import React from 'react';
import { ElementIcon } from './ElementIcon';
import { ConditionIcon } from './ConditionIcon';
import { GeneralIcon } from './GeneralIcon';

// Pre-process text to highlight modifiers before splitting for glossary terms
function highlightModifiers(text: string) {
  if (!text) return text;
  
  // regex to find modifiers like +X Move, -X Attack, or just +1, 2x etc.
  // We constrain the following word to specific game terminology so we don't accidentally badge '+1 instead'.
  const regex = /([\+\-]\d+\s+(?:Move|Attack|Range|Shield|Retaliate|Heal|Target|Pierce)|[\+\-]\d+|\b\d+x\b)/gi;
  const parts = text.split(regex);
  const elements: any[] = [];
  
  parts.forEach((part, i) => {
    if (part.match(/\d+x/)) {
      elements.push(<span key={`mod-${i}`} className="mod-mult">{part}</span>);
    } else if (part.match(/\+0\b/)) {
      elements.push(<span key={`mod-${i}`} className="mod-neut">{part}</span>);
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

  // 1. Replace <TAG> placeholders with general icons FIRST
  // This prevents word-boundary regex for terms from matching inside the tags
  const tagRegex = /(<[A-Z0-9_\-]+>)/g;
  const tagElements: any = [];
  elements.forEach((el: any) => {
    if (typeof el === 'string') {
      const parts = el.split(tagRegex);
      parts.forEach((part, i) => {
        if (part.match(tagRegex)) {
          tagElements.push(<GeneralIcon key={`gen-${i}`} icon={part} glossary={glossary} />);
        } else if (part) {
          tagElements.push(part);
        }
      });
    } else {
      tagElements.push(el);
    }
  });
  elements = tagElements;

  // 2. Replace element names with icons
  const elementNames = ['Fire', 'Ice', 'Air', 'Earth', 'Light', 'Dark', 'Wild'];
  elementNames.forEach(name => {
    const nextElements: any = [];
    elements.forEach((el: any) => {
      if (typeof el === 'string') {
        const regex = new RegExp(`\\b(${name})\\b`, 'gi');
        const parts = el.split(regex);
        parts.forEach((part, i) => {
          if (part.toLowerCase() === name.toLowerCase()) {
            nextElements.push(<ElementIcon key={`${name}-${i}`} element={part} size={18} />);
          } else if (part) {
            nextElements.push(part);
          }
        });
      } else {
        nextElements.push(el);
      }
    });
    elements = nextElements;
  });

  // 3. Replace condition names with icons
  const conditionNames = [
    'Poison', 'Wound', 'Muddle', 'Immobilize', 'Disarm', 
    'Stun', 'Invisible', 'Strengthen', 'Bless', 'Curse',
    'Ward', 'Brittle', 'Bane', 'Impair', 'Regenerate'
  ];
  conditionNames.forEach(name => {
    const nextElements: any = [];
    elements.forEach((el: any) => {
      if (typeof el === 'string') {
        const regex = new RegExp(`\\b(${name})\\b`, 'gi');
        const parts = el.split(regex);
        parts.forEach((part, i) => {
          if (part.toLowerCase() === name.toLowerCase()) {
            nextElements.push(<ConditionIcon key={`${name}-${i}`} condition={part} size={18} />);
          } else if (part) {
            nextElements.push(part);
          }
        });
      } else {
        nextElements.push(el);
      }
    });
    elements = nextElements;
  });
  
  // 4. Glossary highlights
  Object.keys(glossary).forEach(term => {
    const termElements: any = [];
    elements.forEach((el: any) => {
      if (typeof el === 'string') {
        const regex = new RegExp(`\\b(${term})\\b`, 'gi');
        const parts = el.split(regex);
        parts.forEach(part => {
          if (part.toLowerCase() === term.toLowerCase()) {
            termElements.push(
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
            termElements.push(part);
          }
        });
      } else {
        termElements.push(el);
      }
    });
    elements = termElements;
  });
  
  return <>{elements.map((el: any, i: number) => <React.Fragment key={i}>{el}</React.Fragment>)}</>;
}
