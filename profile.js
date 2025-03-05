const userData = JSON.parse(localStorage.getItem("userData"));

if (userData) {
    document.getElementById("profile-name").textContent = userData.name;
    document.getElementById("profile-img").src = userData.profilePic;
    document.getElementById("profile-country").textContent = userData.country;
    document.getElementById("profile-language").textContent = `💬 ${userData.language}`;
    document.getElementById("profile-tagline").textContent = userData.tagline;

    const aboutText = userData.about;
    const charLimit = 200;
    const shortAbout = document.getElementById("short-about");
    const extraAbout = document.getElementById("extra-about");
    const readMoreBtn = document.getElementById("read-more-btn");

    if (aboutText.length > charLimit) {
        shortAbout.textContent = aboutText.slice(0, charLimit);
        extraAbout.textContent = aboutText.slice(charLimit);
    } else {
        shortAbout.textContent = aboutText;
        readMoreBtn.style.display = "none";
    }

    readMoreBtn.addEventListener("click", () => {
        if (extraAbout.style.display === "none") {
            extraAbout.style.display = "inline";
            readMoreBtn.textContent = "Read Less";
        } else {
            extraAbout.style.display = "none";
            readMoreBtn.textContent = "Read More";
        }
    });

    const skillsContainer = document.getElementById("skills-container");
    userData.skills.forEach(skill => {
        const skillBtn = document.createElement("button");
        skillBtn.className = "skill-btn";
        skillBtn.textContent = skill;
        skillsContainer.appendChild(skillBtn);
    });
} else {
    alert("No profile data found. Please fill out the form first.");
    window.location.href = "profile.html";
}

// POPUP
const projectButton = document.getElementById('addProjectBtn');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const cancelPopup = document.getElementById('cancelPopup');
const projectForm = document.getElementById('projectForm');
const projectGrid = document.getElementById('projectGrid');
const errorPopup = document.getElementById('popupError');
const maxFileSize = 25 * 1024 * 1024; // 25MB
let uploadedMedia = [];
// Show popup
projectButton.addEventListener('click', () => {
    popup.style.display = 'block';
    overlay.style.display = 'block';
});

// Hide popup
cancelPopup.addEventListener('click', () => {
    closePopup();
});

//close popup
function closePopup() {
    popup.style.display = 'none';
    overlay.style.display = 'none';
    projectForm.reset();
    errorPopup.textContent = '';
    uploadedMedia = [];
}
overlay.addEventListener('click', () => {
    closePopup();
});


// Handle file input
document.getElementById('projectMedia').addEventListener('change', (event) => {
const files = event.target.files;
errorPopup.textContent = '';

if (files.length > 2) {
errorPopup.textContent = 'You can upload a maximum of 2 media files.';
return;
}
uploadedMedia = [];

for (const file of files) {
if (file.size > maxFileSize) {
    errorPopup.textContent = `File ${file.name} exceeds the size limit of 25MB.`;
    return;
}

const fileType = file.type.split('/')[0];
if (fileType === 'image' || fileType === 'video') {
    const fileURL = URL.createObjectURL(file);
    uploadedMedia.push({ type: fileType, url: fileURL });
} else {
    errorPopup.textContent = 'Only images and videos are allowed.';
    return;
}
}
});

// Handle form submission
projectForm.addEventListener('submit', (event) => {
event.preventDefault();

const title = document.getElementById('projectTitle').value;
const description = document.getElementById('projectDescription').value;
const price = document.getElementById('projectPrice').value;
const duration = document.getElementById('projectDuration').value;

if (!title || !description || !price || !duration) {
errorPopup.textContent = 'All fields are required.';
return;
}

if (uploadedMedia.length === 0) {
errorPopup.textContent = 'Please upload at least one media file.';
return;
}

// Create the project item
const projectItem = document.createElement('div');
projectItem.classList.add('portfolio-post');

let mediaHTML = '';
uploadedMedia.forEach((media) => {
if (media.type === 'image') {
    mediaHTML += `<img style="width: 100%; height: auto; border-radius: 8px;" src="${media.url}" alt="Image">`;
} else if (media.type === 'video') {
    mediaHTML += `<video style="width: 100%; height: auto; border-radius: 8px;max-height: 500px;" controls>
                    <source src="${media.url}" type="video/mp4">
                  Your browser does not support the video tag.
                  </video>`;
}
});

projectItem.innerHTML = `
<div>
    <div class="project-post" style="width: 100%; display: flex; gap: 20px; justify-content: center; align-items: center;">
        <div style="width: 100%; min-width: 50%;">
            ${mediaHTML}
        </div>
        <div>
            <div style="display: flex; flex-direction: column; gap: 30px;">
                <h4 style="color: whitesmoke;">${title}</h4>
                <p style="color: whitesmoke;">${description}</p>
                <div style="display: flex; flex-direction: row; gap: 10px;">
                    <p style="color: whitesmoke;"><strong>Price:</strong> $${price}</p>
                    <p style="color: whitesmoke;"><strong>Duration:</strong> ${duration}</p>
                </div>
            </div>
        </div>
    </div>
</div>
`;

projectGrid.appendChild(projectItem);
closePopup();
});

