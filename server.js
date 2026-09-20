const express = require("express");

const app = express();

app.use(express.json());

const worlds = new Map();

app.get("/worlds", (req, res) => {
    res.json(Array.from(worlds.values()));
});

app.post("/worlds", (req, res) => {
    const world = req.body;

    if (!world.WorldId || !world.WorldName) {
        return res.status(400).json({
            error: "Missing WorldId or WorldName"
        });
    }

    worlds.set(world.WorldId, world);

    res.json({
        success: true,
        world: world
    });
});

app.get("/worlds/:id", (req, res) => {
    const world = worlds.get(req.params.id);

    if (!world) {
        return res.status(404).json({
            error: "World not found"
        });
    }

    res.json(world);
});

app.patch("/worlds/:id", (req, res) => {
    const world = worlds.get(req.params.id);

    if (!world) {
        return res.status(404).json({
            error: "World not found"
        });
    }

    Object.assign(world, req.body);

    worlds.set(req.params.id, world);

    res.json({
        success: true,
        world: world
    });
});

app.delete("/worlds/:id", (req, res) => {
    worlds.delete(req.params.id);

    res.json({
        success: true
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("World API running");
});
