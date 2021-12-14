echo "Day number $1";
echo "Making folder 6";
mkdir "day$1"
echo "Making input & code files";
curl  "https://adventofcode.com/2021/day/$1/input" -X GET -H "Cookie:session=$2" >> "day$1/input.txt";
touch "day$1/day$1.js";
echo "const fs = require('fs');" >> "day$1/day$1.js";
echo "const input = fs.readFileSync('input.txt').toString().split('\n');" >> "day$1/day$1.js";
cd "day$1"
code -r .;