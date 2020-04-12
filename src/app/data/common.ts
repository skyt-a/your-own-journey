export interface Data {
  key: number;
  value: string;
}

export const genders: Data[] = ['男性', '女性', 'その他'].map((gender, index) => {
  return {
    key: index,
    value: gender,
  };
});

export const getValueFromKey = (key: number | string, data: Data[]): string => {
  if (key === undefined || !data || data.length === 0) {
    return '';
  }
  return data.find(d => d.key === Number(key))?.value;
};
