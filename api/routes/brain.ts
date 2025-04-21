
import { Router, Request, Response } from "express";
import * as brainjs from "brain.js";

const router = Router();

// Brain.js neural network: simple demo
const net = new brainjs.NeuralNetwork();

// Example: simple dataset, learns XOR logic
net.train([
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
]);

router.post("/predict", (req: Request, res: Response) => {
  const { input } = req.body;
  if (!Array.isArray(input)) {
    return res.status(400).json({ error: "Input must be an array of numbers." });
  }
  const output = net.run(input);
  return res.json({ output });
});

export default router;
