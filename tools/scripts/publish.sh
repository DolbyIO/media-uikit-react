#!/bin/bash
touch /root/.npmrc
curl -sS -u $NPM_USER:$NPM_PASS $NPM_REGISTRY_AUTH -o /root/.npmrc
curl -sS -u $NPM_USER:$NPM_PASS $NPM_REGISTRY >> /root/.npmrc
sed -i -e 's/dolby.net:443/dolby.net/g' /root/.npmrc
echo "-- START PRINT .npmrc --"
cat /root/.npmrc
echo "-- END PRINT .npmrc --"
cd dist/packages/media-uikit-react
npm publish --access restricted
cd ../../..
