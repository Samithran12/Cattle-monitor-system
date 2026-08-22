import { useState, useEffect, useRef } from "react";
import {
  TabType,
  Animal,
  NativeBreed,
  UserProfile,
  SmartTask,
  AdvisorMessage,
  MarketListing,
  MarketOrder,
} from "./types";
import { NATIVE_BREEDS, MARKET_LISTINGS, INITIAL_ORDERS } from "./data/mockData";
import {
  loadStoredAnimals,
  saveStoredAnimals,
  loadStoredTasks,
  saveStoredTasks,
  loadStoredUser,
  saveStoredUser,
  loadStoredAdvisorMessages,
  saveStoredAdvisorMessages,
  loadStoredNotifications,
  saveStoredNotifications,
  loadStoredDarkMode,
  saveStoredDarkMode,
  AppNotification,
} from "./utils/storage";
import {
  registerServiceWorker,
  generateRealtimeNotifications,
  sendNativePushNotification,
} from "./services/notificationService";

import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { HomeView } from "./components/HomeView";
import { AdvisorView } from "./components/AdvisorView";
import { AnimalsView } from "./components/AnimalsView";
import { BreedDetailModal } from "./components/BreedDetailModal";
import { DigitalPassportModal } from "./components/DigitalPassportModal";
import { EditAnimalModal } from "./components/EditAnimalModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { VoiceAssistantWidget } from "./components/VoiceAssistantWidget";
import { ScannerView } from "./components/ScannerView";
import { MarketView } from "./components/MarketView";
import { ProfileView } from "./components/ProfileView";
import { SmartTasksView } from "./components/SmartTasksView";
import { AddAnimalModal } from "./components/AddAnimalModal";
import { AuthView } from "./components/AuthView";
import { OfflineBanner } from "./components/ui/OfflineBanner";
import { generateAdvisorChat } from "./services/geminiService";
import { Language, t } from "./utils/i18n";
import { enqueueSyncOperation, flushSyncQueue } from "./utils/syncManager";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  CheckCircle2,
  X,
  Award,
  Truck,
  Sun,
  Activity,
  Syringe,
  AlertTriangle,
  ChevronRight,
  Trash2
} from "lucide-react";

