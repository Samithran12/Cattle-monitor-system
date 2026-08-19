import React, { useState } from "react";
import { MarketListing, MarketOrder, UserProfile } from "../types";
import {
  calculateDistanceKm,
  findNearestDistrict,
  getCurrentGpsPosition,
  MAJOR_AGRICULTURAL_DISTRICTS,
  DEFAULT_USER_LOCATION,
  GeoLocation,
  formatDistance,
} from "../utils/location";
import {
  loadStoredMarketListings,
  saveStoredMarketListings,
  loadStoredOrders,
  saveStoredOrders,
  loadStoredNotifications,
  saveStoredNotifications,
  AppNotification,
} from "../utils/storage";
import { t, translateBreedName, Language } from "../utils/i18n";
import { SmartImage } from "./ui/SmartImage";
import { auth, db, doc, setDoc } from "../lib/firebase";

interface MarketViewProps {
  listings: MarketListing[];
  userLanguage?: string;
  user: UserProfile;
}

export const MarketView: React.FC<MarketViewProps> = ({
  userLanguage = "English",
  user,
}) => {
  const currentLang = userLanguage as Language;
  const [activeMarketTab, setActiveMarketTab] = useState<"browse" | "my-orders" | "sales" | "new-listing">("browse");

  const [currentDistricts] = useState<GeoLocation[]>(MAJOR_AGRICULTURAL_DISTRICTS);
  const [selectedLocation, setSelectedLocation] = useState<GeoLocation>(() => {
    return findNearestDistrict(DEFAULT_USER_LOCATION.latitude, DEFAULT_USER_LOCATION.longitude);
  });
  const [selectedRadius, setSelectedRadius] = useState<number>(100);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [allListings, setAllListings] = useState<MarketListing[]>(() => loadStoredMarketListings());
  const [orders, setOrders] = useState<MarketOrder[]>(() => loadStoredOrders());

  // Modal State
  const [orderingListing, setOrderingListing] = useState<MarketListing | null>(null);
  const [orderQty, setOrderQty] = useState<number>(1);
  const [buyerName, setBuyerName] = useState<string>(user.name || "Farmer");
  const [buyerPhone, setBuyerPhone] = useState<string>(user.mobile || "+91 98422 13456");
  const [buyerAddress, setBuyerAddress] = useState<string>(user.location || "Dharapuram, Tiruppur");
  const [orderNotes, setOrderNotes] = useState<string>("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Listing Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<MarketListing["category"]>("Cattle for Sale");
  const [newPrice, setNewPrice] = useState("");
  const [newBreed, setNewBreed] = useState("Kangayam");
  const [newMilkYield, setNewMilkYield] = useState("6L / day");
  const [newDesc, setNewDesc] = useState("");
  const [newPhone, setNewPhone] = useState(user.mobile || "+91 98422 13456");
  const [newCity, setNewCity] = useState(selectedLocation.name);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAcquireGps = async () => {
    setIsLocating(true);
    try {
      const pos = await getCurrentGpsPosition();
      setSelectedLocation(pos);
      showToast(`Location updated: ${pos.name}`);
    } catch {
      showToast("GPS unavailable. Selected district manually.");
    } finally {
      setIsLocating(false);
    }
  };

  const listingsWithDistance = allListings.map((item) => {
    const itemLat = item.latitude || DEFAULT_USER_LOCATION.latitude;
    const itemLon = item.longitude || DEFAULT_USER_LOCATION.longitude;
    const dist = calculateDistanceKm(
      selectedLocation.latitude,
      selectedLocation.longitude,
      itemLat,
      itemLon
    );
    return {
      ...item,
      distanceKm: dist,
      distance: formatDistance(dist),
    };
  });

  const filteredListings = listingsWithDistance
    .filter((item) => {
      const matchCat = selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.breed && item.breed.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDist = selectedRadius === 0 || (item.distanceKm !== undefined && item.distanceKm <= selectedRadius);
      return matchCat && matchSearch && matchDist;
    })
    .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

  const generateWhatsAppUrl = (order: MarketOrder, sellerPhoneRaw?: string) => {
    const rawNumber = (sellerPhoneRaw || order.sellerWhatsapp || order.sellerPhone || "919842213456").replace(/\D/g, "");
    const phoneWithCountry = rawNumber.startsWith("91") ? rawNumber : `91${rawNumber}`;

    const textPayload = `*CattleIQ - New Livestock Order*
--------------------------------
Product: ${order.itemTitle}
Total Amount: Rs ${order.totalAmount.toLocaleString()}
Quantity: ${order.quantity}
Buyer Name: ${order.buyerName}
Contact: ${order.buyerPhone}
Delivery Location: ${order.buyerLocation}
Order ID: ${order.id}
Notes: ${order.notes || "Ready for prompt delivery"}
--------------------------------
Please confirm order in CattleIQ App or reply to this message.`;

    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(textPayload)}`;
  };

  const handlePlaceOrder = () => {
    if (!orderingListing) return;

    const unitPrice = orderingListing.price || 50000;
    const total = unitPrice * orderQty;
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: MarketOrder = {
      id: newOrderId,
      listingId: orderingListing.id,
      itemTitle: orderingListing.title,
      itemPrice: unitPrice,
      quantity: orderQty,
      totalAmount: total,
      buyerName: buyerName.trim() || user.name,
      buyerPhone: buyerPhone.trim() || user.mobile,
      buyerLocation: buyerAddress.trim() || user.location,
      sellerName: orderingListing.name,
      sellerPhone: orderingListing.phone || "+91 98422 13456",
      sellerWhatsapp: orderingListing.whatsapp || "919842213456",
      status: "pending",
      notes: orderNotes.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveStoredOrders(updated);

    if (auth.currentUser) {
      const orderRef = doc(db, "marketOrders", newOrderId);
      setDoc(orderRef, {
        ...newOrder,
        buyerUid: auth.currentUser.uid,
        updatedAt: new Date().toISOString(),
      }).catch((e) => console.warn("Market order cloud sync notice:", e));
    }

    const notifs = loadStoredNotifications();
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: "Market",
      title: `Order Placed (${newOrderId})`,
      description: `Your order for ${orderingListing.title} is now pending seller confirmation.`,
      time: "Just now",
      read: false,
      orderId: newOrderId,
    };
    saveStoredNotifications([newNotif, ...notifs]);

    setOrderingListing(null);
    setOrderNotes("");
    setActiveMarketTab("my-orders");
    showToast(
      currentLang === "Tamil"
        ? `ஆர்டர் வைக்கப்பட்டது (${newOrderId})!`
        : `Order placed successfully (${newOrderId})!`
    );
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: MarketOrder["status"], reason?: string) => {
    const updated = orders.map((ord) => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: newStatus,
          rejectionReason: reason || ord.rejectionReason,
          updatedAt: new Date().toISOString(),
        };
      }
      return ord;
    });

    setOrders(updated);
    saveStoredOrders(updated);
    showToast(`Order status updated to ${newStatus.toUpperCase()}`);
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const district = currentDistricts.find((d) => d.name === newCity) || selectedLocation;
    const priceNum = parseInt(newPrice.replace(/\D/g, ""), 10) || 50000;

    const newListingItem: MarketListing = {
      id: `mkt-${Date.now()}`,
      category: newCategory,
      name: `${user.name} (${user.farmName || "Farmer"})`,
      title: newTitle.trim(),
      price: priceNum,
      priceFormatted: `₹${priceNum.toLocaleString()}`,
      rating: 5.0,
      ratingCount: 1,
      statusBadge: "Farmer Direct",
      isVerified: true,
      isTopMatch: true,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCBQg5UVCWScCauWXK56yTX7m432h5tl0s9u4PAc8CWK_13hMLMZzPxBB6MkwGp4qL9sz9toOhX-1HUlRbQcLPRDBWewM2Fu457y76aUp4aY6iVZisDoCCco9UdclOwE2EUWGdkO32-ZGc6B2AXzudagjLEvEdo7F3US5oKDhiXu5ezAd6UGdnT2PgJDYcwqgjRV6skQV5pwGgnwKMIJfux3N8fB3dUgH-QM7kILYhQubSFYEMqeXSES66p1Dp4vheql3Gtbwny8fo",
      description: newDesc.trim() || "Farmer direct livestock listing.",
      phone: newPhone.trim(),
      whatsapp: newPhone.replace(/\D/g, ""),
      location: `${district.name}, ${district.state}`,
      city: district.name,
      state: district.state,
      latitude: district.latitude,
      longitude: district.longitude,
      actionText: "Buy Direct",
      breed: newCategory === "Cattle for Sale" ? newBreed : undefined,
      milkYield: newCategory === "Cattle for Sale" ? newMilkYield : undefined,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newListingItem, ...allListings];
    setAllListings(updated);
    saveStoredMarketListings(updated);

    if (auth.currentUser) {
      const listingRef = doc(db, "marketListings", newListingItem.id);
      setDoc(listingRef, {
        ...newListingItem,
        sellerUid: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      }).catch((e) => console.warn("Market listing cloud sync notice:", e));
    }

    setNewTitle("");
    setNewPrice("");
    setNewDesc("");
    setActiveMarketTab("browse");
    showToast("Market listing published successfully!");
  };

  return (
    <main className="w-full px-4 py-4 pb-28 space-y-4 text-slate-900 font-sans">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-emerald-400">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Sub Navigation Tabs */}
      <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/60">
        <button
          onClick={() => setActiveMarketTab("browse")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
            activeMarketTab === "browse"
              ? "bg-white text-slate-900 shadow-xs font-extrabold"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <span className="material-symbols-outlined text-base">storefront</span>
          <span>{t("marketplace", currentLang)}</span>
        </button>

        <button
          onClick={() => setActiveMarketTab("my-orders")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 relative ${
            activeMarketTab === "my-orders"
              ? "bg-white text-slate-900 shadow-xs font-extrabold"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <span className="material-symbols-outlined text-base">shopping_bag</span>
          <span>{t("myOrders", currentLang)}</span>
          {orders.length > 0 && (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          )}
        </button>

        <button
          onClick={() => setActiveMarketTab("sales")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
            activeMarketTab === "sales"
              ? "bg-white text-slate-900 shadow-xs font-extrabold"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <span className="material-symbols-outlined text-base">inbox</span>
          <span>{t("salesInbox", currentLang)}</span>
        </button>

        <button
          onClick={() => setActiveMarketTab("new-listing")}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
            activeMarketTab === "new-listing"
              ? "bg-white text-slate-900 shadow-xs font-extrabold"
              : "text-slate-500 hover:text-slate-900"
          }`}
          title={t("postListing", currentLang)}
        >
          <span className="material-symbols-outlined text-base font-bold">add</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: BROWSE MARKET */}
      {/* ========================================================================= */}
      {activeMarketTab === "browse" && (
        <div className="space-y-3.5">
          {/* Location & GPS Search Bar */}
          <div className="p-3.5 bg-white rounded-3xl border border-slate-100 shadow-[0_2px_14px_rgba(15,23,42,0.03)] space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-2xl border border-slate-200/80 flex-1 min-w-0">
                <span className="material-symbols-outlined text-slate-500 text-lg shrink-0">location_on</span>
                <select
                  value={selectedLocation.name}
                  onChange={(e) => {
                    const found = currentDistricts.find((d) => d.name === e.target.value);
                    if (found) setSelectedLocation(found);
                  }}
                  className="bg-transparent text-slate-900 font-bold text-xs outline-none w-full cursor-pointer"
                >
                  {currentDistricts.map((dist) => (
                    <option key={dist.name} value={dist.name} className="bg-white text-slate-900">
                      {dist.name} ({dist.state})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAcquireGps}
                disabled={isLocating}
                className="px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
              >
                <span className={`material-symbols-outlined text-base ${isLocating ? "animate-spin" : ""}`}>
                  my_location
                </span>
                <span>{isLocating ? "Locating..." : t("nearMe", currentLang)}</span>
              </button>
            </div>

            {/* Radius Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              <span className="text-[10px] font-bold uppercase text-slate-400 mr-1 shrink-0">Radius:</span>
              {[15, 50, 100, 250, 0].map((radius) => (
                <button
                  key={radius}
                  onClick={() => setSelectedRadius(radius)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedRadius === radius
                      ? "bg-slate-900 text-white font-bold shadow-xs"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {radius === 0 ? t("allIndia", currentLang) : `${radius} km`}
                </button>
              ))}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {["All", "Cattle for Sale", "Feed Suppliers", "Veterinarians"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                  }`}
                >
                  {cat === "All"
                    ? t("all", currentLang)
                    : cat === "Cattle for Sale"
                    ? t("cattleForSale", currentLang)
                    : cat === "Feed Suppliers"
                    ? t("feedSuppliers", currentLang)
                    : t("veterinarians", currentLang)}
                </button>
              ))}
            </div>
          </div>

          {/* Listings Feed */}
          <div className="space-y-3">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white border border-slate-100 rounded-3xl p-4 shadow-[0_2px_14px_rgba(15,23,42,0.03)] space-y-3"
              >
                <div className="flex gap-3.5">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <SmartImage
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="w-full h-full"
                    />
                    <span className="absolute top-1.5 left-1.5 bg-white/95 text-slate-800 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {listing.distance}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        {listing.category}
                      </span>
                      <span className="text-sm font-extrabold text-slate-900 font-display">
                        {listing.priceFormatted || `₹${listing.price?.toLocaleString()}`}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 font-display leading-tight mt-1 truncate">
                      {listing.title}
                    </h4>

                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {listing.name} • {listing.location}
                    </p>

                    {listing.breed && (
                      <div className="flex items-center gap-1.5 mt-1 text-[11px] font-mono text-slate-600">
                        <span>{translateBreedName(listing.breed, currentLang)}</span>
                        {listing.milkYield && <span>• {listing.milkYield}</span>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setOrderingListing(listing);
                      setOrderQty(1);
                    }}
                    className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">shopping_cart</span>
                    <span>{t("buyNow", currentLang)}</span>
                  </button>

                  <a
                    href={`https://wa.me/${(listing.whatsapp || "919842213456").replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${listing.name}, I saw your listing for "${listing.title}" on CattleIQ. Is it still available?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base text-emerald-600">chat</span>
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${listing.phone || "9842213456"}`}
                    className="py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">call</span>
                    <span>
                      {listing.category === "Veterinarians"
                        ? t("callDoctor", currentLang)
                        : currentLang === "Tamil"
                        ? "அழைக்கவும்"
                        : currentLang === "Hindi"
                        ? "कॉल करें"
                        : "Call"}
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MY PURCHASES & ORDER STATUS TRACKER */}
      {/* ========================================================================= */}
      {activeMarketTab === "my-orders" && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
              {t("myOrders", currentLang)}
            </h3>
            <span className="text-xs font-bold text-slate-700">
              {orders.length} Active Orders
            </span>
          </div>

          <div className="space-y-3">
            {orders.map((order) => {
              const statusStep =
                order.status === "pending"
                  ? 1
                  : order.status === "accepted"
                  ? 2
                  : order.status === "preparing"
                  ? 3
                  : order.status === "ready"
                  ? 4
                  : order.status === "completed"
                  ? 5
                  : 0;

              return (
                <div
                  key={order.id}
                  className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-extrabold text-slate-900">{order.id}</span>
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                          {order.status}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900 font-display mt-1">
                        {order.itemTitle}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Seller: {order.sellerName} • {order.sellerPhone}
                      </p>
                    </div>

                    <span className="text-base font-extrabold text-slate-900 font-display">
                      ₹{order.totalAmount.toLocaleString()}
                    </span>
                  </div>

                  {/* Visual Progress Stepper */}
                  {order.status !== "rejected" ? (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 font-semibold">
                        <span className={statusStep >= 1 ? "text-slate-900" : ""}>Pending</span>
                        <span className={statusStep >= 2 ? "text-slate-900" : ""}>Accepted</span>
                        <span className={statusStep >= 3 ? "text-slate-900" : ""}>Preparing</span>
                        <span className={statusStep >= 4 ? "text-slate-900" : ""}>Ready</span>
                        <span className={statusStep >= 5 ? "text-slate-900" : ""}>Completed</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                        <div
                          className="bg-slate-900 h-full transition-all duration-500 rounded-full"
                          style={{ width: `${(statusStep / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700">
                      Order Rejected: {order.rejectionReason || "Unavailable."}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <a
                      href={generateWhatsAppUrl(order)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">chat</span>
                      <span>{t("confirmOrder", currentLang)}</span>
                    </a>

                    <a
                      href={`tel:${order.sellerPhone}`}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">call</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SELLER SALES INBOX */}
      {/* ========================================================================= */}
      {activeMarketTab === "sales" && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
              {t("salesInbox", currentLang)}
            </h3>
            <span className="text-xs font-bold text-slate-700">
              Farmer Dashboard
            </span>
          </div>

          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-extrabold text-slate-900">{order.id}</span>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                        {order.status}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900 font-display mt-1">
                      {order.itemTitle} (Qty: {order.quantity})
                    </h4>
                    <p className="text-xs text-slate-500">
                      Buyer: <strong className="text-slate-900">{order.buyerName}</strong> ({order.buyerPhone})
                    </p>
                  </div>

                  <span className="text-base font-extrabold text-slate-900 font-display">
                    ₹{order.totalAmount.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  {order.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, "accepted")}
                        className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">check</span>
                        <span>Accept Order</span>
                      </button>

                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, "rejected", "Out of stock")}
                        className="py-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                        <span>Reject</span>
                      </button>
                    </>
                  )}

                  {order.status === "accepted" && (
                    <button
                      onClick={() => handleUpdateOrderStatus(order.id, "completed")}
                      className="col-span-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">verified</span>
                      <span>Mark Delivered & Completed</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: POST NEW LISTING */}
      {/* ========================================================================= */}
      {activeMarketTab === "new-listing" && (
        <form
          onSubmit={handleCreateListing}
          className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-3.5"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-slate-900 font-display">
              {t("postListing", currentLang)}
            </h3>
            <span className="text-xs text-slate-400">Direct Listing</span>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none cursor-pointer"
            >
              <option value="Cattle for Sale">Cattle for Sale</option>
              <option value="Feed Suppliers">Green Fodder & Feed</option>
              <option value="Veterinarians">Veterinary Services</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Purebred Kangayam Dairy Cow"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Price (₹)</label>
              <input
                type="number"
                required
                placeholder="55000"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">District</label>
              <select
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none cursor-pointer"
              >
                {currentDistricts.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Contact Number</label>
            <input
              type="text"
              required
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
          >
            Publish Listing
          </button>
        </form>
      )}

      {/* Order Placement Modal */}
      {orderingListing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
          <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-4 animate-slide-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900 font-display">
                  {t("buyNow", currentLang)}
                </h3>
                <span className="text-xs text-slate-500">
                  Seller: {orderingListing.name}
                </span>
              </div>
              <button
                onClick={() => setOrderingListing(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-slate-900">{orderingListing.title}</h4>
                <p className="text-[11px] text-slate-500">
                  Unit Price: ₹{(orderingListing.price || 50000).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOrderQty(Math.max(1, orderQty - 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs shadow-xs"
                >
                  -
                </button>
                <span className="font-mono font-bold text-xs px-1 text-slate-900">{orderQty}</span>
                <button
                  type="button"
                  onClick={() => setOrderQty(orderQty + 1)}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs shadow-xs"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Buyer Name</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Phone</label>
                <input
                  type="text"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400">Delivery Address</label>
                <input
                  type="text"
                  value={buyerAddress}
                  onChange={(e) => setBuyerAddress(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
              <span className="text-xs font-medium">Total Amount:</span>
              <span className="text-base font-extrabold font-display">
                ₹{((orderingListing.price || 50000) * orderQty).toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
              >
                {t("confirmOrder", currentLang)}
              </button>

              <button
                type="button"
                onClick={() => setOrderingListing(null)}
                className="py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                {t("close", currentLang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MarketView;
