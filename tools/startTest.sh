#/bin/bash
# Change to directory of script
cd "${0%/*}/../maps/raw/"
# Clear out old maps
find ../ -maxdepth 1 -type f -delete
# Get a list of files in raw

# Name the file after the raw name
for i in `ls -1 `; do
   eval "../../tools/loadMap.py $i"
done

