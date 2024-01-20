import { http, createConfig } from 'wagmi';
import { metaMask, walletConnect } from 'wagmi/connectors';
import { bsc } from 'wagmi/chains';

const projectId = process.env.REACT_APP_WEB3_PROJECT_ID || '';

// TODO: fix bug when disconnecting site in MetaMask directly
export const wagmiConfig = createConfig({
  chains: [bsc],
  connectors: [
    walletConnect({ projectId }),
    metaMask(),
  ],
  transports: {
    [bsc.id]: http(),
  },
});
