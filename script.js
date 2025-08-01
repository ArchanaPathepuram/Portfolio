// Typewriter effect for the name
const text = "Archana Pathepuram";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typed-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}

// Initialize typewriter effect when page loads
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("typed-text").innerHTML = "";
  typeWriter();
});

// Tab switching functionality
function showTab(id) {
  // Remove active class from all tabs and content
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  // Add active class to selected tab and content
  document.querySelector(`.tab[onclick="showTab('${id}')"]`).classList.add('active');
  document.getElementById(id).classList.add('active');
} 