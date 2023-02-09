const form = document.querySelector("form");
const tbody = document.querySelector("#standings-body");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const season = document.querySelector("#season").value;
    const round = document.querySelector("#round").value;
  
    const response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
    const standings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    tbody.innerHTML = "";

    standings.forEach((standing, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${standing.Driver.givenName} ${standing.Driver.familyName}</td>
            <td>${standing.Driver.nationality}</td>
            <td>${standing.Constructors[0].name}</td>
            <td>${standing.points}</td>
            `;
        tbody.appendChild(row);
    });
});