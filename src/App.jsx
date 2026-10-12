import { useState, useEffect } from "react";
import heroImg from "./assets/hero.jpg";
import toteBag from "./assets/toteBag.jpeg";
import softToy from "./assets/softToy.jpeg";
import curtain from "./assets/Curtain.jpeg";
import placeMat from "./assets/diningPlaceMat.jpeg";
import scrunchie from "./assets/scruchies.jpeg";
import baseballCap from "./assets/cap.jpeg";

// Prices are from the costing slide (our price, not market price). All items are sold individually.
const PRODUCTS = [
  { id: 1, img: placeMat,    name: "Dining Placemat",    price: 75,  from: "old cotton bedsheets",    tag: "45 × 30 cm",          fabric: "check",   c: ["#8fa98b", "#fbfbf8"] },
  { id: 2, img: scrunchie,   name: "Fabric Scrunchie",   price: 49,  from: "fabric offcuts",          tag: "Zero waste",          fabric: "dots",    c: ["#f5b544", "#b5483a"] },
  { id: 3, img: baseballCap, name: "Adult Denim Cap",    price: 119, from: "old jeans",               tag: "Fits 56–60 cm",       fabric: "diamond", c: ["#1b2547", "#e86a52"] },
  { id: 4, img: softToy,     name: "Upcycled Soft Toy",  price: 299, from: "soft cotton tees",        tag: "Child-safe stuffing", fabric: "dots",    c: ["#b5483a", "#eaeef5"] },
  { id: 5, img: curtain,     name: "Medium Curtain",     price: 499, from: "sarees and dupattas",     tag: "5 ft × 7 ft",         fabric: "stripe",  c: ["#1b2547", "#f5b544"] },
  { id: 6, img: toteBag,     name: "Patchwork Tote Bag", price: 349, from: "old jeans",               tag: "15 × 16 × 4 in",      fabric: "check",   c: ["#3c5a8a", "#eaeef5"] },
];

const fabricStyle = ({ fabric, c: [a, b] }) => {
  switch (fabric) {
    case "stripe":
      return { background: `repeating-linear-gradient(90deg, ${a} 0 14px, ${b} 14px 22px)` };
    case "check":
      return { background: `linear-gradient(90deg, ${b}66 50%, transparent 50%) 0 0/28px 28px, linear-gradient(${b}66 50%, transparent 50%) 0 0/28px 28px, ${a}` };
    case "dots":
      return { background: `radial-gradient(${b} 22%, transparent 24%) 0 0/24px 24px, ${a}` };
    default:
      return { background: `conic-gradient(from 45deg at 50% 50%, ${a} 0 25%, ${b} 0 50%, ${a} 0 75%, ${b} 0) 0 0/36px 36px` };
  }
};

// Shows the product photo; if it fails to load, falls back to the fabric swatch.
function Photo({ p }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="swatch" style={ok ? undefined : fabricStyle(p)}>
      {ok && <img src={p.img} alt={p.name} loading="lazy" onError={() => { console.error("Image failed to load:", p.name, p.img); setOk(false); }} />}
      <span className="pill">{p.tag}</span>
    </div>
  );
}

