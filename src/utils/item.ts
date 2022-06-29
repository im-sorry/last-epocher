import { BAG_HEIGHT, BAG_TYPE, BAG_WIDTH } from '@/constants/character';
import {
  ITEM_BASE_MAP,
  ITEM_QUALITY,
  KEY_TYPE,
  KEY_MAP,
  RUNE_TYPE,
} from '@/constants/item';

export const isStatue = (item: Item) => {
  const type = item.data[1];
  return type >= 25 && type <= 33;
};

export const isAdvanceItem = (item: Item) => {
  const type = item.data[3];
  return type === 7 || type === 8;
};

export const isLegendaryItem = (item: Item) => {
  const type = item.data[3];
  return type === 9;
};

export const isKey = (item: Item) => {
  const type = item.data[1];
  return type === KEY_TYPE;
};

export const isRune = (item: Item) => {
  const type = item.data[1];
  return type === RUNE_TYPE;
};

export const isNormalItem = (item: Item) => {
  const type = item.data[3];
  return type <= 4 && type >= 0;
};

const getItemQuality = (item: Item): ITEM_QUALITY_DETAIL => {
  if (isStatue(item)) {
    return ITEM_QUALITY[2];
  }
  if (isKey(item)) {
    return {
      color: ITEM_QUALITY[9].color,
      quality: '钥匙',
    };
  }
  if (isRune(item)) {
    return {
      color: ITEM_QUALITY[3].color,
      quality: '',
    };
  }
  if (isNormalItem(item)) {
    if (hasT7Affix(8, item)) {
      return ITEM_QUALITY[4];
    } else if (item.data[8] >= 3) {
      return ITEM_QUALITY[3];
    } else if (item.data[8] >= 1) {
      return ITEM_QUALITY[2];
    } else if (item.data[8] === 0) {
      return ITEM_QUALITY[0];
    }
  }
  return (
    ITEM_QUALITY[item.data[3]] || {
      color: 'rgb(255,0,0)',
      quality: '未知',
    }
  );
};

const getKeyName = (item: Item) => {
  return (KEY_MAP as any)[item.data[2]] || '未知';
};

const getItemBaseDetail = (item: Item): ITEM_BASE_DETAIL => {
  if (isKey(item)) {
    return {
      name: getKeyName(item),
      w: 1,
      h: 1,
    };
  }
  if (isRune(item)) {
    return {
      name: '铭文',
      w: 1,
      h: 1,
    };
  }
  const baseKey = `${item.data[0]}${item.data[1]}`;
  return (
    ITEM_BASE_MAP[baseKey] || {
      name: '未知部位',
      w: 1,
      h: 1,
    }
  );
};

export const getItemDetail = (item: Item | undefined): ITEM_DETAIL => {
  if (!item) {
    return {
      quality: '',
      x: 0,
      y: 0,
      name: '',
      color: '',
      w: 0,
      h: 0,
    };
  }
  const {
    inventoryPosition: { x, y },
  } = item;
  return {
    ...getItemBaseDetail(item),
    ...getItemQuality(item),
    x,
    y,
  };
};

export const isSameItemInBag = (item1: Item, item2: Item) => {
  return (
    item1.inventoryPosition.x === item2.inventoryPosition.x &&
    item1.inventoryPosition.y === item2.inventoryPosition.y &&
    item1.containerID === item2.containerID
  );
};

export const copyItem = (item: Record<string, any>): Item => {
  const result = {} as any;
  Object.keys(item).forEach((key) => {
    if (Array.isArray(item[key])) {
      result[key] = [...item[key]];
    } else if (typeof item[key] === 'object') {
      result[key] = { ...item[key] };
    } else {
      result[key] = item[key];
    }
  });
  return result;
};

export const isGreenDress = (item: Item) => {
  return item.data[3] === 8;
};

export const hasT7Affix = (start: number, item: Item) => {
  const num = item.data[start];
  if (!num) return false;
  for (let i = start + 1; i <= start + num * 3; i += 3) {
    if (item.data[i] >= 80) return true;
  }
  return false;
};

/**
 * 物品是否在身上穿戴
 * @param item
 */
export const isItemInBody = (item: Item | null) => {
  if (!item) return false;
  if (item.containerID === BAG_TYPE.神像栏) return true;
  if (item.containerID > BAG_TYPE.背包 && item.containerID <= BAG_TYPE.遗物)
    return true;
  return false;
};

/**
 * 物品是否在背包里面
 * @param item
 */
export const isItemInBag = (item: Item | null) => {
  if (!item) return false;
  if (item.containerID === BAG_TYPE.背包) return true;
  return false;
};

/**
 * 获得钥匙的模板
 * @param type
 * @param x
 * @param y
 * @returns
 */
export const getKeyTemplate = (type: number, x = 0, y = 0): Item => {
  return {
    itemData: '',
    data: [1, KEY_TYPE, type],
    inventoryPosition: {
      x,
      y,
    },
    quantity: 1,
    containerID: 1,
    formatVersion: 2,
  };
};

/**
 * 返回一个二维数组，标识背包里每一个格子是否被占用
 * @param items
 */
export const getBagMatrix = (items: Item[]) => {
  const matrix = Array(BAG_WIDTH)
    .fill(0)
    .map(() => Array(BAG_HEIGHT).fill(0));
  items.forEach((item) => {
    const { x, y, w, h } = getItemDetail(item);
    for (let i = x; i < x + w; i++) {
      for (let j = y; j < y + h; j++) {
        matrix[i][j] = 1;
      }
    }
  });
  return matrix;
};

/**
 * 从矩阵里找到一个格子放(w,h)的物品，可以返回x,y坐标，否则返回null
 * @param matrix
 * @param w
 * @param h
 */
export const findItemPosition = (
  matrix: number[][],
  w: number,
  h: number
): { x: number; y: number } | null => {
  for (let i = 0; i < BAG_WIDTH; i++) {
    for (let j = 0; j < BAG_HEIGHT; j++) {
      if (matrix[i][j]) continue;
      if (canItemAtPosition(matrix, i, j, w, h))
        return {
          x: i,
          y: j,
        };
    }
  }
  return null;
};

/**
 * 一个物品是否可以放在指定的位置
 * @param matrix
 * @param x
 * @param y
 * @param w
 * @param h
 */
export const canItemAtPosition = (
  matrix: number[][],
  x: number,
  y: number,
  w: number,
  h: number
) => {
  for (let i = x; i < x + w; i++) {
    for (let j = y; j < y + h; j++) {
      if (i >= BAG_WIDTH || j >= BAG_HEIGHT) return false;
      if (matrix[i][j]) return false;
    }
  }
  return true;
};
