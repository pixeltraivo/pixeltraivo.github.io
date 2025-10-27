# Check if URLs are correct now
echo "🔍 Checking updated URLs..."

# Check index.html
echo ""
echo "📄 index.html - First 5 URLs:"
grep -o 'https://[^"]*praveensingh\.pro[^"]*' index.html | head -5

# Check sitemap.xml
echo ""
echo "🗺️ sitemap.xml - All URLs:"
grep -o '<loc>https://[^<]*' sitemap.xml

# Check CNAME
echo ""
echo "📛 CNAME file:"
cat CNAME

# Check manifest.json
echo ""
echo "📱 manifest.json URLs:"
grep -o '"https://[^"]*"' manifest.json 2>/dev/null || echo "No absolute URLs (OK - uses relative paths)"
