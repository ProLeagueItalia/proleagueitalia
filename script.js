console.log('Pro League Italia loaded');
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.squadra img').forEach(function(img) {
    img.onerror = function() { this.style.display = 'none'; };
  });
});
