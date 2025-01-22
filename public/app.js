document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    const carousel = document.querySelector('.carousel');
    const listHTML = document.querySelector('.carousel .list');
    const seeMoreButtons = document.querySelectorAll('.seeMore');
    const backButton = document.getElementById('back');

    let unAcceptClick;

    // Carousel slider
    function showSlider(type) {
        nextButton.style.pointerEvents = 'none';
        prevButton.style.pointerEvents = 'none';

        carousel.classList.remove('next', 'prev');
        const items = document.querySelectorAll('.carousel .list .item');

        if (type === 'next') {
            listHTML.appendChild(items[0]);
            carousel.classList.add('next');
        } else {
            listHTML.prepend(items[items.length - 1]);
            carousel.classList.add('prev');
        }

        clearTimeout(unAcceptClick);
        unAcceptClick = setTimeout(() => {
            nextButton.style.pointerEvents = 'auto';
            prevButton.style.pointerEvents = 'auto';
        }, 2000);
    }

    nextButton.onclick = () => showSlider('next');
    prevButton.onclick = () => showSlider('prev');

    // Show more details
    seeMoreButtons.forEach(button => {
        button.onclick = () => {
            carousel.classList.remove('next', 'prev');
            carousel.classList.add('showDetail');
        };
    });

    // Back to carousel view
    backButton.onclick = () => {
        carousel.classList.remove('showDetail');
    };

    // Scroll effect for jumbotron
    window.addEventListener('scroll', () => {
        const jumbotronContent = document.querySelector('.jumbotron-content');
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        const opacity = Math.max(1 - (scrollPosition / windowHeight), 0);
        const translateY = Math.min(scrollPosition / 10, 100);

        jumbotronContent.style.opacity = opacity;
        jumbotronContent.style.transform = `translateY(${translateY}px)`;
    });

    // Smooth scrolling to sections
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');

    function showSection(id) {
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === id) {
                section.classList.add('active');
                window.location.hash = id; // Update URL hash
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSectionId = link.getAttribute('href').substring(1);
            showSection(targetSectionId);
        });
    });

    // Products data
    const products = {
        cameras: [
            { name: '360 Cameras', img: 'camera/360/360/rs.jpg', price: '₱30,000.00' },
            { name: 'Akaso', img: 'camera/akaso/akaso/ek7000.jpg', price: '₱3,000.00' },
            { name: 'Canon', img: 'camera/canon/canon/r5.jpg', price: '₱200,000.00' },
            { name: 'DJI', img: 'camera/dji/dji/mini3.jpg', price: '₱30,000.00' },
            { name: 'Fujifilm', img: 'camera/fujifilm/fujifilm/t4.jpg', price: '₱85,000.00' },
            { name: 'Go Pro', img: 'camera/gopro/gopro/max.jpg', price: '₱23,000.00' },
            { name: 'Nikon', img: 'camera/nikon/nikon/D8501.jpg', price: '₱150,000.00' },
            { name: 'Panasonic', img: 'camera/panasonic/panasonic/g9.jpg', price: '₱55,000.00' },
            { name: 'Ricoh', img: 'camera/ricoh/ricoh/gr2.jpg', price: '₱30,000.00' },
            { name: 'Sony', img: 'camera/sony/sony/a7.jpg', price: '₱100,000.00' }
        ],
        tablets: [
            { name: 'Samsung Tab S9 FE (Gray)', img: 'tablet/SamsungFEGray.jpg', price: '₱30,000.00' },
            { name: 'Samsung Tab S9 FE (Lavender)', img: 'tablet/SamsungFELavender.jpg', price: '₱30,000.00' },
            { name: 'Samsung Tab S9 FE (Mint)', img: 'tablet/SamsungFEMint.jpg', price: '₱30,000.00' },
            { name: 'Samsung Galaxy Tab S9 (Graphite)', img: 'tablet/SamsungTabS9Graphite.png', price: '₱65,000.00' },
            { name: 'iPad Pro M4(Gray)', img: 'tablet/iPad Pro M4.webp', price: '₱55,000.00' },
            { name: 'Huawei Mate (Black)', img: 'tablet/HuaweiMateBlack.png', price: '₱20,000.00' },
            { name: 'Huawei Mate (White)', img: 'tablet/HuaweiMateGreen.png', price: '₱40,000.00' },
            { name: 'iPad Air M2 (Green)', img: 'tablet/iPad Air M2.webp', price: '₱40,000.00' },
            { name: 'Xiaomi Mi Pad 6 Pro (Gray)', img: 'tablet/XiaomiPad6Pro.png', price: '₱65,000.00' },
            { name: 'Samsung Tab A8 LTE', img: 'tablet/samsungtaba8.jpg', price: '₱13,000.00' }
        ],
        instruments: [
            { name: 'Fernando JBCL-500 Clarinet', img: 'instruments/clarinet.jpg', price: '₱20,000.00' },
            { name: 'Fernando JBEP-1150L Euphonium', img: 'instruments/euphonium.jpg', price: '₱40,000.00' },
            { name: 'Fernando JBBS-110L Saxophone', img: 'instruments/barsax.jpg', price: '₱40,000.00' },
            { name: 'Fernando JBFL-6248S Flute', img: 'instruments/flute.jpg', price: '₱15,000.00' },
            { name: 'King 1117 Bb Trumpet', img: 'instruments/trumpet.jpg', price: '₱30,000.00' },
            { name: 'King 1121 F Mellophone', img: 'instruments/cornet.jpg', price: '₱50,000.00' },
            { name: 'Conn 6D Double Horn', img: 'instruments/horn.jpg', price: '₱100,000.00' },
            { name: 'Conn 110H Bass Trombone', img: 'instruments/tbone.jpg', price: '₱80,000.00' },
            { name: 'Conn 20KW Sousaphone', img: 'instruments/tuba.jpg', price: '₱200,000.00' },
            { name: 'Conn Selmer PC710 Piccolo ', img: 'instruments/piccolo.jpg', price: '₱15,000.00' }
        ],
        tshirts: [
            { name: 'Trombone King Shirt', img: 'shirt/shirt1.jpg', price: '₱300.00' },
            { name: 'Saxophone Playing Shirt', img: 'shirt/shirt2.jpg', price: '₱300.00' },
            { name: 'Tuba Heavy Metal Shirt', img: 'shirt/shirt3.avif', price: '₱300.00' },
            { name: 'Anatomy of Camera Shirt', img: 'shirt/shirt4.webp', price: '₱300.00' },
            { name: 'Capturing Light Shirt', img: 'shirt/shirt5.jpg', price: '₱300.00' },
            { name: 'Focal Length WTF Shirt', img: 'shirt/shirt6.jpg', price: '₱300.00' },
            { name: 'Skeleton Camera Shirt', img: 'shirt/shirt7.webp', price: '₱300.00' },
            { name: 'Trouble Maker Shirt', img: 'shirt/damit1.jpg', price: '₱300.00' },
            { name: 'Elevate Yourself Shirt', img: 'shirt/damit5.jpg', price: '₱300.00' },
            { name: 'Error 404 Not Found Shirt', img: 'shirt/damit4.jpg', price: '₱300.00' }
        ]
    };

    // Generate product cards
    function generateProductCards(category) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    if (products[category]) {
        products[category].forEach(product => {
            const card = document.createElement('div');
            card.className = 'col-lg-3 col-md-4 col-sm-6'; // Adjust column size based on screen width
            card.innerHTML = `
                <div class="card">
                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price}</p>
                        <a href="#" class="btn btn-primary">Buy Now</a>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    } else {
        container.innerHTML = '<p>No products found.</p>';
    }
}

    // Default category and event listeners
    generateProductCards('cameras'); // Load default category

    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const category = event.target.getAttribute('data-category');
            generateProductCards(category);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Generate product cards
    function generateProductCards(category) {
        const container = document.getElementById('product-container');
        container.innerHTML = '';

        if (products[category]) {
            products[category].forEach(product => {
                const card = document.createElement('div');
                card.className = 'card'; // Apply the same class for styling
                card.innerHTML = `
                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price}</p>
                        <a href="#" class="btn btn-primary">Buy Now</a>
                    </div>
                `;
                container.appendChild(card);
            });
        } else {
            container.innerHTML = '<p>No products found.</p>';
        }
    }

    // Default category and event listeners
    generateProductCards('cameras'); // Load default category

    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const category = event.target.getAttribute('data-category');
            generateProductCards(category);
        });
    });

    // Carousel functionality
    const roundabouts = document.querySelectorAll('.roundabout');

    roundabouts.forEach(roundabout => {
        const inner = roundabout.querySelector('.roundabout-inner');
        const leftArrow = roundabout.querySelector('#prev');
        const rightArrow = roundabout.querySelector('#next');
        const cardWidth = inner.querySelector('.card').offsetWidth;
        const cards = inner.querySelectorAll('.card').length;
        const visibleCards = 3;
        let currentIndex = 0;

        function updateCarousel() {
            const offset = -(cardWidth * currentIndex);
            inner.style.transform = `translateX(${offset}px)`;
        }

        leftArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        rightArrow.addEventListener('click', () => {
            if (currentIndex < cards - visibleCards) {
                currentIndex++;
                updateCarousel();
            }
        });
    });
});

document.querySelector('.arrow-up-button').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});