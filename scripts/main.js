const boxPreview = document.querySelector('[data-js="box"]');
const inputRadius = Array.from(document.querySelectorAll("input"));
const inputAll = document.querySelector('[data-js="inputAll"]');
const CSSBoxPreview = document.querySelector('[data-js="CSSBoxPreview"]');
const CSSTextPreview = document.querySelector('[data-js="CSSTextPreview"]');

const copyBtn = document.createElement("button");
copyBtn.textContent = "Copy to Clipboard";
copyBtn.classList.add("btn");

const appliesBorderRadiusOnBox = (topLeft, topRight, bottomRight, bottomLeft) =>
	(boxPreview.style.borderRadius = `${topLeft || 0}px ${topRight || 0}px ${
		bottomRight || 0
	}px ${bottomLeft || 0}px`);

const changeCSSPreviewText = (topLeft, topRight, bottomRight, bottomLeft) =>
	(CSSTextPreview.textContent = `border-radius: ${topLeft || 0}px ${
		topRight || 0
	}px ${bottomRight || 0}px ${bottomLeft || 0}px;`);

const changeCSSPreviewTextForAll = (generalValue) =>
	(CSSTextPreview.textContent = `border-radius: ${generalValue}px;`);

const changeBorderRadius = (arrayOfInputs) => {
	let [topLeft, topRight, bottomLeft, bottomRight] = arrayOfInputs.map(
		(inputOfArray) => inputOfArray.value.replace(/,/g, ".")
	);
	appliesBorderRadiusOnBox(topLeft, topRight, bottomRight, bottomLeft);
	changeCSSPreviewText(topLeft, topRight, bottomRight, bottomLeft);
};

const copyTextToClipboard = () => {
	navigator.clipboard.writeText(CSSTextPreview.textContent);
};
const simulateSelectInput = () => {
	CSSTextPreview.style.backgroundColor = "#604C86";
	CSSTextPreview.style.color = "white";
};
const simulateDeselectInput = () => {
	CSSTextPreview.removeAttribute("style");
};

const animateSelectionOfInput = () => {
	CSSBoxPreview.appendChild(copyBtn);
	copyBtn.addEventListener("click", () => {
		simulateSelectInput();
		copyTextToClipboard();
		copyBtn.textContent = "Done!";
	});
};

const animateDeselectionOfInput = () => {
	CSSBoxPreview.removeChild(copyBtn);
	setTimeout(() => simulateDeselectInput(), 1000);
	copyBtn.textContent = "Copy to Clipboard";
};

inputRadius.map((input, _, arrayOfInputs) => {
	input.addEventListener("change", () => changeBorderRadius(arrayOfInputs));
});

inputAll.addEventListener("change", () => {
	appliesBorderRadiusOnBox(
		inputAll.value,
		inputAll.value,
		inputAll.value,
		inputAll.value
	);
	changeCSSPreviewTextForAll(inputAll.value)
});

CSSBoxPreview.addEventListener("mouseenter", animateSelectionOfInput);

CSSBoxPreview.addEventListener("mouseleave", animateDeselectionOfInput);
