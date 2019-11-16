function ready(fn) {
  document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn)
}

ready(function() {
  var loadImage = function(img) {
    if (img.dataset.src) img.src = img.dataset.src;
    if (img.dataset.srcset) img.srcset = img.dataset.srcset;
  }
  
  var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        let lazyImage = entry.target;
        loadImage(lazyImage);
        lazyImage.classList.remove("lazy");
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach(function(lazyImage) {
    lazyImageObserver.observe(lazyImage);
  });
  
  document.querySelectorAll('input').forEach(function(element) {
    element.addEventListener('change', function() {
      document.body.classList.toggle('noscroll');

      if (element.checked && !element.classList.contains('loaded')) {
        loadImage(document.querySelector('#' + element.id + ' + div img.full'));
        document.querySelectorAll('#' + element.id + ' + div img.secondary').forEach(loadImage);
        element.classList.add('loaded');
      }
    });
  });

  document.onkeyup = function(event) {
    if (event.key === 'Escape') {
      var input = document.querySelector('input:checked');
      if (input !== null) {
        input.checked = false;
        document.body.classList.remove('noscroll');
      }
    }
  };
});
