import handlerMappings from './handlerMapping.js';

export const handleResponse = async (data) => {
  console.log(data);

  const handler = handlerMappings[data.handlerId];
  if (!handler) {
    return;
  }

  // 적절한 핸들러 호출
  handler(data);
};

export const handleNotification = async (data) => {
  console.log(data);

  const handler = handlerMappings[data.payload.handlerId];
  if (!handler) {
    return;
  }

  // 적절한 핸들러 호출
  handler(data.payload);
};
