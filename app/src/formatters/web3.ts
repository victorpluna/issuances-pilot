
export const minifyAddress = (address: string): string => `${address?.slice(0, 2)}...${address?.slice(-6)}`