/**
* Template Name: iPortfolio - v3.5.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Dark Mode Toggle Functionality
   */
  const initDarkModeToggle = () => {
    const darkModeToggle = select('#darkModeToggle')
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark'
    document.documentElement.setAttribute('data-theme', currentTheme)
    
    // Toggle dark mode
    const toggleDarkMode = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme')
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
      
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)
    }
    
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', toggleDarkMode)
    }
  }

  // Initialize dark mode toggle when DOM is loaded
  document.addEventListener('DOMContentLoaded', initDarkModeToggle)

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }



  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Image Carousel System - Multiple Independent Carousels
   */
  
  // Global variables for modal functionality
  let currentModalCarousel = null;
  let currentModalIndex = 1;

  // Image Carousel navigation function
  window.changeImage = function(buttonElement, direction) {
    // Find the carousel container - handle both structures
    let carousel = buttonElement.parentElement;
    
    // If button is inside carousel-nav, get the parent carousel
    if (carousel.classList.contains('carousel-nav')) {
      carousel = carousel.parentElement;
    }
    
    const imageElement = carousel.querySelector('.project-image');
    const counterElement = carousel.querySelector('.image-counter-text');
    
    // Get folder and count from data attributes
    const folder = carousel.dataset.folder;
    const totalImages = parseInt(carousel.dataset.count);
    
    // Get current image index from the src
    const currentSrc = imageElement.src;
    const filename = currentSrc.split('/').pop();
    let currentIndex = parseInt(filename.split('.')[0]);
    
    // Calculate new index
    currentIndex += direction;
    
    // Loop back to start/end
    if (currentIndex > totalImages) {
      currentIndex = 1;
    } else if (currentIndex < 1) {
      currentIndex = totalImages;
    }
    
    // Update image source and counter
    imageElement.src = `${folder}/${currentIndex}.png`;
    if (counterElement) {
      counterElement.textContent = `${currentIndex} / ${totalImages}`;
    }
    
    // Apply consistent height with centering after image loads
    imageElement.onload = function() {
      applyConsistentHeight(carousel);
      
      // Ensure click event is attached to the new image
      imageElement.removeEventListener('click', imageElement.clickHandler);
      imageElement.clickHandler = function() {
        openImageModal(imageElement.src, carousel);
      };
      imageElement.addEventListener('click', imageElement.clickHandler);
    };
  }

  // Function to calculate and apply consistent height for a carousel
  function applyConsistentHeight(carousel) {
    const folder = carousel.dataset.folder;
    const totalImages = parseInt(carousel.dataset.count);
    const imageElement = carousel.querySelector('.project-image');
    
    // Get the maximum height if already calculated
    const maxHeight = carousel.dataset.maxHeight;
    if (maxHeight) {
      // Wait for image to be fully rendered at 250px width
      setTimeout(() => {
        const currentHeight = imageElement.offsetHeight; // Use actual displayed height
        const heightDiff = parseInt(maxHeight) - currentHeight;
        const paddingTop = Math.max(0, heightDiff / 2);
        const paddingBottom = Math.max(0, heightDiff / 2);
        
        imageElement.style.paddingTop = `${paddingTop}px`;
        imageElement.style.paddingBottom = `${paddingBottom}px`;
        carousel.style.height = `${maxHeight}px`;
      }, 10);
      return;
    }
    
    // Calculate maximum displayed height for this carousel's folder
    let loadedCount = 0;
    let maxDisplayedHeight = 0;
    
    for (let i = 1; i <= totalImages; i++) {
      const tempImg = new Image();
      tempImg.onload = function() {
        // Calculate the displayed height when width is constrained to 250px
        const aspectRatio = this.naturalHeight / this.naturalWidth;
        const displayedHeight = 250 * aspectRatio;
        
        maxDisplayedHeight = Math.max(maxDisplayedHeight, displayedHeight);
        loadedCount++;
        
        // When all images are loaded, store the max height and apply it
        if (loadedCount === totalImages) {
          carousel.dataset.maxHeight = maxDisplayedHeight;
          
          // Apply consistent height to current image
          setTimeout(() => {
            const currentHeight = imageElement.offsetHeight; // Use actual displayed height
            const heightDiff = maxDisplayedHeight - currentHeight;
            const paddingTop = Math.max(0, heightDiff / 2);
            const paddingBottom = Math.max(0, heightDiff / 2);
            
            imageElement.style.paddingTop = `${paddingTop}px`;
            imageElement.style.paddingBottom = `${paddingBottom}px`;
            carousel.style.height = `${maxDisplayedHeight}px`;
          }, 10);
        }
      };
      tempImg.src = `${folder}/${i}.png`;
    }
  }

  // Initialize all carousels when the page loads
  function initializeCarousels() {
    const carousels = document.querySelectorAll('.image-carousel');
    carousels.forEach(carousel => {
      const folder = carousel.dataset.folder;
      const totalImages = parseInt(carousel.dataset.count);
      const imageElement = carousel.querySelector('.project-image');
      const counterElement = carousel.querySelector('.image-counter-text');
      
      // Set initial image and counter
      if (imageElement) {
        imageElement.src = `${folder}/1.png`;
        if (counterElement) {
          counterElement.textContent = `1 / ${totalImages}`;
        }
        
        // Add click event for image zoom
        imageElement.addEventListener('click', function() {
          console.log('Image clicked:', this.src); // Debug log
          openImageModal(this.src, carousel);
        });
        
        // Calculate and apply consistent height after initial image loads
        imageElement.onload = function() {
          applyConsistentHeight(carousel);
        };
      }
    });
  }

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize modal functionality first
    initializeImageModal();
    
    // Initialize carousels immediately
    initializeCarousels();
    
    // Also initialize carousels after a short delay to catch any custom elements that haven't rendered yet
    setTimeout(initializeCarousels, 100);
    setTimeout(initializeCarousels, 500);
  });

  // Image Modal Functions
  function openImageModal(imageSrc, carousel) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    if (!modal || !modalImage) {
      console.warn('Image modal elements not found. Please add modal HTML to your page.');
      return;
    }
    
    // Store current carousel and extract current image index
    currentModalCarousel = carousel;
    const filename = imageSrc.split('/').pop();
    currentModalIndex = parseInt(filename.split('.')[0]);
    
    modalImage.src = imageSrc;
    modal.style.display = 'block';
    
    // Update navigation buttons
    updateModalNavigation();
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }

  function updateModalNavigation() {
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    
    if (!currentModalCarousel || !prevBtn || !nextBtn) return;
    
    const totalImages = parseInt(currentModalCarousel.dataset.count);
    
    // Enable/disable buttons based on current position
    prevBtn.disabled = currentModalIndex <= 1;
    nextBtn.disabled = currentModalIndex >= totalImages;
  }

  function navigateModal(direction) {
    if (!currentModalCarousel) return;
    
    const folder = currentModalCarousel.dataset.folder;
    const totalImages = parseInt(currentModalCarousel.dataset.count);
    
    // Calculate new index
    let newIndex = currentModalIndex + direction;
    
    // Check bounds
    if (newIndex < 1 || newIndex > totalImages) return;
    
    // Update modal
    currentModalIndex = newIndex;
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
      modalImage.src = `${folder}/${currentModalIndex}.png`;
    }
    
    // Update navigation buttons
    updateModalNavigation();
    
    // Also update the corresponding carousel in the background
    const carouselImage = currentModalCarousel.querySelector('.project-image');
    const counterElement = currentModalCarousel.querySelector('.image-counter-text');
    
    if (carouselImage) {
      carouselImage.src = `${folder}/${currentModalIndex}.png`;
    }
    if (counterElement) {
      counterElement.textContent = `${currentModalIndex} / ${totalImages}`;
    }
  }

  function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
      modal.style.display = 'none';
    }
    
    // Clear modal state
    currentModalCarousel = null;
    currentModalIndex = 1;
    
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  }

  function initializeImageModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    
    if (!modal) return; // Modal not present in this page
    
    // Close modal when clicking the X button
    if (closeBtn) {
      closeBtn.addEventListener('click', closeImageModal);
    }
    
    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateModal(-1);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateModal(1);
      });
    }
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeImageModal();
      }
    });
    
    // Close modal with Escape key, navigate with arrow keys
    document.addEventListener('keydown', function(e) {
      if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
          closeImageModal();
        } else if (e.key === 'ArrowLeft') {
          navigateModal(-1);
        } else if (e.key === 'ArrowRight') {
          navigateModal(1);
        }
      }
    });
  }

  // Make functions globally available
  window.openImageModal = openImageModal;
  window.closeImageModal = closeImageModal;
  window.navigateModal = navigateModal;

})()