import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  firebaseSignOut,
  onAuthStateChanged,
  testConnection,
  handleFirestoreError,
  OperationType,
  doc,
  collection,
  query,
  where,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "./lib/firebase";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isFirebaseAuthenticated, setIsFirebaseAuthenticated] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<TabType>("home");

  // Persistent States
  const [user, setUser] = useState<UserProfile>(loadStoredUser);
  const [animals, setAnimals] = useState<Animal[]>(loadStoredAnimals);
  const [breeds] = useState<NativeBreed[]>(NATIVE_BREEDS);
  const [listings, setListings] = useState<MarketListing[]>(MARKET_LISTINGS);
  const [orders, setOrders] = useState<MarketOrder[]>(INITIAL_ORDERS);
  const [tasks, setTasks] = useState<SmartTask[]>(loadStoredTasks);
  const [advisorMessages, setAdvisorMessages] = useState<AdvisorMessage[]>(
    loadStoredAdvisorMessages
  );
  const [notifications, setNotifications] = useState<AppNotification[]>(
    loadStoredNotifications
  );

  // Modals & Drawers State
  const [selectedBreed, setSelectedBreed] = useState<NativeBreed | null>(null);
  const [selectedAnimalForPassport, setSelectedAnimalForPassport] =
    useState<Animal | null>(null);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [deletingAnimal, setDeletingAnimal] = useState<Animal | null>(null);
  const [showAddAnimalModal, setShowAddAnimalModal] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notificationCategoryFilter, setNotificationCategoryFilter] = useState<string>("All");
  const [detectedBreedInitialData, setDetectedBreedInitialData] =
    useState<Partial<Animal> | null>(null);
  const [isAdvisorLoading, setIsAdvisorLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(loadStoredDarkMode);

  // In-app Real-time Live Toast Trigger
  const [liveToastNotification, setLiveToastNotification] = useState<AppNotification | null>(null);
  const previousUnreadCount = useRef<number>(notifications.filter((n) => !n.read).length);

  // Initialize Theme & Service Worker on mount
  useEffect(() => {
    registerServiceWorker();
  }, []);

  // Sync Dark Theme class on root HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    saveStoredDarkMode(isDarkMode);
  }, [isDarkMode]);

  // Real-time Dynamic Evaluation Engine (Triggered whenever herd, tasks, or orders change)
  useEffect(() => {
    const updated = generateRealtimeNotifications(
      animals,
      tasks,
      orders,
      notifications,
      (user.language as Language) || "English"
    );

    // Detect new urgent alert to show live in-app toast banner
    const currentUnread = updated.filter((n) => !n.read).length;
    if (currentUnread > previousUnreadCount.current) {
      const newestUnread = updated.find((n) => !n.read);
      if (newestUnread) {
        setLiveToastNotification(newestUnread);
        setTimeout(() => setLiveToastNotification(null), 4000);
      }
    }
    previousUnreadCount.current = currentUnread;

    setNotifications(updated);
    saveStoredNotifications(updated);
  }, [animals, tasks, orders, user.language]);

  // Persist Animals
  useEffect(() => {
    saveStoredAnimals(animals);
    setUser((prev) => {
      if (prev.totalAnimals !== animals.length) {
        const next = { ...prev, totalAnimals: animals.length };
        saveStoredUser(next);
        return next;
      }
      return prev;
    });
  }, [animals]);

  // Persist Tasks
  useEffect(() => {
    saveStoredTasks(tasks);
  }, [tasks]);

  // Persist User
  useEffect(() => {
    saveStoredUser(user);
  }, [user]);

  // Persist Messages
  useEffect(() => {
    saveStoredAdvisorMessages(advisorMessages);
  }, [advisorMessages]);

  // Test Firebase Connection on boot
  useEffect(() => {
    testConnection();
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setIsFirebaseAuthenticated(true);
        setUser((prevUser) => {
          const updatedUser: UserProfile = {
            ...prevUser,
            name: fbUser.displayName || prevUser.name,
            email: fbUser.email || prevUser.email,
            photoUrl: fbUser.photoURL || prevUser.photoUrl,
          };
          saveStoredUser(updatedUser);

          const userDocRef = doc(db, "users", fbUser.uid);
          setDoc(
            userDocRef,
            {
              name: updatedUser.name,
              email: updatedUser.email,
              photoUrl: updatedUser.photoUrl,
              totalAnimals: updatedUser.totalAnimals,
              totalRevenue: updatedUser.totalRevenue,
              growth: updatedUser.growth,
              language: updatedUser.language || "English",
              createdAt: new Date().toISOString(),
            },
            { merge: true }
          ).catch((err) => handleFirestoreError(err, OperationType.WRITE, `users/${fbUser.uid}`));

          return updatedUser;
        });

        const animalsCol = collection(db, "animals");
        const animalsQ = query(animalsCol, where("userId", "==", fbUser.uid));

        const unsubAnimals = onSnapshot(
          animalsQ,
          (snapshot) => {
            if (!snapshot.empty) {
              const fetchedAnimals: Animal[] = snapshot.docs.map((d) => ({
                id: d.id,
                ...d.data(),
              })) as Animal[];
              setAnimals(fetchedAnimals);
            }
          },
          (err) => {
            handleFirestoreError(err, OperationType.GET, "animals");
          }
        );

        const tasksCol = collection(db, "tasks");
        const tasksQ = query(tasksCol, where("userId", "==", fbUser.uid));

        const unsubTasks = onSnapshot(
          tasksQ,
          (snapshot) => {
            if (!snapshot.empty) {
              const fetchedTasks: SmartTask[] = snapshot.docs.map((d) => ({
                id: d.id,
                ...d.data(),
              })) as SmartTask[];
              setTasks(fetchedTasks);
            }
          },
          (err) => {
            console.warn("Tasks listener notice:", err);
          }
        );

        return () => {
          unsubAnimals();
          unsubTasks();
        };
      } else {
        setIsFirebaseAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync Animals to Firestore if authenticated or queue offline
  const syncAnimalToFirestore = async (animal: Animal) => {
    if (!auth.currentUser) {
      enqueueSyncOperation("animals", animal.id, "set", animal);
      return;
    }
    try {
      const animalDocRef = doc(db, "animals", animal.id);
      await setDoc(
        animalDocRef,
        {
          ...animal,
          userId: auth.currentUser.uid,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch {
      enqueueSyncOperation("animals", animal.id, "set", animal);
      console.warn("Offline mutation queued for animal:", animal.id);
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      setUser((prev) => ({
        ...prev,
        name: fbUser.displayName || prev.name,
        email: fbUser.email || prev.email,
        photoUrl: fbUser.photoURL || prev.photoUrl,
      }));
      setIsAuthenticated(true);
      flushSyncQueue();
    } catch (err) {
      console.warn("Google Sign-In failed or cancelled:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn("Sign out error", e);
    }
    setIsAuthenticated(false);
  };

  const handleLanguageChange = (lang: Language) => {
    setUser((prev) => ({ ...prev, language: lang }));
  };

  // Handlers for Animal CRUD
  const handleAddAnimal = (newAnimal: Animal) => {
    const updated = [newAnimal, ...animals];
    setAnimals(updated);
    syncAnimalToFirestore(newAnimal);
    setShowAddAnimalModal(false);
    setDetectedBreedInitialData(null);
    sendNativePushNotification(
      `🐮 New Bovine Registered: ${newAnimal.name}`,
      `Tag ID: ${newAnimal.tagId}. Official Digital Passport generated.`
    );
  };

  const handleSaveEditedAnimal = (updatedAnimal: Animal) => {
    const updated = animals.map((a) =>
      a.id === updatedAnimal.id ? updatedAnimal : a
    );
    setAnimals(updated);
    syncAnimalToFirestore(updatedAnimal);
    setEditingAnimal(null);
  };

  const handleDeleteAnimal = (animalId: string) => {
    const updated = animals.filter((a) => a.id !== animalId);
    setAnimals(updated);
    if (auth.currentUser) {
      const animalDocRef = doc(db, "animals", animalId);
      deleteDoc(animalDocRef).catch(() => {
        enqueueSyncOperation("animals", animalId, "delete");
      });
    } else {
      enqueueSyncOperation("animals", animalId, "delete");
    }
    setDeletingAnimal(null);
  };

  // Handlers for Task Toggling & Adding
  const handleToggleTask = (taskId: string) => {
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTasks(updated);
    const targetTask = updated.find((t) => t.id === taskId);
    if (targetTask) {
      enqueueSyncOperation("tasks", taskId, "set", targetTask);
    }
  };

  const handleAddTask = (newTaskData: Omit<SmartTask, "id">) => {
    const newTask: SmartTask = {
      id: `task-${Date.now()}`,
      ...newTaskData,
    };
    setTasks([newTask, ...tasks]);
    enqueueSyncOperation("tasks", newTask.id, "set", newTask);
    sendNativePushNotification(
      `⏰ Task Scheduled: ${newTask.title}`,
      `${newTask.animalName} at ${newTask.time}`
    );
  };

  const handleRegenerateTasks = (newTasks: SmartTask[]) => {
    setTasks(newTasks);
  };

  // Handlers for AI Advisor Messaging
  const handleSendMessage = async (text: string, image?: string) => {
    const userMsg: AdvisorMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text,
      image,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...advisorMessages, userMsg];
    setAdvisorMessages(newMessages);
    setIsAdvisorLoading(true);

    if (auth.currentUser) {
      const msgRef = doc(db, "advisorMessages", userMsg.id);
      setDoc(msgRef, {
        ...userMsg,
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      }).catch((e) => console.warn("Advisor user message sync notice:", e));
    }

    try {
      const historyPayload = advisorMessages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        text: m.text,
      }));
      const response = await generateAdvisorChat(
        text,
        historyPayload,
        user.language || "English",
        image
      );

      const aiMsg: AdvisorMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "advisor",
        text: response.text,
        bento: response.bento,
        suggestions: response.suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setAdvisorMessages([...newMessages, aiMsg]);

      if (auth.currentUser) {
        const aiMsgRef = doc(db, "advisorMessages", aiMsg.id);
        setDoc(aiMsgRef, {
          ...aiMsg,
          userId: auth.currentUser.uid,
          createdAt: new Date().toISOString(),
        }).catch((e) => console.warn("Advisor AI message sync notice:", e));
      }
    } catch {
      const fallbackMsg: AdvisorMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "advisor",
        text: user.language === "Tamil"
          ? "உங்கள் கேள்விக்கு பதிலளிக்க இயலவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
          : "Could not generate response. Please try again shortly.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setAdvisorMessages([...newMessages, fallbackMsg]);
    } finally {
      setIsAdvisorLoading(false);
    }
  };

  const handleClearChatHistory = () => {
    setAdvisorMessages([]);
  };

  // Real-time Notifications Actions
  const handleMarkNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    saveStoredNotifications(updated);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    saveStoredNotifications([]);
  };

  const handleDismissNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    saveStoredNotifications(updated);
  };

  const handleNotificationClick = (notif: AppNotification) => {
    // Mark as read
    const updated = notifications.map((n) => (n.id === notif.id ? { ...n, read: true } : n));
    setNotifications(updated);
    saveStoredNotifications(updated);

    if (notif.animalId) {
      const target = animals.find((a) => a.id === notif.animalId);
      if (target) {
        setSelectedAnimalForPassport(target);
        setShowNotifications(false);
        return;
      }
    }

    if (notif.orderId) {
      setCurrentTab("market");
      setShowNotifications(false);
      return;
    }

    if (notif.type === "Urgent") {
      setCurrentTab("tasks");
      setShowNotifications(false);
      return;
    }
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (notificationCategoryFilter === "All") return true;
    if (notificationCategoryFilter === "Unread") return !n.read;
    return n.type === notificationCategoryFilter;
  });

  if (!isAuthenticated) {
    return (
      <AuthView
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black sm:bg-zinc-200 dark:sm:bg-black flex justify-center selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-200">
      <div className="w-full max-w-md bg-[#f8fafc] dark:bg-black sm:shadow-2xl sm:border-x sm:border-zinc-200/90 dark:sm:border-zinc-800/80 min-h-screen relative flex flex-col overflow-x-hidden text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
        
        {/* Top Header Bar */}
        <Header
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          user={user}
          unreadNotificationsCount={unreadNotificationsCount}
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          onLanguageChange={handleLanguageChange}
        />

        {/* Global Offline Connectivity Banner */}
        <OfflineBanner userLanguage={user.language as Language} />

        {/* In-App Live Real-time Notification Banner */}
        <AnimatePresence>
          {liveToastNotification && (
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              onClick={() => handleNotificationClick(liveToastNotification)}
              className="fixed top-18 left-4 right-4 max-w-md mx-auto z-50 bg-zinc-900 dark:bg-zinc-800 text-white rounded-2xl p-3.5 shadow-2xl border border-zinc-700 flex items-start gap-3 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                    {liveToastNotification.type} ALERT
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400">Live</span>
                </div>
                <h4 className="text-xs font-bold truncate mt-0.5">{liveToastNotification.title}</h4>
                <p className="text-[11px] text-zinc-300 line-clamp-1 mt-0.5">{liveToastNotification.description}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLiveToastNotification(null);
                }}
                className="text-zinc-400 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main View Router */}
        <div className="flex-1 w-full overflow-y-auto">
          {currentTab === "home" && (
            <HomeView
              onTabChange={setCurrentTab}
              user={user}
              animals={animals}
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onSelectAnimal={(animal) => setSelectedAnimalForPassport(animal)}
              onSelectBreed={(breed) => setSelectedBreed(breed)}
            />
          )}

          {currentTab === "animals" && (
            <AnimalsView
              breeds={breeds}
              animals={animals}
              onSelectBreed={(breed) => setSelectedBreed(breed)}
              onSelectAnimal={(animal) => setSelectedAnimalForPassport(animal)}
              onEditAnimal={(animal) => setEditingAnimal(animal)}
              onDeleteAnimal={(animal) => setDeletingAnimal(animal)}
              onTabChange={setCurrentTab}
              userLanguage={user.language as Language}
            />
          )}

          {currentTab === "market" && (
            <MarketView
              listings={listings}
              orders={orders}
              user={user}
              userLanguage={user.language || "English"}
              onAddListing={(item) => setListings([item as MarketListing, ...listings])}
              onPlaceOrder={(order) => {
                const newOrders = [order as MarketOrder, ...orders];
                setOrders(newOrders);
                sendNativePushNotification(
                  `📦 Order Dispatched: ${order.itemTitle}`,
                  `Seller: ${order.sellerName}. Live tracking enabled.`
                );
              }}
              onTabChange={setCurrentTab}
            />
          )}

          {currentTab === "scanner" && (
            <ScannerView
              onTabChange={setCurrentTab}
              onDetectSuccess={(result) => {
                setDetectedBreedInitialData(result);
                setShowAddAnimalModal(true);
              }}
              userLanguage={user.language as Language}
              animals={animals}
            />
          )}

          {currentTab === "advisor" && (
            <AdvisorView
              messages={advisorMessages}
              onSendMessage={handleSendMessage}
              isLoading={isAdvisorLoading}
              onTabChange={setCurrentTab}
              userLanguage={user.language as Language}
              onClearHistory={handleClearChatHistory}
            />
          )}

          {currentTab === "tasks" && (
            <SmartTasksView
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
              onRegenerateTasks={handleRegenerateTasks}
              animals={animals}
              user={user}
              userLanguage={user.language || "English"}
            />
          )}

          {currentTab === "profile" && (
            <ProfileView
              user={user}
              animals={animals}
              onUpdateProfile={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
              onTabChange={setCurrentTab}
              onLogout={handleLogout}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              onGoogleSignIn={handleGoogleSignIn}
              isFirebaseAuthenticated={isFirebaseAuthenticated}
            />
          )}

          {currentTab === "add-animal" && (
            <div className="p-4">
              <AddAnimalModal
                initialData={detectedBreedInitialData}
                onAddAnimal={handleAddAnimal}
                onClose={() => setCurrentTab("animals")}
                onTabChange={setCurrentTab}
                userLanguage={user.language as Language}
              />
            </div>
          )}
        </div>

        {/* Modals */}
        {selectedBreed && (
          <BreedDetailModal
            breed={selectedBreed}
            onClose={() => setSelectedBreed(null)}
            onTabChange={setCurrentTab}
            userLanguage={user.language as Language}
          />
        )}

        {selectedAnimalForPassport && (
          <DigitalPassportModal
            animal={selectedAnimalForPassport}
            onClose={() => setSelectedAnimalForPassport(null)}
            userLanguage={user.language as Language}
            onUpdateMedicalLog={(animalId, log) => {
              setAnimals((prev) =>
                prev.map((a) =>
                  a.id === animalId
                    ? { ...a, medicalHistory: [log, ...a.medicalHistory] }
                    : a
                )
              );
            }}
          />
        )}

        {editingAnimal && (
          <EditAnimalModal
            animal={editingAnimal}
            onSave={handleSaveEditedAnimal}
            onClose={() => setEditingAnimal(null)}
            userLanguage={user.language as Language}
          />
        )}

        {deletingAnimal && (
          <DeleteConfirmModal
            animal={deletingAnimal}
            onConfirmDelete={handleDeleteAnimal}
            onClose={() => setDeletingAnimal(null)}
            userLanguage={user.language as Language}
          />
        )}

        {showAddAnimalModal && (
          <AddAnimalModal
            onAddAnimal={handleAddAnimal}
            onClose={() => setShowAddAnimalModal(false)}
            onTabChange={setCurrentTab}
            userLanguage={user.language as Language}
          />
        )}

        {/* Real-time Dynamic Notifications Drawer */}
        <AnimatePresence>
          {showNotifications && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 w-full max-w-sm h-full p-5 shadow-2xl border-l border-zinc-100 dark:border-zinc-800 flex flex-col justify-between"
              >
                <div className="space-y-3.5 overflow-y-auto pr-1">
                  {/* Drawer Header */}
                  <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white font-display">
                        Real-time Alerts
                      </h3>
                      {unreadNotificationsCount > 0 && (
                        <span className="text-[10px] font-mono bg-red-500 text-white font-extrabold px-2 py-0.5 rounded-full">
                          {unreadNotificationsCount}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Filter Chips */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                    {["All", "Unread", "Vaccination", "Health", "Market", "Urgent"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setNotificationCategoryFilter(cat)}
                        className={`px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                          notificationCategoryFilter === cat
                            ? "bg-zinc-900 dark:bg-emerald-600 text-white shadow-xs"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Notifications Feed */}
                  <div className="space-y-2.5">
                    {filteredNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif)}
                        className={`p-3.5 rounded-2xl border text-xs space-y-2 transition-all cursor-pointer group relative ${
                          notif.read
                            ? "bg-zinc-50/70 dark:bg-zinc-800/30 border-zinc-100 dark:border-zinc-800/80 opacity-70"
                            : "bg-white dark:bg-zinc-800/90 border-zinc-200 dark:border-zinc-700 shadow-xs"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5">
                            {notif.type === "Vaccination" && <Syringe className="w-3.5 h-3.5 text-emerald-500" />}
                            {notif.type === "Health" && <Activity className="w-3.5 h-3.5 text-red-500" />}
                            {notif.type === "Market" && <Truck className="w-3.5 h-3.5 text-cyan-500" />}
                            {notif.type === "Weather" && <Sun className="w-3.5 h-3.5 text-amber-500" />}
                            {notif.type === "Urgent" && <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
                            <span className="text-[10px] font-mono font-bold uppercase text-zinc-900 dark:text-zinc-200">
                              {notif.type}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-zinc-400">{notif.time}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDismissNotification(notif.id);
                              }}
                              className="text-zinc-300 hover:text-red-500 p-0.5 transition-colors"
                              title="Dismiss Alert"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-xs text-zinc-900 dark:text-white leading-snug">
                            {notif.title}
                          </h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mt-0.5">
                            {notif.description}
                          </p>
                        </div>

                        {/* Action Trigger */}
                        <div className="flex items-center justify-between pt-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                          <span>
                            {notif.animalId ? "Open Digital Passport" : notif.orderId ? "Track Order" : "View Details"}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}

                    {filteredNotifications.length === 0 && (
                      <div className="text-center py-10 text-xs text-zinc-400 font-mono">
                        No notifications in this filter category
                      </div>
                    )}
                  </div>
                </div>

                {/* Drawer Footer Actions */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                  <button
                    onClick={handleMarkNotificationsRead}
                    className="text-xs font-bold text-zinc-900 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark all read</span>
                  </button>
                  <button
                    onClick={handleClearNotifications}
                    className="text-xs font-bold text-red-500 dark:text-red-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear all</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Multilingual Voice Assistant Global Floating Companion */}
        <VoiceAssistantWidget
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          userLanguage={user.language as Language}
          animals={animals}
          user={user}
        />

        {/* Mobile Floating White Dock Navigation */}
        <BottomNav
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          userLanguage={user.language as Language}
          userPhotoUrl={user.photoUrl}
        />
      </div>
    </div>
  );
}
