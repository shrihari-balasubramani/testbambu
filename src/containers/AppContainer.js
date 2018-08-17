import React from 'react';
import LeftColumn from '../components/LeftColumn';
import RightColumn from '../components/RightColumn';
import axios from 'axios';
const apikey = "24UWEV46YNDK7887"

class AppContainer extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			stocks:['MSFT','AAPL','INTC','NFLX','ORCL','GOOG','GOOGL','AMZN','LUV','HOG','CMCSA'],
			selectedStock:'',
			gettingData:false,
			stocksData:{}
		}
		this.setSelectedStock = this.setSelectedStock.bind(this); 
		this.getStockInfo = this.getStockInfo.bind(this)
	}
	getStockInfo(){
		var self = this;
		axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${self.state.selectedStock}&apikey=${apikey}`)
			 .then(function (response) {
		    	// handle success
		    	//response.data['Monthly Time Series']
		    	console.log(response);
		    	self.setState({stocksData:response.data['Monthly Time Series'],gettingData:false})
		  	 })
		  	 .catch(function (error) {
		    	// handle error
		    	console.log(error);
		  	 });
	}
	setSelectedStock(stockSelected){
		this.setState({selectedStock:stockSelected,gettingData:true},()=>{
			localStorage.setItem('stockSelected',stockSelected);
			this.getStockInfo()
		})
	}
  	render() {
  		return <div className="main-body">
  					<LeftColumn 
  						setSelectedStock={this.setSelectedStock}
  						stocks={this.state.stocks}
  						selectedStock={this.state.selectedStock} />
  					<RightColumn 
  						gettingData={this.state.gettingData}
  						stocksData={this.state.stocksData} />
  		   	   </div>
  	}
  	componentDidMount(){
  		let stockSelected = localStorage.getItem('stockSelected');
  		if(stockSelected != null){
  			this.setSelectedStock(stockSelected)
  		}
  	}

}
export default AppContainer;