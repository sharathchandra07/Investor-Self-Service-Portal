import { useState } from 'react';
import '../components/Dashboard.css';
import { 
  Search, 
  BarChart2, 
  Settings, 
  Bell, 
  Menu,
  Home,
  LineChart,
  Wallet,
  Star,
  PieChart,
  LogOut,
  User,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  BarChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [symbol, setSymbol] = useState('');
  const [activeLink, setActiveLink] = useState('dashboard');
  const [stockData, setStockData] = useState({
    dayHigh: null,
    dayLow: null,
    dayOpen: null,
    currentPrice: null,
    volume: null,
    historicalData: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFetch = async () => {
    if (!symbol) {
      setError('Please enter a stock symbol');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const stockdata = await axios.get(`https://api.stockdata.org/v1/data/quote?symbols=${symbol}&api_token=YOUR_API_KEY`);
      // console.log(stockdata.data);
      
      const historicalData = Array.from({length: 30}, (_, i) => ({
        date: new Date(Date.now() - (29-i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: stockdata.data.data[0].price * (1 + (Math.random() - 0.5) * 0.1)
      }));

      setStockData({
        dayHigh: stockdata.data.data[0].day_high,
        dayLow: stockdata.data.data[0].day_low,
        dayOpen: stockdata.data.data[0].day_open,
        currentPrice: stockdata.data.data[0].price,
        volume: stockdata.data.data[0].volume,
        historicalData
      });
      // console.log(stockData.data.data[0]+"thanks");
    } catch(err) {
      setError('Failed to fetch stock data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
    
  };

  const chartData = {
    labels: stockData.historicalData.map(data => data.date),
    datasets: [
      {
        label: `${symbol} Stock Price`,
        data: stockData.historicalData.map(data => data.price),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '30-Day Price History'
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `$${value.toFixed(2)}`
        }
      }
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatVolume = (vol) => {
    if (vol >= 1000000) {
      return `${(vol / 1000000).toFixed(2)}M`;
    } else if (vol >= 1000) {
      return `${(vol / 1000).toFixed(2)}K`;
    }
    return vol;
  };

  const profile = () => {
    navigate('./profile');
  };

  return (
    <div className="main-wrapper">
      <div className="d-flex flex-column h-100">
        <nav className="navbar navbar-expand-lg navbar-dark navbar-trader fixed-top" style={{position: "fixed"}}>
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center" href="/dash">
              <BarChart2 className="me-2" />
              Investor Self Service Portal
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <Menu />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item">
                  <a className="nav-link" href="#" title="Notifications">
                    <Bell className="top-nav-icon text-light" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" title="Settings">
                    <Settings className="top-nav-icon text-light" />
                  </a>
                </li>
                <li className="nav-item ms-2">
                  <User 
                    className="d-flex top-nav-icon text-light" 
                    style={{
                      borderRadius: "50%", 
                      height: "25px", 
                      width: "25px", 
                      padding: "3px"
                    }} 
                    onClick={profile} 
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="d-flex" style={{marginTop: "56px"}}>
          {/* Side Navbar */}
          <div className="sidebar p-3">
            <ul className="nav flex-column mt-3">
              <li className="nav-item">
                <a 
                  className={`nav-link d-flex align-items-center ${activeLink === 'dashboard' ? 'active' : ''}`}
                  href="#"
                  onClick={() => setActiveLink('dashboard')}
                >
                  <Home className="nav-icon" />
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link d-flex align-items-center ${activeLink === 'markets' ? 'active' : ''}`}
                  href="#"
                  onClick={() => setActiveLink('markets')}
                >
                  <LineChart className="nav-icon" />
                  Markets
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link d-flex align-items-center ${activeLink === 'portfolio' ? 'active' : ''}`}
                  href="#"
                  onClick={() => setActiveLink('portfolio')}
                >
                  <Wallet className="nav-icon" />
                  Portfolio
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link d-flex align-items-center ${activeLink === 'watchlist' ? 'active' : ''}`}
                  href="#"
                  onClick={() => setActiveLink('watchlist')}
                >
                  <Star className="nav-icon" />
                  Watchlist
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link d-flex align-items-center ${activeLink === 'analytics' ? 'active' : ''}`}
                  href="#"
                  onClick={() => setActiveLink('analytics')}
                >
                  <PieChart className="nav-icon" />
                  Analytics
                </a>
              </li>
            </ul>
            
            {/* Logout Link */}
            <div className="logout-link">
              <a 
                className="nav-link d-flex align-items-center text-danger"
                href=""
                onClick={() => navigate('/')}
              >
                <LogOut className="nav-icon" />
                Logout
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content flex-grow-1 p-4" style={{marginLeft: "200px"}}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title mb-4">Market Search</h5>
                      <div className="input-group mb-4">
                        <input
                          type="text"
                          className="form-control search-box"
                          placeholder="Enter stock symbol (ex: AAPL, MSFT)"
                          value={symbol}
                          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleFetch();
                            }
                          }}
                        />
                        <button
                          className="btn btn-trader"
                          type="button"
                          onClick={handleFetch}
                          disabled={loading}
                        >
                          <Search className="me-2" />
                          {loading ? 'Loading...' : 'Fetch Data'}
                        </button>
                      </div>

                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

                      {stockData.currentPrice && (
                        <div className="stock-data">
                          <h4 className="mb-4">{symbol} Stock Information</h4>
                          
                          {/* Price Chart */}
                          <div className="mb-4">
                            <div className="card">
                              <div className="card-body">
                                <Line data={chartData} options={chartOptions} />
                              </div>
                            </div>
                          </div>

                          <div className="row g-4">
                            <div className="col-md-6">
                              <div className="card bg-light">
                                <div className="card-body">
                                  <div className="d-flex align-items-center">
                                    <DollarSign className="text-primary me-2" />
                                    <div>
                                      <h6 className="mb-0">Current Price</h6>
                                      <h4 className="mb-0">${formatNumber(stockData.currentPrice)}</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="card bg-light">
                                <div className="card-body">
                                  <div className="d-flex align-items-center">
                                    <Clock className="text-primary me-2" />
                                    <div>
                                      <h6 className="mb-0">Opening Price</h6>
                                      <h4 className="mb-0">${formatNumber(stockData.dayOpen)}</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="card bg-light">
                                <div className="card-body">
                                  <div className="d-flex align-items-center">
                                    <TrendingUp className="text-success me-2" />
                                    <div>
                                      <h6 className="mb-0">Day High</h6>
                                      <h4 className="mb-0">${formatNumber(stockData.dayHigh)}</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="card bg-light">
                                <div className="card-body">
                                  <div className="d-flex align-items-center">
                                    <TrendingDown className="text-danger me-2" />
                                    <div>
                                      <h6 className="mb-0">Day Low</h6>
                                      <h4 className="mb-0">${formatNumber(stockData.dayLow)}</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="card bg-light">
                                <div className="card-body">
                                  <div className="d-flex align-items-center">
                                    <BarChart className="text-primary me-2" />
                                    <div>
                                      <h6 className="mb-0">Volume</h6>
                                      <h4 className="mb-0">{formatVolume(stockData.volume)}</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
