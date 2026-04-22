# Character Profiles Guidelines

This document outlines the design principles and technical requirements for creating character profile pages in the Frosthaven application.

## Asset Rules

### Profile Images
Whenever creating a new profile for a character, the profile image (portrait) should be sourced from the following repository:
`https://github.com/any2cards/worldhaven/blob/master/images/art/frosthaven/characters/images/fh-[character-name].png`

**Format:** PNG
**Source:** any2cards/worldhaven

### Class Icons
Class-specific icons should also be sourced from Worldhaven, typically found in:
`https://github.com/any2cards/worldhaven/tree/master/images/art/frosthaven/icons/characters`
Naming convention: `fh-[character-name]-bw-icon.png`

## Expert Guide Sources

- **Pain Conduit (Shackles)**: Build guide by PJsutnop ([Google Doc link](https://docs.google.com/document/d/1CfCJqGcUCde_yJ_IDW2crUl5lF9MJtRSXdeCq_swocE/edit))

## Page Structure

All character pages should follow a consistent "Premium" design:

1. **Hero Section**:
   - Large character portrait (circular or stylized crop).
   - High-contrast typography for the character name.
   - Distinctive badges for complexity and role.
   - Summary and key stats (Hand Size, HP progression highlights).
   - Character traits/tags.

2. **Core Stats**:
   - Detailed HP progression table (Level 1 to 9).
   - Hand size and other static attributes.

3. **Ability Cards**:
   - Filterable gallery by Level (1, X, 2-9).
   - Interactive cards with lightbox preview.
   - Metadata badges for each card (Level, Initiative).

4. **Character Mat & Perks**:
   - High-quality scan of the front and back of the character mat.
   - Interactive toggle for mat sides.
   - Perk sheet visualization.

5. **Strategy & Builds**:
   - Perk Priority Guide (ranked with stars and notes).
   - Build Archetypes (multi-build support with strategy, key cards, and leveling guide).
   - Key Tips section for general gameplay advice.

## UI/UX Principles
- **Vibrant Aesthetics**: Use gradients and shadows to create depth.
- **Micro-animations**: Subtle hover effects on cards and buttons.
- **Responsive Design**: Ensure the layout works on all screen sizes.
- **Spoiler Safety**: Use spoiler-safe names (e.g., "Shackles" instead of "Pain Conduit") where appropriate, or provide toggles.
