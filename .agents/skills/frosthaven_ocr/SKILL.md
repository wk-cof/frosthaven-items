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
   - **Consumption**: If an element is to be consumed (has a red border/strike), write it as `<CONSUME_X>` (e.g., `<CONSUME_FIRE>`).

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
   - Enfeeble -> `<ENFEEBLE>`

3. **Attack Modifiers**:
   - If a specific modifier icon appears (often in circles or specific fonts):
   - +1, +2, etc. -> `<+1>`, `<+2>`
   - 2x (Critical) -> `<2X>`
   - Null (Miss) -> `<NULL>`
   - +0 -> `<+0>`

4. **Actions & Effects**:
   - Attack (sword symbol) + # -> `Attack #`
   - Move (boot symbol) + # -> `Move #`
   - Range (bow symbol) + # -> `Range #`
   - Target (bullseye) + # -> `Target #`
   - Heal (heart symbol) + # -> `Heal #`
   - Shield (shield symbol) + # -> `Shield #`
   - Retaliate (spiked shield) + # -> `Retaliate #`
   - Pierce (broken armor) + # -> `Pierce #`

5. **Item Triggers (Spent vs Consumed)**:
   - If there is an icon of a flipped card (arrows turning it over), this is **Spent**.
   - If there is an icon of a card with a red 'X' over it, this is **Consumed**.

6. **Uses / Charges**:
   - If there are a sequence of small circles or checkboxes representing usage charges, represent it as `[Uses: X]`, where X is the number of boxes.

## Output Format

Return the information as a clean JSON object. 

```json
{
  "id": "Parsed ID number (if visible, usually in corner)",
  "name": "Item Name",
  "text": "The fully transcripted ability text, incorporating the bracketed tags described above."
}
```
