export const SubNavigationMenu = () => {
  // Define submenu items for each category
  const submenuItems = {
    Technology: [
      'Layer 1 Solutions',
      'Layer 2 Solutions',
      'Smart Contracts',
      'Blockchain Technology Developments',
    ],
    Finance: [
      'DeFi (Decentralized Finance)',
      'ESDTs',
      'SFT',
      'NFT',
      'Stablecoins',
    ],
    Policy: [
      'Cryptocurrency Regulations and Policies',
      'Security and Privacy in Crypto',
    ],
    Analysis: [
      'Market Analysis and Investment Insights',
      'Blockchain Projects',
    ],
    Trading: ['Exchanges and Trading Platforms'],
  };

  return (
    <div className="hidden lg:flex justify-center items-center space-x-4 bg-slate-800 text-white py-3">
      {Object.entries(submenuItems).map(([menu, items], index, array) => (
        <div
          className={`relative group ${index < array.length - 1 ? 'border-r border-slate-600 pr-4' : ''}`}
          key={menu}
        >
          <button
            className={`px-3 py-2 rounded-md text-sm font-bold bg-slate-800 text-white focus:outline-none`}
          >
            {menu}
            {/* SVG icon placeholder */}
          </button>
          <div className="absolute hidden group-hover:block z-10 mt-0 w-80 rounded-md shadow-lg bg-slate-900 text-white">
            {items.map((subItem) => (
              <a
                href="#"
                className={`block px-4 py-2 text-sm hover:bg-slate-500 hover:text-white`}
                key={subItem}
              >
                {subItem}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
