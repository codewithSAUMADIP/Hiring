        // NAVBAR TOGGLE
        const toggleBtn = document.querySelector('.toggle-btn');
const navbar = document.querySelector('.navbar');

toggleBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// POST SECTION
// Array to store selected skills
let selectedSkills = [];

// Add event listeners to skill buttons
document.querySelectorAll('.skill-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const skill = button.textContent.trim();
        if (!selectedSkills.includes(skill)) {
            selectedSkills.push(skill); // Avoid duplicates
        }
    });
});

function changeColor(button) {
    button.classList.toggle('clicked');
}

// Add comment functionality
function addCommentFunctionality(tweetDiv) {
    const commentBtn = tweetDiv.querySelector('.comment-btn');
    commentBtn.addEventListener('click', function () {
        const commentInput = tweetDiv.querySelector('.comment-input');
        const commentText = commentInput.value.trim();
        if (commentText) {
            
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `<a href="#profile">Someone</a>: ${commentText}`;
            
            commentInput.value = '';

            updateCommentVisibility(tweetDiv);
        }
    });

    
}

// Limit visible comments to 4 and show the "Show More" button if needed
function updateCommentVisibility(tweetDiv) {
    
    comments.forEach((comment, index) => {
        comment.style.display = index < 4 ? 'block' : 'none';
    });

    if (comments.length > 4) {
        showMoreBtn.style.display = 'block';
    } else {
        showMoreBtn.style.display = 'none';
    }
}

// Update the "Post" button functionality
document.getElementById('tweet-btn').addEventListener('click', function () {
    const titleText = document.querySelectorAll('#tweet-text')[0].value; // First textarea
    const descriptionText = document.querySelectorAll('#tweet-text')[1].value; // Second textarea

    if (titleText.trim() || descriptionText.trim()) {
        const tweetContainer = document.getElementById('tweets-container');
        const tweetDiv = document.createElement('div');
        tweetDiv.classList.add('tweet');

        // Split description into multiple paragraphs
        const descriptionParagraphs = descriptionText
            .split('.') // Split by periods
            .filter(sentence => sentence.trim() !== "") // Remove empty strings
            .map(sentence => `<p style="font-size: 16px; color: whitesmoke; margin-top:10px;">${sentence.trim()}.</p>`) // Wrap in <p>

        // Generate skill badges
        const skillsHTML = selectedSkills
            .map(skill => `<span style="display: inline-block; background-color: #d4a2ff; color: #fff; padding: 8px 14px; margin: 5px; border-radius: 5px;">${skill}</span>`)
            .join('');

        tweetDiv.innerHTML = `
            <p class="author">Your Name</p>
            <h2 style="font-size: 20px; color: whitesmoke;margin-top:20px;">${titleText}</h2>
            ${descriptionParagraphs.join('')} <!-- Inject separated paragraphs -->
            <div style="margin-top:15px;color: black;"><b style="color: whitesmoke;">${skillsHTML}</b></div>
            <div class="comments">
                <div class="comment-box">
                    <button class="comment-btn" style="margin-right: 0%; margin-left: auto;background-color: #d187ff; padding: 10px 20px;"><b style="color: whitesmoke;">Apply</b></button>
                </div>
            </div>
        `;




        

        tweetContainer.prepend(tweetDiv);

        // Add functionality to comments
        addCommentFunctionality(tweetDiv);

        // Clear the textareas and reset selected skills
        document.querySelectorAll('#tweet-text')[0].value = '';
        document.querySelectorAll('#tweet-text')[1].value = '';
        selectedSkills = [];

        // Ensure only a maximum of 4 comments are shown initially
        updateCommentVisibility(tweetDiv);
    }
});





// Search functionality
document.getElementById('search-box').addEventListener('input', function () {
    const searchQuery = this.value.toLowerCase();
    const posts = document.querySelectorAll('.tweet');

    posts.forEach(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const description = post.querySelector('p').textContent.toLowerCase();
        const skills = Array.from(post.querySelectorAll('span')).map(skill => skill.textContent.toLowerCase());

        // Check if the search query matches the title, description, or skills
        if (title.includes(searchQuery) || description.includes(searchQuery) || skills.some(skill => skill.includes(searchQuery))) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
});








// POPUP FUNCTIONALITY
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const popupBtn = document.getElementById('popup-btn');
const closePopupBtn = document.getElementById('close-popup');

popupBtn.addEventListener('click', () => {
    popup.style.display = 'block';
    overlay.style.display = 'block';
});

closePopupBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

// DROPDOWN SECTION
const dropdown = document.getElementById('section-select');
const sections = document.querySelectorAll('.dropdown-section');

dropdown.addEventListener('change', (event) => {
    const selectedValue = event.target.value;

    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('acti');
    });

    // Show the selected section
    if (selectedValue) {
        const selectedSection = document.getElementById(selectedValue);
        selectedSection.classList.add('acti');
    }
});