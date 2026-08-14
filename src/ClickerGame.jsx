import React, { useState, useEffect } from 'react';

const ClickerGame = () => {
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [level, setLevel] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const [autoClicks, setAutoClicks] = useState(0);
  const [upgrades, setUpgrades] = useState({
    doubler: 0,
    auto: 0,
    megaClick: 0
  });

  // Auto-clicker
  useEffect(() => {
    if (autoClicks > 0) {
      const interval = setInterval(() => {
        setScore(s => s + autoClicks);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClicks]);

  // Level up
  useEffect(() => {
    const newLevel = Math.floor(score / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setMultiplier(1 + (newLevel - 1) * 0.5);
    }
  }, [score, level]);

  const handleClick = () => {
    const points = Math.floor(1 * multiplier);
    setScore(s => s + points);
    setClicks(c => c + 1);
  };

  const buyUpgrade = (type) => {
    const costs = {
      doubler: 50,
      auto: 100,
      megaClick: 500
    };

    if (score >= costs[type]) {
      setScore(s => s - costs[type]);
      setUpgrades(u => ({ ...u, [type]: u[type] + 1 }));

      if (type === 'doubler') {
        setMultiplier(m => m * 1.2);
      } else if (type === 'auto') {
        setAutoClicks(a => a + 1);
      } else if (type === 'megaClick') {
        setScore(s => s + 1000);
      }
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#fff'
    }}>
      <div style={{
        textAlign: 'center',
        background: 'rgba(0,0,0,0.3)',
        padding: '40px',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        maxWidth: '500px'
      }}>
        <h1 style={{ fontSize: '2.5em', margin: '0 0 20px 0' }}>🎮 Click Empire</h1>
        
        <div style={{
          fontSize: '4em',
          fontWeight: 'bold',
          margin: '30px 0',
          textShadow: '0 0 10px rgba(255,255,255,0.5)'
        }}>
          {score}
        </div>

        <button
          onClick={handleClick}
          style={{
            fontSize: '3em',
            padding: '20px 40px',
            borderRadius: '50%',
            width: '150px',
            height: '150px',
            border: 'none',
            background: '#ff6b6b',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 8px 0 #c92a2a',
            fontWeight: 'bold',
            transition: 'all 0.1s',
            marginBottom: '30px'
          }}
          onMouseDown={(e) => e.target.style.boxShadow = '0 2px 0 #c92a2a'}
          onMouseUp={(e) => e.target.style.boxShadow = '0 8px 0 #c92a2a'}
        >
          👆
        </button>

        <div style={{ marginBottom: '20px', fontSize: '0.9em' }}>
          <p>Nível: {level} | Multiplicador: {multiplier.toFixed(1)}x</p>
          <p>Cliques totais: {clicks} | Auto/s: {autoClicks}</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '10px',
          marginTop: '30px'
        }}>
          <button
            onClick={() => buyUpgrade('doubler')}
            style={{
              padding: '15px',
              background: '#4ecdc4',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: score >= 50 ? 'pointer' : 'not-allowed',
              opacity: score >= 50 ? 1 : 0.5,
              fontSize: '0.9em',
              fontWeight: 'bold'
            }}
          >
            2x Power<br/><small>50 pts</small>
          </button>

          <button
            onClick={() => buyUpgrade('auto')}
            style={{
              padding: '15px',
              background: '#95e1d3',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: score >= 100 ? 'pointer' : 'not-allowed',
              opacity: score >= 100 ? 1 : 0.5,
              fontSize: '0.9em',
              fontWeight: 'bold'
            }}
          >
            🤖 Auto+1<br/><small>100 pts</small>
          </button>

          <button
            onClick={() => buyUpgrade('megaClick')}
            style={{
              padding: '15px',
              background: '#f38181',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: score >= 500 ? 'pointer' : 'not-allowed',
              opacity: score >= 500 ? 1 : 0.5,
              fontSize: '0.9em',
              fontWeight: 'bold'
            }}
          >
            💥 Mega<br/><small>500 pts</small>
          </button>
        </div>

        <p style={{ marginTop: '20px', fontSize: '0.8em', opacity: 0.7 }}>
          Upgrades comprados: {upgrades.doubler + upgrades.auto + upgrades.megaClick}
        </p>
      </div>
    </div>
  );
};

export default ClickerGame;