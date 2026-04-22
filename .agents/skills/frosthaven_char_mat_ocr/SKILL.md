---
name: Frosthaven Character Mat OCR
description: Analyzes the back of Frosthaven Character Mats to extract lore, complexity, elements, and role stats.
---

# Instruction

When analyzing a Frosthaven Character Mat (usually the back side), extract the following data points with high precision:

## 1. Lore / Description
Capture the full narrative text. It is usually split into two paragraphs:
- **Heritage**: The first paragraph describing the race's history.
- **Class Specifics**: The second paragraph describing the specific class's origin or philosophy.

## 2. Complexity
Observe the "Complexity:" field. It contains 5 dots.
- Count the **filled** dots. 
- Format: `X / 5`

## 3. Elemental Affinities
Look for the circular element icons next to "Elemental Affinities:".
- Fire -> `Fire`
- Ice -> `Ice`
- Earth -> `Earth`
- Air -> `Air`
- Light -> `Light`
- Dark -> `Dark`

## 4. Role Bar Charts
At the bottom, there are 6 bars labeled: **Melee**, **Ranged**, **Mobility**, **Support**, **Defense**, and **Control**.
- Each bar has 5 possible segments.
- Count the segments filled for each.
- Format: A numeric value 1-5 for each category.

## Output Format

Return a JSON object:

```json
{
  "lore": "Full text...",
  "complexity": 3,
  "elements": ["Fire", "Air"],
  "stats": {
    "melee": 1,
    "ranged": 4,
    "mobility": 2,
    "support": 3,
    "defense": 3,
    "control": 5
  }
}
```
