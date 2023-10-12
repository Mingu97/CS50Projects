document.addEventListener("DOMContentLoaded", function() {
    // Get references to the input fields and VAT radio buttons
    const costInput = document.getElementById("cost");
    const markupInput = document.getElementById("markup");
    const totalMarkupElement = document.getElementById("totalMarkup");
    const totalVatElement = document.getElementById("totalVAT");
    const totalPriceElement = document.getElementById("totalPrice");
    const vatRadios = document.getElementsByName("vat");
    const calcButton = document.getElementById("calcButton");

    // Add a Calc Button Event Listener just in case its clicked
    calcButton.addEventListener("click", updateTotals);

    // Add a change event listener to the VAT radio buttons
    for (const vatRadio of vatRadios) {
        vatRadio.addEventListener("change", updateTotals);
    }

    // Function to update the total price when VAT changes
    function updateTotals() {
        // Get the values from the input fields
        const cost = parseFloat(costInput.value);
        const markupPercentage = parseFloat(markupInput.value);

        // Find the selected VAT radio button
        let selectedVatValue = 0;
        for (const vatRadio of vatRadios) {
            if (vatRadio.checked) {
                selectedVatValue = parseFloat(vatRadio.value);
                break;
            }
        }

        // Check if the values are valid numbers
        if (!isNaN(cost) && !isNaN(markupPercentage)) {
            // Calculate the markup amount
            const markupAmount = (cost * markupPercentage) / 100;

            // Calculate the VAT amount
            const vatAmount = (cost + markupAmount) * (selectedVatValue / 100);

            // Calculate the total price including VAT
            const totalPrice = cost + markupAmount + vatAmount;

            // Print the calculated values
            console.log("Cost:", cost);
            console.log("Markup Percentage:", markupPercentage);
            console.log("Selected VAT Value:", selectedVatValue);
            console.log("Markup Amount:", markupAmount);
            console.log("VAT Amount:", vatAmount);

            // Update the total markup, VAT, and total price elements
            totalMarkupElement.textContent = `€${markupAmount.toFixed(2)}`;
            totalVatElement.textContent = `€${vatAmount.toFixed(2)}`;
            totalPriceElement.textContent = `€${totalPrice.toFixed(2)}`;
        } else {
            // Handle invalid input values
            alert("Please enter valid numbers for Cost and Markup %.");
        }
    }

    // Add a submit event listener to the form
    const form = document.querySelector("form");
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent the form from submitting
    });
});
