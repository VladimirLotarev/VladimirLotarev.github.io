const VlSlider = {
  setParameters(id, params) {
    launchSlider(id, params);
  }
};

function launchSlider(id, params) {
  let slider = document.getElementById(`${id}`),
    sliderWidth,
    sliderViewport,
    sliderUlWidth,
    speed = params.speed,
    interval = params.interval,
    pathImg = params.pathToImage,
    imageNames = params.imageNames,
    img,
    source,
    media,
    content = params.content,
    links = params.links,
    counter = 0,
    alt = params.alt;
  if (slider) {
    sliderWidth = slider.clientWidth;
    if(sliderWidth <= 320) {
      media = 320;
    } else if (sliderWidth > 320 && sliderWidth <= 360) {
      media = 360;
    } else if (sliderWidth > 360 && sliderWidth <= 414) {
      media = 414;
    } else if (sliderWidth > 414 && sliderWidth <= 600) {
      media = 600;
    } else if (sliderWidth > 600 && sliderWidth <= 768) {
      media = 768;
    } else if (sliderWidth > 768 && sliderWidth <= 1280) {
      media = 1280;
    } else {
      media = '';
    }
    createViewport(slider, imageNames);
    params.autoplay && autoplay();
  }

  function createViewport(slider, imageNames) {
    sliderViewport = document.createElement("div");
    sliderUl = document.createElement("ul");
    createSlide(sliderUl, imageNames);
    sliderUlWidth = sliderWidth * imageNames.length;
    slider.setAttribute("style", "position: relative; max-width: 100%;");
    sliderUl.setAttribute("style", `margin: 0; padding: 0; width: ${sliderUlWidth}px; display: flex`);
    sliderViewport.setAttribute("style", `margin: 0 auto; overflow: hidden; width: ${sliderWidth}px; max-width: 100%;`);
    sliderViewport.append(sliderUl);
    slider.prepend(sliderViewport);
  }
  
  function createSlide(sliderUl, imageNames) {
    let sliderLi = document.createElement("li");
    sliderLi.insertAdjacentHTML('beforeend', '<div class="slider__img" style="display: block; width: 100%; text-align: center;"><picture><source srcset="space.webp" type="image/webp" /><img src="space.jpg" style="display: block; width: 100%;" alt="image" type="image/jpg" /></picture></div>');
    sliderUl.append(sliderLi);
    let sliderList = sliderUl.querySelectorAll(`li`);
    for(let slide of sliderList) {
      slide.setAttribute('style', `width: ${sliderWidth}px; list-style: none;`);
    }
    if(counter === imageNames.length - 1) {
      let lastImg  = imageNames[imageNames.length - 1];
      let lastAlt  = alt[alt.length - 1];
      let lastContent = content[content.length - 1];
      let lastLinks = links[links.length - 1];
      imageNames.pop();
      alt.pop();
      content.pop();
      links.pop();
      imageNames.unshift(lastImg);
      alt.unshift(lastAlt);
      content.unshift(lastContent);
      links.unshift(lastLinks);
    }
    source = sliderUl.lastChild.querySelector('source');
    img = sliderUl.lastChild.querySelector('img');  
    if(source) {
      source.setAttribute('srcset', `${pathImg}${imageNames[counter]}${media}.webp`);   
    }
    if(img) {
      img.setAttribute('src', `${pathImg}${imageNames[counter]}${media}.jpg`);   
      img.setAttribute('alt', `${alt[counter]}`);   
    }
    if(content) {
      sliderDiv = document.createElement("div");
      sliderDiv.classList.add('slide__txt');
      sliderDiv.setAttribute('style', `position: absolute; top: 0; right: 0; bottom: 0; left: 0; backgroun: transparent; color: #fff;`);
      sliderDiv.insertAdjacentHTML('beforeend', content[counter]);
      sliderLi.append(sliderDiv);
    }    
    if(links) {
      sliderDiv.insertAdjacentHTML('beforeend', links[counter]);
    }
    let currentSlide = sliderUl.querySelector('.current');
    if(currentSlide) {
      currentSlide.classList.remove('current');
    }
    sliderUl.lastChild.classList.add('current'); 
    counter++;
  }

  function mooveNext() {
    if(counter < imageNames.length - 1) { 
      createSlide(sliderUl, imageNames);
      let offsetLeft = sliderUl.lastChild.offsetLeft;
      sliderUl.setAttribute("style", `transform: translateX(${-offsetLeft}px); transition: ${speed}00ms; margin: 0; padding: 0; width: ${sliderUlWidth}px; display: flex;`);
    } else {
      sliderUl.setAttribute("style", `transform: translateX(0px); transition: 0; margin: 0; padding: 0; width: ${sliderUlWidth}px; display: flex;`);
      sliderUl.innerHTML = '';
      createSlide(sliderUl, imageNames);
      counter = 0;
    }
  }

  function autoplay() { 
    setInterval(() => {
      mooveNext(1);
    }, `${interval}000`);
  }
  
  window.addEventListener("resize", () => {
    sliderWidth = slider.clientWidth;
  });  
}