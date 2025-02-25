const itemsArray = [
    { title: "Happy Birthday", image: "Images/Arrays/birthday.jpg" },
    { title: "Crazy Clown", image: "Images/Arrays/clown.jpg" },
    { title: "It's Raining", image: "Images/Arrays/rain.jpg" },
    { title: "Quiet Time", image: "Images/Arrays/read.jpg" },
    { title: "Working Hard", image: "Images/Arrays/shovel.jpg" },
    { title: "Work from Home", image: "Images/Arrays/work.jpg" }
];

const titlesContainer = document.getElementById('titles-container');
const popup = document.getElementById('popup');
const closeButton = document.getElementById('close');
const popupTitle = document.getElementById('popup-title');
const popupImage = document.getElementById('popup-image');

function displayTitles() {
    itemsArray.forEach(item => {
        const titleElement = document.createElement('div');
        titleElement.className = 'title';
        titleElement.textContent = item.title;
        
        titleElement.addEventListener('click', () => {
            showPopup(item);
        });
        
        titlesContainer.appendChild(titleElement);
    });
}

function showPopup(item) {
    popupTitle.textContent = item.title;
    popupImage.src = item.image;
    popupImage.alt = item.title;
    popup.classList.remove('hidden');
}

closeButton.addEventListener('click', () => {
    popup.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', displayTitles); 