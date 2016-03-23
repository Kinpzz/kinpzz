# 任务八 : 响应式网格(栅格化)布局
***
## 知识点 
* ` CSS3` 属性 `box-sizing` 的使用: 当元素的宽度、高度确定时,  `{ box-sizing : border-box }`将元素的padding, border都将在设定的高度和宽度内绘制;也就是说,无论你的padding和border如何变化,它都不会超出预先设定好的宽度和高度.

* 清楚浮动防止高度塌陷: 设外层元素为container, 内层为content,应用了float属性的内层元素content高度一旦超过container,container就无法完全包裹content,就造成了高度塌陷.解决办法:父级元素应用`::after`选择器.
```css
        .container: after {
            content: " ";
            display: table;
            clear: both;
        }
```
* `CSS3`属性: `@media`主要用于为不同设备提供不同的属性, 参考文档: [CSS|MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)、
[CSS3 media querise](https://segmentfault.com/a/1190000002812335);  

本次练习代码示例:
最小宽度为768.1px的显示器下应用如下属性,
```css
      @media only screen and (min-width: 768.1px) {
    	.col-md-1 {
    		width: 8.333%;
    	}
    	.col-md-2 {
    		width: 16.666%;
    	}
    	.col-md-3 {
    		width: 25%;
    	}
    	.col-md-4 {
    		width: 33.333%;
    	}
    	.col-md-5 {
    		width: 41.666%;
    	}
    	.col-md-6 {
    		width: 50%;
    	}
    	.col-md-8 {
    		width: 66.666%;
    	}
    	.col-md-12 {
    		width: 100%;
    	}
}

(如有错漏 欢迎指正);