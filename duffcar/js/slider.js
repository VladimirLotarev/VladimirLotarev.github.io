document.addEventListener("DOMContentLoaded", () => {
  window.VlSlider = {
    setParams(id, params) {
      class NewSlider {

        constructor(id) {
          this.slider = document.getElementById(`${id}`);
          this.sliderWidth;
          this.sliderViewport;
          this.sliderUlWidth;
          this.sliderUl;
          this.speed = params.speed;
          this.controls = params.controls;
          this.indicators = params.indicators;
          this.interval = params.interval;
          this.pathImg = params.pathToImage;
          this.gallery = params.gallery;
          this.imageNames = params.imageNames;
          this.img;
          this.source;
          this.lastImg;
          this.media;
          this.content = params.content;
          this.links = params.links;
          this.counter = 0;
          this.alt = params.alt;
          this.id = id;
          this.params = params;
        }
      
        get launchSlider() {
          if (this.slider) {
            this.sliderWidth = this.slider.clientWidth;
            this.slider.setAttribute('style', 'position: relative;');
            window.addEventListener("resize", () => {
              this.sliderWidth = this.slider.clientWidth;
            });

            if(this.sliderWidth <= 320) {
              this.media = 320;
            } else if (this.sliderWidth > 320 && this.sliderWidth <= 360) {
              this.media = 360;
            } else if (this.sliderWidth > 360 && this.sliderWidth <= 414) {
              this.media = 414;
            } else if (this.sliderWidth > 414 && this.sliderWidth <= 600) {
              this.media = 600;
            } else if (this.sliderWidth > 600 && this.sliderWidth <= 768) {
              this.media = 768;
            } else if (this.sliderWidth > 768 && this.sliderWidth <= 1280) {
              this.media = 1280;
            } else {
              this.media = '';
            }
            id.createViewport();
            this.controls ? this.createControls() : null;
            this.indicators ? this.createIndicators() : null;
            params.autoplay && id.autoplay();
            this.gallery ? this.createGallery() : null;
          }
        }

        createViewport() {
          this.sliderViewport = document.createElement("div");
          this.sliderUl = document.createElement("ul");
          this.sliderUl.classList.add('slider__list');   
          const sliderLi = document.createElement("li");
          sliderLi.classList.add('slider__item');
          if(this.gallery) {
            sliderLi.insertAdjacentHTML('beforeend', '<div class="slider__img" style="display: block; width: 100%; height: 100%; text-align: center; background: #eee;"></div>');
          } else {
            sliderLi.insertAdjacentHTML('beforeend', '<div class="slider__img" style="display: block; width: 100%; height: 100%; text-align: center; background: #eee;"><picture style="position: relative;"><source srcset=' + `${this.pathImg}${this.imageNames[this.counter]}${this.media}.webp` + ' type="image/webp" /><img src=' + `${this.pathImg}${this.imageNames[this.counter]}${this.media}.jpg` + ' style="display: block; width: 100%;" alt="image" /></picture></div>');
          }
          if(this.content) {
            let sliderDiv = document.createElement("div");
            sliderDiv.classList.add('slide__txt');
            sliderDiv.insertAdjacentHTML('beforeend', this.content[this.counter]);
            if(this.gallery) {
              const galleryUl = document.createElement("ul");   
              galleryUl.classList.add('gallery__list');
              for(let i = 0; i <  this.imageNames[0].length; i++) {
                const galleryLi = document.createElement("li");
                galleryLi.classList.add('gallery__item');
                galleryLi.insertAdjacentHTML('beforeend', '<div class="gallery__img" style="display: block; width: 100%; height: 100%; text-align: center; background: #eee;"><picture style="position: relative;"><img src=' + `${this.pathImg}gallery/${this.imageNames[0][i]}-icon.jpg` + ' class="gallery__tambnail" style="display: block; width: 100%;" alt="image" /></picture></div>');
                galleryUl.append(galleryLi);
              }
              sliderDiv.prepend(galleryUl);
            }
            sliderLi.append(sliderDiv);
            if(this.links) {
              sliderDiv.insertAdjacentHTML('beforeend', this.links[this.counter]);
            }
          }    
          this.sliderUl.append(sliderLi);
          let sliderList = this.sliderUl.querySelectorAll(`.slider__item`);
          for(let slide of sliderList) {
            slide.setAttribute('style', `width: ${this.sliderWidth}px; list-style: none;position: relative;`);
          }

          this.sliderUlWidth = this.sliderWidth * this.imageNames.length;
          this.slider.setAttribute("style", "position: relative; max-width: 100%;display: flex; align-items: center;");
          this.sliderUl.setAttribute("style", `display: flex; width: ${this.sliderUlWidth}px; height: 100%; margin: 0; padding: 0;`);
          this.sliderUl.id = `${id.id}-list`;
          this.sliderViewport.setAttribute("style", `width: ${this.sliderWidth}px; max-width: 100%; height: 100%; margin: 0 auto; overflow: hidden;`);
          this.sliderViewport.append(this.sliderUl);
          this.slider.prepend(this.sliderViewport);
        }

        createControls() {
          let prev = document.createElement('div');
          let next = document.createElement('div');
          prev.setAttribute('class', 'slider__prev');
          next.setAttribute('class', 'slider__next');
          this.slider.append(prev);
          this.slider.append(next);
          next.addEventListener('click', () => {
            this.mooveNext();
            next.style.zIndex = -1;
            prev.style.zIndex = -1;
            setTimeout(() => {
              next.style.zIndex = 1;
              prev.style.zIndex = 1;
            }, `${this.speed}00`);
          }); 
          prev.addEventListener('click', () => {
            this.moovePrev();
            prev.style.zIndex = -1;
            next.style.zIndex = -1;
            setTimeout(() => {
              next.style.zIndex = 1;
              prev.style.zIndex = 1;
            }, `${this.speed}00`);
          });
          // this.mouseScroll();
          this.touchScrolling();
        }

        // mouseScrolling(e) {
        //   console.log(e.clientX);
        // }    

        // mouseScroll() {
        //   this.slider.addEventListener('mousedown', e => e.target.addEventListener('mousemove', this.mouseScrolling));
        //   this.slider.addEventListener('mouseup', e => e.target.removeEventListener('mousemove', this.mouseScrolling));
        // }



        touchScrolling() {
          let tachStart = 0;
          let tachEnd = 0;
          this.slider.addEventListener('touchstart', e => {
            tachStart = e.changedTouches[0].pageX;
          });

          this.slider.addEventListener('touchend', e => {
            if(!(e.target.classList.contains('slider__indicators') || e.target.classList.contains('slider__indicator'))) {
              tachEnd = e.changedTouches[0].pageX;
              if(Math.round(tachStart) < Math.round(tachEnd)) {
                this.moovePrev();
              } else {
                this.mooveNext();
              }
            }
          });
        }  

        createGallery() {
          const galleryUl = document.createElement("ul");   
          galleryUl.classList.add('gallery__list');
          for(let i = 0; i <  this.imageNames[this.counter].length; i++) {
            const galleryLi = document.createElement("li");
            galleryLi.classList.add('gallery__item');
            galleryLi.insertAdjacentHTML('beforeend', '<div class="gallery__img" style="display: block; width: 100%; height: 100%; text-align: center; background: #eee;"><picture style="position: relative;"><img src=' + `${this.pathImg}gallery/${this.imageNames[this.counter][i]}-icon.jpg` + ' class="gallery__tambnail" style="display: block; width: 100%;" alt="image" /></picture></div>');
            galleryUl.append(galleryLi);
          }
          setTimeout(() => {
            this.zoomeGallery();
          });
          return galleryUl;
        }

        zoomeGallery() {
          let tambnails = document.querySelectorAll('.gallery__tambnail');
          for(let tambnail of tambnails) {
            tambnail.addEventListener('click', () => {
              let src = tambnail.getAttribute('src');
              this.createMoadal(src.replace('-icon', ''));            
            });
          }
        }

        createMoadal(src) {
          let modal = document.createElement('div'),
            img = document.createElement('img'),
            close = document.createElement('div');
            img.setAttribute('style', 'height: auto; width: auto; max-height: 80%;');
            close.setAttribute('style', 'position: absolute; top: 20px; right: 20px; z-index: 9999;');
            close.setAttribute('id', 'gallery-close');
            close.classList.add('gallery__close');
          modal.setAttribute('style', 'position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 9998; display: flex; justify-content: center; align-items: center; background: rgba(0,0,0,.9);');
          modal.classList.add('gallery__modal');
          modal.setAttribute('id', 'gallery-modal');
          img.src = src;
          modal.append(close);
          modal.append(img);
          document.body.append(modal);
          document.body.classList.add('scroll-lock');
          this.removeModal();
        }

        removeModal() {
          let closes = document.querySelectorAll('.gallery__close');
          if(closes) {
            for(let close of closes) {
              close.addEventListener('click', () => {
                document.body.classList.remove('scroll-lock');
                let modals = document.querySelectorAll('.gallery__modal');
                for(let modal of modals) {
                  modal.remove();
                }
              });
            } 
          }
        }

        mooveNext() {
          if(this.counter >= 0 && this.counter < this.imageNames.length - 1) {
            this.counter++;
            const sliderLi = document.createElement("li");
            sliderLi.classList.add('slider__item');
            sliderLi.insertAdjacentHTML('beforeend', '<div class="slider__img" style="display: block; width: 100%; height: 100%; text-align: center; background: #eee;"><picture style="position: relative;"><source srcset=' + `${this.pathImg}${this.imageNames[this.counter]}${this.media}.webp` + ' type="image/webp" /><img src=' + `${this.pathImg}${this.imageNames[this.counter]}${this.media}.jpg` + ' style="display: block; width: 100%;" alt="image" type="image/jpg" /></picture></div>');
            if(this.content) {
              let sliderDiv = document.createElement("div");
              sliderDiv.classList.add('slide__txt');
              sliderDiv.setAttribute('style', `position: absolute; top: 0; right: 0; bottom: 0; left: 0; backgroun: transparent; color: #fff;`);
              sliderDiv.insertAdjacentHTML('beforeend', this.content[this.counter]);
              if(this.gallery) {
                sliderDiv.prepend(this.createGallery());
              }
              sliderLi.append(sliderDiv);
              if(this.links) {
                sliderDiv.insertAdjacentHTML('beforeend', this.links[this.counter]);
              }
            }    
            this.sliderUl.append(sliderLi);
            let sliderList = this.sliderUl.querySelectorAll(`.slider__item`);
            for(let slide of sliderList) {
              slide.setAttribute('style', `width: ${this.sliderWidth}px; list-style: none;position: relative;`);
            }
            let offsetLeft = this.sliderUl.lastChild.offsetLeft;
            this.sliderUl.setAttribute("style", `display: flex; width: ${this.sliderUlWidth}px; height: 100%; transform: translateX(${-offsetLeft}px); transition: ${this.speed}00ms; margin: 0; padding: 0;`);  
            setTimeout(() => {
              offsetLeft = 0;
              this.sliderUl.firstChild.remove();
              this.sliderUl.setAttribute("style", `display: flex; width: ${this.sliderUlWidth}px; height: 100%; transform: translateX(${-offsetLeft}px); margin: 0; padding: 0;`);
            }, `${this.speed}00`);
          } else if(this.counter === -1) {
            this.counter = 0;
            const sliderLi = document.createElement("li");
            sliderLi.classList.add('slider__item');
            sliderLi.insertAdjacentHTML('beforeend', '<div class="slider__img" style="display: block; width: 100%; height: 100%; text-align: center; background: #eee;"><picture style="position: relative;"><source srcset=' + `${this.pathImg}${this.imageNames[this.counter]}${this.media}.webp` + ' type="image/webp" /><img src=' + `${this.pathImg}${this.imageNames[this.counter]}${this.media}.jpg` + ' style="display: block; width: 100%;" alt="image" type="image/jpg" /></picture></div>');
            if(this.content) {
              let sliderDiv = document.createElement("div");
              sliderDiv.classList.add('slide__txt');
              sliderDiv.setAttribute('style', `position: absolute; top: 0; right: 0; bottom: 0; left: 0; 
              backgroun: transparent; color: #fff;`);
              sliderDiv.insertAdjacentHTML('beforeend', this.content[this.counter]);
              if(this.gallery) {
                sliderDiv.prepend(this.createGallery());
              }
              sliderLi.append(sliderDiv);
              if(this.links) {
                sliderDiv.insertAdjacentHTML('beforeend', this.links[this.counter]);
              }
            }    
            this.sliderUl.append(sliderLi);
            let sliderList = this.sliderUl.querySelectorAll(`.slider__item`);
            for(let slide of sliderList) {
              slide.setAttribute('style', `width: ${this.sliderWidth}px; list-style: none;position: relative;`);
            }
            let offsetLeft = this.sliderUl.lastChild.offsetLeft;
            this.sliderUl.setAttribute("style", `display: flex; width: ${this.sliderUlWidth}px; height: 100%; transform: translateX(${-offsetLeft}px); transition: ${this.speed}00ms; margin: 0; padding: 0;`);       
            setTimeout(() => {
              offsetLeft = 0;
              this.sliderUl.firstChild.remove();
              this.sliderUl.setAttribute("style", `display: flex; width: ${this.sliderUlWidth}px; height: 100%; transform: translateX(${-offsetLeft}px); margin: 0; padding: 0;`);
            }, `${this.speed}00`);
          } else if(this.counter < 0) {
            this.counter++;
            this.counter = this.imageNames.length + this.counter;
            const sliderLi = document.createElement("li");
            sliderLi.classList.add('slider__item');
            sliderLi.insertAdjacentHTML('beforeend', '<div class="slider__img" style="display: block; width: 100%; height: 100%; text-align: center; background: #eee;"><picture style="position: relative;"><source srcset=' + `${this.pathImg}${this.imageNames[this.counter]}${this.media}.webp` + ' type="image/webp" /><img src=' + `${this.pathImg}${this.imageNames[this.counter]}${this.media}.jpg` + ' style="display: block; width: 100%;" alt="image" type="image/jpg" /></picture></div>');     
            if(this.content) {
              let sliderDiv = document.createElement("div");
              sliderDiv.classList.add('slide__txt');
              sliderDiv.setAttribute('style', `position: absolute; top: 0; right: 0; bottom: 0; left: 0; backgroun: transparent; color: #fff;`);
              sliderDiv.insertAdjacentHTML('beforeend', this.content[this.counter]);
              if(this.gallery) {
                sliderDiv.prepend(this.createGallery());
              }
              sliderLi.append(sliderDiv);
              if(this.links) {
                sliderDiv.insertAdjacentHTML('beforeend', this.links[this.counter]);
              }
            }    
            this.sliderUl.append(sliderLi);
            let sliderList = this.sliderUl.querySelectorAll(`.slider__item`);
            for(let slide of sliderList) {
              slide.setAttribute('style', `width: ${this.sliderWidth}px; list-style: none;position: relative;`);
            }
            let offsetLeft = this.sliderUl.lastChild.offsetLeft;
            this.sliderUl.setAttribute("style", `display: flex; width: ${this.sliderUlWidth}px; height: 100%; transform: translateX(${-offsetLeft}px); transition: ${this.speed}00ms; margin: 0; padding: 0;`);
            setTimeout(() => {
              offsetLeft = 0;
              this.sliderUl.firstChild.remove();
              this.sliderUl.setAttribute("style", `display: flex; width: ${this.sliderUlWidth}px; height: 100%; transform: translateX(${-offsetLeft}px); margin: 0; padding: 0;`);
            }, `${this.speed}00`);
          } else if(this.counter === this.imageNames.length - 1) {
            this.counter = 0;
            const sliderLi = document.createElement("li");
            sliderLi.classList.add('slider__item');
            sliderLi.insertAdjacentHTML('beforeend', '<div class="slider__img" style="display: block; width: 100%; height: 100%; text-align: center; background: #eee;"><picture style="position: relative;"><source srcset=' + `${this.pathImg}${this.imageNames[this.counter]}${this.media}.webp` + ' type="image/webp" /><img src=' + `${this.pathImg}${this.imageNames[this.counter]}${this.media}.jpg` + ' style="display: block; width: 100%;" alt="image" type="image/jpg" /></picture></div>');
            if(this.content) {
              let sliderDiv = document.createElement("div");
              sliderDiv.classList.add('slide__txt');
              sliderDiv.setAttribute('style', `position: absolute; top: 0; right: 0; bottom: 0; left: 0; backgroun: transparent; color: #fff;`);
              sliderDiv.insertAdjacentHTML('beforeend', this.content[this.counter]);
              if(this.gallery) {
                sliderDiv.prepend(this.createGallery());
              }
              sliderLi.append(sliderDiv);
              if(this.links) {
                sliderDiv.insertAdjacentHTML('beforeend', this.links[this.counter]);
              }
            }    
            this.sliderUl.append(sliderLi);
            let sliderList = this.sliderUl.querySelectorAll(`.slider__item`);
            for(let slide of sliderList) {
              slide.setAttribute('style', `width: ${this.sliderWidth}px; list-style: none;position: relative;`);
            }
            let offsetLeft = this.sliderUl.lastChild.offsetLeft;
            this.sliderUl.setAttribute("style", `display: flex; width: ${this.sliderUlWidth}px; height: 100%; transform: translateX(${-offsetLeft}px); transition: ${this.speed}00ms; margin: 0; padding: 0;`);  
            setTimeout(() => {
              offsetLeft = 0;
              this.sliderUl.firstChild.remove();
              this.sliderUl.setAttribute("style", `display: flex; width: ${this.sliderUlWidth}px; height: 100%; transform: translateX(${-offsetLeft}px); margin: 0; padding: 0;`);
            }, `${this.speed}00`);
          }
          if(this.indicators) {
            this.setActiveIndicator();
          }
        }

        moovePrev() {
          if(this.counter > 0 && this.counter < this.imageNames.length - 1) {
            this.counter--;
            const sliderLi = document.createElement("li");
            sliderLi.classList.add('slider__item');
            let srcjpg = `${this.pathImg}${this.imageNames[this.counter]}${this.media}.jpg`;
            // let srcjpg2x = `${this.pathImg}${this.imageNames[this.counter]}.jpg 2x`;
            let srcwebp = `${this.pathImg}${this.imageNames[this.counter]}${this.media}.webp`;
            sliderLi.insertAdjacentHTML('beforeend', '<div class="slider__img" style="display: block; width: 100%; height: 100%; text-align: center; background: #eee;"><picture style="position: relative;"><source srcset=' + srcwebp + ' type="image/webp" /><img src=' + srcjpg + ' style="display: block; width: 100%;" alt="image" type="image/jpg" /></picture></div>');
      
            if(this.content) {
              let sliderDiv = document.createElement("div");
              sliderDiv.classList.add('slide__txt');
              sliderDiv.setAttribute('style', `position: absolute; top: 0; right: 0; bottom: 0; left: 0; padding: 0 15px; backgroun: transparent; color: #fff;`);
              sliderDiv.insertAdjacentHTML('beforeend', this.content[this.counter]);
              if(this.gallery) {
                sliderDiv.prepend(this.createGallery());
              }
              sliderLi.append(sliderDiv);
              if(this.links) {
                sliderDiv.insertAdjacentHTML('beforeend', this.links[this.counter]);
              }
            }    

            this.sliderUl.prepend(sliderLi);
            let sliderList = this.sliderUl.querySelectorAll(`.slider__item`);
            for(let slide of sliderList) {
              slide.setAttribute('style', `width: ${this.sliderWidth}px; list-style: none;position: relative;`);
            }
            let offsetLeft = this.sliderUl.lastChild.offsetLeft;
            offsetLeft = this.sliderUl.lastChild.offsetLeft;
            this.sliderUl.setAttribute("style", `display: flex; width: ${this.sliderUlWidth}px; height: 100%; transform: translateX(${-offsetLeft}px); margin: 0; padding: 0;`);
            offsetLeft = this.sliderUl.firstChild.offsetLeft;
            this.sliderUl.setAttribute("style", `display: flex; width: ${this.sliderUlWidth}px; height: 100%; transform: translateX(${-offsetLeft}px); transition: ${this.speed}00ms; margin: 0; padding: 0;`);
            setTimeout(() => {
              this.sliderUl.lastChild.remove();
            }, `${this.speed}00`);         
          } else if(-this.counter < this.imageNames.length) {
            this.counter--;
            const sliderLi = document.createElement("li");
            sliderLi.classList.add('slider__item');
            let srcjpg = `${this.pathImg}${this.imageNames[parseInt(this.imageNames.length + this.counter)]}${this.media}.jpg`;
            // let srcjpg2x = `${this.pathImg}${this.imageNames[parseInt(this.imageNames.length + this.counter)]}.jpg 2x`;
            let srcwebp = `${this.pathImg}${this.imageNames[parseInt(this.imageNames.length + this.counter)]}${this.media}.webp`;
            sliderLi.insertAdjacentHTML('beforeend', '<div class="slider__img" style="display: block; width: 100%; height: 100%; text-align: center; background: #eee;"><picture style="position: relative;"><source srcset=' + srcwebp + ' type="image/webp" /><img src=' + srcjpg + ' style="display: block; width: 100%;" alt="image" /></picture></div>');
            
            if(this.content) {
              let sliderDiv = document.createElement("div");
              sliderDiv.classList.add('slide__txt');
              sliderDiv.setAttribute('style', `position: absolute; top: 0; right: 0; bottom: 0; left: 0; padding: 0 15px; backgroun: transparent; color: #fff;`);
              sliderDiv.insertAdjacentHTML('beforeend', this.content[parseInt(this.imageNames.length + this.counter)]);
              if(this.gallery) {
                const galleryUl = document.createElement("ul");   
                galleryUl.classList.add('gallery__list');
                for(let i = 0; i <  this.imageNames[parseInt(this.imageNames.length + this.counter)].length; i++) {
                  const galleryLi = document.createElement("li");
                  galleryLi.classList.add('gallery__item');
                  galleryLi.insertAdjacentHTML('beforeend', '<div class="gallery__img" style="display: block; width: 100%; height: 100%; text-align: center; background: #eee;"><picture style="position: relative;"><img src=' + `${this.pathImg}gallery/${this.imageNames[parseInt(this.imageNames.length + this.counter)][i]}-icon.jpg, ${this.pathImg}gallery/${this.imageNames[parseInt(this.imageNames.length + this.counter)][i]}-icon.jpg` + ' class="gallery__tambnail" style="display: block; width: 100%;" alt="image" /></picture></div>');
                  galleryUl.append(galleryLi);
                }
                sliderDiv.prepend(galleryUl);
              }
              sliderLi.append(sliderDiv);
              if(this.links) {
                sliderDiv.insertAdjacentHTML('beforeend', this.links[parseInt(this.imageNames.length + this.counter)]);
              }
            }    

            this.sliderUl.prepend(sliderLi);
            let sliderList = this.sliderUl.querySelectorAll(`.slider__item`);
            for(let slide of sliderList) {
              slide.setAttribute('style', `width: ${this.sliderWidth}px; list-style: none;position: relative;`);
            }
            let offsetLeft = this.sliderUl.lastChild.offsetLeft;
            offsetLeft = this.sliderUl.lastChild.offsetLeft;
            this.sliderUl.setAttribute("style", `display: flex; width: ${this.sliderUlWidth}px; height: 100%; transform: translateX(${-offsetLeft}px); margin: 0; padding: 0;`);
            offsetLeft = this.sliderUl.firstChild.offsetLeft;
            this.sliderUl.setAttribute("style", `display: flex; width: ${this.sliderUlWidth}px; height: 100%; transform: translateX(${-offsetLeft}px); transition: ${this.speed}00ms; margin: 0; padding: 0;`);
            setTimeout(() => {
              this.sliderUl.lastChild.remove();
            }, `${this.speed}00`);
          } else if (-this.counter === this.imageNames.length) {
            this.counter = 0;
            this.moovePrev();
          } 
          if(this.indicators) {
            this.setActiveIndicator();
          }
        } 

        createIndicators() {
          let indicators = document.createElement('ul');
          indicators.setAttribute('id', 'slider-indicators');        
          indicators.classList.add('slider__indicators');
          for(let i = 0; i < this.imageNames.length; i++) {
            let indicator = document.createElement('li');
            indicator.classList.add('slider__indicator');
            indicators.append(indicator);          
          }
          this.slider.append(indicators);
          let indicatorList = this.slider.querySelectorAll('.slider__indicator');
          indicatorList[this.counter].classList.add('active');
          if(indicators && indicatorList) {
            indicators.addEventListener('click', e => { 
              let target = Array.from(indicatorList).findIndex(item => item === e.target);
              let activeItem = Array.from(indicatorList).findIndex(item => item.classList.contains('active'));
              if(target !== -1) {
                if(target < activeItem) {
                  for(let i = 0; i < activeItem - target; i++) {
                    this.moovePrev();
                  }
                } else { 
                  for(let i = 0; i < target - activeItem; i++) {
                    this.mooveNext();
                  }
                }
              }
            });            
          }
        }

        setActiveIndicator() {
          let indicatorList = this.slider.querySelectorAll('.slider__indicator'),
            q = this.counter;
          for(let indicatorItem of indicatorList) {
            indicatorItem.classList.remove('active');
          }
          if(this.counter < 0) {
            q = indicatorList.length + this.counter;
          }
          indicatorList[q].classList.add('active');

        }

        autoplay() { 
          setInterval(() => {
            id.mooveNext();
          }, `${this.interval}000`);
        }

      }

      id = new NewSlider(id);
      id.launchSlider
    }

  };
});