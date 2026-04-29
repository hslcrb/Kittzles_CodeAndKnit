"use client";

import React from 'react';
import { Download, RefreshCw, Move, Type, MousePointer2 } from 'lucide-react';

interface OverlayProps {
  onExport: () => void;
  onReset: () => void;
  stitchCount: number;
}

const Overlay: React.FC<OverlayProps> = ({ onExport, onReset, stitchCount }) => {
  return (
    <div className="overlay-container">
      <header className="header">
        <h1 className="logo glow-text">KITTZLES</h1>
        <p className="subtitle">고양이민주주의식 뜨개질 엔진 v1.0</p>
      </header>

      <div className="stats premium-card">
        <div className="stat-item">
          <span className="label">총 스티치</span>
          <span className="value">{stitchCount}</span>
        </div>
      </div>

      <div className="controls-guide premium-card">
        <h3>조작 가이드</h3>
        <ul>
          <li><Move size={16} /> <span>WASD / 화살표 : 커서 이동</span></li>
          <li><Type size={16} /> <span>Space / Enter : 스티치 추가 (Knit)</span></li>
          <li><Type size={16} /> <span>P : 스티치 추가 (Purl)</span></li>
          <li><MousePointer2 size={16} /> <span>마우스 드래그 : 카메라 회전</span></li>
        </ul>
      </div>

      <div className="actions">
        <button onClick={onExport} className="btn-primary">
          <Download size={20} />
          <span>OBJ 내보내기</span>
        </button>
        <button onClick={onReset} className="btn-secondary">
          <RefreshCw size={20} />
          <span>초기화</span>
        </button>
      </div>

      <footer className="footer">
        <p>&quot;뜨개질은 예술이다, 탈원전 반대.&quot; - Kittzles Dev</p>
      </footer>

      <style jsx>{`
        .overlay-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          z-index: 10;
        }

        .header {
          margin-bottom: auto;
        }

        .logo {
          font-size: 3rem;
          font-weight: 900;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: var(--text-secondary);
          font-weight: 500;
        }

        .stats {
          position: absolute;
          top: 2rem;
          right: 2rem;
          padding: 1rem 1.5rem;
          pointer-events: auto;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent);
        }

        .controls-guide {
          position: absolute;
          bottom: 8rem;
          left: 2rem;
          padding: 1.5rem;
          pointer-events: auto;
          width: 280px;
        }

        .controls-guide h3 {
          font-size: 0.9rem;
          margin-bottom: 1rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .controls-guide ul {
          list-style: none;
        }

        .controls-guide li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .actions {
          display: flex;
          gap: 1rem;
          pointer-events: auto;
          margin-top: auto;
        }

        .btn-primary, .btn-secondary {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
        }

        .btn-primary {
          background: var(--accent);
          color: #ffffff;
        }

        .btn-primary:hover {
          background: var(--text-primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px var(--accent-glow);
        }

        .btn-secondary {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border);
        }

        .btn-secondary:hover {
          background: var(--bg-primary);
          transform: translateY(-2px);
        }

        .footer {
          margin-top: 1.5rem;
          color: var(--text-secondary);
          font-size: 0.75rem;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default Overlay;
