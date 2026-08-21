const apiURL = "https://jsonplaceholder.typicode.com/todos/";
const loadData = document.getElementById("loadData");
const clearTable = document.getElementById("clearTable");
const tableContainer = document.getElementById("tableContainer");

loadData.addEventListener("click", function() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Build the table
            let table = document.createElement("table");
            table.style.borderCollapse = "collapse";
            table.style.width = "100%";

            // Header row
            let thead = document.createElement("thead");
            thead.innerHTML = `
                <tr>
                    <th style="border: 1px solid #999; padding: 6px 10px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">User ID</th>
                    <th style="border: 1px solid #999; padding: 6px 10px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Task ID</th>
                    <th style="border: 1px solid #999; padding: 6px 10px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Title</th>
                    <th style="border: 1px solid #999; padding: 6px 10px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Status</th>
                </tr>
            `;
            table.appendChild(thead);

            // Body rows
            let tbody = document.createElement("tbody");
            data.forEach(todo => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td style="border: 1px solid #999; padding: 6px 10px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">${todo.userId}</td>
                    <td style="border: 1px solid #999; padding: 6px 10px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">${todo.id}</td>
                    <td style="border: 1px solid #999; padding: 6px 10px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">${todo.title}</td>
                    <td style="border: 1px solid #999; padding: 6px 10px; color: ${todo.completed ? 'green' : 'red'}; font-weight: bold; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                        ${todo.completed ? 'Completed' : 'Not yet Completed'}
                    </td>
                `;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            // Clear old table (if any) and insert new one
            tableContainer.innerHTML = "";
            tableContainer.appendChild(table);
        })
        .catch(error => console.error("Error fetching data:", error));
});

clearTable.addEventListener("click", function() {
    tableContainer.innerHTML = "";
});