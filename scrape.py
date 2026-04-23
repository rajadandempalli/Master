import urllib.request, re

url = 'https://petalsparadiseevents.com/rentals/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# The Kubio structure seems to have columns or blocks.
# Let's just find all <h4 class="...kubio-heading...">(.*?)</h4>
# And the nearest preceding <img ... src="(...)">
# And the nearest following <p ...>(.*?)</p>
# And the nearest following pricing text

items = []
headings = re.finditer(r'<h4[^>]*>(.*?)</h4>', html)

for match in headings:
    title = match.group(1).strip()
    # clean HTML tags from title
    title = re.sub(r'<[^>]+>', '', title)
    
    start_idx = match.start()
    
    # Find preceding image
    img_chunk = html[max(0, start_idx-2000):start_idx]
    img_matches = re.findall(r'<img[^>]+src="([^"]+)"', img_chunk)
    img_url = img_matches[-1] if img_matches else ""
    
    # Find description (first <p> after h4)
    desc_chunk = html[start_idx:start_idx+1000]
    desc_match = re.search(r'<p[^>]*>(.*?)</p>', desc_chunk)
    desc = desc_match.group(1).strip() if desc_match else ""
    desc = re.sub(r'<[^>]+>', '', desc)
    
    # Find price (first digit + $ after h4)
    price_match = re.search(r'(\d+)\$', desc_chunk)
    price = int(price_match.group(1)) if price_match else 0
    
    if "Table" in title or "Chair" in title or "Rental" in title or "Backdrop" in title or price > 0:
        items.append({
            "title": title,
            "desc": desc,
            "img": img_url,
            "price": price
        })

import json
print(json.dumps(items, indent=2))
