"use client";

import React from 'react';
import { Download, RefreshCw, Move, Type, MousePointer2, LayoutTemplate } from 'lucide-react';
import { TEMPLATES } from '@/hooks/useKnitting';

interface OverlayProps {
  onExport: () => void;
  onReset: () => void;
  onLoadTemplate: (name: string) => void;
  stitchCount: number;
}

const Overlay: React.FC<OverlayProps> = ({ onExport, onReset, onLoadTemplate, stitchCount }) => {
  return (
    <div className="overlay-container">
      <header className="header">
        <h1 className="logo">KITTZLES</h1>
        <p className="subtitle">Premium 3D Knitting Simulator</p>
      </header>

      <div className="top-right">
        <div className="stats premium-card">
          <div className="stat-item">
            <span className="label">총 스티치 수</span>
            <span className="value">{stitchCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="templates premium-card">
          <h3>빠른 시작 템플릿</h3>
          <div className="template-grid">
            {Object.values(TEMPLATES).map((name) => (
              <button 
                key={name} 
                className="template-btn"
                onClick={() => onLoadTemplate(name)}
              >
                <LayoutTemplate size={14} />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="controls-guide premium-card">
        <h3>도구 가이드</h3>
        <ul>
          <li><Type size={16} /> <span><b>Space / Enter</b> : 한 땀 뜨기 (자동 진행)</span></li>
          <li><Type size={16} /> <span><b>P</b> : 안뜨기 (Purl) 스티치</span></li>
          <li><Move size={16} /> <span><b>WASD / 화살표</b> : 커서 자유 이동</span></li>
          <li><MousePointer2 size={16} /> <span><b>마우스 드래그</b> : 360도 자유 회전</span></li>
        </ul>
      </div>

      <div className="actions">
        <button onClick={onExport} className="btn-primary">
          <Download size={20} />
          <span>3D 파일 내보내기 (.OBJ)</span>
        </button>
        <button onClick={onReset} className="btn-secondary">
          <RefreshCw size={20} />
          <span>초기화</span>
        </button>
      </div>

      <footer className="footer">
        <p>© 2026 Kittzles Studio. Crafted with precision.</p>
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
          padding: 2.5rem;
          z-index: 10;
        }

        .header {
          margin-bottom: auto;
        }

        .logo {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.04em;
          margin-bottom: 0.25rem;
        }

        .subtitle {
          color: var(--accent);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .top-right {
          position: absolute;
          top: 2.5rem;
          right: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 240px;
        }

        .premium-card {
          padding: 1.25rem;
          pointer-events: auto;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .templates h3 {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .template-grid {
          display: grid;
          gap: 0.5rem;
        }

        .template-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 0.8rem;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-primary);
          text-align: left;
        }

        .template-btn:hover {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }

        .controls-guide {
          position: absolute;
          bottom: 8.5rem;
          left: 2.5rem;
          width: 300px;
        }

        .controls-guide h3 {
          font-size: 0.75rem;
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

        .controls-guide b {
          color: var(--accent);
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
          padding: 1rem 1.75rem;
          border-radius: 14px;
          font-weight: 600;
          font-size: 1rem;
        }

        .btn-primary {
          background: var(--text-primary);
          color: #ffffff;
        }

        .btn-primary:hover {
          background: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px var(--accent-glow);
        }

        .btn-secondary {
          background: #ffffff;
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
