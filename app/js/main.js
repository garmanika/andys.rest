let loader = document.querySelector('.loader');
window.addEventListener('load', () => {
  loader.classList.add('hide');
  setTimeout(() => {
    loader.remove
  }, 600)
})
class HeaderUi {
  constructor(menuContainer, menuTrigger, searchContainer, searchTrigger) {
    this.menuContainer = document.querySelector(menuContainer);
    this.menuTrigger = document.querySelector(menuTrigger);
    this.hasMenu = this.menuContainer !== null && this.menuTrigger !== null;
    this.searchContainer = document.querySelector(searchContainer);
    this.searchTrigger = document.querySelector(searchTrigger);
    this.hasSearch =
      this.searchContainer !== null && this.searchTrigger !== null;
    if (this.hasMenu) {
      this.initMenu();
    }
    if (this.hasSearch) {
      this.initSearch();
    }
    this.initScrollEvents();
  }

  initMenu() {
    this.topParent = this.menuContainer.querySelector(".is-top");
    this.setTriggerEvents();
    this.parentItems = this.menuContainer.querySelectorAll(".is-parent");
    this.setParentsEvents();
    this.backTriggers = this.menuContainer.querySelectorAll(".back-trigger");
    this.setBackEvents();
  }

  initScrollEvents() {
    let pageHeader = document.querySelector(".header");
    window.onscroll = function () {
      if (this.scrollY > 136) {
        if (this.oldScroll > this.scrollY) {
          pageHeader.classList.remove("template-header--hidden");
        } else {
          pageHeader.classList.add("template-header--hidden");
        }
      }
      this.oldScroll = this.scrollY;
    };
  }

  resetParents() {
    for (let parentItem of this.parentItems) {
      parentItem.classList.remove("active", "current");
    }
  }

  openMenu() {
    if (this.hasSearch) {
      this.closeSearch();
    }
    this.resetParents();
    document.body.classList.add("no-scroll");
    this.topParent.classList.add("current");
    this.menuTrigger.classList.add("active");
    this.menuContainer.classList.add("active");
  }

  closeMenu() {
    this.resetParents();
    document.body.classList.remove("no-scroll");
    this.topParent.classList.remove("current");
    this.menuTrigger.classList.remove("active");
    this.menuContainer.classList.remove("active");
  }

