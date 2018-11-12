#/bin/bash
# Change to directory of script
cd "${0%/*}"
# Clear out old maps
find ../maps/ -maxdepth 1 -type f -delete
# Get a list of files in raw

# Name the file after the raw name
for i in `ls -1 ../maps/raw/`; do
   eval "./loadMap.py ../maps/raw/$i > ../maps/$i.html"
done

