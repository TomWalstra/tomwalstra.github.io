document.querySelector('.hover-container').addEventListener('mousemove', function(e) {
    const x = e.clientX - this.getBoundingClientRect().left;
    const y = e.clientY - this.getBoundingClientRect().top;

    this.style.setProperty('--mouse-x', x + 'px');
    this.style.setProperty('--mouse-y', y + 'px');
});

const cardsContainer = document.querySelector(".accordion");

cardsContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".card");

  if (!target) return;

  cardsContainer.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("active");
  });

  target.classList.add("active");
});


// Select the video element
const video = document.getElementById('myVideo');

// Function to pause the video after 4 seconds
function pauseVideo() {
    video.pause();
    console.log('Video paused at 4 seconds');
}

// Add an event listener for the video 'play' event
video.addEventListener('play', function() {
    // Set a timeout to pause the video after 4 seconds (4000 milliseconds)
    setTimeout(pauseVideo, 4000);
});


document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll(".accordion .card");

  cards.forEach((card) => {
      let positions = ["top", "center", "bottom"];
      let currentIndex = 0;
      let intervalId = null;

      function transitionPositions(background) {
          if (intervalId !== null) {
              clearInterval(intervalId); // Clear the previous interval
          }

          background.style.objectPosition = positions[currentIndex];
          currentIndex = (currentIndex + 1) % positions.length;

          // Set interval to keep transitioning positions with a 5-second delay
          intervalId = setInterval(() => {
              background.style.objectPosition = positions[currentIndex];
              currentIndex = (currentIndex + 1) % positions.length;
          }, 5000); // 6 seconds includes 1 second for transition and 5 seconds delay
      }

      function startTransition() {
          const background = card.querySelector(".background");
          // Initial position transition
          transitionPositions(background);
      }

      function stopTransition() {
          if (intervalId !== null) {
              clearInterval(intervalId);
          }
          currentIndex = 0;
          // Reset to initial position
          const background = card.querySelector(".background");
          background.style.objectPosition = "top";
      }

      card.addEventListener("mouseenter", startTransition);
      card.addEventListener("mouseleave", stopTransition);
  });
});


var string = "<h2> Front-End Developer </h2>";
var str = string.split("");
var el = document.getElementById('str');
(function animate() {
str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running); 
var running = setTimeout(animate, 90);
})();




window.addEventListener("DOMContentLoaded",() => {
	const ctl = new CollapsibleTimeline("#timeline");
});

class CollapsibleTimeline {
	constructor(el) {
		this.el = document.querySelector(el);

		this.init();
	}
	init() {
		this.el?.addEventListener("click",this.itemAction.bind(this));
	}
	animateItemAction(button,ctrld,contentHeight,shouldCollapse) {
		const expandedClass = "timeline__item-body--expanded";
		const animOptions = {
			duration: 300,
			easing: "cubic-bezier(0.65,0,0.35,1)"
		};

		if (shouldCollapse) {
			button.ariaExpanded = "false";
			ctrld.ariaHidden = "true";
			ctrld.classList.remove(expandedClass);
			animOptions.duration *= 2;
			this.animation = ctrld.animate([
				{ height: `${contentHeight}px` },
				{ height: `${contentHeight}px` },
				{ height: "0px" }
			],animOptions);
		} else {
			button.ariaExpanded = "true";
			ctrld.ariaHidden = "false";
			ctrld.classList.add(expandedClass);
			this.animation = ctrld.animate([
				{ height: "0px" },
				{ height: `${contentHeight}px` }
			],animOptions);
		}
	}
	itemAction(e) {
		const { target } = e;
		const action = target?.getAttribute("data-action");
		const item = target?.getAttribute("data-item");

		if (action) {
			const targetExpanded = action === "expand" ? "false" : "true";
			const buttons = Array.from(this.el?.querySelectorAll(`[aria-expanded="${targetExpanded}"]`));
			const wasExpanded = action === "collapse";

			for (let button of buttons) {
				const buttonID = button.getAttribute("data-item");
				const ctrld = this.el?.querySelector(`#item${buttonID}-ctrld`);
				const contentHeight = ctrld.firstElementChild?.offsetHeight;

				this.animateItemAction(button,ctrld,contentHeight,wasExpanded);
			}

		} else if (item) {
			const button = this.el?.querySelector(`[data-item="${item}"]`);
			const expanded = button?.getAttribute("aria-expanded");

			if (!expanded) return;

			const wasExpanded = expanded === "true";
			const ctrld = this.el?.querySelector(`#item${item}-ctrld`);
			const contentHeight = ctrld.firstElementChild?.offsetHeight;

			this.animateItemAction(button,ctrld,contentHeight,wasExpanded);
		}
	}
}