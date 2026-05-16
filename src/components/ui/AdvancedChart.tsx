import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

interface AdvancedChartProps {
  symbol?: string;
  isDark: boolean;
}

export const AdvancedChart: React.FC<AdvancedChartProps> = ({ 
  symbol = "OANDA:XAUUSD", 
  isDark 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = 'tradingview-widget-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const createWidget = () => {
      if (containerRef.current && window.TradingView) {
        new window.TradingView.widget({
          "autosize": true,
          "symbol": symbol,
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": isDark ? "dark" : "light",
          "style": "1",
          "locale": "ru",
          "toolbar_bg": isDark ? "#020203" : "#ffffff",
          "enable_publishing": false,
          "hide_top_toolbar": false,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "save_image": true,
          "container_id": containerRef.current.id,
          "studies": [
            "MASimple@tv-basicstudies",
            "RSI@tv-basicstudies"
          ],
          "backgroundColor": isDark ? "#020203" : "#ffffff",
          "gridColor": isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)",
        });
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = createWidget;
      document.head.appendChild(script);
    } else {
      if (window.TradingView) {
        createWidget();
      } else {
        script.onload = createWidget;
      }
    }

    // Handle resize
    const handleResize = () => {
       // The widget is autosized, but we might need to re-init if the container changes significantly
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol, isDark]);

  return (
    <div className="w-full h-full min-h-[700px] rounded-xl overflow-hidden bg-background-secondary">
      <div 
        id={`tradingview_${Math.random().toString(36).substring(7)}`}
        ref={containerRef} 
        className="w-full h-full" 
      />
    </div>
  );
};