// NAVBAR TOGGLE
const toggleBtn = document.querySelector('.toggle-btn');
const navbar = document.querySelector('.navbar');

toggleBtn.addEventListener('click', () => {
navbar.classList.toggle('active');
});


// EDUCATION POPUP FUNCTIONS
function openEducationPopup() {
document.getElementById('popup-edu').style.display = 'block';
document.getElementById('edu-overly').style.display = 'block';
}

function closeEducationPopup() {
document.getElementById('popup-edu').style.display = 'none';
document.getElementById('edu-overly').style.display = 'none';
}

function saveEducationDetails() {
let university = document.getElementById('university').value;
let degree = document.getElementById('degree').value;
let field = document.getElementById('field').value;
let enrollYear = document.getElementById('enrollYear').value;
let gradYear = document.getElementById('gradYear').value;
let grade = document.getElementById('grade').value;

let details = `<div class="edu-entry">
<p style="margin-top: 10px;"><strong>
<i style="margin-right: 10px;font-size: 30px;margin-bottom: 10px;" class="fas fa-graduation-cap"></i> <br> 
<h2>${university}</h2></strong>
<p style="color: rgb(202, 202, 202);">${degree} in ${field}</p>
<p style="color: yellow;">${enrollYear} - ${gradYear}</p>
<p style="color: rgb(202, 202, 202);">Grade: ${grade}%</p>
</p>
<hr style="margin-top: 10px">
</div>`;

document.getElementById('educationDetails').innerHTML += details;

// Clear input fields
document.getElementById('university').value = "";
document.getElementById('degree').value = "";
document.getElementById('field').value = "";
document.getElementById('enrollYear').value = "";
document.getElementById('gradYear').value = "";
document.getElementById('grade').value = "";

closeEducationPopup();
}

// JOB POPUP FUNCTIONS
function openJobPopup() {
document.getElementById('popup-job').style.display = 'block';
document.getElementById('job-overly').style.display = 'block';
}

function closeJobPopup() {
document.getElementById('popup-job').style.display = 'none';
document.getElementById('job-overly').style.display = 'none';
}

function saveJobDetails() {
let title = document.getElementById('title').value;
let employmentType = document.getElementById('employmenttype').value;
let company = document.getElementById('company').value;
let startYear = document.getElementById('startYear').value;
let endYear = document.getElementById('endYear').value;
let location = document.getElementById('location').value;

let details = `<div class="job-entry">
<p style="margin-top: 10px;"><strong>
<i style="margin-right: 10px; font-size: 30px; margin-bottom: 10px;" class="fas fa-briefcase"></i> <br> 
<h2>${title}</h2></strong>
<p style="color: rgb(202, 202, 202);">${employmentType} in ${company}</p>
<p style="color: yellow;">${startYear} - ${endYear}</p>
<p style="color: rgb(202, 202, 202);">${location}</p>
</p>
<hr style="margin-top: 10px">
</div>`;

document.getElementById('jobDetails').innerHTML += details;

// Clear input fields
document.getElementById('title').value = "";
document.getElementById('employmenttype').value = "";
document.getElementById('company').value = "";
document.getElementById('startYear').value = "";
document.getElementById('endYear').value = "";
document.getElementById('location').value = "";

closeJobPopup();
}