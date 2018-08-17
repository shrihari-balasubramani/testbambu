import React from 'react';
import OhlcChartCreator from '../utils/OhlcChartCreator';
import './chart.scss';
class RightColumn extends React.Component{
  render() {
  	return <div className="right-col"><DrawGraph gettingData={this.props.gettingData} stocksData={this.props.stocksData}  /></div>
  }
}
class GraphWithBorder extends React.Component{
  constructor(props){
    super(props);
    var ohlcObj = new OhlcChartCreator()
    ohlcObj.initialiseShareValue(this.props.sharesArr)
    this.state ={ ohlcObj }
  }
  render(){  
      let leftBorderTicks = this.state.ohlcObj.getBordersWithTickNames(),
          eachWeekData = this.state.ohlcObj.getEachWeekData(),
          cssStyle = this.state.ohlcObj.getGraphCss()

      return  <div className="borders" style={cssStyle}>
      			<div className="y-axis">
                {leftBorderTicks}
                </div>
                <div className="layout-scroll">
                  <div className="records">
                    {eachWeekData}
                  </div>
                </div>  
              </div>
  }
}  
class DrawGraph extends React.Component{
  render(){
  	if(this.props.gettingData){
  		return "Fetching data, hold on tight!"
  	}else{
  		if(Object.keys(this.props.stocksData).length == 0){
  	  		return "select any stock to continue"
  	  	}else{
			return  <div className="container">
   			  <GraphWithBorder sharesArr={this.props.stocksData}/>
            </div>  	  		
  	  	}
  	}
    
  }
}  
export default RightColumn;