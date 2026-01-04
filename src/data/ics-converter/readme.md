# Simple ICS to JSON converter

Usage: `node ics2json.js <filename.ics>`

Example: Download astrocal by Canton Becker, convert it to JSON, keep only full/new moons, eclipses, equinoxes and solstices, make some processing & check the result.

```sh
npm install
curl -O https://cdn.cantonbecker.com/astrocal.ics
node ics2json.js astrocal.ics
jq '
  [ .[]
    | .title = .summary | del(.summary)
    | select(
        (.title | test("Moon|[Ss]olstice|[Ee]quinox|[Ee]clipse")) and
        (.title != "Venus\\, Regulus\\, and the Moon") and
        (.title | test("Quarter") | not)
      )
    | if .title | test("🌕.*Full") then .title = "Полнолуние" | .classNames = "fullmoon"
      elif .title | test("🌑.*New") then .title = "Новолуние" | .classNames = "newmoon"
      elif .title | test("[Ss]olstice") then .title = "Солнцестояние" | .classNames = "solstice"
      elif .title | test("[Ee]quinox") then .title = "Равноденствие" | .classNames = "equinox"
      elif .title | test("Lunar Eclipse") then .title = "Лунное затмение" | .classNames = "eclipse"
      elif .title | test("Solar Eclipse") then .title = "Солнечное затмение" | .classNames = "eclipse"
      else .
      end
  ]
' /Users/bobcat/Documents/tara-app/src/data/ics-converter/astrocal.json > /Users/bobcat/Documents/tara-app/src/data/ics-converter/astrocal_filtered.json
jq '[group_by(.title) | .[] | {title: .[0].title, classNames: .[0].classNames, count: length}]' /Users/bobcat/Documents/tara-app/src/data/ics-converter/astrocal_filtered.json

```