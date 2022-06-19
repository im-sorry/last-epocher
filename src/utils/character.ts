import { CHARACTER_MAP, MASTERY_MAP } from '@/constants/character';

export const getMasteryName = (person: Person) => {
  const characterName = CHARACTER_MAP[person.characterClass] || '未知';
  const character: any = MASTERY_MAP[person.characterClass] || {};
  const masteryName = character[person.chosenMastery] || '未知';
  return {
    characterName,
    masteryName,
  };
};
