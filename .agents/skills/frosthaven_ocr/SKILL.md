---
name: Frosthaven OCR Task
description: Analyzes Frosthaven Item Card images to extract standardized gameplay mechanics text.
---

# Instruction

When a user pastes an image of a Frosthaven item card into your context and invokes this skill, you must meticulously analyze the visual layout to extract all structured abilities and mechanics.

## Guidelines for Visual Translation

Frosthaven uses specific icons inline with text. Translate them exactly as follows using `<UPPERCASE_TAGS>` to ensure the frontend can easily swap them for rich icons:

1. **Elements**:
   - Fire -> `<FIRE>`
   - Ice -> `<ICE>`
   - Earth -> `<EARTH>`
   - Air -> `<AIR>`
   - Light -> `<LIGHT>`
   - Dark -> `<DARK>`
   - Wild -> `<WILD>`
   - **Consumption**: If an element is to be consumed (has a red border/strike), write it as `<CONSUME>`. If combined with an element, e.g., `<FIRE> <CONSUME>`.

2. **Conditions**:
   - Poison -> `<POISON>`
   - Wound -> `<WOUND>`
   - Muddle -> `<MUDDLE>`
   - Immobilize -> `<IMMOBILIZE>`
   - Disarm -> `<DISARM>`
   - Stun -> `<STUN>`
   - Invisible -> `<INVISIBLE>`
   - Strengthen -> `<STRENGTHEN>`
   - Bless -> `<BLESS>`
   - Curse -> `<CURSE>`
   - Regenerate -> `<REGENERATE>`
   - Ward -> `<WARD>`
   - Brittle -> `<BRITTLE>`
   - Bane -> `<BANE>`
   - Impair -> `<IMPAIR>`

3. **Attack Modifiers vs Stat Bonuses**:
   - **IMPORTANT**: Only use diamond/circular bracketed tags for specifically circular icons (Attack Modifier cards/deck effects).
   - Attack Modifier icons (+1, +2, 2x) -> `<+1>`, `<+2>`, `<2X>`
   - Plain text numbers (e.g., "+1 Move", "Shield 2") -> Use plain text for the number and tags for the icons: `+1 <MOVE>`, `<SHIELD> 2`

4. **Actions & Core Mechanics**:
   - Attack (sword symbol) -> `<ATTACK>`
   - Move (boot symbol) -> `<MOVE>`
   - Range (bow symbol) -> `<RANGE>`
   - Target (bullseye) -> `<TARGET>`
   - Heal (heart symbol) -> `<HEAL>`
   - Shield (shield symbol) -> `<SHIELD>`
   - Retaliate (spiked shield) -> `<RETALIATE>`
   - Pierce (broken armor) -> `<PIERCE>`
   - Loot (bag symbol) -> `<LOOT>`
   - XP (star symbol) -> `<XP>`

5. **Item Triggers & State**:
   - Flipped card icon -> **Spent** (set `spent: true` in JSON)
   - Red X card icon -> **Consumed** (set `consumed: true` in JSON)
   - Infinity symbol or Persistent icon -> `<ACTIVE>`
   - Use / Charge boxes -> `[Uses: X]` where X is number of boxes.

6. **Resources**:
   - Lumber -> `<LUMBER>`
   - Metal -> `<METAL>`
   - Hide -> `<HIDE>`
   - Herbs (Arrowvine, etc) -> `<ARROWVINE>`, `<AXENUT>`, `<CORPSECAP>`, `<FLAMEFRUIT>`, `<ROCKROOT>`, `<SNOWTHISTLE>`

## Output Format

Return the information as a clean JSON object. 

```json
{
  "id": "Parsed ID number (if visible, usually in corner)",
  "name": "Item Name",
  "text": "The fully transcripted ability text, incorporating the bracketed tags described above."
}
```
