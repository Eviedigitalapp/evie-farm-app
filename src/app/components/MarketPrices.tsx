import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, RefreshCw, MapPin, Calendar } from 'lucide-react';

type PriceCategory = 'crops' | 'livestock' | 'poultry' | 'eggs-milk';

interface MarketPrice {
  id: number;
  item: string;
  category: PriceCategory;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  market: string;
  location: string;
  lastUpdated: string;
}

export function MarketPrices() {
  const [selectedCategory, setSelectedCategory] = useState<PriceCategory>('crops');
  const [selectedMarket, setSelectedMarket] = useState<string>('all');

  const marketPrices: MarketPrice[] = [
    // Crops
    {
      id: 1,
      item: 'Maize',
      category: 'crops',
      currentPrice: 1000,
      previousPrice: 950,
      unit: 'per kg',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 2,
      item: 'Beans',
      category: 'crops',
      currentPrice: 3000,
      previousPrice: 3200,
      unit: 'per kg',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 3,
      item: 'Cassava',
      category: 'crops',
      currentPrice: 500,
      previousPrice: 500,
      unit: 'per kg',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 4,
      item: 'Sweet Potatoes',
      category: 'crops',
      currentPrice: 800,
      previousPrice: 750,
      unit: 'per kg',
      market: 'Owino Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 5,
      item: 'Irish Potatoes',
      category: 'crops',
      currentPrice: 1200,
      previousPrice: 1300,
      unit: 'per kg',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 6,
      item: 'Tomatoes',
      category: 'crops',
      currentPrice: 2500,
      previousPrice: 2200,
      unit: 'per kg',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 7,
      item: 'Onions',
      category: 'crops',
      currentPrice: 3500,
      previousPrice: 3500,
      unit: 'per kg',
      market: 'Owino Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 8,
      item: 'Cabbage',
      category: 'crops',
      currentPrice: 1500,
      previousPrice: 1400,
      unit: 'per kg',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    // Livestock
    {
      id: 9,
      item: 'Cow (Adult)',
      category: 'livestock',
      currentPrice: 3000000,
      previousPrice: 2900000,
      unit: 'per head',
      market: 'Wambizi Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 10,
      item: 'Goat (Adult)',
      category: 'livestock',
      currentPrice: 300000,
      previousPrice: 300000,
      unit: 'per head',
      market: 'Wambizi Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 11,
      item: 'Pig (Adult)',
      category: 'livestock',
      currentPrice: 600000,
      previousPrice: 580000,
      unit: 'per head',
      market: 'Wambizi Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 12,
      item: 'Sheep (Adult)',
      category: 'livestock',
      currentPrice: 250000,
      previousPrice: 240000,
      unit: 'per head',
      market: 'Wambizi Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    // Poultry
    {
      id: 13,
      item: 'Chicken (Broiler)',
      category: 'poultry',
      currentPrice: 20000,
      previousPrice: 19000,
      unit: 'per kg',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 14,
      item: 'Chicken (Layer)',
      category: 'poultry',
      currentPrice: 15000,
      previousPrice: 15000,
      unit: 'per head',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 15,
      item: 'Duck',
      category: 'poultry',
      currentPrice: 18000,
      previousPrice: 17500,
      unit: 'per head',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 16,
      item: 'Turkey',
      category: 'poultry',
      currentPrice: 45000,
      previousPrice: 45000,
      unit: 'per head',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 17,
      item: 'Guinea Fowl',
      category: 'poultry',
      currentPrice: 12000,
      previousPrice: 11500,
      unit: 'per head',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 18,
      item: 'Quail',
      category: 'poultry',
      currentPrice: 5000,
      previousPrice: 5000,
      unit: 'per head',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    // Eggs & Milk
    {
      id: 19,
      item: 'Chicken Eggs (Tray)',
      category: 'eggs-milk',
      currentPrice: 14000,
      previousPrice: 13500,
      unit: 'per 30 eggs',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 20,
      item: 'Duck Eggs',
      category: 'eggs-milk',
      currentPrice: 600,
      previousPrice: 600,
      unit: 'per egg',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 21,
      item: 'Quail Eggs',
      category: 'eggs-milk',
      currentPrice: 300,
      previousPrice: 300,
      unit: 'per egg',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    },
    {
      id: 22,
      item: 'Fresh Milk',
      category: 'eggs-milk',
      currentPrice: 2000,
      previousPrice: 1900,
      unit: 'per liter',
      market: 'Nakasero Market',
      location: 'Kampala',
      lastUpdated: '2026-05-17'
    }
  ];

  const markets = ['all', 'Nakasero Market', 'Owino Market', 'Wambizi Market'];

  const getPriceChange = (current: number, previous: number) => {
    const change = current - previous;
    const percentage = previous !== 0 ? ((change / previous) * 100).toFixed(1) : '0.0';
    return { change, percentage };
  };

  const getPriceTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (current < previous) return <TrendingDown className="w-5 h-5 text-red-600" />;
    return <Minus className="w-5 h-5 text-gray-400" />;
  };

  const getPriceTrendColor = (current: number, previous: number) => {
    if (current > previous) return 'text-green-600';
    if (current < previous) return 'text-red-600';
    return 'text-gray-600';
  };

  const filteredPrices = marketPrices.filter(
    price =>
      price.category === selectedCategory &&
      (selectedMarket === 'all' || price.market === selectedMarket)
  );

  const handleRefresh = () => {
    alert('Refreshing market prices...\n\nIn production, this would fetch the latest prices from:\n- Uganda Bureau of Statistics\n- Market price APIs\n- Commodity exchanges\n- Local market reports');
  };

  const categoryLabels = {
    'crops': 'Crops',
    'livestock': 'Livestock',
    'poultry': 'Poultry',
    'eggs-milk': 'Eggs & Milk'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Market Prices</h1>
          <p className="text-gray-600">Current market prices across Uganda</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Prices
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(categoryLabels) as PriceCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === cat
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Market Location</label>
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {markets.map(market => (
                <option key={market} value={market}>
                  {market === 'all' ? 'All Markets' : market}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-2">Items Tracked</p>
          <p className="font-semibold">{filteredPrices.length} items</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-2">Prices Up</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <p className="font-semibold text-green-600">
              {filteredPrices.filter(p => p.currentPrice > p.previousPrice).length} items
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-2">Prices Down</p>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <p className="font-semibold text-red-600">
              {filteredPrices.filter(p => p.currentPrice < p.previousPrice).length} items
            </p>
          </div>
        </div>
      </div>

      {/* Price List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Item</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Current Price</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Previous Price</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Change</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Market</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPrices.map((price) => {
                const { change, percentage } = getPriceChange(price.currentPrice, price.previousPrice);
                return (
                  <tr key={price.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold">{price.item}</p>
                        <p className="text-sm text-gray-600">{price.unit}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold">{price.currentPrice.toLocaleString()} UGX</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-600">{price.previousPrice.toLocaleString()} UGX</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getPriceTrendIcon(price.currentPrice, price.previousPrice)}
                        <div className={getPriceTrendColor(price.currentPrice, price.previousPrice)}>
                          <p className="font-semibold">
                            {change > 0 && '+'}
                            {change.toLocaleString()} UGX
                          </p>
                          <p className="text-sm">({percentage}%)</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <div>
                          <p className="text-sm font-medium">{price.market}</p>
                          <p className="text-xs text-gray-500">{price.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <p className="text-sm">
                          {new Date(price.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200 p-6">
        <h2 className="font-semibold mb-4">Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-green-700 mb-2">📈 Trending Up</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Maize prices increased by 5.3% this week</li>
              <li>• Fresh milk demand driving prices up</li>
              <li>• Broiler chicken prices rising due to feed costs</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-blue-700 mb-2">💡 Selling Opportunities</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Egg prices at 14,000 UGX/tray - good time to sell</li>
              <li>• High demand for tomatoes in Kampala markets</li>
              <li>• Pig prices trending upward - consider selling</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Source Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-gray-600 text-sm">
          <strong>Data Sources:</strong> Prices are collected from major markets in Uganda including Nakasero Market,
          Owino Market, and Wambizi Livestock Market. Prices are updated daily and reflect wholesale market rates.
          Actual prices may vary by location, quality, and season.
        </p>
      </div>
    </div>
  );
}
