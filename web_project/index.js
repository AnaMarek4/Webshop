import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';
import { getFirestore, collection, onSnapshot, addDoc, getDocs, serverTimestamp} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import CreateUserDao from './utils/CreateUserDao.js';

const firebaseConfig = ({
    apiKey: "AIzaSyCwyStPAVUbZWDqARq10A6rU0yBaCgrPik",
    authDomain: "game-store-a3e65.firebaseapp.com",
    projectId: "game-store-a3e65",
    storageBucket: "game-store-a3e65.appspot.com",
    messagingSenderId: "680683181218",
    appId: "1:680683181218:web:e63526c7b86858048e33fb",
    measurementId: "G-F8N8G01PN8"
});

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp); 

//registration

const registrationForm = document.getElementById("register-form");
const passwordMessage = document.getElementById("password-message");
const registrationMessage = document.getElementById("registration-submit-message"); 
const emailInput = document.getElementById("register-email");
const passwordInput = document.getElementById("register-password");


registrationForm.addEventListener("submit", function (e) {
  e.preventDefault(); 

  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const username = document.getElementById("register-username").value;
  
  if (password.length < 6) {
  const passwordMessage = document.getElementById("password-message");
  passwordMessage.textContent = "Password must be at least 6 characters long!";
  return;
  } else {
  passwordMessage.textContent = "";
  }
  
  const user = new CreateUserDao(username, email, password);
  registerUser(user);
});

emailInput.addEventListener("input", function () {
    registrationMessage.textContent = "";
});

passwordInput.addEventListener("input", function () {
    passwordMessage.textContent = "";
});

async function registerUser(user) {

  try {
    const response = await axios.post('http://localhost:8080/api/users/signup', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      registerModal.style.display = 'none';
    }
    console.log(response.data);

  } catch (error) {
    console.error(error);
  }        
      
}

//login
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-submit-message");
const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password"); 

loginForm.addEventListener("submit", function (e) {
  e.preventDefault(); 

  const username = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  loginUser(username, password);
});

loginEmailInput.addEventListener("input", function () {
    loginMessage.textContent = "";
});

loginPasswordInput.addEventListener("input", function () {
    loginMessage.textContent = "";
});

async function loginUser(username, password) {

  try {
    const response = await axios.post('http://localhost:8080/api/token/generate-token', {
      username,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {

      loginModal.style.display = 'none';

      alert('Your login was successful.');

      const token = response.data.authtoken.token;

      localStorage.setItem('token', token);

      console.log(localStorage.getItem('token'));
      console.log('token:', token);

      loginLogoutButton.textContent = "Log out";
      loginLogoutButton.addEventListener("click", () => {
         localStorage.removeItem('token');
         loginModal.style.display = "none";
         console.log(localStorage.getItem('token'));
         loginLogoutButton.textContent = "Log in";
         if(localStorage.getItem('token')){
         loginModal.style.display = "none";
         }
      });

    } else {
      console.error('Login error:', response.status, response.data);
    }
  } catch (error) {
    console.error(error);
  }
}

//logout
const loginLogoutButton = document.getElementById("login-logout-button");

let currentUser = null;

/*function updateLoginLogoutButton() {
    if (localStorage.removeItem('token') && loginLogoutButton) {
      loginLogoutButton.textContent = "Log out";
      loginLogoutButton.addEventListener("click", () => {
        console.log('HELLO FROM ON CLICK TO LOGOUT!');
         localStorage.removeItem('token');
      });
    } else if(loginLogoutButton) {
      loginLogoutButton.textContent = "Log in";
      loginModal.style.display = "none";
    }
}*/
  
const registerButton = document.querySelector('.register-button');
const registerModal = document.getElementById('register-modal');

registerButton.addEventListener('click', function () {
    if (currentUser) {
        alert("You are already logged in. Please log out first.");
        registerModal.style.display = 'none';
    } else {
        registerModal.style.display = 'block';
    }
});

onAuthStateChanged(auth, (user) => {
    updateLoginLogoutButton(user);
    currentUser = user;
});

//review

const reviewButton = document.querySelector('.review-button');
const reviewModal = document.getElementById('review-modal');
const closeReviewModal = document.querySelector('.close-review');
const reviewForm = document.getElementById("review-form");

reviewButton.addEventListener('click', function () {
    if (localStorage.getItem('token')) {
        reviewModal.style.display = 'block';

        document.getElementById("review-name").value = "";
        ratingInput.value = "0"; 
        document.getElementById("review-comment").value = "";

        updateStarRating(0);   
    } else {
        alert("You need to register or log in.");
        reviewModal.style.display = 'none';
    }
});

closeReviewModal.addEventListener('click', function () {
    reviewModal.style.display = 'none'; 
})

const starRatingContainer = document.querySelector(".star-rating");
const starRatingInputs = starRatingContainer.querySelectorAll(".star");
const ratingInput = document.getElementById("review-rating");

function updateStarRating(selectedRating) {
  starRatingInputs.forEach((star, index) => {
    if (index < selectedRating) {
      star.textContent = "★"; 
    } else {
      star.textContent = "☆"; 
    }
  });
}

starRatingContainer.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("star")) {
    const selectedRating = parseInt(e.target.getAttribute("data-rating"));
    updateStarRating(selectedRating);
  }
});

