import React from 'react';
let OhlcChartCreator = function(){
    this.shareValue = {
        min:0,
        max:100,
        shares:[],
        spread:0
      }
    this.container={
        height:500,
        width:800,
        padding:40
      }
    this.graphContainer ={
        height : this.container.height - (2 * this.container.padding),
        width : this.container.width - ( 2 * this.container.padding),
        TickfontSize:18
      }
    var ticksSize = 40

    this.initialiseShareValue =  function(sharesObj){
        var data = [];
        var shares=[];
        Object.keys(sharesObj).forEach((week)=>{
          data.push(Number(sharesObj[week]['2. high']),Number(sharesObj[week]['3. low']));
          shares.push({...sharesObj[week],on:week})
        })      
        this.shareValue.max = Math.max.apply(this,data);
        this.shareValue.min = Math.min.apply(this,data);
        this.shareValue.shares = shares;
        this.shareValue.spread = this.shareValue.max - this.shareValue.min
    }
    this.getBordersWithTickNames = function(){
      var {height,width,TickfontSize} = this.graphContainer,
          minShareValue = this.shareValue.min,
          leftBorderTicks = [];
      for(var i= 0; i<height; i += ticksSize){
        var styleObj = {
          bottom: `${i-(TickfontSize/2)}px`
        }
        leftBorderTicks.push(
          <div className="left-ticks" style={styleObj} key={i}>{
            Math.round(minShareValue+(i/height*this.shareValue.spread))
          }</div>
        )
      }
      return leftBorderTicks;
    }
    this.getGraphCss = function(){
        var {height,width} = this.graphContainer;
        return {
          'borderLeft':'1px solid black',
          'borderBottom':'1px solid black',
          'height':`${height}px`,
          'width':`${width}px`
        }
    }
    this.getEachWeekData = function(){
      return this.shareValue.shares.map((share,counter)=>{

        let highPos = this.getElementPosInYAxis(share["2. high"]),
            lowPos = this.getElementPosInYAxis(share["3. low"]),
            openPos = this.getElementPosInYAxis(share["1. open"]),
            closePos = this.getElementPosInYAxis(share["4. close"]),
            heightOpcl,
            type,
            bottom; 
        if(openPos > closePos){
          type = "red"
        }else{
          heightOpcl = closePos - openPos
          type = "green"
        }  

        let {height} = this.graphContainer,
            styleOpClBar = {
                height: highPos - lowPos,
                bottom: lowPos,
                background: type
            },
            styleOpEle = {
              bottom: openPos,
              background:type
            },
            styleClEle = {
              bottom: closePos,
              background:type
            }
        return <div className="each-element" key={counter}>
                 <div className="element-op-cl" style={styleOpClBar} ></div>
                 <div className="elem-op" style={styleOpEle} ></div>
                 <div className="elem-close" style={styleClEle} ></div>
               </div>  
      }) 
    }
    this.getElementPosInYAxis = function(val){

        return  (val-this.shareValue.min)*this.graphContainer.height/this.shareValue.spread
    }
}
export default OhlcChartCreator