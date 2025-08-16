document.addEventListener("DOMContentLoaded", async () => {
    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1nhjqNOBXJmjJkMiBQRSClFW5-yDZBJUusUc0-CQloRw/export?format=csv'; // Replace with your actual sheet URL

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const tableContainer = document.getElementById("table-container");
    const tableHead = document.querySelector("#jobs-table thead");
    const tableBody = document.querySelector("#jobs-table tbody");

    try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("Network response was not ok");

        const csvText = await response.text();
        const rows = csvText.trim().split("\n").map(row => row.split(","));

        const headers = rows[0];
        const dataRows = rows.slice(1);

        // Populate table headers
        const headerHTML = headers.map(h => `<th class="text-left px-4 py-2">${h}</th>`).join("");
        tableHead.innerHTML = `<tr>${headerHTML}</tr>`;

        // Find index of 'Link' column
        const linkIndex = headers.indexOf('Link');

        // Populate table rows
        const rowsHTML = dataRows.map(row => {
            const cols = row.map((col, index) => {
                if (index === linkIndex) {
                    return `<td class="border-t px-4 py-2"><a href="${col}" target="_blank" class="text-blue-500 underline">Apply</a></td>`;
                } else {
                    return `<td class="border-t px-4 py-2">${col}</td>`;
                }
            }).join("");
            return `<tr>${cols}</tr>`;
        }).join("");
        tableBody.innerHTML = rowsHTML;

        // Show table and hide loader
        loading.classList.add("hidden");
        tableContainer.classList.remove("hidden");
    } catch (err) {
        console.error("Error loading jobs:", err);
        loading.classList.add("hidden");
        error.classList.remove("hidden");
    }
});
