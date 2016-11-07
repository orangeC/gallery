import React from 'react';
import {render} from 'react-dom';
import ImgFigure from "./components/ImgFigure";


class App extends React.Component {
  render () {

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
  	imageDatas.forEach(function(value){
  		imgFigures.push(< ImgFigure data={value} />)
  	});

    return(
      <section className="stage">
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
