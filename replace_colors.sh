#!/bin/bash
# Remove old references from css
sed -i 's/--color-brand-gold: #D4AF6A;/--color-brand-gold: #C1121F;/g' src/index.css
sed -i 's/background-color: #D4AF6A;/background-color: #C1121F;/g' src/index.css

# Primary
sed -i 's/#D4AF6A/#C1121F/g' src/**/*.tsx src/*.tsx
sed -i 's/#D6B15E/#C1121F/g' src/**/*.tsx src/*.tsx
sed -i 's/#C8A04D/#C1121F/g' src/**/*.tsx src/*.tsx
sed -i 's/#C9A24D/#C1121F/g' src/**/*.tsx src/*.tsx
sed -i 's/#D4AF37/#C1121F/g' src/**/*.tsx src/*.tsx
sed -i 's/#FFD700/#C1121F/g' src/**/*.tsx src/*.tsx
sed -i 's/#DAA520/#C1121F/g' src/**/*.tsx src/*.tsx
sed -i 's/#CFAE60/#C1121F/g' src/**/*.tsx src/*.tsx
sed -i 's/#D0A85C/#C1121F/g' src/**/*.tsx src/*.tsx
sed -i 's/#E0B75A/#C1121F/g' src/**/*.tsx src/*.tsx
sed -i 's/#C8A44D/#C1121F/g' src/**/*.tsx src/*.tsx

# Hover
sed -i 's/#E4C88A/#D62839/g' src/**/*.tsx src/*.tsx
sed -i 's/#E7C978/#D62839/g' src/**/*.tsx src/*.tsx

# Dark Red
sed -i 's/#B9933E/#8F0F18/g' src/**/*.tsx src/*.tsx

# RGBA transparents
sed -i 's/rgba(212,175,106,/rgba(193,18,31,/g' src/**/*.tsx src/*.tsx
sed -i 's/rgba(214,177,94,/rgba(193,18,31,/g' src/**/*.tsx src/*.tsx
sed -i 's/rgba(200,160,77,/rgba(193,18,31,/g' src/**/*.tsx src/*.tsx
