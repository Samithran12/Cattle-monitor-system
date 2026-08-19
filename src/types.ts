export type TabType = 'home' | 'animals' | 'advisor' | 'market' | 'profile' | 'scanner' | 'tasks' | 'add-animal';

export interface Animal {
  id: string;
  tagId: string;
  name: string;
  breed: string;
  species: 'Cattle' | 'Goat' | 'Sheep' | 'Pig';
  gender: 'Female' | 'Male';
  age: string;
  weight: number;
  status: 'Healthy' | 'Needs Attention' | 'Pregnant' | 'Treatment';
  healthScore: number;
  pregnancyStatus?: string;
  pregnancyMonths?: number;
  dailyMilkLiters?: number;
  lactationStage?: 'Early' | 'Mid' | 'Late' | 'Dry';
  vaccinationStatus: 'Up to Date' | 'Action Needed' | 'Overdue';
  location: string;
  photoUrl: string;
  qrCodeUrl?: string;
  noseprintId?: string;
  noseprintVerified?: boolean;
  noseprintPhotoUrl?: string;
  textureHash?: string;
  registeredDate?: string;
  medicalHistory: MedicalLog[];
}

export interface MedicalLog {
  id: string;
  type: 'Vaccination' | 'Pregnancy Check' | 'Treatment' | 'Health Audit';
  date: string;
  description: string;
  doctor?: string;
}

export interface NativeBreed {
  id: string;
  name: string;
  tamilName?: string;
  hindiName?: string;
  scientificName: string;
  origin: string;
  state: string;
  status: 'Rare Status' | 'Stable Population' | 'Vulnerable' | 'Endangered' | 'Conservation Priority';
  primaryUse: 'Draught' | 'Dairy' | 'Dual Purpose';
  avgMilkYield: string;
  climate: string;
  heatTolerance: 'Low' | 'Medium' | 'High' | 'Extreme';
  maintenance: 'Low' | 'Medium' | 'Standard';
  draftPower: 'Low' | 'Medium' | 'High' | 'Extreme';
  physicalCharacteristics: string;
  diseaseResistance: string;
  productivity: string;
  specialCharacteristics: string;
  imageUrl: string;
  description: string;
  geneticHistory: string;
  incentivesActive: boolean;
  incentivesDescription?: string;
}

export interface MarketListing {
  id: string;
  category: 'Cattle for Sale' | 'Veterinarians' | 'Breeders' | 'Feed Suppliers' | 'Equipment';
  name: string;
  title: string;
  price?: number;
  priceFormatted?: string;
  rating: number;
  ratingCount?: number;
  distance?: string;
  distanceKm?: number;
  statusBadge: string; // e.g. "Available Today", "Delivery Avail.", "FARMER DIRECT"
  isVerified: boolean;
  isTopMatch?: boolean;
  imageUrl: string;
  description: string;
  phone?: string;
  whatsapp?: string;
  location: string;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  actionText?: string;
  breed?: string;
  milkYield?: string;
  createdAt?: string;
}

export interface MarketOrder {
  id: string;
  listingId: string;
  itemTitle: string;
  itemPrice: number;
  quantity: number;
  totalAmount: number;
  buyerName: string;
  buyerPhone: string;
  buyerLocation: string;
  sellerName: string;
  sellerPhone: string;
  sellerWhatsapp?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'preparing' | 'ready' | 'completed';
  rejectionReason?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SmartTask {
  id: string;
  title: string;
  animalName: string;
  time: string;
  location: string;
  urgent: boolean;
  isCompleted: boolean;
  description: string;
  category?: 'Feeding' | 'Vaccination' | 'Deworming' | 'Weather' | 'Gestation' | 'General';
  isAiSuggested?: boolean;
  completedAt?: string;
  animalId?: string;
}

export interface AdvisorMessage {
  id: string;
  sender: 'user' | 'ai' | 'advisor';
  time?: string;
  timestamp?: string;
  text: string;
  bento?: {
    estimatedRoi?: string;
    initialHerdSize?: string;
    riskLevel?: string;
    demandBadge?: string;
  };
  suggestions?: string[];
  image?: string;
}

export interface UserProfile {
  name: string;
  farmName: string;
  location: string;
  email: string;
  mobile: string;
  totalAnimals: number;
  totalRevenue: string;
  growth: string;
  language: 'English' | 'Tamil' | 'Hindi';
  photoUrl: string;
}
