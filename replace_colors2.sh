#!/bin/bash
find src -type f -name "*.tsx" -o -name "*.css" | while read -r file; do
  sed -i 's/#D4AF6A/#C1121F/g' "$file"
  sed -i 's/#D6B15E/#C1121F/g' "$file"
  sed -i 's/#C8A04D/#C1121F/g' "$file"
  sed -i 's/#C9A24D/#C1121F/g' "$file"
  sed -i 's/#D4AF37/#C1121F/g' "$file"
  sed -i 's/#FFD700/#C1121F/g' "$file"
  sed -i 's/#DAA520/#C1121F/g' "$file"
  sed -i 's/#CFAE60/#C1121F/g' "$file"
  sed -i 's/#D0A85C/#C1121F/g' "$file"
  sed -i 's/#E0B75A/#C1121F/g' "$file"
  sed -i 's/#C8A44D/#C1121F/g' "$file"
  
  sed -i 's/#E4C88A/#D62839/g' "$file"
  sed -i 's/#E7C978/#D62839/g' "$file"
  
  sed -i 's/#B9933E/#8F0F18/g' "$file"
  
  sed -i 's/rgba(212,175,106/rgba(193,18,31/g' "$file"
  sed -i 's/rgba(214,177,94/rgba(193,18,31/g' "$file"
  sed -i 's/rgba(200,160,77/rgba(193,18,31/g' "$file"
done
