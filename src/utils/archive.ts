export const decodeFile = (content: string): Person => {
  content = content.replace('EPOCH', '');
  return JSON.parse(content);
};
