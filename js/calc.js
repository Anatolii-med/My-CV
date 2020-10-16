const technologiesSelect = document.querySelector('#calculator-form-technologies');

const technologiesMultiSelect = new Choices(technologiesSelect, {
    allowSearch: false,
    silent: false,
    renderChoiceLimit: -1,
    maxItemCount: -1,
    removeItems: true,
    removeItemButton: true,
    editItems: false,
    duplicateItemsAllowed: false,
    delimiter: ",",
    paste: true,
    searchEnabled: false,
    searchChoices: true,
    searchResultLimit: -1,
    position: "auto",
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    placeholder: true,
    noChoicesText: "No available options",
    itemSelectText: "Click to select",
    classNames: {
        containerInner: "choices__inner tech-input-container",
        input: "choices__input",
    },
});
calculateSum();


const calculatorform = document.querySelector('.calculator-form');



calculatorform.addEventListener('submit', function (event) {
    event.preventDefault();
    calculateSum();

});

function calculateSum() {
    // selectors
    const webSiteTypeSelect = document.querySelector('#calculator-form-website-type');
    const websiteCart = document.querySelector('#calculator-form-input-cart input:checked');
    const websiteReception = document.querySelector('#calculator-form-input-reception input:checked');

    // values
    const webSiteTypeValue = extractPriceFromValue(webSiteTypeSelect.value);
    const technologiesValue = getTechnologiesSum(technologiesMultiSelect.getValue());
    const websiteCartValue = ConvertCartOptionToPrice(websiteCart.value);
    const websiteReceptionValue = ConvertReceptionOptionToPrice(websiteReception.value);


    console.log(webSiteTypeValue);
    console.log(technologiesValue);
    console.log(websiteCartValue);
    console.log(websiteReceptionValue);

    const totalSum = webSiteTypeValue + technologiesValue + websiteCartValue + websiteReceptionValue;

    renderSum(totalSum);
}


function renderSum(sum) {
    const costElement = document.querySelector('.calculator-form-total-cost');

    costElement.textContent = 'Wait....';
    setTimeout(function () {
        costElement.textContent = sum + '$';
    }, 2000);

}



function ConvertCartOptionToPrice(option) {
    if (option === 'yes') {
        return 300;
    }
    return 0;
}
function ConvertReceptionOptionToPrice(option) {
    if (option === 'yes') {
        return 500;
    }
    return 0;
}


function getTechnologiesSum(technologiesArr) {
    let totalSum = 0;

    technologiesArr.forEach(function (tech) {
        totalSum = totalSum + extractPriceFromValue(tech.value);
    })

    return totalSum;
}

function extractPriceFromValue(str) {
    const price = str.match(/:\d+/);

    if (price) {
        return Number(price[0].slice(1)) || 0;
    }

    return 0;
}

