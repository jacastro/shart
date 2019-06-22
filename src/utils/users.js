export const getAcronym = ({ name, full_name, user_name}) => {
  const userName = name || full_name || user_name || '';
  return userName.match(/\b(\w)/g).slice(0, 2).join('');
};
