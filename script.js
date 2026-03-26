// Newsletter form logic

// ─── Products ─────────────────────────────────────
var products = [
  // Morning Routine
  {
    name: "Classic Lined Notebook",
    description: "My daily journal",
    category: "Morning Routine",
    link: "https://amzn.to/3PdrG6U",
    image: "/images/affiliate-products/journal.png"
  },
  {
    name: "BPN Electrolytes",
    description: "My daily go to for electrolytes",
    category: "Morning Routine",
    link: "https://amzn.to/4rB2l44",
    image: "/images/affiliate-products/electrolytes.png"
  },
  {
    name: "HydroJug Water Bottle",
    description: "Only reason I drink enough water",
    category: "Morning Routine",
    link: "https://amzn.to/4by6Aru",
    image: "/images/affiliate-products/water-bottle.png"
  },
  {
    name: "ESV Bible",
    description: "Daily reading",
    category: "Morning Routine",
    link: "https://amzn.to/3NwtdED",
    image: "/images/affiliate-products/esv-bible.png"
  },

  // Fitness
  {
    name: "Resistance Bands",
    description: "Great for warming up or at home workouts",
    category: "Fitness",
    link: "https://amzn.to/4sW098E",
    image: "/images/affiliate-products/gym-bands.png"
  },
  {
    name: "Adjustable Dumbbells",
    description: "Great for keeping your workout space clutter free",
    category: "Fitness",
    link: "https://amzn.to/4lJBoKw",
    image: "/images/affiliate-products/dumbbells.png"
  },
  {
    name: "Weighted Vest 20lbs",
    description: "Game changer for walks",
    category: "Fitness",
    link: "https://amzn.to/4lF46Mv",
    image: "/images/affiliate-products/vest.png"
  },
  {
    name: "Brooks Launch 11",
    description: "Daily running and walking shoe",
    category: "Fitness",
    link: "https://amzn.to/419PLOz",
    image: "/images/affiliate-products/brooks-launch.png"
  },
  {
    name: "Garmin Watch",
    description: "My fitness tracker",
    category: "Fitness",
    link: "https://amzn.to/4tcIZ6X",
    image: "/images/affiliate-products/garmin.png"
  },
  {
    name: "Naked Protein Chocolate",
    description: "My daily protein",
    category: "Fitness",
    link: "https://amzn.to/4cQ7uSk",
    image: "/images/affiliate-products/protein.png"
  },
  {
    name: "Naked Creatine",
    description: "Daily creatine supplement",
    category: "Fitness",
    link: "https://amzn.to/4rHWKcy",
    image: "/images/affiliate-products/creatine.png"
  },
  {
    name: "Naked Collagen",
    description: "Daily collagen supplement",
    category: "Fitness",
    link: "https://amzn.to/4bUHHXd",
    image: "/images/affiliate-products/collagen.png"
  },

  // Books
  {
    name: "The War of Art",
    description: "Break through the struggle of being a creative",
    category: "Books",
    link: "https://amzn.to/3NqZM6U",
    image: "https://m.media-amazon.com/images/I/51lmpnWEuEL._SL1500_.jpg"
  },
  {
    name: "Show Your Work",
    description: "Great for creatives afraid of sharing their art",
    category: "Books",
    link: "https://amzn.to/3NI4RI4",
    image: "https://m.media-amazon.com/images/I/61pMBw4h2ZL._SL1500_.jpg"
  },
  {
    name: "Atomic Habits",
    description: "Foundational for creating new habits",
    category: "Books",
    link: "https://amzn.to/3NAgfFI",
    image: "https://m.media-amazon.com/images/I/81kg51XRc1L._SL1500_.jpg"
  },

  // Tech
  {
    name: "MacBook Pro M4",
    description: "Laptop I use to create all my content",
    category: "Tech",
    link: "https://amzn.to/4bQBlcg",
    image: "/images/affiliate-products/macbook-pro.png"
  },
  {
    name: "iPhone 17 Pro 1TB",
    description: "Phone for all my editing",
    category: "Tech",
    link: "https://amzn.to/4siA4jZ",
    image: "/images/affiliate-products/iphone.png"
  },
  {
    name: "Apple AirPods Pro 3",
    description: "Best in ear headphones I've ever used",
    category: "Tech",
    link: "https://amzn.to/3PeY9d2",
    image: "/images/affiliate-products/airpods.png"
  },
  {
    name: "nuphy Kick75 Keyboard",
    description: "Super quiet, great replacement for laptop keyboard",
    category: "Tech",
    link: "https://amzn.to/4lDDStK",
    image: "/images/affiliate-products/keyboard.png"
  },
  {
    name: "Tripod for iPhone",
    description: "My go to for recording",
    category: "Tech",
    link: "https://amzn.to/4sQMxva",
    image: "/images/affiliate-products/tripod.png"
  },
  {
    name: "Shure SM7B Microphone",
    description: "Mic for all audio recording",
    category: "Tech",
    link: "https://amzn.to/3Nww2FI",
    image: "/images/affiliate-products/shure-mic.png"
  }
];

// ─── Render products into #shop-grid ──────────────
function renderProducts() {
  var grid = document.getElementById('shop-grid');
  if (!grid) return;

  grid.innerHTML = products.map(function (p) {
    var slug = p.category.toLowerCase().replace(/\s+/g, '-');
    var imgContent = p.image
      ? '<div class="shop-img"><img src="' + p.image + '" alt="' + p.name + '" class="shop-img-photo"></div>'
      : '<div class="shop-img"></div>';

    return '<a href="' + p.link + '" class="shop-card-link" data-category="' + slug + '" target="_blank" rel="noopener noreferrer">'
      + '<div class="shop-card">'
      + imgContent
      + '<div class="shop-info">'
      + '<span class="shop-tag">' + p.category + '</span>'
      + '<h3 class="shop-name">' + p.name + '</h3>'
      + '<p class="shop-desc">' + p.description + '</p>'
      + '</div>'
      + '</div>'
      + '</a>';
  }).join('');
}

// ─── Store filter ──────────────────────────────────
function initFilter() {
  var tags = document.querySelectorAll('.filter-tag');
  if (!tags.length) return;

  tags.forEach(function (tag) {
    tag.addEventListener('click', function () {
      tags.forEach(function (t) { t.classList.remove('active'); });
      tag.classList.add('active');
      var filter = tag.getAttribute('data-filter');
      var cards = document.querySelectorAll('.shop-card-link[data-category]');
      cards.forEach(function (card) {
        card.style.display =
          (filter === 'all' || card.getAttribute('data-category') === filter)
            ? ''
            : 'none';
      });
    });
  });
}

renderProducts();
initFilter();

// ─── Beehiiv iframe height fix ────────────────────
function fixBeehiivHeight() {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    if (iframe.src && iframe.src.includes('beehiiv')) {
      iframe.style.setProperty('height', 'auto', 'important');
      iframe.style.setProperty('min-height', '0', 'important');
      iframe.removeAttribute('height');
    }
  });
}

// Run on load and after a short delay to catch late injection
window.addEventListener('load', fixBeehiivHeight);
setTimeout(fixBeehiivHeight, 500);
setTimeout(fixBeehiivHeight, 1500);

// ─── Dark/light mode toggle ────────────────────────
(function () {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', function () {
    var html = document.documentElement;
    html.classList.toggle('dark-mode');
    var isDark = html.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
})();
