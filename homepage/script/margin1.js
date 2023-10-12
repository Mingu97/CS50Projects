document.addEventListener("DOMContentLoaded", function() {
    const costInput = document.getElementById("cost");
    const marginInput = document.getElementById("margin");
    const totalRRPElement = document.getElementById("totalRRP");
    const totalVatElement = document.getElementById("vatAdded");
    const totalexVatRrp = document.getElementById("rrpExVat");
    const vatRadios = document.getElementsByName("vat");

    // Add a Calc Button Event Listener just in case its clicked
    calcButton.addEventListener("click", updateTotals);
    // Add a change event listener to the VAT radio buttons
    for (const vatRadio of vatRadios) {
        vatRadio.addEventListener("change", updateTotals);
    }

    function updateTotals() {
        const cost = parseFloat(costInput.value);
        const margin = parseFloat(marginInput.value);
        // Find the selected VAT radio button
        let selectedVatValue = 0;
        for (const vatRadio of vatRadios) {
            if (vatRadio.checked) {
                selectedVatValue = parseFloat(vatRadio.value);
                break;
            }
        }
        // Check if the values are valid numbers
        if (!isNaN(cost) && !isNaN(margin) && margin < 100) {
            // Calculate the markup amount
            const rrpexVat = cost / (1 - margin / 100);
            const rrpPlusVat = ((rrpexVat * selectedVatValue) / 100) + rrpexVat;
            const vatAmount = rrpPlusVat - rrpexVat
            // Print the calculated values
            console.log("RRP Value :", rrpPlusVat);
            console.log("Vat Amount: ", vatAmount);

            // Update the total markup, VAT, and total price elements
            totalexVatRrp.textContent = `€${rrpexVat.toFixed(2)}`;
            totalVatElement.textContent = `€${vatAmount.toFixed(2)}`;
            totalRRPElement.textContent = `€${rrpPlusVat.toFixed(2)}`;
        } else {
            // Handle invalid input values
            alert("Please enter valid numbers for Cost and Margin %. Margin can never exceed 100%");
        }
    }
    // Add a submit event listener to the form
    const form = document.querySelector("form");
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent the form from submitting
    });
});
