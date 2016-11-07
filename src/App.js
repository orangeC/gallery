import React from 'react';
import {render} from 'react-dom';
import ImgFigure from "./components/ImgFigure";


class App extends React.Component {
	constructor(){
		super();
		this.state={
			imgsArrangeArr:[]
		}
	}
	
	// 组件加载以后， 为每张图片计算其位置的范围
  componentDidMount(){

    // 首先拿到舞台的大小
    var stageDOM = this.refs.stage
        stageW = stageDOM.scrollWidth
        stageH = stageDOM.scrollHeight
        halfStageW = Math.ceil(stageW / 2)
        halfStageH = Math.ceil(stageH / 2)

    // 拿到一个imageFigure的大小
    var imgFigureDOM = this.refs.imgFigure0
        imgW = imgFigureDOM.scrollWidth
        imgH = imgFigureDOM.scrollHeight
        halfImgW = Math.ceil(imgW / 2)
        halfImgH = Math.ceil(imgH / 2)

    // 计算中心图片的位置点
    this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
    };

    // 计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);

  }
  render () {
  	var Constant: {
	    centerPos: {
	        left: 0,
	        right: 0
	    },
	    hPosRange: {   // 水平方向的取值范围
	        leftSecX: [0, 0],
	        rightSecX: [0, 0],
	        y: [0, 0]
	    },
	    vPosRange: {    // 垂直方向的取值范围
	        x: [0, 0],
	        topY: [0, 0]
	    }
	  }

  	// 获取图片相关的数据
	var imageDatas = require('./data/imageDatas.json');

	// 利用自执行函数， 将图片名信息转成图片URL路径信息
	imageDatas = (function genImageURL(imageDatasArr) {
	    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
	        var singleImageData = imageDatasArr[i];

	        singleImageData.imageURL = require('./images/' + singleImageData.fileName);

	        imageDatasArr[i] = singleImageData;
	    }

	    return imageDatasArr;
	})(imageDatas);



  	var controllerUnits = [];
  	var imgFigures =[];
  	imageDatas.forEach(function (value, index) {

        if (!this.state.imgsArrangeArr[index]) {
            this.state.imgsArrangeArr[index] = {
                pos: {
                    left: 0,
                    top: 0
                },
                rotate: 0,
                isInverse: false,
                isCenter: false
            };
        }

        imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);

        controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
    }.bind(this))

    return(
      <section className="stage" ref="stage">
      	<section className="img-sec">
      		{ imgFigures }
      	</section>
      	<nav className="controller-nav">
      		{ controllerUnits }
      	</nav>
      </section>
    )
  }
}

export default App;
