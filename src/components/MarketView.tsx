import React, { useState } from "react";
import { MarketListing, MarketOrder, UserProfile, TabType, Animal } from "../types";
import { t, translateMarketTitle, translateMarketDesc, translateMarketBadge, translateMarketCategory, translateLocation, Language } from "../utils/i18n";
import { SmartImage } from "./ui/SmartImage";
import { EmptyState } from "./ui/EmptyState";
import { motion, AnimatePresence } from "motion/react";
import {
  Store,
  MapPin,
  Phone,
  MessageSquare,
  Plus,
  Truck,
  CheckCircle2,
  X,
  Package,
  Sparkles,
  Inbox,
  ShieldCheck
} from "lucide-react";

interface MarketViewProps {
  listings: MarketListing[];
  orders?: MarketOrder[];
  user: UserProfile;
  onAddListing?: (listing: Partial<MarketListing>) => void;
  onPlaceOrder?: (order: Partial<MarketOrder>) => void;
  onTabChange?: (tab: TabType) => void;
  userLanguage?: Language | string;
  animals?: Animal[];
}

export const MarketView: React.FC<MarketViewProps> = ({
  listings,
  orders = [],
  user,
  onAddListing,
  onPlaceOrder,
  userLanguage = "English",
}) => {
  const currentLang = (userLanguage as Language) || "English";
  const [activeSubTab, setActiveSubTab] = useState<"browse" | "orders" | "seller-inbox">("browse");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRadius, setSelectedRadius] = useState<number>(50);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Listing Form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<
    "Cattle for Sale" | "Feed Suppliers" | "Equipment" | "Veterinarians" | "Breeders"
  >("Cattle for Sale");
  const [price, setPrice] = useState(48000);
  const [description, setDescription] = useState("");
  const [locationName, setLocationName] = useState(user.location || "Dharapuram, Tiruppur");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (onAddListing) {
      onAddListing({
        id: `mkt-${Date.now()}`,
        title: title.trim(),
        name: user.name,
        category,
        price,
        priceFormatted: `₹${price.toLocaleString("en-IN")}`,
        imageUrl: "/cows/kangeyam.jpg",
        description: description.trim() || "High quality livestock asset.",
        location: locationName,
        phone: user.mobile,
        whatsapp: user.mobile.replace(/\D/g, ""),
        distanceKm: 2.5,
        rating: 4.9,
        isVerified: true,
        statusBadge: "Farmer Direct",
      });
    }

    setTitle("");
    setDescription("");
    setIsAddListingOpen(false);
    showToast("Listing posted to marketplace!");
  };

  const handleWhatsAppOrder = (item: MarketListing) => {
    const text = encodeURIComponent(
      `Hello ${item.name}, I am interested in buying "${item.title}" (${item.priceFormatted || "₹" + item.price}) from CattleIQ Marketplace. Is it available?`
    );
    const phone = (item.whatsapp || item.phone || "9842213456").replace(/\D/g, "");
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");

    if (onPlaceOrder) {
      onPlaceOrder({
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        listingId: item.id,
        itemTitle: item.title,
        itemPrice: item.price || 0,
        quantity: 1,
        totalAmount: item.price || 0,
        buyerName: user.name,
        buyerPhone: user.mobile,
        buyerLocation: user.location,
        sellerName: item.name,
        sellerPhone: item.phone || user.mobile,
        sellerWhatsapp: phone,
        status: "accepted",
        createdAt: new Date().toISOString(),
      });
    }

    showToast("Order initiated & seller notified via WhatsApp!");
  };

  const handleCallSeller = (phone?: string) => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const filteredListings = listings.filter((item) => {
    if (selectedCategory !== "All" && item.category !== selectedCategory) return false;
    if (selectedRadius < 500 && (item.distanceKm || 10) > selectedRadius) return false;
    return true;
  });

  return (
    <main className="w-full px-4 py-4 pb-28 space-y-4 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">
      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sub-tab Switcher */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-2xl flex items-center gap-1 border border-zinc-200/80 dark:border-zinc-800">
        <button
          onClick={() => setActiveSubTab("browse")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === "browse"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-extrabold"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Store className="w-4 h-4" />
          <span>{t("marketplace", currentLang)}</span>
        </button>

        <button
          onClick={() => setActiveSubTab("orders")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === "orders"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-extrabold"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>{t("myOrders", currentLang)} ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("seller-inbox")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === "seller-inbox"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-extrabold"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>{t("salesInbox", currentLang)}</span>
        </button>
      </div>

      {activeSubTab === "browse" && (
        <div className="space-y-3.5">
          {/* Filter Bar: Radius & Categories */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{t("gpsRadius", currentLang)} ({user.location ? user.location.split(",")[0] : ""})</span>
              </span>

              <button
                onClick={() => setIsAddListingOpen(true)}
                className="px-3 py-1.5 bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t("postListing", currentLang)}</span>
              </button>
            </div>

            {/* Radius Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {[
                { label: t("within15km", currentLang), value: 15 },
                { label: t("within50km", currentLang), value: 50 },
                { label: t("within100km", currentLang), value: 100 },
                { label: t("allTamilNadu", currentLang), value: 500 },
              ].map((rad) => (
                <button
                  key={rad.value}
                  onClick={() => setSelectedRadius(rad.value)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedRadius === rad.value
                      ? "bg-zinc-900 dark:bg-emerald-600 text-white shadow-xs"
                      : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                  }`}
                >
                  {rad.label}
                </button>
              ))}
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {["All", "Cattle for Sale", "Feed Suppliers", "Veterinarians", "Equipment"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-zinc-900 dark:bg-emerald-600 text-white shadow-xs font-extrabold"
                      : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                  }`}
                >
                  {cat === "All"
                    ? t("all", currentLang)
                    : cat === "Cattle for Sale"
                    ? t("cattleForSale", currentLang)
                    : cat === "Feed Suppliers"
                    ? t("feedSuppliers", currentLang)
                    : cat === "Veterinarians"
                    ? t("veterinarians", currentLang)
                    : cat === "Equipment"
                    ? currentLang === "Tamil"
                      ? "உபகரணங்கள்"
                      : currentLang === "Hindi"
                      ? "उपकरण"
                      : "Equipment"
                    : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Listings Grid */}
          {filteredListings.length === 0 ? (
            <EmptyState
              icon="storefront"
              title={t("noListingsFound", currentLang)}
              description={t("broadenRadiusDesc", currentLang)}
              actionText={t("postFirstListing", currentLang)}
              onAction={() => setIsAddListingOpen(true)}
            />
          ) : (
            <div className="space-y-3">
              {filteredListings.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-4 shadow-2xs space-y-3"
                >
                  <div className="flex gap-3.5">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-100 dark:border-zinc-800">
                      <SmartImage
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full"
                      />
                      {item.distanceKm && (
                        <span className="absolute top-1 left-1 text-[9px] font-mono font-bold bg-black/80 text-white px-1.5 py-0.2 rounded">
                          {item.distanceKm} km
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                          {translateMarketCategory(item.category, currentLang)}
                        </span>
                        <span className="font-extrabold text-sm sm:text-base text-emerald-700 dark:text-emerald-400 font-mono">
                          {item.priceFormatted || `₹${item.price?.toLocaleString("en-IN")}`}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white font-display mt-1 truncate">
                        {translateMarketTitle(item.title, currentLang)}
                      </h4>

                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                        {translateLocation(item.location, currentLang)} • {item.name}
                      </p>

                      <p className="text-[11px] text-zinc-600 dark:text-zinc-300 line-clamp-2 mt-1 leading-snug">
                        {translateMarketDesc(item.description, currentLang)}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      onClick={() => handleWhatsAppOrder(item)}
                      className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{t("buyNow", currentLang)} (WhatsApp)</span>
                    </button>

                    <button
                      onClick={() => handleCallSeller(item.phone)}
                      className="py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{t("callSeller", currentLang)}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Orders Tracker */}
      {activeSubTab === "orders" && (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-4 shadow-2xs space-y-3.5"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block font-bold">
                    {currentLang === "Tamil" ? "ஆர்டர்" : currentLang === "Hindi" ? "ऑर्डर" : "ORDER"} #{order.id}
                  </span>
                  <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white font-display mt-0.5">
                    {translateMarketTitle(order.itemTitle, currentLang)}
                  </h4>
                </div>
                <span className="font-mono font-bold text-sm text-emerald-700 dark:text-emerald-400">
                  ₹{order.totalAmount?.toLocaleString("en-IN")}
                </span>
              </div>

              {/* 5-Step Visual Stepper */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-mono font-bold uppercase text-zinc-400">
                  <span>{currentLang === "Tamil" ? "பதிவு" : currentLang === "Hindi" ? "दर्ज" : "Placed"}</span>
                  <span>{currentLang === "Tamil" ? "உறுதி" : currentLang === "Hindi" ? "पुष्टि" : "Confirmed"}</span>
                  <span>{currentLang === "Tamil" ? "பயணம்" : currentLang === "Hindi" ? "पारगमन" : "Transit"}</span>
                  <span>{currentLang === "Tamil" ? "மருத்துவர்" : currentLang === "Hindi" ? "जांच" : "Vet Check"}</span>
                  <span>{currentLang === "Tamil" ? "டெலிவரி" : currentLang === "Hindi" ? "वितरित" : "Delivered"}</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width:
                        order.status === "completed"
                          ? "100%"
                          : order.status === "ready"
                          ? "80%"
                          : order.status === "preparing"
                          ? "60%"
                          : order.status === "accepted"
                          ? "40%"
                          : "20%",
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>
                  {currentLang === "Tamil" ? "நிலை" : currentLang === "Hindi" ? "स्थिति" : "Status"}:{" "}
                  <strong className="text-zinc-900 dark:text-white capitalize">
                    {order.status === "accepted"
                      ? (currentLang === "Tamil" ? "ஏற்றுக்கொள்ளப்பட்டது" : currentLang === "Hindi" ? "स्वीकृत" : "Accepted")
                      : order.status === "preparing"
                      ? (currentLang === "Tamil" ? "தயாராகிறது" : currentLang === "Hindi" ? "तैयार हो रहा है" : "Preparing")
                      : order.status === "ready"
                      ? (currentLang === "Tamil" ? "தயார்" : currentLang === "Hindi" ? "तैयार" : "Ready")
                      : order.status === "completed"
                      ? (currentLang === "Tamil" ? "முடிக்கப்பட்டது" : currentLang === "Hindi" ? "पूर्ण" : "Completed")
                      : order.status}
                  </strong>
                </span>
                <span>{currentLang === "Tamil" ? "விற்பனையாளர்" : currentLang === "Hindi" ? "विक्रेता" : "Seller"}: {order.sellerName}</span>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <EmptyState
              icon="local_shipping"
              title={currentLang === "Tamil" ? "செயலில் உள்ள ஆர்டர்கள் இல்லை" : currentLang === "Hindi" ? "कोई सक्रिय ऑर्डर नहीं" : "No Active Orders"}
              description={currentLang === "Tamil" ? "வாட்ஸ்அப் அல்லது சந்தை மூலம் பதிவு செய்யப்பட்ட ஆர்டர்கள் இங்கு தோன்றும்." : currentLang === "Hindi" ? "व्हाट्सएप या सीधे बाजार से दिए गए ऑर्डर यहां दिखाई देंगे।" : "Orders placed via WhatsApp or Direct Marketplace will appear here with live tracking."}
              actionText={currentLang === "Tamil" ? "சந்தையைக் காண்க" : currentLang === "Hindi" ? "बाज़ार ब्राउज़ करें" : "Browse Marketplace"}
              onAction={() => setActiveSubTab("browse")}
            />
          )}
        </div>
      )}

      {/* Seller Sales Inbox */}
      {activeSubTab === "seller-inbox" && (
        <div className="space-y-3">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-5 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-zinc-900 dark:text-white font-display">
              {currentLang === "Tamil" ? "விவசாயிகள் விற்பனை மையம்" : currentLang === "Hindi" ? "किसान बिक्री केंद्र" : "Farmer Sales Hub"}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {currentLang === "Tamil"
                ? "உங்கள் மாடுகள் மற்றும் விவசாய விளைபொருட்களுக்கான விசாரணைகள் மற்றும் டெலிவரி நிலையை நிர்வகிக்கவும்."
                : currentLang === "Hindi"
                ? "अपने मवेशियों और कृषि उपज के लिए आने वाली पूछताछ और डिलीवरी प्रबंधित करें।"
                : "Manage incoming inquiries and delivery approvals for your posted cattle and agricultural produce."}
            </p>

            <button
              onClick={() => setIsAddListingOpen(true)}
              className="w-full py-3 bg-zinc-900 dark:bg-emerald-600 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>
                {currentLang === "Tamil"
                  ? "புதிய மாடு / பண்ணை விளைபொருள் பதிவு செய்க"
                  : currentLang === "Hindi"
                  ? "नई कृषि उपज / मवेशी जोड़ें"
                  : "Post New Farm Produce / Animal"}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Add Listing Modal */}
      <AnimatePresence>
        {isAddListingOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
            <motion.form
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              onSubmit={handleCreateListing}
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white w-full max-w-md rounded-3xl p-5 shadow-2xl border border-zinc-100 dark:border-zinc-800 space-y-3.5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white font-display">
                  Post Marketplace Listing
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddListingOpen(false)}
                  className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Listing Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kangayam Purebred Heifer (1st Calving)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none cursor-pointer"
                  >
                    <option value="Cattle for Sale">Cattle for Sale</option>
                    <option value="Feed Suppliers">Feed Suppliers</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Veterinarians">Veterinarians</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Milk yield, vaccination records, pedigree line..."
                  className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="submit"
                  className="py-3 rounded-xl bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  Publish Listing
                </button>

                <button
                  type="button"
                  onClick={() => setIsAddListingOpen(false)}
                  className="py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MarketView;
