// safewave-vision/src/utils/dispatch.ts
export const dispatchResponder = async (responderId: string) => {
  // Simulate dispatch delay + success
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        eta: '3 min',
        message: `${responderId} has been dispatched to the location.`,
      });
    }, 1000);
  });
};