starRatingContainer.addEventListener("mouseout", () => {
  const selectedRating = parseInt(ratingInput.value);
  updateStarRating(selectedRating);
});

const submitReviewButton = document.querySelector(".submit-review-button");

function updateSubmitButtonState(selectedRating) {
  if (selectedRating === 0) {
    submitReviewButton.disabled = true;
  } else {
    submitReviewButton.disabled = false; 
  }
}

starRatingContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("star")) {
    const selectedRating = parseInt(e.target.getAttribute("data-rating"));
    ratingInput.value = selectedRating;
    updateStarRating(selectedRating); 
    updateSubmitButtonState(selectedRating);
  }
});

updateSubmitButtonState(0);

reviewForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("review-name").value;
  const rating = ratingInput.value; 
  const comment = document.getElementById("review-comment").value;

  try {
    const response = await axios.post('http://localhost:8080/api/review', {name, rating, comment}, {
      headers: {
        'Content-Type': 'application/json',
        //Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 201) {
        registerModal.style.display = 'none';
        loadReviews();
    }
    
    console.log(response.data);

  } catch (error) {
    console.error(error);
  }   

  document.getElementById("review-name").value = "";
  ratingInput.value = "0"; 
  document.getElementById("review-comment").value = "";

  reviewModal.style.display = "none";
});

updateStarRating(0);

const reviewsContainer = document.getElementById("reviews-container");

function renderReviews(reviews) {
  reviewsContainer.innerHTML = "";

  reviews.forEach((review) => {
    const reviewCard = document.createElement("div");
    reviewCard.classList.add("review-card");

    const reviewDate = new Date(review.timestamp); 
    const formattedDate = reviewDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    
    function generateStarIcons(rating) {
      const starIcons = Array.from({ length: rating }, (_, index) => {
        const starIcon = document.createElement("span");
        starIcon.textContent = "★";
        starIcon.classList.add("star");
        starIcon.style.color = "#cc80ff";
        starIcon.style.fontSize = "25px";
        return starIcon;
      });
      return starIcons;
    }

    const rating = review.rating;
    const starIcons = generateStarIcons(rating);

    starIcons.forEach((star) => {
      reviewCard.appendChild(star);
    });

    reviewCard.innerHTML += `
      <br><strong>${review.name}: </strong><br>
      ${review.comment}<br><br>
      ${formattedDate}<br>
    `;

    reviewsContainer.appendChild(reviewCard);
  });
}

async function loadReviews() {
  try {
    const response = await axios.get('http://localhost:8080/api/review');
  
    if (response.status === 200) {
      renderReviews(response.data);
    }
    
    console.log('Reviews:', response.data);
  } catch (error) {
    console.error(error);
  }   
  
}

loadReviews();

