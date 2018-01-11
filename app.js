const vm = new Vue({
	el: '#app',
	data: {
		interval: null,
		results: [],
		prices: {
			binance: {
				btcusd: null,
				ethusd: null,
				ltcusd: null,
				bchusd: null
			},
			gdax: {
				btcusd: null,
				ethusd: null,
				ltcusd: null,
				bchusd: null
			}
		}
  	},
  	computed: {
  		minmax: function() {
  			return {
	  			btcusd: {
	  				min: Math.min(this.prices.gdax.btcusd, this.prices.binance.btcusd),
	  				max: Math.max(this.prices.gdax.btcusd, this.prices.binance.btcusd)
	  			},
	  			bchusd: {
	  				min: Math.min(this.prices.gdax.bchusd, this.prices.binance.bchusd),
	  				max: Math.max(this.prices.gdax.bchusd, this.prices.binance.bchusd)
	  			},
	  			ethusd: {
	  				min: Math.min(this.prices.gdax.ethusd, this.prices.binance.ethusd),
	  				max: Math.max(this.prices.gdax.ethusd, this.prices.binance.ethusd)
	  			},
	  			ltcusd: {
	  				min: Math.min(this.prices.gdax.ltcusd, this.prices.binance.ltcusd),
	  				max: Math.max(this.prices.gdax.ltcusd, this.prices.binance.ltcusd)
	  			}
	  		}
  		},
  		diffs: function() {
  			return {
  				btcusd: {
  					diff: (this.minmax.btcusd.max - this.minmax.btcusd.min) / this.minmax.btcusd.max * 100
  				},
  				bchusd: {
  					diff: (this.minmax.bchusd.max - this.minmax.bchusd.min) / this.minmax.bchusd.max * 100
  				},
  				ethusd: {
  					diff: (this.minmax.ethusd.max - this.minmax.ethusd.min) / this.minmax.ethusd.max * 100
  				},
  				ltcusd: {
  					diff: (this.minmax.ltcusd.max - this.minmax.ltcusd.min) / this.minmax.ltcusd.max * 100
  				}
  			}
  		},
  		alerts: function(){
  			var threshold = .5;
  			var btcusdAlert = false;
  			var bchusdAlert = false;
  			var ethusdAlert = false;
  			var ltcusdAlert = false;
  			
			if(this.diffs.btcusd.diff > threshold){
  				btcusdAlert = true;
  			}
  			if(this.diffs.bchusd.diff > threshold){
  				bchusdAlert = true;
  			}
  			if(this.diffs.ethusd.diff > threshold){
  				ethusdAlert = true;
  			}
  			if(this.diffs.ltcusd.diff > threshold){
  				ltcusdAlert = true;
  			}
  			return {
  				btcusd: btcusdAlert,
  				bchusd: bchusdAlert,
  				ethusd: ethusdAlert,
  				ltcusd: ltcusdAlert
  			}
  		},
  		messages: function(){
  			var message = '';
  			if(this.alerts.btcusd){
  				message = '<div class="alert alert-dark">Sell BTC/USD on MARKET for '+ this.minmax.btcusd.max +' and buy on MARKET for '+ this.minmax.btcusd.min +'</div>'+ message;
  			}
  			if(this.alerts.bchusd){
  				message = '<div class="alert alert-dark">Sell BCH/USD on MARKET for '+ this.minmax.bchusd.max +' and buy on MARKET for '+ this.minmax.bchusd.min +'</div>'+ message;
  			}
  			if(this.alerts.ethusd){
  				message = '<div class="alert alert-dark">Sell ETH/USD on MARKET for '+ this.minmax.ethusd.max +' and buy on MARKET for '+ this.minmax.ethusd.min +'</div>'+ message;
  			}
  			if(this.alerts.ltcusd){
  				message = '<div class="alert alert-dark">Sell LTC/USD on MARKET for '+ this.minmax.ltcusd.max +' and buy on MARKET for '+ this.minmax.ltcusd.min +'</div>'+ message;
  			}
  			return {
  				message: message
  			}
  		}
  	},
  	methods: {
		getPrices(){
			axios.get('https://api.binance.com/api/v1/ticker/24hr?symbol=BTCUSDT').then(function(response){
				this.prices.binance.btcusd = response.data.askPrice;
			}.bind(this));
			
			axios.get('https://api.binance.com/api/v1/ticker/24hr?symbol=BCCUSDT').then(function(response){
				this.prices.binance.bchusd = response.data.askPrice;
			}.bind(this));
			
			axios.get('https://api.binance.com/api/v1/ticker/24hr?symbol=ETHUSDT').then(function(response){
				this.prices.binance.ethusd = response.data.askPrice;
			}.bind(this));
			
			axios.get('https://api.binance.com/api/v1/ticker/24hr?symbol=LTCUSDT').then(function(response){
				this.prices.binance.ltcusd = response.data.askPrice;
			}.bind(this));
			
			axios.get('https://api.gdax.com/products/BTC-USD/ticker').then(function(response){
				this.prices.gdax.btcusd = response.data.price;
			}.bind(this));
			
			axios.get('https://api.gdax.com/products/BCH-USD/ticker').then(function(response){
				this.prices.gdax.bchusd = response.data.price;
			}.bind(this));
			
			axios.get('https://api.gdax.com/products/ETH-USD/ticker').then(function(response){
				this.prices.gdax.ethusd = response.data.price;
			}.bind(this));
			
			axios.get('https://api.gdax.com/products/LTC-USD/ticker').then(function(response){
				this.prices.gdax.ltcusd = response.data.price;
			}.bind(this));
		}
  	},
	mounted: function() {
		this.getPrices();
		/*this.interval = setInterval(function(){
			this.getPrices();
		}.bind(this), 60000);*/
	}
});