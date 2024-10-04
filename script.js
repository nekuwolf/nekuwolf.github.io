function loadProjects() {
    const projectContainer = document.querySelector('#projects .card-body');
    fetch('data/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No data file to load or network error');
            }
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.className = 'card-text';
                emptyMessage.textContent = 'No projects found, please check back later.';
                projectContainer.appendChild(emptyMessage);
                return;
            }

            data.forEach(project => {
                const detailsElement = document.createElement('details');

                const summaryElement = document.createElement('summary');
                summaryElement.className = 'link card-subtitle';
                summaryElement.textContent = project.name;

                const imageElement = document.createElement('img');
                imageElement.src = project.image;
                imageElement.alt = project.name;
                imageElement.className = 'content-image';

                const descriptionElement = document.createElement('p');
                descriptionElement.className = 'card-text';
                descriptionElement.innerHTML = `${project.description} - <a href="${project.link}" target="_blank">Visit</a>`;

                detailsElement.appendChild(summaryElement);
                detailsElement.appendChild(imageElement);
                detailsElement.appendChild(descriptionElement);

                projectContainer.appendChild(detailsElement);
            });

            const endMessage = document.createElement('p');
            endMessage.className = 'card-text';
            endMessage.textContent = 'Thats it for now, expect more to come in the future.';
            projectContainer.appendChild(endMessage);
        })
        .catch(error => {
            console.error('Error loading projects:', error);

            const errorElement = document.createElement('p');
            errorElement.className = 'card-text';
            errorElement.textContent = 'Cosole error thrown, Error cannot load data file';

            projectContainer.appendChild(errorElement);
        });
        document.getElementById("htmlfallbackerror-cannot-load-data").remove();
}

function getDate() {
    const date = new Date();
    return date;
}

function getGreeting() {
    const hours = getDate().getHours();
    let greetingText;

    if (hours >= 5 && hours < 12) {
        greetingText = "Good Morning";
    } else if (hours >= 12 && hours < 17) {
        greetingText = "Good Afternoon";
    } else if (hours >= 17 && hours < 21) {
        greetingText = "Good Evening";
    } else {
        greetingText = "Good Night";
    }

    return greetingText;
}

function copyAndRedirect(element) {
    const links = document.querySelectorAll(element);

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const textToCopy = link.getAttribute('custom-copy-text');

            navigator.clipboard.writeText(textToCopy).then(function() {
                console.log('Custom text copied to clipboard: ' + textToCopy);

                const originalText = link.innerHTML;
                link.textContent = 'Copied, redirecting in 3s...';

                setTimeout(function() {
                    link.innerHTML = originalText;

                    window.open(link.href, '_blank');
                }, 3000);
            }).catch(function(err) {
                console.error('Could not copy text: ', err);
            });
        });
    });
}

function removeElement(element) {
    const elById = document.getElementById(element);
    if (elById) {
        elById.remove();
    } 
    else {
        const elByClass = document.getElementsByClassName(element);
        if (elByClass.length > 0) {
            while (elByClass.length > 0) {
                elByClass[0].remove();
            }
        } 
        else {
            console.error("No such element with ID or class: ", element);
        }
    }
}

function navbarDynamicBackgroundBlur() {
    var navbar = document.getElementById("topNavContainer");
    var sticky = navbar.offsetTop;
    var isSticky = false;

    window.addEventListener("scroll", function() {
        if (window.pageYOffset || window.scrollY > sticky && !isSticky) {
            navbar.classList.add("bg-dark-50-blur");
            isSticky = true;
        } else if (window.pageYOffset || window.scrollY <= sticky && isSticky) {
            navbar.classList.remove("bg-dark-50-blur");
            isSticky = false;
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("greeting").textContent = getGreeting();
    
    loadProjects();
});
