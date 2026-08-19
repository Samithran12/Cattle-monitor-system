import { Animal, SmartTask } from '../types';

/**
 * Intelligent Agricultural Engine that dynamically generates personalized daily care tasks
 * tailored to the farmer's registered herd (breed, age, pregnancy status, milk production, and weather).
 */
export function generatePersonalizedTasks(animals: Animal[]): SmartTask[] {
  const generatedTasks: SmartTask[] = [];

  // 1. General Weather / Seasonal Alert (Tamil Nadu Summer Heat Index)
  generatedTasks.push({
    id: `task-weather-${Date.now()}`,
    title: 'Summer Heat Stress Cooling & Fresh Water Misting',
    animalName: 'All Herd Animals',
    time: '11:30 AM',
    location: 'Main Farm Sheds',
    urgent: true,
    isCompleted: false,
    category: 'Weather',
    description: 'Afternoon heat surge (35°C+). Keep sheds well ventilated, activate ceiling water sprinklers, and ensure continuous cool drinking water.',
    isAiSuggested: true,
  });

  // 2. Individual Animal Specific Tasks
  animals.forEach((animal, index) => {
    const ageLower = animal.age.toLowerCase();
    const isCalf = ageLower.includes('month') || ageLower.includes('1 year');
    const isPregnant = animal.pregnancyStatus && animal.pregnancyStatus.toLowerCase().includes('pregnant');

    // A. Lactating Cows - Concentrate ration based on milk yield
    if (animal.dailyMilkLiters && animal.dailyMilkLiters > 0) {
      const concentrateKg = Math.round((animal.dailyMilkLiters * 0.4 + 1.5) * 10) / 10;
      generatedTasks.push({
        id: `task-feed-${animal.id}-${index}`,
        title: `Feed ${animal.name} ${concentrateKg} kg balanced concentrate ration`,
        animalName: `${animal.name} (${animal.tagId})`,
        time: '06:00 AM',
        location: animal.location || 'Milking Shed',
        urgent: true,
        isCompleted: false,
        category: 'Feeding',
        description: `Balanced ration: ${concentrateKg} kg concentrate (cottonseed cake + wheat bran) + 50g mineral mix to sustain ${animal.dailyMilkLiters}L daily A2 milk yield.`,
        isAiSuggested: true,
        animalId: animal.id,
      });
    }

    // B. Pregnant Cows - Advanced Gestation Care
    if (isPregnant) {
      generatedTasks.push({
        id: `task-preg-${animal.id}-${index}`,
        title: `Provide pre-calving mineral bolus & dry straw bedding for ${animal.name}`,
        animalName: `${animal.name} (${animal.tagId})`,
        time: '04:30 PM',
        location: animal.location || 'Maternity Pen',
        urgent: true,
        isCompleted: false,
        category: 'Gestation',
        description: 'Advanced gestation support: Administer calcium bolus and clean dry straw bedding to prevent pre-calving hypocalcemia.',
        isAiSuggested: true,
        animalId: animal.id,
      });
    }

    // C. Calves - Deworming and grower feed
    if (isCalf) {
      generatedTasks.push({
        id: `task-calf-${animal.id}-${index}`,
        title: `Administer oral deworming syrup (Albendazole) for calf ${animal.name}`,
        animalName: `${animal.name} (${animal.tagId})`,
        time: '08:00 AM',
        location: 'Calf Pen',
        urgent: false,
        isCompleted: false,
        category: 'Deworming',
        description: 'Routine 3-month calf deworming dose followed by calf grower mash (500g) with skimmed milk.',
        isAiSuggested: true,
        animalId: animal.id,
      });
    }

    // D. Draught Bulls (Kangayam / Pulikulam / Hallikar)
    if (
      animal.gender === 'Male' &&
      (animal.breed === 'Kangayam' || animal.breed === 'Pulikulam' || animal.breed === 'Hallikar')
    ) {
      generatedTasks.push({
        id: `task-bull-${animal.id}-${index}`,
        title: `Hoof inspection & horsegram (Kollu) ration for ${animal.name}`,
        animalName: `${animal.name} (${animal.tagId})`,
        time: '05:00 PM',
        location: 'Training Ground',
        urgent: false,
        isCompleted: false,
        category: 'General',
        description: 'Boiled horsegram (Kollu 1.5kg) + finger millet porridge for high stamina and muscle development.',
        isAiSuggested: true,
        animalId: animal.id,
      });
    }

    // E. Vaccination Action Needed
    if (animal.vaccinationStatus !== 'Up to Date') {
      generatedTasks.push({
        id: `task-vac-${animal.id}-${index}`,
        title: `Schedule Foot & Mouth (FMD) booster shot for ${animal.name}`,
        animalName: `${animal.name} (${animal.tagId})`,
        time: '09:00 AM',
        location: animal.location || 'Farm Shed',
        urgent: true,
        isCompleted: false,
        category: 'Vaccination',
        description: 'Vaccination overdue. Contact local government veterinary dispensary for free bi-annual FMD booster.',
        isAiSuggested: true,
        animalId: animal.id,
      });
    }
  });

  return generatedTasks;
}
