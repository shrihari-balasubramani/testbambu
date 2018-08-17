import React from 'react';

class ListItems extends React.Component{
  render() {
	return  <ul className="stocks-list">
				{this.props.stocks.map((stock,counter)=>{
					let classStr = 'each-stock'
					if(this.props.selectedStock == stock){
						classStr += ' selected'
					}
					return <li className={classStr} key={counter} onClick={()=>{this.props.setSelectedStock(stock)}}>{stock}</li>		
				})}
			</ul>
  }
}

class LeftColumn extends React.Component{
  render() {

  	return 	<div className="left-col">
  				<ListItems 
					setSelectedStock={this.props.setSelectedStock}
					stocks={this.props.stocks}
					selectedStock={this.props.selectedStock}
					 />
  			</div>
  }
}
export default LeftColumn;