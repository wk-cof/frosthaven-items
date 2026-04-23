---
name: Frosthaven Character Mat OCR
description: Analyzes both the front and back of Frosthaven Character Mats to extract lore, mechanics, complexity, elements, traits, and role stats.
---

# Instruction

When analyzing Frosthaven Character Mats, extract data from both sides:

## Front Side Data

### 1. Class Notes
Capture the gameplay-defining text in the top right section. It usually consists of two paragraphs.
- **Symbol Replacement**: DO NOT leave gameplay symbols as text. Replace them with specific uppercase tags:
    - Attack icon -> `<ATTACK>`
    - Damage icon -> `<DAMAGE>`
    - Shield icon -> `<SHIELD>`
    - Ward icon -> `<WARD>`
    - Disarm icon -> `<DISARM>`
    - Heal icon -> `<HEAL>`
    - Move icon -> `<MOVE>`
    - Jump icon -> `<JUMP>`
    - Target icon -> `<TARGET>`
    - Range icon -> `<RANGE>`
    - XP icon -> `<XP>`
    - Loot icon -> `<LOOT>`
    - Poison/Condition icon -> `<POISON>`, `<WOUND>`, etc. (only if the icon is present, otherwise keep as text if it's just the word).

### 2. Traits
Identify the keywords located just above the health table, often separated by bars.
- These keywords define the character's thematic attributes (e.g., `Chaotic`, `Intimidating`, `Outcast`).

## Back Side Data

### 1. Lore / Description
Capture the narrative text. It is usually split into two paragraphs:
- **Heritage**: The race's history.
- **Class Specifics**: The specific class's origin/philosophy.

### 2. Complexity
Observe the "Complexity:" field with 5 dots.
- Count the **filled** dots. 

### 3. Elemental Affinities
Look for circular element icons (Fire, Ice, Earth, Air, Light, Dark).

### 4. Role Bar Charts
At the bottom, capture the 1-5 values for: **Melee**, **Ranged**, **Mobility**, **Support**, **Defense**, and **Control**.

## Output Format

Return a JSON object:

```json
{
  "lore": "Full narrative text...",
  "classNotes": [
    "Paragraph 1 about conditions...",
    "Paragraph 2 about direct damage..."
  ],
  "traits": ["Chaotic", "Intimidating", "Outcast"],
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