const STEPS = [
  { t: "You give", d: "Pack clothes you no longer wear. We pick them up from your door or you drop them at a partner point. It's free." },
  { t: "We sort and clean", d: "Every piece is washed and sorted by fabric and colour. Wearable clothes go to people who need them." },
  { t: "Artisans remake", d: "The rest goes to tailors and stitchers who turn it into new, one-of-a-kind pieces." },
  { t: "You wear it again", d: "Each product tells you which clothes it was made from. Nothing new is woven for it." },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("pv-theme") || "dark"; } catch { return "dark"; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("pv-theme", theme); } catch { /* ignore */ }
  }, [theme]);
  const isDark = theme === "dark";
  const [sent, setSent] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", city: "", items: "5-10", mode: "pickup" });

  const toggle = (id) => setCart((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSent(form.name);
    setForm({ name: "", phone: "", city: "", items: "5-10", mode: "pickup" });
  };

  return (
    <>
      <header className="nav">
        <a href="#top" className="logo">Punarvastra</a>
        <nav>
          <a href="#how">How it works</a>
          <a href="#shop">Shop</a>
          <a href="#give">Give clothes</a>
        </nav>
        <div className="tools">
          <button
            className="theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            ) : (
              <svg viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            )}
          </button>
          <a href="#shop" className="cart" aria-label={`Bag, ${cart.length} items`}>Bag ({cart.length})</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <h1>Old clothes,<br />woven again.</h1>
            <svg className="stitch" viewBox="0 0 400 12" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" y1="6" x2="400" y2="6" />
            </svg>
            <p>
              Punarvastra turns the clothes you've stopped wearing into new things worth keeping.
              Give yours for free, or buy something that was once someone else's favourite.
            </p>
            <div className="actions">
              <a className="btn solid" href="#give">Give your clothes</a>
              <a className="btn line" href="#shop">Shop the collection</a>
            </div>
          </div>
          <div className="hero-img">
            <img src={heroImg} alt="Handmade products made from recycled clothes" />
          </div>
        </section>

        <section className="facts">
          <p><b>2,400+</b> garments collected</p>
          <p><b>0</b> new fabric used in our products</p>
          <p><b>38</b> local tailors and stitchers paid fairly</p>
        </section>

        <section id="how" className="section">
          <h2>From your wardrobe to someone else's</h2>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.t}>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="shop" className="section">
          <div className="head">
            <h2>Made from what you gave</h2>
            <p>Every piece is made once. When it sells out, it's gone.</p>
          </div>
          <div className="grid">
            {PRODUCTS.map((p) => (
              <article key={p.id} className="card">
                <Photo p={p} />
                <h3>{p.name}</h3>
                <p className="from">Made from {p.from}</p>
                <div className="row">
                  <span className="price">₹{p.price.toLocaleString("en-IN")}</span>
                  <button className={cart.includes(p.id) ? "add on" : "add"} onClick={() => toggle(p.id)}>
                    {cart.includes(p.id) ? "In your bag" : "Add to bag"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="give" className="give">
          <div className="give-copy">
            <h2>Give us clothes you don't wear</h2>
            <p>
              Cotton, denim, silk, wool: all welcome, in any condition. Clean is better, but
              torn and faded works too. There's no cost and no minimum.
            </p>
            <ul>
              <li>Free pickup from your home</li>
              <li>Or drop off at a partner point</li>
              <li>We tell you what your clothes became</li>
            </ul>
          </div>

          {sent ? (
            <div className="done" role="status">
              <h3>Thank you, {sent}.</h3>
              <p>We've got your request. Our team will call you within 2 days to confirm a time.</p>
              <button className="btn line" onClick={() => setSent(null)}>Give more clothes</button>
            </div>
          ) : (
            <form className="form" onSubmit={submit}>
              <label>Your name<input required value={form.name} onChange={set("name")} /></label>
              <label>Phone number<input required type="tel" value={form.phone} onChange={set("phone")} /></label>
              <label>City<input required value={form.city} onChange={set("city")} /></label>
              <label>
                How many clothes?
                <select value={form.items} onChange={set("items")}>
                  <option>1-4</option><option>5-10</option><option>11-25</option><option>25+</option>
                </select>
              </label>
              <fieldset>
                <legend>How should we get them?</legend>
                <label className="radio"><input type="radio" name="mode" value="pickup" checked={form.mode === "pickup"} onChange={set("mode")} />Pick up from me</label>
                <label className="radio"><input type="radio" name="mode" value="drop" checked={form.mode === "drop"} onChange={set("mode")} />I'll drop them off</label>
              </fieldset>
              <button className="btn solid" type="submit">Request free pickup</button>
            </form>
          )}
        </section>
      </main>

      <footer className="footer">
        <span className="logo">Punarvastra</span>
        <p>Punar means again. Vastra means cloth.</p>
        <p>hello@punarvastra.in</p>
      </footer>
    </>
  );
}