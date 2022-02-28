import { useCallback, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { connector } from '../config/web3';

export default function Home() {
  const { activate, active, deactivate, account, error, chainId } = useWeb3React();

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem('previouslyConnected', true);
  }, [activate]);

  useEffect(() => {
    if(localStorage.getItem('previouslyConnected') === 'true')
      connect();
  }, [connect]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem('previouslyConnected')
  }

  if(error){
    return <p>Something was wrong!</p>
  }

  return (
    <div>
      <h1>Connect to your wallet</h1>
      <br />
      {active 
        ? <>
          <button onClick={disconnect}>Disconnect wallet</button> 
          <p>
            You are connected to network with ID: {chainId} <br />
            Your account is: {account}
          </p>
        </>
        : <button onClick={connect}>Connect wallet</button>
      }
    </div>
  )
}
