import Vue from 'vue'
 
Vue.directive('watermark', {
  bind: function(el, binding){
    // 水印文字，父元素，画布宽度，画布高度，字体，文字颜色，画布横坐标
    function addWaterMarker(str, parentNode, width, height, font, textColor, fillTextX = '10'){ 
      // 检查父元素是否包含子元素
      const elementContains = (parent, child) => parent !== child && parent.contains(child);
      const flag = elementContains(parentNode, document.querySelector('canvas'));
      // 防止重复创建
      if (!flag) {
        let can = document.createElement('canvas');
        parentNode.appendChild(can);
        can.width = width || 200;
        can.height = height || 140;
        can.style.display = 'none';
        let cans = can.getContext('2d');
        cans.rotate(-20 * Math.PI / 180);
        cans.font = font || "13px Microsoft Yahei";
        cans.fillStyle = textColor || "#DDDDDD";
        cans.textAlign = 'left';
        cans.textBaseline = 'Middle';
        cans.fillText(str, fillTextX, can.height);
        // 设置背景图（整个项目中都添加水印建议使用此方法）
        // parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
        
        // 创建div 定位覆盖（某个元素，如图片添加水印建议使用此方法）
        let div = document.createElement('div');
        div.id = str;
        div.style.pointerEvents = 'none';
        div.style.top = '0';
        div.style.left = '0';
        div.style.position = 'absolute';
        div.style.zIndex = '100000';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.background = 'url(' + can.toDataURL('image/png') + ')';
        parentNode.appendChild(div);
      }
    }
    if (binding.value.text) {
      addWaterMarker(binding.value.text, el, binding.value.width, binding.value.height, binding.value.font, binding.value.textColor, binding.value.fillTextX )
    }
  }
})