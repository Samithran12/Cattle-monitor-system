import { useState, useEffect } from "react";
import {
  TabType,
  Animal,
  NativeBreed,
  UserProfile,
  SmartTask,
  AdvisorMessage,
} from "./types";
import { NATIVE_BREEDS, MARKET_LISTINGS } from "./data/mockData";
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
  AppNotification,
} from "./utils/storage";
import {
  registerServiceWorker,
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
import { Language } from "./utils/i18n";
import { enqueueSyncOperation, flushSyncQueue } from "./utils/syncManager";

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
  const [detectedBreedInitialData, setDetectedBreedInitialData] =
    useState<Partial<Animal> | null>(null);
  const [isAdvisorLoading, setIsAdvisorLoading] = useState<boolean>(false);

  // Initialize Light Theme & Service Worker on mount
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    registerServiceWorker();
  }, []);

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

  // Persist Notifications
  useEffect(() => {
    saveStoredNotifications(notifications);
  }, [notifications]);

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
    } catch (err) {
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

  // Notifications
  const handleMarkNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

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
    <div className="min-h-screen bg-slate-100/70 sm:bg-slate-200/50 flex justify-center selection:bg-slate-200">
      <div className="w-full max-w-md bg-[#f8fafc] sm:shadow-2xl sm:border-x sm:border-slate-200/90 min-h-screen relative flex flex-col overflow-x-hidden">
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
            listings={MARKET_LISTINGS}
            userLanguage={user.language || "English"}
            user={user}
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
            isDarkMode={false}
            onToggleDarkMode={() => {}}
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
        />
      )}

      {deletingAnimal && (
        <DeleteConfirmModal
          animal={deletingAnimal}
          onConfirmDelete={handleDeleteAnimal}
          onClose={() => setDeletingAnimal(null)}
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

      {/* Notifications Drawer - Clean White Theme */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="bg-white text-slate-900 w-full max-w-sm h-full p-6 shadow-2xl border-l border-slate-100 flex flex-col justify-between animate-slide-up">
            <div className="space-y-4 overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-slate-900 font-display">
                    Alerts & Notifications
                  </h3>
                  {unreadNotificationsCount > 0 && (
                    <span className="text-[10px] font-mono bg-red-500 text-white font-extrabold px-2 py-0.5 rounded-full">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      if (notif.animalId) {
                        const target = animals.find((a) => a.id === notif.animalId);
                        if (target) setSelectedAnimalForPassport(target);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border text-xs space-y-1 transition-all cursor-pointer ${
                      notif.read
                        ? "bg-slate-50 border-slate-100 opacity-75"
                        : "bg-white border-slate-200 shadow-xs"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold text-slate-900 uppercase">
                        {notif.type}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {notif.time}
                      </span>
                    </div>
                    <p className="font-bold text-slate-900 font-display">
                      {notif.title}
                    </p>
                    <p className="text-slate-500 leading-relaxed">
                      {notif.description}
                    </p>
                  </div>
                ))}

                {notifications.length === 0 && (
                  <div className="text-center py-8 text-xs text-slate-400 font-mono">
                    No notifications
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end items-center gap-3">
              <button
                onClick={handleMarkNotificationsRead}
                className="text-xs font-bold text-slate-900 hover:underline cursor-pointer"
              >
                Mark all read
              </button>
              <button
                onClick={handleClearNotifications}
                className="text-xs font-bold text-red-500 hover:underline cursor-pointer"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multilingual Voice Assistant Global Floating Companion */}
      <VoiceAssistantWidget
        currentTab={currentTab}
        userLanguage={user.language || "English"}
        onNavigate={(tab) => setCurrentTab(tab)}
        onOpenScanner={() => setCurrentTab("scanner")}
        onOpenAddAnimal={() => setCurrentTab("add-animal")}
        onChangeLanguage={handleLanguageChange}
        onToggleDarkMode={() => {}}
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
