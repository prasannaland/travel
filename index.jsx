import { useState, useEffect, useRef } from "react";

const destinations = [
  {
    id: "colombo",
    name: "Colombo",
    tagline: "Sri Lanka's vibrant capital city",
    desc: "A cosmopolitan harbour city blending colonial charm with modern malls, street food, and stunning sunsets over the Indian Ocean.",
    image: "https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=800&q=80",
    badge: "Capital City",
    budgetINR: 4200,
    budgetLKR: 15500,
    expenses: { food: [800, 2950], hotel: [2500, 9200], transport: [700, 2580] },
    bestTime: "December – March (dry season, pleasant 28°C)",
    attractions: ["Galle Face Green", "Gangaramaya Temple", "National Museum", "Pettah Bazaar", "Dutch Hospital Shopping Precinct"],
    foods: ["Kottu Roti", "Hoppers (Appam)", "Fish Ambul Thiyal", "Pol Sambol", "String Hoppers"],
    transport: "Tuk-tuks are cheapest (LKR 200–500 per trip). Uber works well. City buses are LKR 30–80. Trains from Fort Station to suburbs are scenic.",
    safety: "Generally safe for Indian tourists. Keep copies of your passport. Avoid isolated areas at night. Local Tamil/Hindi similarities make communication easy.",
    currency: "1 INR ≈ 3.7 LKR. Exchange at banks or licensed moneychangers. ATMs widely available. Cards accepted in most restaurants.",
    itinerary: [
      { day: "Day 1", activities: ["Morning: Gangaramaya Temple & Viharamahadevi Park", "Afternoon: Pettah Market & Dutch Hospital", "Evening: Galle Face Green sunset"] },
      { day: "Day 2", activities: ["Morning: National Museum & Independence Square", "Afternoon: Colpetty & Bambalapitiya street food tour", "Evening: Mount Lavinia Beach"] }
    ],
    hotels: [
      { name: "Cinnamon Grand Colombo", rating: 4.8, priceINR: 8500, priceLKR: 31450, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80" },
      { name: "Galadari Hotel", rating: 4.3, priceINR: 5200, priceLKR: 19240, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80" },
      { name: "Colombo City Hostel", rating: 4.1, priceINR: 1200, priceLKR: 4440, img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80" },
    ],
    lat: 6.9271, lng: 79.8612,
    color: "#0ea5e9"
  },
  {
    id: "kandy",
    name: "Kandy",
    tagline: "Cultural heart of Sri Lanka",
    desc: "A UNESCO World Heritage city nestled in misty hills, home to the sacred Temple of the Tooth, and breathtaking Kandyan dance performances.",
    image: "https://images.unsplash.com/photo-1588416499018-d8c621e7d2c2?w=800&q=80",
    badge: "UNESCO Heritage",
    budgetINR: 3800,
    budgetLKR: 14060,
    expenses: { food: [700, 2590], hotel: [2200, 8140], transport: [900, 3330] },
    bestTime: "January – April & July–August (cooler and drier)",
    attractions: ["Temple of the Tooth Relic", "Kandy Lake", "Royal Botanical Gardens Peradeniya", "Udawatta Kele Sanctuary", "Kandy Cultural Show"],
    foods: ["Kiribath (milk rice)", "Dhal Curry", "Kandy Sweets", "Woodapple Juice", "Coconut Roti"],
    transport: "Trains from Colombo Fort to Kandy (3 hrs, LKR 130–570). Tuk-tuks for local travel. Rent a scooter for hill roads (LKR 1500/day).",
    safety: "Very tourist-friendly. Keep valuables close at temple. Dress modestly at sacred sites (shoulders & knees covered).",
    currency: "1 INR ≈ 3.7 LKR. Limited ATMs in old city — withdraw in Colombo. Most guesthouses accept cash only.",
    itinerary: [
      { day: "Day 1", activities: ["Morning: Temple of the Tooth Relic (6am puja)", "Afternoon: Kandy Lake walk & city market", "Evening: Kandyan Cultural Dance Show"] },
      { day: "Day 2", activities: ["Morning: Peradeniya Botanical Gardens", "Afternoon: Udawatta Kele forest walk", "Evening: Hilltop sunset viewpoint"] }
    ],
    hotels: [
      { name: "The Kandy House", rating: 4.9, priceINR: 9200, priceLKR: 34040, img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80" },
      { name: "Cinnamon Citadel", rating: 4.5, priceINR: 6800, priceLKR: 25160, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80" },
      { name: "McLeod Inn Kandy", rating: 4.0, priceINR: 1800, priceLKR: 6660, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80" },
    ],
    lat: 7.2906, lng: 80.6337,
    color: "#16a34a"
  },
  {
    id: "ella",
    name: "Ella",
    tagline: "Misty mountains & train rides",
    desc: "A tiny hill village famous for the world's most scenic train journey, Nine Arch Bridge, and jaw-dropping valley views from Little Adam's Peak.",
    image: "https://images.unsplash.com/photo-1625126797580-dbfa0e3cfec1?w=800&q=80",
    badge: "Backpacker's Paradise",
    budgetINR: 3200,
    budgetLKR: 11840,
    expenses: { food: [600, 2220], hotel: [1800, 6660], transport: [800, 2960] },
    bestTime: "January – March & June–September (clear skies for views)",
    attractions: ["Nine Arch Bridge", "Little Adam's Peak", "Ella Rock Trek", "Ravana Falls", "Tea Factory Tour"],
    foods: ["Egg Roti", "Banana Pancake", "Tea Factory Fresh Tea", "Roti with Curry", "Jackfruit Rice"],
    transport: "Famous Kandy–Ella train (6 hrs, book 2nd class LKR 300 or book 1st class observation car). Tuk-tuks for short hops (LKR 200–400).",
    safety: "Very safe, popular with solo backpackers including women. Trail paths are well-marked. Carry water on hikes.",
    currency: "Very few ATMs — carry enough cash from Kandy or Colombo. Most cafes accept cash only.",
    itinerary: [
      { day: "Day 1", activities: ["Morning: Nine Arch Bridge (sunrise shoot)", "Afternoon: Tea plantation factory tour", "Evening: Ella town cafes & night market"] },
      { day: "Day 2", activities: ["Morning: Little Adam's Peak sunrise hike (2 hrs)", "Afternoon: Ravana Falls & cave", "Evening: Train journey to next destination"] }
    ],
    hotels: [
      { name: "98 Acres Resort", rating: 4.9, priceINR: 11500, priceLKR: 42550, img: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80" },
      { name: "Zion View Ella", rating: 4.4, priceINR: 3200, priceLKR: 11840, img: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=400&q=80" },
      { name: "Ella Flower Garden", rating: 4.2, priceINR: 1500, priceLKR: 5550, img: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=400&q=80" },
    ],
    lat: 6.8667, lng: 81.0467,
    color: "#d97706"
  },
  {
    id: "mirissa",
    name: "Mirissa",
    tagline: "Surf, whales & coconut trees",
    desc: "A crescent-shaped beach paradise on Sri Lanka's south coast. Perfect for whale watching, surfing, and sipping coconuts under swaying palms.",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    badge: "Beach Paradise",
    budgetINR: 3600,
    budgetLKR: 13320,
    expenses: { food: [750, 2775], hotel: [2000, 7400], transport: [850, 3145] },
    bestTime: "November – April (whale watching & calm sea season)",
    attractions: ["Mirissa Beach", "Blue Whale Watching Tour", "Parrot Rock", "Coconut Tree Hill", "Secret Beach"],
    foods: ["Grilled Tuna Steak", "Prawn Curry", "Fresh Coconut", "Calamari", "Lagoon Rice & Curry"],
    transport: "Trains from Colombo (3.5 hrs, LKR 200–400). Weligama–Mirissa tuk-tuk LKR 300. Rent scooters for beach-hopping (LKR 1200/day).",
    safety: "Safe beach area. Respect ocean flags — undertow can be strong. Book whale watching tours only with licensed operators.",
    currency: "Multiple ATMs near beach. Restaurants mostly accept cards. Bargain with tuk-tuks for fair prices.",
    itinerary: [
      { day: "Day 1", activities: ["Early morning: Blue Whale watching tour (5am, 4 hrs)", "Afternoon: Relax on Mirissa Beach", "Evening: Sunset at Coconut Tree Hill"] },
      { day: "Day 2", activities: ["Morning: Surf lesson at Weligama (nearby)", "Afternoon: Secret Beach & snorkeling", "Evening: Fresh seafood BBQ on beach"] }
    ],
    hotels: [
      { name: "Mirissa Hills Retreat", rating: 4.7, priceINR: 7800, priceLKR: 28860, img: "https://images.unsplash.com/photo-1439130490301-25e322d88054?w=400&q=80" },
      { name: "Palace Mirissa", rating: 4.3, priceINR: 4500, priceLKR: 16650, img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80" },
      { name: "Mirissa Bay Inn", rating: 4.0, priceINR: 1600, priceLKR: 5920, img: "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=400&q=80" },
    ],
    lat: 5.9483, lng: 80.4716,
    color: "#0284c7"
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya",
    tagline: "Little England in the clouds",
    desc: "Called 'Little England', this hill station at 1,868m has colonial bungalows, manicured tea estates, cool mountain air, and a racetrack.",
    image: "https://images.unsplash.com/photo-1609787640500-2e0b0ad89e91?w=800&q=80",
    badge: "Hill Station",
    budgetINR: 3400,
    budgetLKR: 12580,
    expenses: { food: [650, 2405], hotel: [1900, 7030], transport: [850, 3145] },
    bestTime: "April (Sinhala New Year) & December–March (rose season)",
    attractions: ["Pedro Tea Estate", "Victoria Park", "Gregory Lake", "Horton Plains National Park", "World's End Cliff"],
    foods: ["Ceylon Tea varieties", "Hakuru (local jaggery)", "Vegetable Roti", "Potato Curry", "Strawberry Jam & Cream"],
    transport: "Train from Kandy to Nanu Oya station (3.5 hrs, LKR 130–480) then tuk-tuk to town. Local tuk-tuks LKR 200–400.",
    safety: "Safe tourist destination. Very cold at night (8–15°C) — pack warm layers. Horton Plains requires entry permit (LKR 4000 for foreigners).",
    currency: "ATMs available in town center. Most tea estates accept cash only for tours.",
    itinerary: [
      { day: "Day 1", activities: ["Morning: Pedro Tea Estate factory tour & tasting", "Afternoon: Gregory Lake boat ride & Victoria Park", "Evening: Colonial Hotel bar & bonfire"] },
      { day: "Day 2", activities: ["Pre-dawn: Horton Plains & World's End (6am entry)", "Afternoon: Strawberry farm & local market", "Evening: Train journey back through tea country"] }
    ],
    hotels: [
      { name: "Heritance Tea Factory", rating: 4.9, priceINR: 13500, priceLKR: 49950, img: "https://images.unsplash.com/photo-1587213811864-c02bc7e12ed8?w=400&q=80" },
      { name: "Grand Hotel Nuwara Eliya", rating: 4.5, priceINR: 7200, priceLKR: 26640, img: "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=400&q=80" },
      { name: "Single Tree Hotel", rating: 4.1, priceINR: 2200, priceLKR: 8140, img: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&q=80" },
    ],
    lat: 6.9497, lng: 80.7891,
    color: "#7c3aed"
  }
];

const activities = [
  { icon: "🍵", title: "Tea Plantation Tours", desc: "Walk through emerald estates in Nuwara Eliya & Ella", tag: "Culture" },
  { icon: "🚂", title: "Scenic Train Rides", desc: "Kandy to Ella — voted world's most beautiful rail journey", tag: "Adventure" },
  { icon: "🏄", title: "Beach Surfing", desc: "Catch waves at Weligama & Arugam Bay", tag: "Sports" },
  { icon: "🛕", title: "Temple Visits", desc: "Sri Pada, Temple of Tooth, Dambulla Cave temples", tag: "Spiritual" },
  { icon: "🐘", title: "Wildlife Safari", desc: "Yala & Udawalawe National Parks — leopards & elephants", tag: "Nature" },
  { icon: "🐋", title: "Whale Watching", desc: "Mirissa — blue & sperm whale sightings Nov–April", tag: "Wildlife" },
];

const testimonials = [
  { name: "Priya Sharma", city: "Mumbai", rating: 5, text: "Sri Lanka felt like a mix of Kerala and Rajasthan but more affordable! Visa on arrival for Indians was super smooth. The train from Kandy to Ella was absolutely magical.", avatar: "PS" },
  { name: "Rahul Gupta", city: "Delhi", rating: 5, text: "Planned a 7-day trip for under ₹45,000 per person including flights from Chennai. Food is very similar to South Indian — felt right at home in Colombo.", avatar: "RG" },
  { name: "Sneha & Vikram", city: "Bangalore", rating: 5, text: "Our honeymoon in Mirissa was perfect. Whale watching at 5am was once-in-a-lifetime. The resorts are world-class at Indian budget prices!", avatar: "SV" },
];

const faqs = [
  { q: "Do Indians need a visa for Sri Lanka?", a: "Indian passport holders can get a 30-day ETA (Electronic Travel Authorization) online for $20 USD. Apply at www.eta.gov.lk at least 2 days before travel." },
  { q: "What is the best currency to carry?", a: "USD is best for exchange. You can also carry INR — many hotels near tourist areas accept Indian Rupees. 1 INR ≈ 3.68 LKR (May 2025)." },
  { q: "Is Sri Lanka safe for Indian tourists?", a: "Absolutely. Sri Lankans are very warm towards Indians. Hindi/Tamil is understood in many tourist areas. The 2019 situation is long past — tourism is fully restored." },
  { q: "What's the best time to visit from India?", a: "December to April is ideal for the south & west coast (Colombo, Mirissa, Galle). If visiting the east coast (Trincomalee), May–September is better." },
  { q: "How to travel from India to Sri Lanka?", a: "Direct flights from Chennai (1.5 hrs), Mumbai (2.5 hrs), Delhi (4 hrs), and Bangalore (2 hrs). Air India, IndiGo, and SriLankan Airlines operate these routes." },
];

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? "#f59e0b" : "#d1d5db", fontSize: 14 }}>★</span>
      ))}
      <span style={{ fontSize: 12, marginLeft: 4, color: "#6b7280" }}>{rating}</span>
    </div>
  );
}

function CurrencyConverter() {
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState("INR");
  const rate = 3.68;
  const result = from === "INR" ? (amount * rate).toFixed(0) : (amount / rate).toFixed(0);
  const toLabel = from === "INR" ? "LKR" : "INR";

  return (
    <div style={{ background: "white", borderRadius: 16, padding: "24px 28px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", maxWidth: 420 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 28 }}>💱</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>Currency Converter</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>1 INR ≈ 3.68 LKR (live rate)</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 18, fontWeight: 600, color: "#111", outline: "none" }}
        />
        <select
          value={from}
          onChange={e => setFrom(e.target.value)}
          style={{ padding: "10px 14px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, color: "#111", background: "white" }}
        >
          <option>INR</option>
          <option>LKR</option>
        </select>
      </div>
      <div style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)", borderRadius: 10, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>= {toLabel}</span>
        <span style={{ color: "white", fontSize: 26, fontWeight: 700 }}>
          {toLabel === "LKR" ? "Rs." : "₹"}{Number(result).toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
}

function DestinationModal({ dest, onClose }) {
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "20px 16px", overflowY: "auto" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "white", borderRadius: 24, width: "100%", maxWidth: 780, marginBottom: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.25)" }}
      >
        {/* Hero */}
        <div style={{ position: "relative", height: 260 }}>
          <img src={dest.image} alt={dest.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75))" }} />
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          <div style={{ position: "absolute", bottom: 20, left: 24 }}>
            <div style={{ background: dest.color, color: "white", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 6 }}>{dest.badge}</div>
            <h2 style={{ color: "white", fontSize: 32, fontWeight: 800, margin: 0 }}>{dest.name}</h2>
            <p style={{ color: "rgba(255,255,255,0.85)", margin: "4px 0 0", fontSize: 14 }}>{dest.tagline}</p>
          </div>
        </div>

        <div style={{ padding: "24px 28px" }}>
          {/* Budget highlight */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[["🍽 Food", dest.expenses.food], ["🏨 Hotel", dest.expenses.hotel], ["🚌 Transport", dest.expenses.transport]].map(([label, vals]) => (
              <div key={label} style={{ background: "#f8fafc", borderRadius: 12, padding: "12px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{label}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>₹{vals[0].toLocaleString()}</div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>Rs.{vals[1].toLocaleString()}</div>
              </div>
            ))}
          </div>

          {/* Info grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <InfoBlock icon="🌤" title="Best Time to Visit" text={dest.bestTime} />
            <InfoBlock icon="💰" title="Currency Tips" text={dest.currency} />
            <InfoBlock icon="🚌" title="Getting Around" text={dest.transport} />
            <InfoBlock icon="🛡️" title="Safety for Indians" text={dest.safety} />
          </div>

          {/* Attractions */}
          <Section title="Top Attractions">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {dest.attractions.map(a => (
                <span key={a} style={{ background: "#eff6ff", color: "#1d4ed8", padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 500 }}>{a}</span>
              ))}
            </div>
          </Section>

          {/* Foods */}
          <Section title="Local Foods to Try 🍛">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {dest.foods.map(f => (
                <span key={f} style={{ background: "#fff7ed", color: "#c2410c", padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 500 }}>{f}</span>
              ))}
            </div>
          </Section>

          {/* Itinerary */}
          <Section title="Suggested 2-Day Itinerary 🗓">
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {dest.itinerary.map((it, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  style={{ padding: "6px 18px", borderRadius: 20, border: `2px solid ${activeDay === i ? dest.color : "#e5e7eb"}`, background: activeDay === i ? dest.color : "white", color: activeDay === i ? "white" : "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
                >
                  {it.day}
                </button>
              ))}
            </div>
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: "14px 16px" }}>
              {dest.itinerary[activeDay].activities.map((act, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < dest.itinerary[activeDay].activities.length - 1 ? 10 : 0, alignItems: "flex-start" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: dest.color, marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>{act}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Hotels */}
          <Section title="Recommended Hotels 🏨">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {dest.hotels.map(h => (
                <div key={h.name} style={{ border: "1.5px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
                  <img src={h.img} alt={h.name} style={{ width: "100%", height: 90, objectFit: "cover" }} />
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#111", marginBottom: 4, lineHeight: 1.3 }}>{h.name}</div>
                    <StarRating rating={h.rating} />
                    <div style={{ marginTop: 6, fontSize: 13 }}>
                      <span style={{ fontWeight: 700, color: "#111" }}>₹{h.priceINR.toLocaleString()}</span>
                      <span style={{ color: "#9ca3af", fontSize: 11 }}> /Rs.{h.priceLKR.toLocaleString()}</span>
                    </div>
                    <button style={{ marginTop: 8, width: "100%", padding: "6px 0", background: dest.color, color: "white", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Book Now</button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Map placeholder */}
          <Section title="Location Map 📍">
            <div style={{ background: "#f1f5f9", borderRadius: 12, height: 160, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", border: "1px solid #e2e8f0" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📍</div>
                <div style={{ fontWeight: 600, color: "#374151" }}>{dest.name}, Sri Lanka</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>Lat: {dest.lat}° N, Lng: {dest.lng}° E</div>
                <a
                  href={`https://maps.google.com/?q=${dest.lat},${dest.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-block", marginTop: 10, padding: "6px 16px", background: dest.color, color: "white", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ icon, title, text }) {
  return (
    <div style={{ background: "#f8fafc", borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ fontWeight: 700, fontSize: 13, color: "#374151", marginBottom: 6 }}>{icon} {title}</div>
      <p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h3 style={{ fontWeight: 700, fontSize: 16, color: "#111", margin: "0 0 12px" }}>{title}</h3>
      {children}
    </div>
  );
}

function WeatherWidget() {
  const weather = [
    { city: "Colombo", temp: 31, icon: "⛅", desc: "Partly Cloudy" },
    { city: "Kandy", temp: 25, icon: "🌤", desc: "Mostly Clear" },
    { city: "Ella", temp: 22, icon: "🌥", desc: "Cloudy" },
    { city: "Mirissa", temp: 30, icon: "☀️", desc: "Sunny" },
    { city: "Nuwara Eliya", temp: 16, icon: "🌦", desc: "Light Rain" },
  ];
  return (
    <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
      {weather.map(w => (
        <div key={w.city} style={{ minWidth: 120, background: "linear-gradient(135deg, #0ea5e9, #0284c7)", borderRadius: 14, padding: "14px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 28 }}>{w.icon}</div>
          <div style={{ color: "white", fontWeight: 700, fontSize: 22, marginTop: 4 }}>{w.temp}°C</div>
          <div style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600, fontSize: 13 }}>{w.city}</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 2 }}>{w.desc}</div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bg = darkMode ? "#0f172a" : "#ffffff";
  const surface = darkMode ? "#1e293b" : "#f8fafc";
  const textPrimary = darkMode ? "#f1f5f9" : "#0f172a";
  const textSecondary = darkMode ? "#94a3b8" : "#64748b";
  const border = darkMode ? "#334155" : "#e2e8f0";

  return (
    <div style={{ fontFamily: "'Outfit', 'Nunito', system-ui, sans-serif", background: bg, color: textPrimary, minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navScrolled ? (darkMode ? "rgba(15,23,42,0.97)" : "rgba(255,255,255,0.97)") : "transparent",
        backdropFilter: navScrolled ? "blur(12px)" : "none",
        borderBottom: navScrolled ? `1px solid ${border}` : "none",
        transition: "all 0.3s",
        padding: "0 24px"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: "linear-gradient(135deg, #0ea5e9, #16a34a)", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌴</div>
            <span style={{ fontWeight: 800, fontSize: 20, color: navScrolled ? textPrimary : "white" }}>LankaTrip <span style={{ color: "#f97316" }}>India</span></span>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {["Home", "Destinations", "Hotels", "Budget Guide", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} style={{ color: navScrolled ? textSecondary : "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}>{item}</a>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{ background: darkMode ? "#334155" : "rgba(255,255,255,0.2)", border: "none", borderRadius: 20, padding: "6px 14px", cursor: "pointer", fontSize: 16, transition: "background 0.3s" }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0c4a6e 0%, #065f46 35%, #1e3a5f 70%, #0f172a 100%)" }} />
        {/* Animated floating elements */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {["🌴", "🌊", "🐬", "☀️", "🌺", "🦋"].map((e, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              fontSize: 28 + (i % 3) * 8,
              opacity: 0.15,
              animation: `float ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite alternate`,
            }}>{e}</div>
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: "0 20px" }}>
          <div style={{ background: "rgba(249,115,22,0.2)", border: "1px solid rgba(249,115,22,0.4)", borderRadius: 20, padding: "4px 16px", fontSize: 13, color: "#fdba74", fontWeight: 600, marginBottom: 20, display: "inline-block" }}>
            🇮🇳 → 🇱🇰 &nbsp; Just 1.5 Hours from Chennai
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 900, color: "white", lineHeight: 1.1, margin: "0 0 20px", maxWidth: 800 }}>
            Explore Sri Lanka from India —
            <span style={{ background: "linear-gradient(90deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}> Budget Friendly Paradise</span>
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.75)", maxWidth: 620, lineHeight: 1.7, marginBottom: 36 }}>
            Complete travel guides, hotel recommendations, local expenses, and must-visit attractions tailored for Indian travelers.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#destinations" style={{ background: "linear-gradient(135deg, #f97316, #ef4444)", color: "white", padding: "14px 30px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 8px 24px rgba(249,115,22,0.4)" }}>
              🗺 Explore Destinations
            </a>
            <a href="#budget-guide" style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.3)", color: "white", padding: "14px 30px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none", backdropFilter: "blur(8px)" }}>
              📋 Plan Your Trip
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap", justifyContent: "center" }}>
            {[["5+", "Destinations"], ["₹3,000+", "Daily Budget"], ["100K+", "Indian Travelers"], ["4.9★", "Avg Rating"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#fbbf24" }}>{num}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave bottom */}
        <svg style={{ position: "absolute", bottom: -2, left: 0, right: 0 }} viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={bg} />
        </svg>
      </section>

      <style>{`
        @keyframes float { from { transform: translateY(0px) rotate(0deg); } to { transform: translateY(-20px) rotate(5deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .dest-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.15) !important; }
        .dest-card { transition: transform 0.3s, box-shadow 0.3s; }
        .activity-card:hover { transform: translateY(-3px); }
        .activity-card { transition: transform 0.25s; }
      `}</style>

      {/* DESTINATIONS */}
      <section id="destinations" style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#f97316", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Top Destinations</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: textPrimary, margin: "0 0 14px" }}>5 Must-Visit Places in Sri Lanka</h2>
          <p style={{ color: textSecondary, fontSize: 16, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
            From misty hill stations to turquoise beaches — every destination crafted with Indian travel preferences in mind.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {destinations.map(dest => (
            <div
              key={dest.id}
              className="dest-card"
              onClick={() => setActiveModal(dest)}
              style={{ background: darkMode ? "#1e293b" : "white", borderRadius: 20, overflow: "hidden", boxShadow: darkMode ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.08)", cursor: "pointer" }}
            >
              <div style={{ position: "relative", height: 220 }}>
                <img src={dest.image} alt={dest.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6))" }} />
                <div style={{ position: "absolute", top: 14, left: 14, background: dest.color, color: "white", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{dest.badge}</div>
                <div style={{ position: "absolute", bottom: 14, left: 14 }}>
                  <h3 style={{ color: "white", fontWeight: 800, fontSize: 22, margin: 0 }}>{dest.name}</h3>
                </div>
              </div>
              <div style={{ padding: "18px 20px" }}>
                <p style={{ color: textSecondary, fontSize: 14, margin: "0 0 16px", lineHeight: 1.6 }}>{dest.desc}</p>

                {/* Budget */}
                <div style={{ background: surface, borderRadius: 12, padding: "12px 14px", marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: textSecondary, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Est. Daily Budget</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, textAlign: "center" }}>
                    {[["🍽 Food", dest.expenses.food], ["🏨 Hotel", dest.expenses.hotel], ["🚌 Transport", dest.expenses.transport]].map(([label, vals]) => (
                      <div key={label}>
                        <div style={{ fontSize: 10, color: textSecondary }}>{label}</div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: textPrimary }}>₹{vals[0]}</div>
                        <div style={{ fontSize: 10, color: textSecondary }}>Rs.{vals[1]}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: textSecondary }}>Total / day</span>
                    <div>
                      <span style={{ fontWeight: 800, fontSize: 16, color: dest.color }}>₹{dest.budgetINR.toLocaleString()}</span>
                      <span style={{ fontSize: 12, color: textSecondary }}> / Rs.{dest.budgetLKR.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  style={{ width: "100%", padding: "12px 0", background: `linear-gradient(135deg, ${dest.color}, ${dest.color}cc)`, color: "white", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                >
                  View Full Guide →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVITIES */}
      <section style={{ background: surface, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#16a34a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Things To Do</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, color: textPrimary, margin: 0 }}>Unforgettable Experiences</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {activities.map(act => (
              <div key={act.title} className="activity-card" style={{ background: darkMode ? "#1e293b" : "white", borderRadius: 16, padding: "22px 24px", boxShadow: darkMode ? "0 2px 12px rgba(0,0,0,0.2)" : "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{act.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{act.tag}</div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: textPrimary, margin: "0 0 8px" }}>{act.title}</h3>
                <p style={{ color: textSecondary, fontSize: 14, margin: 0, lineHeight: 1.6 }}>{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS ROW */}
      <section id="budget-guide" style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0ea5e9", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Live Rates</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: textPrimary, margin: "0 0 20px" }}>Currency Converter</h2>
            <CurrencyConverter />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Today's Weather</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: textPrimary, margin: "0 0 20px" }}>Sri Lanka Weather</h2>
            <WeatherWidget />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: darkMode ? "#0f172a" : "linear-gradient(135deg, #0c4a6e, #065f46)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, color: "white", margin: "0 0 12px" }}>Loved by Indian Travelers</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }}>Real reviews from real Indian tourists</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", borderRadius: 20, padding: "24px", border: "1px solid rgba(255,255,255,0.15)" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color: "#fbbf24", fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 15, lineHeight: 1.7, margin: "0 0 18px", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #f97316, #ef4444)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "white" }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "white", fontSize: 14 }}>{t.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>🇮🇳 {t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Got Questions?</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, color: textPrimary, margin: 0 }}>Frequently Asked by Indian Travelers</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: darkMode ? "#1e293b" : "white", borderRadius: 14, border: `1px solid ${border}`, overflow: "hidden" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <span style={{ fontWeight: 600, fontSize: 15, color: textPrimary, lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ fontSize: 20, color: "#f97316", flexShrink: 0, marginLeft: 12, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 20px 18px", borderTop: `1px solid ${border}` }}>
                  <p style={{ margin: "12px 0 0", color: textSecondary, fontSize: 14, lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={{ background: darkMode ? "#020617" : "#0f172a", color: "rgba(255,255,255,0.8)", padding: "60px 24px 30px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ background: "linear-gradient(135deg, #0ea5e9, #16a34a)", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌴</div>
                <span style={{ fontWeight: 800, fontSize: 20, color: "white" }}>LankaTrip <span style={{ color: "#f97316" }}>India</span></span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>Your trusted guide for Sri Lanka travel, crafted specifically for Indian travelers.</p>
            </div>
            <div>
              <h4 style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Contact Us</h4>
              {[["📞", "+94 77 123 4567"], ["✉️", "hello@lankatripindia.com"], ["📍", "12 Galle Road, Colombo, Sri Lanka"]].map(([icon, info]) => (
                <div key={info} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{info}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Quick Links</h4>
              {["Privacy Policy", "Terms & Conditions", "Destinations", "Budget Guide", "Contact"].map(link => (
                <div key={link} style={{ marginBottom: 10 }}>
                  <a href="#" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textDecoration: "none" }}>{link}</a>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Follow Us</h4>
              {[["📸", "Instagram"], ["▶️", "YouTube"], ["💬", "WhatsApp"]].map(([icon, platform]) => (
                <div key={platform} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <a href="#" style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, textDecoration: "none" }}>{platform}</a>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>© 2025 LankaTrip India · Made with ❤️ for Indian Travelers · All rights reserved</p>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "linear-gradient(135deg, #f97316, #ef4444)", color: "white", border: "none", borderRadius: 14, padding: "12px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 8px 24px rgba(249,115,22,0.5)", display: "flex", alignItems: "center", gap: 8 }}
        >
          🗺 Plan Your Trip
        </button>
      </div>

      {/* Modal */}
      {activeModal && <DestinationModal dest={activeModal} onClose={() => setActiveModal(null)} />}
    </div>
  );
}
