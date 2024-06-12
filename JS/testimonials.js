var splide = new Splide( '.testimonial-slider', {

    padding: '2rem',
    gap: '15px',
    perPage: '2',
    arrows: false,
    pagination: true,
    breakpoints: {
      768: {
        perPage: 1,
        padding: '25px',
        pagination: false,
      },
    }
    
  } );
  
  splide.mount();