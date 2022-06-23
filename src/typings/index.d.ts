declare enum Character {
  '野蛮人' = 0,
  '法师' = 1,
  '守卫' = 2,
  '祭祀' = 3,
  '游侠' = 4,
}

declare interface Item {
  inventoryPosition: {
    x: number;
    y: number;
  };
  containerID: number;
  data: number[];
}

declare interface Person {
  characterName: string;
  level: number;
  currentExp: number;
  died: boolean;
  deaths: number;
  characterClass: 0 | 1 | 2 | 3 | 4; // 大职业
  chosenMastery: 1 | 2 | 3; // 小职业
  savedItems: Item[];
}

declare interface Store {
  persons: Person[];
  currentPersonIndex: number;
  currentItem: Item | null;
  showApplyButton: boolean;
  fileNames: string[];
}

declare type QUALITY_NAME =
  | '白装'
  | '蓝装'
  | '黄装'
  | '紫装'
  | '暗金'
  | '绿装'
  | '传奇'
  | '钥匙'
  | '铭文'
  | '未知'
  | '';

declare interface ITEM_DETAIL {
  name: string;
  quality: QUALITY_NAME;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

declare interface ITEM_QUALITY_DETAIL {
  color: string;
  quality: QUALITY_NAME;
}

declare interface ITEM_BASE_DETAIL {
  name: string;
  w: number;
  h: number;
}

declare interface Affix_Item {
  main: number;
  sub: number;
  detail: string;
  subDetail: string;
}