  setTriggerEvents() {
    let ui = this;
    this.menuTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      if (ui.menuContainer.classList.contains("active")) {
        ui.closeMenu();
      } else {
        ui.openMenu();
      }
    });
  }

  setParentsEvents() {
    let ui = this;
    for (let parentItem of this.parentItems) {
      parentItem
        .querySelector(":scope > a")
        .addEventListener("click", function (event) {
          event.preventDefault();
          let currentParent = parentItem.closest(".is-parent.current");
          if (currentParent !== null) {
            currentParent.classList.remove("current");
          } else {
            ui.topParent.classList.remove("current");
          }
          parentItem.classList.add("active", "current");
        });
    }
  }

  setBackEvents() {
    let ui = this;
    for (let backTrigger of this.backTriggers) {
      backTrigger.addEventListener("click", function (event) {
        event.preventDefault();
        let currentParent = backTrigger.closest(".is-parent.current");
        if (currentParent !== null) {
          currentParent.classList.remove("active", "current");
        }
        let activeParent = backTrigger.closest(".is-parent.active");
        if (activeParent !== null) {
          activeParent.classList.add("current");
        } else {
          ui.topParent.classList.add("current");
        }
      });
    }
  }

  initSearch() {
    let ui = this;
    this.searchTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      if (ui.searchTrigger.classList.contains("active")) {
        ui.closeSearch();
      } else {
        ui.openSearch();
      }
    });
  }

  openSearch() {
    if (this.hasMenu) {
      this.closeMenu();
    }
    document.body.classList.add("no-scroll");
    this.searchTrigger.classList.add("active");
    this.searchContainer.classList.add("active");
  }

  closeSearch() {
    document.body.classList.remove("no-scroll");
    this.searchTrigger.classList.remove("active");
    this.searchContainer.classList.remove("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let textPageSlider = { destroyed: true };
  function initTextPageSlider() {
    let swiperElement = document.querySelector('.text-page-slider-mob > .swiper');
    textPageSlider = new Swiper(swiperElement, {
  
      pagination: {
        el: ".text-page-slider-mob .swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
          slidesPerGroup: 1,
        },
        769: {
          slidesPerView: 2,
          spaceBetween: 32,
          slidesPerGroup: 2,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 32,
          slidesPerGroup: 3,
        },
      },
    });
  }
  
  function toggletextPageSlider() {
    if (window.matchMedia("(max-width: 991px)").matches && textPageSlider.destroyed) {
      initTextPageSlider();
    } else if (!window.matchMedia("(max-width: 991px)").matches && !textPageSlider.destroyed) {
      textPageSlider.destroy();
    }
  }
  
  if (document.querySelector('.text-page-slider-mob > .swiper') !== null) {
    toggletextPageSlider();
    window.addEventListener('resize', function () {
      toggletextPageSlider();
    });
  }
  const headerUi = new HeaderUi(
    ".header-menu-mobile-container",
    ".header-mobile-menu-trigger",
    ".header-search",
    ".header-search-trigger"
  );
  const scrolledClass = "scrolled"

  const navbar = document.querySelector('.header')
  // OnScroll event handler
  const onScroll = () => {
    // Get scroll value
    const scroll = document.documentElement.scrollTop
    // If scroll value is more than 0 - means the page is scrolled, add or remove class based on that
    if (scroll > 0) {
      navbar.classList.add(scrolledClass);
    } else {
      navbar.classList.remove(scrolledClass)
    }
  }
  // Use the function
  window.addEventListener('scroll', onScroll)
  document.querySelectorAll('.modal .btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      btn.closest('form').closest('.modal-content').classList.add('active');
    });
  });





  if (document.querySelector(".index-banner-slider .swiper") !== null) {
    let aboutAwardsSlider = new Swiper(".index-banner-slider .swiper", {
      slidesPerView: 1,
      slidesPerGroup: 1,

      pagination: {
        el: ".index-banner-slider .swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      navigation: {
        nextEl: ".index-banner-slider .swiper-button-next",
        prevEl: ".index-banner-slider .swiper-button-prev",
      },
    });
  }
  if (document.querySelector(".text-page-slider .swiper") !== null) {
    const swiper = new Swiper(".text-page-slider .swiper", {
      pagination: {
        el: ".text-page-slider .swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
          slidesPerGroup: 1,
        },
        769: {
          slidesPerView: 2,
          spaceBetween: 32,
          slidesPerGroup: 2,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 32,
          slidesPerGroup: 3,
        },
      },
    });
  }
  if (document.querySelector(".menu-detail-slider .swiper") !== null) {
    const menuDetailSlider = new Swiper(".menu-detail-slider .swiper", {
      pagination: {
        el: ".menu-detail-slider .swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
          slidesPerGroup: 1,
        },
        769: {
          slidesPerView: 2,
          spaceBetween: 32,
          slidesPerGroup: 2,
        },
        991: {
          slidesPerView: 3,
          spaceBetween: 32,
          slidesPerGroup: 3,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 32,
          slidesPerGroup: 4,
        },
      },
    });
  }

  const menuDetailProductThumbs = new Swiper(".menu-detail-product-thumbs .swiper", {

    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 16,
        slidesPerGroup: 2,
      },

      991: {
        slidesPerView: 3,
        spaceBetween: 16,
        slidesPerGroup: 3,
      },
    },
    navigation: {
      nextEl: ".menu-detail-product-thumbs .swiper-button-next",
      prevEl: ".menu-detail-product-thumbs .swiper-button-prev",
    },
  });


  const menuDetailProductSlider = new Swiper(".menu-detail-product-slider .swiper", {

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
        slidesPerGroup: 1,
      },
    },
    thumbs: {
      swiper: menuDetailProductThumbs,
    },
  });


  function createContactsMap(containerId, data = {}) {
    ymaps.ready(function () {
      let map = new ymaps.Map(containerId, {
        center: data.mapCenter,
        zoom: data.mapZoom,
        controls: ["zoomControl"],
      });
      let geoCollection = new ymaps.GeoObjectCollection();
      map.behaviors.disable('scrollZoom');
      for (let i = 0; i < data.mapPoints.length; i++) {
        geoCollection.add(
          new ymaps.Placemark(
            data.mapPoints[i],
            {},
            {
              iconLayout: "default#image",
              iconImageHref: "img/svg/map-icon.svg",
              iconImageSize: [48, 48],
            }
          )
        );
      }

      map.geoObjects.add(geoCollection);
      map
        .setBounds(map.geoObjects.getBounds(), {
          zoomMargin: [0, 13],
          checkZoomRange: true,
        })
        .then(function () {
          if (map.getZoom() > 13) map.setZoom(13);
        });
    });
  }

  let detailMapData = {
    mapCenter: [54.51649007011178, 36.25665149999999],
    mapZoom: 17,
    mapPoints: [
      [54.51649007011178, 36.25665149999999],
      // [54.52, 36.25],
    ],
  };

  // if (document.querySelector("#map").length > 0) {
  //   createContactsMap("map", detailMapData);
  // }
  createContactsMap("map", detailMapData);
  // if (document.querySelector("#contact-map").length > 0) {
  //   createContactsMap("contact-map", detailMapData);
  // }
  createContactsMap("contact-map", detailMapData);
  // if (document.querySelector("#order-map").length > 0) {
  //   createContactsMap("order-map", detailMapData);
  // }
  createContactsMap("order-map", detailMapData);

  let phoneInputs = document.querySelectorAll('input[type="tel"]');
  for (let phoneInput of phoneInputs) {
    IMask(phoneInput, {
      mask: "+{7} (000) 000-00-00",
    });
  }

  flatpickr(".web-form-item-data-time input", {
    "locale": "ru",
    locale: {
      firstDayOfWeek: 1,
    },
    disableMobile: "true",
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,


  });
  flatpickr(".web-form-item-data input", {
    "locale": "ru",
    disableMobile: "true",
    locale: {
      firstDayOfWeek: 1,
    },

  });
  document
    .querySelectorAll(".menu-section-item-quantity-icon")
    .forEach(function (element) {
      element.addEventListener("click", function () {
        var parentBox = this.parentNode;
        parentBox.classList.add("active");
      });
    });

  let accordionItems = document.querySelectorAll(".accordion-item");
  for (let accordionItem of accordionItems) {
    let accordionItemHeading = accordionItem.querySelector(
      ".accordion-item-heading"
    );
    accordionItemHeading.addEventListener("click", function () {
      accordionItem.classList.toggle("active");
      if (accordionItem.dataset.accordionGroup) {
        for (let groupItem of document.querySelectorAll(
          '.accordion-item[data-accordion-group="' +
          accordionItem.dataset.accordionGroup +
          '"]'
        )) {
          if (accordionItem !== groupItem) {
            groupItem.classList.remove("active");
          }
        }
      }
    });
  }




  function asyncAdd() {
    const wrapper = document.querySelector('.personal-adress')

 
    wrapper.addEventListener('click', (event) => {
      console.log(event.target)
      if (event.target.classList.contains('add')) {
        document.querySelector('.personal-adress-inner').insertAdjacentHTML('beforeEnd', '<div class="web-form-item control"><textarea placeholder=" " ></textarea><div class="web-form-item-control"><div class="web-form-item-undis"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 20H21" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.5 3.50001C16.8978 3.10219 17.4374 2.87869 18 2.87869C18.2786 2.87869 18.5544 2.93356 18.8118 3.04017C19.0692 3.14677 19.303 3.30303 19.5 3.50001C19.697 3.697 19.8532 3.93085 19.9598 4.18822C20.0665 4.44559 20.1213 4.72144 20.1213 5.00001C20.1213 5.27859 20.0665 5.55444 19.9598 5.81181C19.8532 6.06918 19.697 6.30303 19.5 6.50001L7 19L3 20L4 16L16.5 3.50001Z" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div class="web-form-item-clear"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></div></div>');
      }
      if (event.target.classList.contains('web-form-item-clear')) {
        event.target.closest('.control').remove();
      }
      if (event.target.classList.contains('web-form-item-undis')) {
        let formItemControl = event.target.closest('.web-form-item.control');
        let textarea = formItemControl.querySelector('textarea');
        textarea.disabled = !textarea.disabled;
        textarea.focus();
      }
    })
  }

  asyncAdd()







  Fancybox.bind('[data-fancybox]', {
    on: {
      destroy: function (fancybox, event) {
        document.querySelectorAll('.modal-content').forEach(function (content) {
          content.classList.remove('active');
        });
      },
    },
  });
});

