// ============================================
// SHOP-KONFIGURATION
// ============================================
// Hier können Sie zentral den Shop-Namen und andere Einstellungen ändern

const CONFIG = {
  SHOP_NAME: "TORNADO INTERCEPTORS",
  SHOP_CLAIM: "Premium 3D-gedruckte Extreme-Weather-Modelle",
  CURRENCY: "EUR",
  CURRENCY_SYMBOL: "€",
  TAX_RATE: 0.19, // 19% MwSt.
};

// Exportieren für andere Module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
