---
name: Frosthaven OCR Task
description: Analyzes Frosthaven Item Card images to extract standardized gameplay mechanics text.
---

# Instruction

When a user pastes an image of a Frosthaven item card into your context and invokes this skill, you must meticulously analyze the visual layout to extract all structured abilities and mechanics.

## Guidelines for Visual Translation

Frosthaven uses specific icons inline with text. Translate them exactly as follows:

1. **Elements**: If interpreting an elemental infusion or consumption icon:
   - Fire -> `[Element: Fire]`
   - Ice -> `[Element: Ice]`
   - Earth -> `[Element: Earth]`
   - Air -> `[Element: Air]`
   - Light -> `[Element: Light]`
   - Dark -> `[Element: Dark]`
   - Format: If an element is to be consumed (has a red border/strike towards it), write it as `[Consume Element: X]`.

2. **Conditions**:
   - Poison (skull with green/vials) -> `[Condition: Poison]`
   - Wound (bleeding drop) -> `[Condition: Wound]`
   - Muddle (swirling purple) -> `[Condition: Muddle]`
   - Immobilize (boot with red mark) -> `[Condition: Immobilize]`
   - Disarm (broken sword) -> `[Condition: Disarm]`
   - Stun (stars) -> `[Condition: Stun]`
   - Invisible (hollow cloak) -> `[Condition: Invisible]`
   - Strengthen (flexed bicep) -> `[Condition: Strengthen]`
   - Bless (gold card with sun) -> `[Condition: Bless]`
   - Curse (purple card with skull) -> `[Condition: Curse]`

3. **Actions & Effects**:
   - Attack (sword symbol) + # -> `Attack #`
   - Move (boot symbol) + # -> `Move #`
   - Range (bow symbol) + # -> `Range #`
   - Target (bullseye) + # -> `Target #`
   - Heal (heart symbol) + # -> `Heal #`
   - Shield (shield symbol) + # -> `Shield #`
   - Retaliate (spiked shield) + # -> `Retaliate #`
   - Pierce (broken armor) + # -> `Pierce #`

4. **Item Triggers (Spent vs Consumed)**:
   - If there is an icon of a flipped card (arrows turning it over), this is **Spent**.
   - If there is an icon of a card with a red 'X' over it, this is **Consumed**.
   - *Note*: We already have this data matched from our JSON scraper, but it's good to cross-verify!

5. **Uses / Charges**:
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
