#/bin/bash


URL="https://storage.googleapis.com/panels-api/data/20240916/media-1a-i-p~s"
Wall_DIR="./walls"
mkdir -p "$Wall_DIR"

curl -s "$URL" | jq -r '.data[] | to_entries[].value | select(type == "string" and startswith("https"))' | while read -r fileUrl; do
  curl -o "$Wall_DIR/$(basename "$fileUrl")" "$fileUrl"
done


#Elaborated Code below

# URL="https://storage.googleapis.com/panels-api/data/20240916/media-1a-i-p~s"
# Wall_DIR="./walls"

# mkdir -p "$Wall_DIR"

# response=$(curl -s "$URL")

# links=$(echo "response" | jq -r '.data[] | to_entries[] | .value | select(type == "string" and startswith("https"))')

# for fileUrl in $links; do 
#   filename=$(basename "$fileUrl")
#   savePath="$Wall_DIR/$filename"
  
#   curl -o "$savePath" "fileUrl"
# done