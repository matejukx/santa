const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const participants = [
  { id: "1", name: "Michał Matejuk" },
  { id: "2", name: "Zuzanna Chmielewska" },
  { id: "3", name: "Wojtek Ziółkowski" },
  { id: "4", name: "Zuzanna Struniawska" },
  { id: "5", name: "Wojciech Szyszka" },
  { id: "6", name: "Bartosz Salwiczek" },
  { id: "7", name: "Kinga Salwiczek" },
  { id: "8", name: "Jan Jetke" },
  { id: "9", name: "Julia Królak" },
  { id: "10", name: "Kuba Grabowski" },
  { id: "11", name: "Julia Cichosz" },
  { id: "12", name: "Łukasz Licznar" },
  { id: "13", name: "Michał Krawczyszyn" },
  { id: '14', name: "Patryk Olszewski" },
];

const couples = [
  [
    { id: "1", name: "Michał Matejuk" },
    { id: "2", name: "Zuzanna Chmielewska" },
  ],
  [
    { id: "6", name: "Bartosz Salwiczek" },
    { id: "7", name: "Kinga Salwiczek" },
  ],
  [
    { id: "9", name: "Julia Królak" },
    { id: "10", name: "Kuba Grabowski" },
  ],
];

const alreadyDrawed = [];

const alreadySelected = [];

app.get("/api/participants", (req, res) => {
  res.json(participants);
});

app.post("/api/draw", (req, res) => {
  const { drawerId } = req.body;

  const drawer = participants.find((p) => p.id === drawerId);
  if (!drawer) return res.status(400).json({ error: "Drawer not found" });

  if (alreadyDrawed.includes(drawerId))
    return res.status(400).json({ name: "Juz losowalxs!!!!" });

  const possibleDraws = participants
    .filter((p) => p.id !== drawerId)
    .filter((p) => !alreadySelected.includes(p.id))
    .filter(
      (p) =>
        !couples.find(
          (c) =>
            (c[0].id === drawerId || c[1].id === drawerId) &&
            (c[1].id === p.id || c[0].id === p.id)
        )
    );

  const drawnPerson =
    possibleDraws[Math.floor(Math.random() * possibleDraws.length)];

  alreadyDrawed.push(drawerId);
  alreadySelected.push(drawnPerson.id);
  console.log(alreadySelected);
  console.log(alreadyDrawed);
  res.json({ name: drawnPerson.name });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
