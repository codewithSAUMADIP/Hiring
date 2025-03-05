let currentStep = 1;
function showStep(step) {
    document.querySelectorAll('.step').forEach((el, index) => {
        el.classList.toggle('active', index + 1 === step);
    });

    document.getElementById("prevBtn").style.display = step > 1 ? "inline-block" : "none";
    document.getElementById("nextBtn").style.display = step < 8 ? "inline-block" : "none";
    document.getElementById("saveBtn").style.display = step === 8 ? "inline-block" : "none";
    
}
function nextStep() {
if (currentStep === 1 && !document.querySelector('.skill-btn.selected')) {
alert("Please select a category.");
return;
}

if (currentStep === 2 && selectedSkills.length === 0) {
alert("Please add at least one skill.");
return;
}
if (currentStep !== 2) {
const inputField = document.querySelector(`#step${currentStep} input`);
if (inputField && inputField.value.trim() === "") {
    alert("Please fill in the required field.");
    return;
}
}
if (currentStep < 8) {
currentStep++;
showStep(currentStep);
}
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}
function selectSkill(btn) {
    document.querySelectorAll('.skill-btn').forEach(button => button.classList.remove('selected'));
    btn.classList.add('selected');
}


//SKILL
const skillInput = document.getElementById('skillInput');
const suggestions = document.getElementById('suggestions');
const skillsList = document.getElementById('skillsList');
const skillsField = document.getElementById('skills');
let selectedSkills = [];

const skills = ['JavaScript', 'HTML', 'CSS', 'Python', 'React', 'Node.js', 'SEO', 'Odoo', 'Machine Learning'];

skillInput.addEventListener('input', function() {
    const query = skillInput.value.toLowerCase();
    suggestions.innerHTML = '';
    if (query) {
        const filteredSkills = skills.filter(skill => skill.toLowerCase().includes(query));
        filteredSkills.forEach(skill => {
            const div = document.createElement('div');
            div.textContent = skill;
            div.onclick = function() { addSkill(skill); };
            suggestions.appendChild(div);
        });
    }
});

function addSkill(skill) {
    if (!selectedSkills.includes(skill)) {
        selectedSkills.push(skill);
        renderSkills();
    }
    skillInput.value = '';
    suggestions.innerHTML = '';
}

function removeSkill(skill) {
    selectedSkills = selectedSkills.filter(s => s !== skill);
    renderSkills();
}

function renderSkills() {
    skillsList.innerHTML = '';
    selectedSkills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill';
        span.innerHTML = `${skill} <span onclick="removeSkill('${skill}')">&times;</span>`;
        skillsList.appendChild(span);
    });
    skillsField.value = selectedSkills.join(', ');
}
document.getElementById("multiStepForm").addEventListener("submit", function (e) {
e.preventDefault(); // Prevent the default form submission

// Get values from the form fields
const name = document.getElementById("name").value.trim();
const country = document.getElementById("country").value.trim();
const language = document.getElementById("language").value.trim();
const tagline = document.getElementById("tagline").value.trim();
const about = document.getElementById("about").value.trim();


// Check if all fields are filled
if (!name || !country || !language || !tagline || !about === 0) {
alert("Please fill in all the fields before saving.");
return;
}

// Check if profile picture is uploaded
const profilePicInput = document.getElementById("profilePic");
const profilePicFile = profilePicInput ? profilePicInput.files[0] : null;

// Function to save data and redirect
function saveUserData(profilePicBase64 = null) {
const profileData = {
    name,
    country,
    language,
    tagline,
    about,
    skills: selectedSkills,
    profilePic: profilePicBase64, // Add base64 string if image exists
};

localStorage.setItem("userData", JSON.stringify(profileData));
alert("Profile saved successfully!");

// Redirect to the profile page
window.location.href = "Homepage.html";
}

// If a profile picture is uploaded, convert to Base64
if (profilePicFile) {
const reader = new FileReader();
reader.onload = function (event) {
    saveUserData(event.target.result);
};
reader.readAsDataURL(profilePicFile);
} else {
saveUserData();
}
});