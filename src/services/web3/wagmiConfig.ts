import { http, createConfig } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';
import { bsc } from 'wagmi/chains';

const projectId = process.env.REACT_APP_WEB3_PROJECT_ID || '';

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig,
  }
}

export const wagmiConfig = createConfig({
  chains: [bsc],
  connectors: [
    walletConnect({ projectId }),
  ],
  transports: {
    [bsc.id]: http(),
  },
});
