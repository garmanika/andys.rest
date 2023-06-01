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
      if (this.oldScroll > this.scrollY) {
        pageHeader.classList.remove("template-header--hidden");
      } else {
        pageHeader.classList.add("template-header--hidden");
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
  const headerUi = new HeaderUi(
    ".header-menu-mobile-container",
    ".header-mobile-menu-trigger",
    ".header-search",
    ".header-search-trigger"
  );
  window.addEventListener("scroll", function () {
    let height = window.pageYOffset || document.documentElement.scrollTop;
    let header = document.querySelector(".header");

    if (height >= 185) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
  if (document.querySelector('.index-banner-slider .swiper') !== null) {
    let aboutAwardsSlider = new Swiper('.index-banner-slider .swiper', {
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: ".index-banner-slider .swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      navigation: {
        nextEl: '.index-banner-slider .swiper-button-next',
        prevEl: '.index-banner-slider .swiper-button-prev',
      },
    });
  }
  if (document.querySelector('.text-page-slider .swiper') !== null) {
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
  if (document.querySelector('.menu-detail-slider .swiper') !== null) {
    const swiper = new Swiper(".menu-detail-slider .swiper", {



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
  function createContactsMap(containerId, data = {}) {
    ymaps.ready(function () {
      let map = new ymaps.Map(containerId, {
        center: data.mapCenter,
        zoom: data.mapZoom,
        controls: ["zoomControl"],
      });
      let geoCollection = new ymaps.GeoObjectCollection();
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

  if (document.querySelector("#map").length > 0) {
    createContactsMap("map", detailMapData);
  }
  createContactsMap("map", detailMapData);
  if (document.querySelector("#contact-map").length > 0) {
    createContactsMap("contact-map", detailMapData);
  }
  createContactsMap("contact-map", detailMapData);
  let phoneInputs = document.querySelectorAll('input[type="tel"]');
  for (let phoneInput of phoneInputs) {
    IMask(phoneInput, {
      'mask': '+{7} (000) 000-00-00'
    });
  }

  flatpickr(".web-form-item-data-time input", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
  });
  flatpickr(".web-form-item-data input", {});
  document.querySelectorAll(".menu-section-item-quantity-icon").forEach(function (element) {
    element.addEventListener("click", function () {
      var parentBox = this.parentNode;
      parentBox.classList.add("active");
    });
  });


  let accordionItems = document.querySelectorAll('.accordion-item');
  for (let accordionItem of accordionItems) {
    let accordionItemHeading = accordionItem.querySelector('.accordion-item-heading');
    accordionItemHeading.addEventListener('click', function () {
      accordionItem.classList.toggle('active');
      if (accordionItem.dataset.accordionGroup) {
        for (let groupItem of document.querySelectorAll('.accordion-item[data-accordion-group="' + accordionItem.dataset.accordionGroup + '"]')) {
          if (accordionItem !== groupItem) {
            groupItem.classList.remove('active');
          }
        }
      }
    });
  }
  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
  }

    var clearButtons = document.querySelectorAll('.web-form-item-clear');

    clearButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var formItemControl = button.closest('.web-form-item.control');
        var textarea = formItemControl.querySelector('textarea');
        textarea.value = '';
        textarea.focus();
      });
    });

    var undisButtons = document.querySelectorAll('.web-form-item-undis');

    undisButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var formItemControl = button.closest('.web-form-item.control');
        var textarea = formItemControl.querySelector('textarea');
        textarea.disabled = !textarea.disabled;
        textarea.focus();
      });
    });

});
