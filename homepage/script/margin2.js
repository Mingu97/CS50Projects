document.addEventListener("DOMContentLoaded", function() {
    const costInput = document.getElementById("cost");
    const rrpInput = document.getElementById("rrp");
    const totalMarginElement = document.getElementById("totalMargin");
    const totalVatElement = document.getElementById("totalVAT");
    const vatRadios = document.getElementsByName("vat");

    // Add a Calc Button Event Listener just in case its clicked
    calcButton.addEventListener("click", updateTotals);
    // Add a change event listener to the VAT radio buttons
    for (const vatRadio of vatRadios) {
        vatRadio.addEventListener("change", updateTotals);
    }

    function updateTotals() {
        const cost = parseFloat(costInput.value);
        const rrp = parseFloat(rrpInput.value);
        // Find the selected VAT radio button
        let selectedVatValue = 0;
        for (const vatRadio of vatRadios) {
            if (vatRadio.checked) {
                selectedVatValue = parseFloat(vatRadio.value);
                break;
            }
        }
        // Check if the values are valid numbers
        if (!isNaN(cost) && !isNaN(rrp)) {
            // Calculate the markup amount
            const rrpLessVat = rrp / (1 + selectedVatValue / 100)

            const marginAmount = ((rrpLessVat - cost) / rrpLessVat) * 100;
            const vatAmount = rrp - rrpLessVat
            // Print the calculated values
            console.log("Margin Amount:", marginAmount);
            console.log("VAT Amount:", (rrp - rrpLessVat));

            // Update the total markup, VAT, and total price elements
            totalMarginElement.textContent = `${marginAmount.toFixed(2)}%`;
            totalVatElement.textContent = `€${vatAmount.toFixed(2)}`;
        } else {
            // Handle invalid input values
            alert("Please enter valid numbers for Cost and RRP.");
        }
    }
    // Add a submit event listener to the form
    const form = document.querySelector("form");
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent the form from submitting
    });
});
